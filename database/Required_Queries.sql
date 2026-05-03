-- =====================================================
-- NICE Insurance - 6 Required SQL Queries
-- CS-GY 6083 Project Part II
-- Team: AI (Anurag & Ibrahim)
-- =====================================================

USE nice_insurance_ai;

-- =====================================================
-- QUERY 1: Table Joins with at least 3 tables
-- =====================================================
-- Business Purpose: Generate comprehensive customer policy summary showing
-- all customers with their total number of policies, total premium amounts,
-- and contact information for targeted marketing campaigns.
--
-- This helps the business identify high-value customers and those who might
-- benefit from bundling discounts (customers with both auto and home insurance).

SELECT 
    c.customer_id,
    c.first_name,
    c.last_name,
    c.email,
    c.phone,
    c.city,
    c.state,
    c.customer_type,
    COUNT(DISTINCT hp.home_policy_id) as home_policy_count,
    COUNT(DISTINCT ap.auto_policy_id) as auto_policy_count,
    COALESCE(SUM(DISTINCT hp.premium_amount), 0) as total_home_premium,
    COALESCE(SUM(DISTINCT ap.premium_amount), 0) as total_auto_premium,
    COALESCE(SUM(DISTINCT hp.premium_amount), 0) + 
    COALESCE(SUM(DISTINCT ap.premium_amount), 0) as total_annual_premium
FROM AI_CUSTOMER c
LEFT JOIN AI_HOME_INSURANCE_POLICY hp 
    ON c.customer_id = hp.customer_id AND hp.policy_status = 'C'
LEFT JOIN AI_AUTO_INSURANCE_POLICY ap 
    ON c.customer_id = ap.customer_id AND ap.policy_status = 'C'
GROUP BY 
    c.customer_id, c.first_name, c.last_name, c.email, 
    c.phone, c.city, c.state, c.customer_type
ORDER BY total_annual_premium DESC;

-- Expected Output: List of all customers with their policy counts and premium totals
-- Use Case: Marketing department identifying VIP customers for retention programs


-- =====================================================
-- QUERY 2: Multi-row Subquery
-- =====================================================
-- Business Purpose: Identify high-value customers who pay above-average premiums
-- for risk assessment and premium pricing analysis.
--
-- This helps determine if current pricing is competitive and identifies
-- customers who might be overpaying (churn risk) or underpaying (profit opportunity).

SELECT 
    c.customer_id,
    c.first_name,
    c.last_name,
    c.customer_type,
    c.city,
    c.state,
    total_premiums.total_premium,
    total_premiums.policy_count
FROM AI_CUSTOMER c
JOIN (
    SELECT 
        customer_id,
        SUM(premium) as total_premium,
        COUNT(*) as policy_count
    FROM (
        SELECT customer_id, premium_amount as premium 
        FROM AI_HOME_INSURANCE_POLICY 
        WHERE policy_status = 'C'
        UNION ALL
        SELECT customer_id, premium_amount 
        FROM AI_AUTO_INSURANCE_POLICY 
        WHERE policy_status = 'C'
    ) all_policies
    GROUP BY customer_id
) total_premiums ON c.customer_id = total_premiums.customer_id
WHERE total_premiums.total_premium > (
    SELECT AVG(total_premium)
    FROM (
        SELECT 
            customer_id,
            SUM(premium) as total_premium
        FROM (
            SELECT customer_id, premium_amount as premium 
            FROM AI_HOME_INSURANCE_POLICY 
            WHERE policy_status = 'C'
            UNION ALL
            SELECT customer_id, premium_amount 
            FROM AI_AUTO_INSURANCE_POLICY 
            WHERE policy_status = 'C'
        ) all_policies
        GROUP BY customer_id
    ) avg_calc
)
ORDER BY total_premiums.total_premium DESC;

-- Expected Output: Customers paying above-average premiums
-- Use Case: Risk assessment and premium competitiveness analysis


