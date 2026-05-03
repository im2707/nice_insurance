import { NextRequest, NextResponse } from 'next/server';
import pool from '@/lib/db';
import bcrypt from 'bcryptjs';
import { signToken } from '@/lib/auth';
import { RowDataPacket } from 'mysql2';

export async function POST(req: NextRequest) {
  try {
    const { email, password } = await req.json();
    if (!email || !password) return NextResponse.json({ error: 'Email and password required' }, { status: 400 });

    const [rows] = await pool.execute<RowDataPacket[]>(
      'SELECT * FROM AI_USERS WHERE email = ? AND is_active = 1',
      [email.trim().toLowerCase()]
    );

    if (!rows.length) return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
    const user = rows[0];

    const valid = await bcrypt.compare(password, user.password_hash);
    if (!valid) return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });

    const token = signToken({
      userId: user.user_id,
      email: user.email,
      role: user.role,
      customerId: user.customer_id,
      firstName: user.first_name,
      lastName: user.last_name,
    });

    const response = NextResponse.json({ success: true, role: user.role, firstName: user.first_name });
    response.cookies.set('auth_token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 86400,
      path: '/',
    });
    return response;
  } catch (err) {
    console.error('Login error:', err);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
