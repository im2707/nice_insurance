import { NextRequest, NextResponse } from 'next/server';
import pool from '@/lib/db';
import { getUserFromRequest } from '@/lib/auth';
import { RowDataPacket, ResultSetHeader } from 'mysql2';

export async function GET(req: NextRequest) {
  const user = getUserFromRequest(req);
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const { searchParams } = new URL(req.url);
  const policyId = searchParams.get('policyId');

  try {
    let query = `SELECT v.*, ap.policy_number, c.first_name, c.last_name 
      FROM AI_VEHICLE v 
      JOIN AI_AUTO_INSURANCE_POLICY ap ON v.auto_policy_id = ap.auto_policy_id
      JOIN AI_CUSTOMER c ON ap.customer_id = c.customer_id`;
    const params: (string | number)[] = [];

    if (user.role === 'customer') {
      query += ' WHERE ap.customer_id = ?';
      params.push(user.customerId!);
    } else if (policyId) {
      query += ' WHERE v.auto_policy_id = ?';
      params.push(parseInt(policyId));
    }
    query += ' ORDER BY v.vehicle_id DESC';

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
    const { autoPolicyId, vin, vehicleMake, vehicleModel, vehicleYear, vehicleStatus } = await req.json();
    if (!autoPolicyId || !vin || !vehicleMake || !vehicleModel || !vehicleYear || !vehicleStatus) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }
    if (vin.length !== 17) return NextResponse.json({ error: 'VIN must be exactly 17 characters' }, { status: 400 });

    await connection.beginTransaction();
    const [result] = await connection.execute<ResultSetHeader>(
      `INSERT INTO AI_VEHICLE (auto_policy_id, vin, vehicle_make, vehicle_model, vehicle_year, vehicle_status, date_added) VALUES (?, ?, ?, ?, ?, ?, CURDATE())`,
      [autoPolicyId, vin.toUpperCase(), vehicleMake, vehicleModel, vehicleYear, vehicleStatus]
    );
    await connection.commit();
    return NextResponse.json({ success: true, vehicleId: result.insertId }, { status: 201 });
  } catch (err: any) {
    await connection.rollback();
    if (err.code === 'ER_DUP_ENTRY') return NextResponse.json({ error: 'VIN already exists' }, { status: 409 });
    return NextResponse.json({ error: 'Failed to add vehicle' }, { status: 500 });
  } finally {
    connection.release();
  }
}