-- =====================================================
-- QUERY 3: Correlated Subquery
-- =====================================================
-- Business Purpose: Find customers whose most recent policy was created in the
-- last 6 months - useful for new customer onboarding tracking and retention analysis.
--
-- This helps identify which customers are new vs established, enabling
-- targeted communication strategies for each group.

SELECT 
    c.customer_id,
    c.first_name,
    c.last_name,
    c.email,
    c.customer_type,
    most_recent.latest_policy_date,
    DATEDIFF(CURDATE(), most_recent.latest_policy_date) as days_since_last_policy
FROM AI_CUSTOMER c
JOIN (
    SELECT customer_id, MAX(policy_date) as latest_policy_date
    FROM (
        SELECT customer_id, date_created as policy_date 
        FROM AI_HOME_INSURANCE_POLICY
        UNION ALL
        SELECT customer_id, date_created 
        FROM AI_AUTO_INSURANCE_POLICY
    ) all_policy_dates
    GROUP BY customer_id
) most_recent ON c.customer_id = most_recent.customer_id
WHERE most_recent.latest_policy_date = (
    SELECT MAX(policy_date)
    FROM (
        SELECT customer_id as cid, date_created as policy_date 
        FROM AI_HOME_INSURANCE_POLICY
        WHERE customer_id = c.customer_id
        UNION ALL
        SELECT customer_id, date_created 
        FROM AI_AUTO_INSURANCE_POLICY
        WHERE customer_id = c.customer_id
    ) inner_policies
)
AND DATEDIFF(CURDATE(), most_recent.latest_policy_date) <= 180
ORDER BY most_recent.latest_policy_date DESC;

-- Expected Output: Customers with policies created in last 6 months
-- Use Case: New customer onboarding tracking and welcome campaign targeting


-- =====================================================
-- QUERY 4: SET Operator Query (UNION/INTERSECT/EXCEPT)
-- =====================================================
-- Business Purpose: Consolidate all pending, partial, and overdue invoices
-- across both home and auto insurance to create a unified collections report.
--
-- This enables the collections team to prioritize follow-ups and identify
-- customers needing payment reminders or payment plan discussions.

SELECT 
    'HOME' as invoice_type,
    hi.home_invoice_id as invoice_id,
    hi.invoice_number,
    c.customer_id,
    CONCAT(c.first_name, ' ', c.last_name) as customer_name,
    c.email,
    c.phone,
    hi.invoice_date,
    hi.payment_due_date,
    hi.invoice_amount,
    hi.amount_paid,
    (hi.invoice_amount - hi.amount_paid) as amount_due,
    hi.invoice_status,
    DATEDIFF(CURDATE(), hi.payment_due_date) as days_overdue,
    hp.policy_number
FROM AI_HOME_INVOICE hi
JOIN AI_HOME_INSURANCE_POLICY hp ON hi.home_policy_id = hp.home_policy_id
JOIN AI_CUSTOMER c ON hp.customer_id = c.customer_id
WHERE hi.invoice_status IN ('PENDING', 'PARTIAL', 'OVERDUE')

UNION ALL

SELECT 
    'AUTO' as invoice_type,
    ai.auto_invoice_id as invoice_id,
    ai.invoice_number,
    c.customer_id,
    CONCAT(c.first_name, ' ', c.last_name) as customer_name,
    c.email,
    c.phone,
    ai.invoice_date,
    ai.payment_due_date,
    ai.invoice_amount,
    ai.amount_paid,
    (ai.invoice_amount - ai.amount_paid) as amount_due,
    ai.invoice_status,
    DATEDIFF(CURDATE(), ai.payment_due_date) as days_overdue,
    ap.policy_number
FROM AI_AUTO_INVOICE ai
JOIN AI_AUTO_INSURANCE_POLICY ap ON ai.auto_policy_id = ap.auto_policy_id
JOIN AI_CUSTOMER c ON ap.customer_id = c.customer_id
WHERE ai.invoice_status IN ('PENDING', 'PARTIAL', 'OVERDUE')

ORDER BY days_overdue DESC, amount_due DESC;

