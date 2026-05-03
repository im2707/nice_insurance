import { NextRequest, NextResponse } from 'next/server';
import pool from '@/lib/db';
import { getUserFromRequest } from '@/lib/auth';
import { RowDataPacket } from 'mysql2';

export async function GET(req: NextRequest) {
  const user = getUserFromRequest(req);
  if (!user || user.role !== 'employee') return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  try {
    const [[cust]] = await pool.execute<RowDataPacket[]>('SELECT COUNT(*) as count FROM AI_CUSTOMER');
    const [[homeP]] = await pool.execute<RowDataPacket[]>("SELECT COUNT(*) as count FROM AI_HOME_INSURANCE_POLICY WHERE policy_status='C'");
    const [[autoP]] = await pool.execute<RowDataPacket[]>("SELECT COUNT(*) as count FROM AI_AUTO_INSURANCE_POLICY WHERE policy_status='C'");
    const [[pendInv]] = await pool.execute<RowDataPacket[]>(`
      SELECT SUM(c) as count FROM (
        SELECT COUNT(*) as c FROM AI_HOME_INVOICE WHERE invoice_status='PENDING'
        UNION ALL SELECT COUNT(*) FROM AI_AUTO_INVOICE WHERE invoice_status='PENDING'
      ) t`);
    const [[revenue]] = await pool.execute<RowDataPacket[]>(`
      SELECT SUM(r) as total FROM (
        SELECT SUM(payment_amount) as r FROM AI_HOME_PAYMENT WHERE MONTH(payment_date)=MONTH(CURDATE()) AND YEAR(payment_date)=YEAR(CURDATE())
        UNION ALL SELECT SUM(payment_amount) FROM AI_AUTO_PAYMENT WHERE MONTH(payment_date)=MONTH(CURDATE()) AND YEAR(payment_date)=YEAR(CURDATE())
      ) t`);

    return NextResponse.json({
      customers: cust.count,
      homePolicies: homeP.count,
      autoPolicies: autoP.count,
      pendingInvoices: pendInv.count || 0,
      monthlyRevenue: revenue.total || 0,
    });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: 'Database error' }, { status: 500 });
  }
}
