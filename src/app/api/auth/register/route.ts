import { NextRequest, NextResponse } from 'next/server';
import pool from '@/lib/db';
import bcrypt from 'bcryptjs';
import { signToken } from '@/lib/auth';
import { RowDataPacket, ResultSetHeader } from 'mysql2';

export async function POST(req: NextRequest) {
  const connection = await pool.getConnection();
  try {
    const { email, password, firstName, lastName, middleName, streetAddress, city, state, zipCode, gender, maritalStatus, phone } = await req.json();

    if (!email || !password || !firstName || !lastName || !streetAddress || !city || !state || !zipCode || !maritalStatus) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    // Check email exists
    const [existing] = await connection.execute<RowDataPacket[]>(
      'SELECT user_id FROM AI_USERS WHERE email = ?', [email.trim().toLowerCase()]
    );
    if (existing.length) return NextResponse.json({ error: 'Email already registered' }, { status: 409 });

    await connection.beginTransaction();

    // Create customer record
    const [custResult] = await connection.execute<ResultSetHeader>(
      `INSERT INTO AI_CUSTOMER (first_name, middle_name, last_name, street_address, city, state, zip_code, gender, marital_status, customer_type, email, phone, date_created)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, 'H', ?, ?, CURDATE())`,
      [firstName.trim(), middleName?.trim() || null, lastName.trim(), streetAddress.trim(), city.trim(), state, zipCode.trim(),
       gender || null, maritalStatus, email.trim().toLowerCase(), phone?.trim() || null]
    );

    const customerId = custResult.insertId;
    const passwordHash = await bcrypt.hash(password, 10);

    // Create user account
    const [userResult] = await connection.execute<ResultSetHeader>(
      `INSERT INTO AI_USERS (email, password_hash, role, customer_id, first_name, last_name) VALUES (?, ?, 'customer', ?, ?, ?)`,
      [email.trim().toLowerCase(), passwordHash, customerId, firstName.trim(), lastName.trim()]
    );

    await connection.commit();

    const token = signToken({
      userId: userResult.insertId,
      email: email.trim().toLowerCase(),
      role: 'customer',
      customerId,
      firstName: firstName.trim(),
      lastName: lastName.trim(),
    });

    const response = NextResponse.json({ success: true });
    response.cookies.set('auth_token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 86400,
      path: '/',
    });
    return response;
  } catch (err) {
    await connection.rollback();
    console.error('Register error:', err);
    return NextResponse.json({ error: 'Registration failed' }, { status: 500 });
  } finally {
    connection.release();
  }
}
