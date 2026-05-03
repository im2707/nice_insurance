import { NextRequest, NextResponse } from 'next/server';
import pool from '@/lib/db';
import { getUserFromRequest } from '@/lib/auth';
import { RowDataPacket, ResultSetHeader } from 'mysql2';

export async function GET(req: NextRequest) {
  const user = getUserFromRequest(req);
  if (!user || user.role !== 'employee') return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const { searchParams } = new URL(req.url);
  const search = searchParams.get('search') || '';
  const page = parseInt(searchParams.get('page') || '1');
  const limit = 20;
  const offset = (page - 1) * limit;

  try {
    const searchLike = `%${search}%`;
    const [rows] = await pool.execute<RowDataPacket[]>(
      `SELECT c.*, 
        (SELECT COUNT(*) FROM AI_HOME_INSURANCE_POLICY WHERE customer_id = c.customer_id) as home_policies,
        (SELECT COUNT(*) FROM AI_AUTO_INSURANCE_POLICY WHERE customer_id = c.customer_id) as auto_policies
       FROM AI_CUSTOMER c
       WHERE c.first_name LIKE ? OR c.last_name LIKE ? OR c.email LIKE ? OR c.phone LIKE ?
       ORDER BY c.customer_id DESC LIMIT ${limit} OFFSET ${offset}`,
      [searchLike, searchLike, searchLike, searchLike]
    );
    const [countRows] = await pool.execute<RowDataPacket[]>(
      'SELECT COUNT(*) as total FROM AI_CUSTOMER WHERE first_name LIKE ? OR last_name LIKE ? OR email LIKE ? OR phone LIKE ?',
      [searchLike, searchLike, searchLike, searchLike]
    );
    return NextResponse.json({ customers: rows, total: countRows[0].total, page, limit });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: 'Database error' }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  const user = getUserFromRequest(req);
  if (!user || user.role !== 'employee') return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const connection = await pool.getConnection();
  try {
    const body = await req.json();
    const { firstName, lastName, middleName, streetAddress, city, state, zipCode, gender, maritalStatus, customerType, email, phone } = body;
    if (!firstName || !lastName || !streetAddress || !city || !state || !zipCode || !maritalStatus || !customerType) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }
    await connection.beginTransaction();
    const [result] = await connection.execute<ResultSetHeader>(
      `INSERT INTO AI_CUSTOMER (first_name, middle_name, last_name, street_address, city, state, zip_code, gender, marital_status, customer_type, email, phone, date_created)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, CURDATE())`,
      [firstName, middleName || null, lastName, streetAddress, city, state, zipCode, gender || null, maritalStatus, customerType, email || null, phone || null]
    );
    await connection.commit();
    return NextResponse.json({ success: true, customerId: result.insertId }, { status: 201 });
  } catch (err) {
    await connection.rollback();
    console.error(err);
    return NextResponse.json({ error: 'Failed to create customer' }, { status: 500 });
  } finally {
    connection.release();
  }
}
