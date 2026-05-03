import { NextRequest, NextResponse } from 'next/server';
import pool from '@/lib/db';
import { getUserFromRequest } from '@/lib/auth';
import { RowDataPacket } from 'mysql2';

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  const user = getUserFromRequest(req);
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const id = parseInt(params.id);
  if (user.role === 'customer' && user.customerId !== id) return NextResponse.json({ error: 'Forbidden' }, { status: 403 });

  try {
    const [rows] = await pool.execute<RowDataPacket[]>('SELECT * FROM AI_CUSTOMER WHERE customer_id = ?', [id]);
    if (!rows.length) return NextResponse.json({ error: 'Not found' }, { status: 404 });

    const [homePolicies] = await pool.execute<RowDataPacket[]>(
      'SELECT * FROM AI_HOME_INSURANCE_POLICY WHERE customer_id = ? ORDER BY date_created DESC', [id]
    );
    const [autoPolicies] = await pool.execute<RowDataPacket[]>(
      'SELECT * FROM AI_AUTO_INSURANCE_POLICY WHERE customer_id = ? ORDER BY date_created DESC', [id]
    );
    return NextResponse.json({ customer: rows[0], homePolicies, autoPolicies });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: 'Database error' }, { status: 500 });
  }
}

export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  const user = getUserFromRequest(req);
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const id = parseInt(params.id);
  if (user.role === 'customer' && user.customerId !== id) return NextResponse.json({ error: 'Forbidden' }, { status: 403 });

  const connection = await pool.getConnection();
  try {
    const body = await req.json();
    const { firstName, lastName, middleName, streetAddress, city, state, zipCode, gender, maritalStatus, customerType, email, phone } = body;

    await connection.beginTransaction();
    await connection.execute(
      `UPDATE AI_CUSTOMER SET first_name=?, middle_name=?, last_name=?, street_address=?, city=?, state=?, zip_code=?, gender=?, marital_status=?, customer_type=?, email=?, phone=?
       WHERE customer_id=?`,
      [firstName, middleName || null, lastName, streetAddress, city, state, zipCode, gender || null, maritalStatus, customerType || 'H', email || null, phone || null, id]
    );
    await connection.commit();
    return NextResponse.json({ success: true });
  } catch (err) {
    await connection.rollback();
    console.error(err);
    return NextResponse.json({ error: 'Update failed' }, { status: 500 });
  } finally {
    connection.release();
  }
}

export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  const user = getUserFromRequest(req);
  if (!user || user.role !== 'employee') return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const id = parseInt(params.id);
  const connection = await pool.getConnection();
  try {
    await connection.beginTransaction();
    // Delete in correct FK order
    await connection.execute(`DELETE hp FROM AI_HOME_PAYMENT hp 
      JOIN AI_HOME_INVOICE hi ON hp.home_invoice_id = hi.home_invoice_id
      JOIN AI_HOME_INSURANCE_POLICY p ON hi.home_policy_id = p.home_policy_id
      WHERE p.customer_id = ?`, [id]);
    await connection.execute(`DELETE hi FROM AI_HOME_INVOICE hi 
      JOIN AI_HOME_INSURANCE_POLICY p ON hi.home_policy_id = p.home_policy_id
      WHERE p.customer_id = ?`, [id]);
    await connection.execute(`DELETE h FROM AI_HOME h
      JOIN AI_HOME_INSURANCE_POLICY p ON h.home_policy_id = p.home_policy_id
      WHERE p.customer_id = ?`, [id]);
    await connection.execute('DELETE FROM AI_HOME_INSURANCE_POLICY WHERE customer_id = ?', [id]);

    await connection.execute(`DELETE ap FROM AI_AUTO_PAYMENT ap 
      JOIN AI_AUTO_INVOICE ai ON ap.auto_invoice_id = ai.auto_invoice_id
      JOIN AI_AUTO_INSURANCE_POLICY p ON ai.auto_policy_id = p.auto_policy_id
      WHERE p.customer_id = ?`, [id]);
    await connection.execute(`DELETE ai FROM AI_AUTO_INVOICE ai 
      JOIN AI_AUTO_INSURANCE_POLICY p ON ai.auto_policy_id = p.auto_policy_id
      WHERE p.customer_id = ?`, [id]);
    await connection.execute(`DELETE vd FROM AI_VEHICLE_DRIVER vd 
      JOIN AI_VEHICLE v ON vd.vehicle_id = v.vehicle_id
      JOIN AI_AUTO_INSURANCE_POLICY p ON v.auto_policy_id = p.auto_policy_id
      WHERE p.customer_id = ?`, [id]);
    await connection.execute(`DELETE v FROM AI_VEHICLE v
      JOIN AI_AUTO_INSURANCE_POLICY p ON v.auto_policy_id = p.auto_policy_id
      WHERE p.customer_id = ?`, [id]);
    await connection.execute('DELETE FROM AI_AUTO_INSURANCE_POLICY WHERE customer_id = ?', [id]);
    await connection.execute('UPDATE AI_USERS SET customer_id = NULL WHERE customer_id = ?', [id]);
    await connection.execute('DELETE FROM AI_CUSTOMER WHERE customer_id = ?', [id]);
    await connection.commit();
    return NextResponse.json({ success: true });
  } catch (err) {
    await connection.rollback();
    console.error(err);
    return NextResponse.json({ error: 'Delete failed' }, { status: 500 });
  } finally {
    connection.release();
  }
}
