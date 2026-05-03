import { NextRequest, NextResponse } from 'next/server';
import pool from '@/lib/db';
import { getUserFromRequest } from '@/lib/auth';
import { RowDataPacket, ResultSetHeader } from 'mysql2';

export async function POST(req: NextRequest) {
  const user = getUserFromRequest(req);
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const connection = await pool.getConnection();
  try {
    const { type, invoiceId, paymentAmount, paymentMethod } = await req.json();
    if (!type || !invoiceId || !paymentAmount || !paymentMethod) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }
    const validMethods = ['PayPal', 'Credit', 'Debit', 'Check'];
    if (!validMethods.includes(paymentMethod)) return NextResponse.json({ error: 'Invalid payment method' }, { status: 400 });

    await connection.beginTransaction();

    if (type === 'home') {
      const [invoice] = await connection.execute<RowDataPacket[]>(
        `SELECT hi.*, hp.customer_id FROM AI_HOME_INVOICE hi 
         JOIN AI_HOME_INSURANCE_POLICY hp ON hi.home_policy_id = hp.home_policy_id
         WHERE hi.home_invoice_id = ?`, [invoiceId]
      );
      if (!invoice.length) throw new Error('Invoice not found');
      if (user.role === 'customer' && invoice[0].customer_id !== user.customerId) throw new Error('Forbidden');

      const inv = invoice[0];
      const remaining = parseFloat(inv.invoice_amount) - parseFloat(inv.amount_paid);
      const payment = Math.min(parseFloat(paymentAmount), remaining);

      const txId = `TXN-${Date.now()}`;
      await connection.execute<ResultSetHeader>(
        `INSERT INTO AI_HOME_PAYMENT (home_invoice_id, payment_date, payment_amount, payment_method, transaction_id) VALUES (?, CURDATE(), ?, ?, ?)`,
        [invoiceId, payment, paymentMethod, txId]
      );

      const newPaid = parseFloat(inv.amount_paid) + payment;
      const status = newPaid >= parseFloat(inv.invoice_amount) ? 'PAID' : 'PARTIAL';
      await connection.execute(
        'UPDATE AI_HOME_INVOICE SET amount_paid = ?, invoice_status = ? WHERE home_invoice_id = ?',
        [newPaid, status, invoiceId]
      );
    } else {
      const [invoice] = await connection.execute<RowDataPacket[]>(
        `SELECT ai.*, ap.customer_id FROM AI_AUTO_INVOICE ai 
         JOIN AI_AUTO_INSURANCE_POLICY ap ON ai.auto_policy_id = ap.auto_policy_id
         WHERE ai.auto_invoice_id = ?`, [invoiceId]
      );
      if (!invoice.length) throw new Error('Invoice not found');
      if (user.role === 'customer' && invoice[0].customer_id !== user.customerId) throw new Error('Forbidden');

      const inv = invoice[0];
      const remaining = parseFloat(inv.invoice_amount) - parseFloat(inv.amount_paid);
      const payment = Math.min(parseFloat(paymentAmount), remaining);

      const txId = `TXN-${Date.now()}`;
      await connection.execute<ResultSetHeader>(
        `INSERT INTO AI_AUTO_PAYMENT (auto_invoice_id, payment_date, payment_amount, payment_method, transaction_id) VALUES (?, CURDATE(), ?, ?, ?)`,
        [invoiceId, payment, paymentMethod, txId]
      );

      const newPaid = parseFloat(inv.amount_paid) + payment;
      const status = newPaid >= parseFloat(inv.invoice_amount) ? 'PAID' : 'PARTIAL';
      await connection.execute(
        'UPDATE AI_AUTO_INVOICE SET amount_paid = ?, invoice_status = ? WHERE auto_invoice_id = ?',
        [newPaid, status, invoiceId]
      );
    }

    await connection.commit();
    return NextResponse.json({ success: true });
  } catch (err: any) {
    await connection.rollback();
    if (err.message === 'Forbidden') return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    console.error(err);
    return NextResponse.json({ error: 'Payment failed' }, { status: 500 });
  } finally {
    connection.release();
  }
}

export async function GET(req: NextRequest) {
  const user = getUserFromRequest(req);
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  try {
    const homeQ = user.role === 'customer'
      ? `SELECT hp.*, 'HOME' as type, hi.invoice_number, hi.invoice_amount FROM AI_HOME_PAYMENT hp 
         JOIN AI_HOME_INVOICE hi ON hp.home_invoice_id = hi.home_invoice_id
         JOIN AI_HOME_INSURANCE_POLICY p ON hi.home_policy_id = p.home_policy_id
         WHERE p.customer_id = ? ORDER BY hp.payment_date DESC LIMIT 20`
      : `SELECT hp.*, 'HOME' as type, hi.invoice_number, hi.invoice_amount FROM AI_HOME_PAYMENT hp 
         JOIN AI_HOME_INVOICE hi ON hp.home_invoice_id = hi.home_invoice_id
         ORDER BY hp.payment_date DESC LIMIT 30`;

    const autoQ = user.role === 'customer'
      ? `SELECT ap.*, 'AUTO' as type, ai.invoice_number, ai.invoice_amount FROM AI_AUTO_PAYMENT ap 
         JOIN AI_AUTO_INVOICE ai ON ap.auto_invoice_id = ai.auto_invoice_id
         JOIN AI_AUTO_INSURANCE_POLICY p ON ai.auto_policy_id = p.auto_policy_id
         WHERE p.customer_id = ? ORDER BY ap.payment_date DESC LIMIT 20`
      : `SELECT ap.*, 'AUTO' as type, ai.invoice_number, ai.invoice_amount FROM AI_AUTO_PAYMENT ap 
         JOIN AI_AUTO_INVOICE ai ON ap.auto_invoice_id = ai.auto_invoice_id
         ORDER BY ap.payment_date DESC LIMIT 30`;

    const params = user.role === 'customer' ? [user.customerId] : [];
    const [homeRows] = await pool.execute<RowDataPacket[]>(homeQ, params);
    const [autoRows] = await pool.execute<RowDataPacket[]>(autoQ, params);

    return NextResponse.json({ home: homeRows, auto: autoRows });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: 'Database error' }, { status: 500 });
  }
}