-- Expected Output: All unpaid/partially paid invoices from both insurance types
-- Use Case: Collections team priority list for payment follow-ups


-- =====================================================
-- QUERY 5: Query with Inline View or WITH Clause
-- =====================================================
-- Business Purpose: Analyze monthly revenue trends by policy type to identify
-- seasonal patterns and forecast future revenue.
--
-- This helps finance team with budgeting, identifies slow months that might
-- need marketing campaigns, and tracks year-over-year growth.

WITH MonthlyRevenue AS (
    -- Home policy monthly revenue
    SELECT 
        DATE_FORMAT(hp.payment_date, '%Y-%m') as revenue_month,
        'HOME' as policy_type,
        COUNT(DISTINCT hp.home_payment_id) as payment_count,
        SUM(hp.payment_amount) as monthly_revenue
    FROM AI_HOME_PAYMENT hp
    GROUP BY DATE_FORMAT(hp.payment_date, '%Y-%m')
    
    UNION ALL
    
    -- Auto policy monthly revenue
    SELECT 
        DATE_FORMAT(ap.payment_date, '%Y-%m') as revenue_month,
        'AUTO' as policy_type,
        COUNT(DISTINCT ap.auto_payment_id) as payment_count,
        SUM(ap.payment_amount) as monthly_revenue
    FROM AI_AUTO_PAYMENT ap
    GROUP BY DATE_FORMAT(ap.payment_date, '%Y-%m')
),
MonthlyTotals AS (
    SELECT 
        revenue_month,
        SUM(CASE WHEN policy_type = 'HOME' THEN monthly_revenue ELSE 0 END) as home_revenue,
        SUM(CASE WHEN policy_type = 'AUTO' THEN monthly_revenue ELSE 0 END) as auto_revenue,
        SUM(monthly_revenue) as total_revenue,
        SUM(payment_count) as total_payments
    FROM MonthlyRevenue
    GROUP BY revenue_month
)
SELECT 
    revenue_month,
    home_revenue,
    auto_revenue,
    total_revenue,
    total_payments,
    ROUND((home_revenue / total_revenue * 100), 2) as home_pct,
    ROUND((auto_revenue / total_revenue * 100), 2) as auto_pct,
    ROUND(total_revenue / total_payments, 2) as avg_payment_amount
FROM MonthlyTotals
ORDER BY revenue_month DESC;

-- Expected Output: Monthly revenue breakdown by policy type with percentages
-- Use Case: Financial forecasting and seasonal trend analysis


-- =====================================================
-- QUERY 6: TOP-N / BOTTOM-N Query
-- =====================================================
-- Business Purpose: Identify top 10 customers by total premium to focus
-- retention efforts on highest-value accounts and provide VIP treatment.
--
-- These are the customers who generate the most revenue and would be
-- most costly to lose, deserving priority customer service and perks.

SELECT 
    c.customer_id,
    CONCAT(c.first_name, ' ', c.last_name) as customer_name,
    c.email,
    c.phone,
    c.city,
    c.state,
    c.customer_type,
    c.marital_status,
    COALESCE(home_data.home_policies, 0) as home_policies,
    COALESCE(home_data.homes_covered, 0) as homes_covered,
    COALESCE(home_data.home_premium, 0) as home_premium,
    COALESCE(auto_data.auto_policies, 0) as auto_policies,
    COALESCE(auto_data.vehicles_covered, 0) as vehicles_covered,
    COALESCE(auto_data.auto_premium, 0) as auto_premium,
    COALESCE(home_data.home_premium, 0) + COALESCE(auto_data.auto_premium, 0) as total_annual_premium,
    COALESCE(home_data.home_policies, 0) + COALESCE(auto_data.auto_policies, 0) as total_policies
