import { NextRequest, NextResponse } from 'next/server';
import pool from '@/lib/db';
import { getUserFromRequest } from '@/lib/auth';
import { RowDataPacket, ResultSetHeader } from 'mysql2';

export async function GET(req: NextRequest) {
  const user = getUserFromRequest(req);
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const { searchParams } = new URL(req.url);
  const type = searchParams.get('type') || 'all'; // home | auto | all

  try {
    const results: { home: RowDataPacket[]; auto: RowDataPacket[] } = { home: [], auto: [] };

    if (type === 'home' || type === 'all') {
      let q = `SELECT hi.*, hp.policy_number, hp.customer_id, CONCAT(c.first_name,' ',c.last_name) as customer_name
        FROM AI_HOME_INVOICE hi 
        JOIN AI_HOME_INSURANCE_POLICY hp ON hi.home_policy_id = hp.home_policy_id
        JOIN AI_CUSTOMER c ON hp.customer_id = c.customer_id`;
      const params: (string | number)[] = [];
      if (user.role === 'customer') { q += ' WHERE hp.customer_id = ?'; params.push(user.customerId!); }
      q += ' ORDER BY hi.invoice_date DESC';
      const [rows] = await pool.execute<RowDataPacket[]>(q, params);
      results.home = rows;
    }

    if (type === 'auto' || type === 'all') {
      let q = `SELECT ai.*, ap.policy_number, ap.customer_id, CONCAT(c.first_name,' ',c.last_name) as customer_name
        FROM AI_AUTO_INVOICE ai
        JOIN AI_AUTO_INSURANCE_POLICY ap ON ai.auto_policy_id = ap.auto_policy_id
        JOIN AI_CUSTOMER c ON ap.customer_id = c.customer_id`;
      const params: (string | number)[] = [];
      if (user.role === 'customer') { q += ' WHERE ap.customer_id = ?'; params.push(user.customerId!); }
      q += ' ORDER BY ai.invoice_date DESC';
      const [rows] = await pool.execute<RowDataPacket[]>(q, params);
      results.auto = rows;
    }

    return NextResponse.json(results);
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
    const { type, policyId, invoiceDate, paymentDueDate, invoiceAmount } = await req.json();
    if (!type || !policyId || !invoiceDate || !paymentDueDate || !invoiceAmount) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }
    await connection.beginTransaction();

    if (type === 'home') {
      const [lastRow] = await connection.execute<RowDataPacket[]>(
        'SELECT home_invoice_id FROM AI_HOME_INVOICE ORDER BY home_invoice_id DESC LIMIT 1'
      );
      const nextId = lastRow.length ? lastRow[0].home_invoice_id + 1 : 1;
      const invoiceNumber = `HINV-${new Date().getFullYear()}-${String(nextId).padStart(4, '0')}`;
      const [result] = await connection.execute<ResultSetHeader>(
        `INSERT INTO AI_HOME_INVOICE (home_policy_id, invoice_number, invoice_date, payment_due_date, invoice_amount, amount_paid, invoice_status) VALUES (?, ?, ?, ?, ?, 0, 'PENDING')`,
        [policyId, invoiceNumber, invoiceDate, paymentDueDate, invoiceAmount]
      );
      await connection.commit();
      return NextResponse.json({ success: true, invoiceId: result.insertId }, { status: 201 });
    } else {
      const [lastRow] = await connection.execute<RowDataPacket[]>(
        'SELECT auto_invoice_id FROM AI_AUTO_INVOICE ORDER BY auto_invoice_id DESC LIMIT 1'
      );
      const nextId = lastRow.length ? lastRow[0].auto_invoice_id + 1 : 1;
      const invoiceNumber = `AINV-${new Date().getFullYear()}-${String(nextId).padStart(4, '0')}`;
      const [result] = await connection.execute<ResultSetHeader>(
        `INSERT INTO AI_AUTO_INVOICE (auto_policy_id, invoice_number, invoice_date, payment_due_date, invoice_amount, amount_paid, invoice_status) VALUES (?, ?, ?, ?, ?, 0, 'PENDING')`,
        [policyId, invoiceNumber, invoiceDate, paymentDueDate, invoiceAmount]
      );
      await connection.commit();
      return NextResponse.json({ success: true, invoiceId: result.insertId }, { status: 201 });
    }
  } catch (err) {
    await connection.rollback();
    console.error(err);
    return NextResponse.json({ error: 'Failed to create invoice' }, { status: 500 });
  } finally {
    connection.release();
  }
}
