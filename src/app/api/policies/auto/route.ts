import { NextRequest, NextResponse } from 'next/server';
import pool from '@/lib/db';
import { getUserFromRequest } from '@/lib/auth';
import { RowDataPacket, ResultSetHeader } from 'mysql2';

export async function GET(req: NextRequest) {
  const user = getUserFromRequest(req);
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const { searchParams } = new URL(req.url);
  const customerId = searchParams.get('customerId');

  try {
    let query = `SELECT ap.*, c.first_name, c.last_name,
      (SELECT COUNT(*) FROM AI_VEHICLE v WHERE v.auto_policy_id = ap.auto_policy_id) as vehicle_count
      FROM AI_AUTO_INSURANCE_POLICY ap JOIN AI_CUSTOMER c ON ap.customer_id = c.customer_id`;
    const params: (string | number)[] = [];

    if (user.role === 'customer') {
      query += ' WHERE ap.customer_id = ?';
      params.push(user.customerId!);
    } else if (customerId) {
      query += ' WHERE ap.customer_id = ?';
      params.push(parseInt(customerId));
    }
    query += ' ORDER BY ap.date_created DESC';

    const [rows] = await pool.execute<RowDataPacket[]>(query, params);
    return NextResponse.json(rows);
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
    const { customerId, policyStartDate, policyEndDate, premiumAmount, policyStatus } = await req.json();
    if (!customerId || !policyStartDate || !policyEndDate || !premiumAmount) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }
    await connection.beginTransaction();

    const [lastRow] = await connection.execute<RowDataPacket[]>(
      'SELECT auto_policy_id FROM AI_AUTO_INSURANCE_POLICY ORDER BY auto_policy_id DESC LIMIT 1'
    );
    const nextId = lastRow.length ? lastRow[0].auto_policy_id + 1 : 1;
    const policyNumber = `AUTO-${new Date().getFullYear()}-${String(nextId).padStart(4, '0')}`;

    const [result] = await connection.execute<ResultSetHeader>(
      `INSERT INTO AI_AUTO_INSURANCE_POLICY (customer_id, policy_number, policy_start_date, policy_end_date, premium_amount, policy_status, date_created)
       VALUES (?, ?, ?, ?, ?, ?, CURDATE())`,
      [customerId, policyNumber, policyStartDate, policyEndDate, premiumAmount, policyStatus || 'C']
    );
    await connection.commit();
    return NextResponse.json({ success: true, policyId: result.insertId, policyNumber }, { status: 201 });
  } catch (err) {
    await connection.rollback();
    console.error(err);
    return NextResponse.json({ error: 'Failed to create policy' }, { status: 500 });
  } finally {
    connection.release();
  }
}
