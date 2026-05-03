import { NextRequest, NextResponse } from 'next/server';
import pool from '@/lib/db';
import { getUserFromRequest } from '@/lib/auth';
import { RowDataPacket } from 'mysql2';

export async function GET(req: NextRequest) {
  const user = getUserFromRequest(req);
  if (!user || user.role !== 'employee') return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const { searchParams } = new URL(req.url);
  const query = searchParams.get('q') || '1';

  try {
    let sql = '';
    let title = '';
    let purpose = '';

    if (query === '1') {
      title = 'Q1 - Customer Policy Summary (3-Table Join)';
      purpose = 'Identify all customers with their total policies and premiums for targeted marketing campaigns.';
      sql = `SELECT c.customer_id, c.first_name, c.last_name, c.email, c.city, c.state, c.customer_type,
        COUNT(DISTINCT hp.home_policy_id) AS home_policy_count,
        COUNT(DISTINCT ap.auto_policy_id) AS auto_policy_count,
        COALESCE(SUM(DISTINCT hp.premium_amount),0) AS total_home_premium,
        COALESCE(SUM(DISTINCT ap.premium_amount),0) AS total_auto_premium,
        COALESCE(SUM(DISTINCT hp.premium_amount),0) + COALESCE(SUM(DISTINCT ap.premium_amount),0) AS total_annual_premium
      FROM AI_CUSTOMER c
      LEFT JOIN AI_HOME_INSURANCE_POLICY hp ON c.customer_id = hp.customer_id AND hp.policy_status='C'
      LEFT JOIN AI_AUTO_INSURANCE_POLICY ap ON c.customer_id = ap.customer_id AND ap.policy_status='C'
      GROUP BY c.customer_id, c.first_name, c.last_name, c.email, c.city, c.state, c.customer_type
      ORDER BY total_annual_premium DESC`;
    } else if (query === '2') {
      title = 'Q2 - High-Value Customers (Multi-Row Subquery)';
      purpose = 'Find customers paying above-average total premiums for risk and pricing analysis.';
      sql = `SELECT c.customer_id, c.first_name, c.last_name, c.customer_type, c.city, c.state,
        totals.total_premium, totals.policy_count
      FROM AI_CUSTOMER c
      JOIN (
        SELECT customer_id, SUM(premium) AS total_premium, COUNT(*) AS policy_count
        FROM (
          SELECT customer_id, premium_amount AS premium FROM AI_HOME_INSURANCE_POLICY WHERE policy_status='C'
          UNION ALL
          SELECT customer_id, premium_amount FROM AI_AUTO_INSURANCE_POLICY WHERE policy_status='C'
        ) all_p GROUP BY customer_id
      ) totals ON c.customer_id = totals.customer_id
      WHERE totals.total_premium > (
        SELECT AVG(t) FROM (
          SELECT SUM(premium) AS t FROM (
            SELECT customer_id, premium_amount AS premium FROM AI_HOME_INSURANCE_POLICY WHERE policy_status='C'
            UNION ALL SELECT customer_id, premium_amount FROM AI_AUTO_INSURANCE_POLICY WHERE policy_status='C'
          ) x GROUP BY customer_id
        ) y
      )
      ORDER BY totals.total_premium DESC`;
    } else if (query === '3') {
      title = 'Q3 - Customers With Recent Policies (Correlated Subquery)';
      purpose = 'Find customers who have at least one policy created in the last 365 days for onboarding tracking.';
      sql = `SELECT c.customer_id, c.first_name, c.last_name, c.email, c.customer_type,
        (SELECT MAX(pd) FROM (
          SELECT date_created AS pd FROM AI_HOME_INSURANCE_POLICY WHERE customer_id = c.customer_id
          UNION ALL
          SELECT date_created FROM AI_AUTO_INSURANCE_POLICY WHERE customer_id = c.customer_id
        ) ip) AS latest_policy_date
      FROM AI_CUSTOMER c
      WHERE (
        SELECT COUNT(*) FROM AI_HOME_INSURANCE_POLICY hp
        WHERE hp.customer_id = c.customer_id
        AND hp.date_created >= DATE_SUB(CURDATE(), INTERVAL 365 DAY)
      ) > 0
      OR (
        SELECT COUNT(*) FROM AI_AUTO_INSURANCE_POLICY ap
        WHERE ap.customer_id = c.customer_id
        AND ap.date_created >= DATE_SUB(CURDATE(), INTERVAL 365 DAY)
      ) > 0
      ORDER BY latest_policy_date DESC`;
    } else if (query === '4') {
      title = 'Q4 - Pending & Overdue Invoices (UNION SET Operator)';
      purpose = 'Consolidated collections report across home and auto invoices for the payments team.';
      sql = `SELECT 'HOME' AS invoice_type, hi.home_invoice_id AS invoice_id, hi.invoice_number,
        c.customer_id, CONCAT(c.first_name,' ',c.last_name) AS customer_name, c.email,
        hi.invoice_date, hi.payment_due_date, hi.invoice_amount, hi.amount_paid,
        (hi.invoice_amount - hi.amount_paid) AS amount_due, hi.invoice_status,
        DATEDIFF(CURDATE(), hi.payment_due_date) AS days_overdue, hp.policy_number
      FROM AI_HOME_INVOICE hi
      JOIN AI_HOME_INSURANCE_POLICY hp ON hi.home_policy_id = hp.home_policy_id
      JOIN AI_CUSTOMER c ON hp.customer_id = c.customer_id
      WHERE hi.invoice_status IN ('PENDING','PARTIAL','OVERDUE')
      UNION ALL
      SELECT 'AUTO', ai.auto_invoice_id, ai.invoice_number,
        c.customer_id, CONCAT(c.first_name,' ',c.last_name), c.email,
        ai.invoice_date, ai.payment_due_date, ai.invoice_amount, ai.amount_paid,
        (ai.invoice_amount - ai.amount_paid), ai.invoice_status,
        DATEDIFF(CURDATE(), ai.payment_due_date), ap.policy_number
      FROM AI_AUTO_INVOICE ai
      JOIN AI_AUTO_INSURANCE_POLICY ap ON ai.auto_policy_id = ap.auto_policy_id
      JOIN AI_CUSTOMER c ON ap.customer_id = c.customer_id
      WHERE ai.invoice_status IN ('PENDING','PARTIAL','OVERDUE')
      ORDER BY days_overdue DESC, amount_due DESC`;
    } else if (query === '5') {
      title = 'Q5 - Monthly Revenue Analysis (WITH Clause)';
      purpose = 'Analyze monthly payment revenue by policy type for financial forecasting and trend analysis.';
      sql = `WITH MonthlyRevenue AS (
        SELECT DATE_FORMAT(payment_date,'%Y-%m') AS revenue_month, 'HOME' AS policy_type,
          COUNT(*) AS payment_count, SUM(payment_amount) AS monthly_revenue
        FROM AI_HOME_PAYMENT GROUP BY DATE_FORMAT(payment_date,'%Y-%m')
        UNION ALL
        SELECT DATE_FORMAT(payment_date,'%Y-%m'), 'AUTO',
          COUNT(*), SUM(payment_amount)
        FROM AI_AUTO_PAYMENT GROUP BY DATE_FORMAT(payment_date,'%Y-%m')
      )
      SELECT revenue_month,
        SUM(CASE WHEN policy_type='HOME' THEN monthly_revenue ELSE 0 END) AS home_revenue,
        SUM(CASE WHEN policy_type='AUTO' THEN monthly_revenue ELSE 0 END) AS auto_revenue,
        SUM(monthly_revenue) AS total_revenue,
        SUM(payment_count) AS total_payments,
        ROUND(SUM(CASE WHEN policy_type='HOME' THEN monthly_revenue ELSE 0 END)/SUM(monthly_revenue)*100,2) AS home_pct,
        ROUND(SUM(CASE WHEN policy_type='AUTO' THEN monthly_revenue ELSE 0 END)/SUM(monthly_revenue)*100,2) AS auto_pct
      FROM MonthlyRevenue GROUP BY revenue_month ORDER BY revenue_month DESC`;
    } else if (query === '6') {
      title = 'Q6 - Top 10 Customers by Premium (TOP-N Query)';
      purpose = 'Identify the highest-revenue customers for VIP retention programs and priority service.';
      sql = `SELECT c.customer_id, CONCAT(c.first_name,' ',c.last_name) AS customer_name,
        c.email, c.city, c.state, c.customer_type,
        COALESCE(hd.home_premium,0) AS home_premium,
        COALESCE(ad.auto_premium,0) AS auto_premium,
        COALESCE(hd.home_premium,0) + COALESCE(ad.auto_premium,0) AS total_annual_premium,
        COALESCE(hd.home_policies,0) AS home_policies,
        COALESCE(ad.auto_policies,0) AS auto_policies
      FROM AI_CUSTOMER c
      LEFT JOIN (
        SELECT customer_id, COUNT(*) AS home_policies, SUM(premium_amount) AS home_premium
        FROM AI_HOME_INSURANCE_POLICY WHERE policy_status='C' GROUP BY customer_id
      ) hd ON c.customer_id = hd.customer_id
      LEFT JOIN (
        SELECT customer_id, COUNT(*) AS auto_policies, SUM(premium_amount) AS auto_premium
        FROM AI_AUTO_INSURANCE_POLICY WHERE policy_status='C' GROUP BY customer_id
      ) ad ON c.customer_id = ad.customer_id
      WHERE COALESCE(hd.home_premium,0) + COALESCE(ad.auto_premium,0) > 0
      ORDER BY total_annual_premium DESC
      LIMIT 10`;
    } else {
      return NextResponse.json({ error: 'Invalid query number' }, { status: 400 });
    }

    const [rows] = await pool.execute<RowDataPacket[]>(sql);
    return NextResponse.json({ title, purpose, sql, results: rows, count: rows.length });
  } catch (err) {
    console.error('Query error:', err);
    return NextResponse.json({ error: 'Query failed' }, { status: 500 });
  }
}