FROM AI_CUSTOMER c
LEFT JOIN (
    SELECT 
        customer_id,
        COUNT(DISTINCT home_policy_id) as home_policies,
        SUM(premium_amount) as home_premium,
        (SELECT COUNT(*) FROM AI_HOME h WHERE h.home_policy_id IN (
            SELECT home_policy_id FROM AI_HOME_INSURANCE_POLICY 
            WHERE customer_id = hp.customer_id
        )) as homes_covered
    FROM AI_HOME_INSURANCE_POLICY hp
    WHERE policy_status = 'C'
    GROUP BY customer_id
) home_data ON c.customer_id = home_data.customer_id
LEFT JOIN (
    SELECT 
        customer_id,
        COUNT(DISTINCT auto_policy_id) as auto_policies,
        SUM(premium_amount) as auto_premium,
        (SELECT COUNT(*) FROM AI_VEHICLE v WHERE v.auto_policy_id IN (
            SELECT auto_policy_id FROM AI_AUTO_INSURANCE_POLICY 
            WHERE customer_id = ap.customer_id
        )) as vehicles_covered
    FROM AI_AUTO_INSURANCE_POLICY ap
    WHERE policy_status = 'C'
    GROUP BY customer_id
) auto_data ON c.customer_id = auto_data.customer_id
WHERE COALESCE(home_data.home_premium, 0) + COALESCE(auto_data.auto_premium, 0) > 0
ORDER BY total_annual_premium DESC
LIMIT 10;

-- Expected Output: Top 10 highest-paying customers with full details
-- Use Case: VIP customer identification for retention and loyalty programs


-- =====================================================
-- BONUS QUERY: Customer Lifetime Value Analysis
-- =====================================================
-- Business Purpose: Calculate total revenue generated by each customer
-- including all payments made to date for profitability analysis.

SELECT 
    c.customer_id,
    CONCAT(c.first_name, ' ', c.last_name) as customer_name,
    c.customer_type,
    DATE_FORMAT(c.date_created, '%Y-%m-%d') as customer_since,
    COALESCE(home_payments.total_paid, 0) as home_payments_lifetime,
    COALESCE(auto_payments.total_paid, 0) as auto_payments_lifetime,
    COALESCE(home_payments.total_paid, 0) + COALESCE(auto_payments.total_paid, 0) as total_lifetime_value,
    COALESCE(home_payments.payment_count, 0) + COALESCE(auto_payments.payment_count, 0) as total_payment_count
FROM AI_CUSTOMER c
LEFT JOIN (
    SELECT 
        hp.customer_id,
        SUM(hpay.payment_amount) as total_paid,
        COUNT(hpay.home_payment_id) as payment_count
    FROM AI_HOME_PAYMENT hpay
    JOIN AI_HOME_INVOICE hi ON hpay.home_invoice_id = hi.home_invoice_id
    JOIN AI_HOME_INSURANCE_POLICY hp ON hi.home_policy_id = hp.home_policy_id
    GROUP BY hp.customer_id
) home_payments ON c.customer_id = home_payments.customer_id
LEFT JOIN (
    SELECT 
        ap.customer_id,
        SUM(apay.payment_amount) as total_paid,
        COUNT(apay.auto_payment_id) as payment_count
    FROM AI_AUTO_PAYMENT apay
    JOIN AI_AUTO_INVOICE ai ON apay.auto_invoice_id = ai.auto_invoice_id
    JOIN AI_AUTO_INSURANCE_POLICY ap ON ai.auto_policy_id = ap.auto_policy_id
    GROUP BY ap.customer_id
) auto_payments ON c.customer_id = auto_payments.customer_id
WHERE COALESCE(home_payments.total_paid, 0) + COALESCE(auto_payments.total_paid, 0) > 0
ORDER BY total_lifetime_value DESC;

-- Expected Output: Customer lifetime value ranking
-- Use Case: Understanding most profitable customers and payment patterns


-- =====================================================
-- END OF REQUIRED QUERIES
-- =====================================================

-- INSTRUCTIONS FOR REPORT:
-- 1. Run each query in MySQL Workbench or command line
-- 2. Take a screenshot of the results
-- 3. For each query in your report, include:
--    A1) The SQL query code (copy from above)
--    A2) Screenshot of results
--    A3) The business purpose (copy from comments above)
-- =====================================================
