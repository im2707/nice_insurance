-- =====================================================
-- NICE Insurance Database - Oracle Compatible Sample Data
-- Course: CS-GY 6083 - B, Spring 2026
-- Team: Anurag & Ibrahim (AI)
-- Run AFTER AI_Oracle_DDL.sql
-- =====================================================

-- =====================================================
-- AI_CUSTOMER (25 records)
-- NOTE: Do NOT include customer_id - it is auto-generated
-- =====================================================
INSERT INTO AI_CUSTOMER (first_name, middle_name, last_name, street_address, city, state, zip_code, gender, marital_status, customer_type, email, phone, date_created) VALUES ('John', 'Michael', 'Smith', '123 Main St', 'New York', 'NY', '10001', 'M', 'M', 'AH', 'john.smith@email.com', '212-555-0101', DATE '2024-01-15');
INSERT INTO AI_CUSTOMER (first_name, middle_name, last_name, street_address, city, state, zip_code, gender, marital_status, customer_type, email, phone, date_created) VALUES ('Sarah', 'Ann', 'Johnson', '456 Oak Ave', 'Los Angeles', 'CA', '90001', 'F', 'S', 'H', 'sarah.johnson@email.com', '310-555-0102', DATE '2024-01-20');
INSERT INTO AI_CUSTOMER (first_name, middle_name, last_name, street_address, city, state, zip_code, gender, marital_status, customer_type, email, phone, date_created) VALUES ('Michael', 'James', 'Williams', '789 Pine Rd', 'Chicago', 'IL', '60601', 'M', 'M', 'A', 'michael.williams@email.com', '312-555-0103', DATE '2024-02-01');
INSERT INTO AI_CUSTOMER (first_name, middle_name, last_name, street_address, city, state, zip_code, gender, marital_status, customer_type, email, phone, date_created) VALUES ('Emily', 'Rose', 'Brown', '321 Elm St', 'Houston', 'TX', '77001', 'F', 'S', 'AH', 'emily.brown@email.com', '713-555-0104', DATE '2024-02-10');
INSERT INTO AI_CUSTOMER (first_name, middle_name, last_name, street_address, city, state, zip_code, gender, marital_status, customer_type, email, phone, date_created) VALUES ('David', 'Robert', 'Davis', '654 Maple Dr', 'Phoenix', 'AZ', '85001', 'M', 'W', 'H', 'david.davis@email.com', '602-555-0105', DATE '2024-02-15');
INSERT INTO AI_CUSTOMER (first_name, middle_name, last_name, street_address, city, state, zip_code, gender, marital_status, customer_type, email, phone, date_created) VALUES ('Jennifer', 'Lynn', 'Miller', '987 Cedar Ln', 'Philadelphia', 'PA', '19101', 'F', 'M', 'A', 'jennifer.miller@email.com', '215-555-0106', DATE '2024-03-01');
INSERT INTO AI_CUSTOMER (first_name, middle_name, last_name, street_address, city, state, zip_code, gender, marital_status, customer_type, email, phone, date_created) VALUES ('Robert', 'Thomas', 'Wilson', '147 Birch Ct', 'San Antonio', 'TX', '78201', 'M', 'M', 'AH', 'robert.wilson@email.com', '210-555-0107', DATE '2024-03-05');
INSERT INTO AI_CUSTOMER (first_name, middle_name, last_name, street_address, city, state, zip_code, gender, marital_status, customer_type, email, phone, date_created) VALUES ('Jessica', 'Marie', 'Moore', '258 Spruce Way', 'San Diego', 'CA', '92101', 'F', 'S', 'H', 'jessica.moore@email.com', '619-555-0108', DATE '2024-03-10');
INSERT INTO AI_CUSTOMER (first_name, middle_name, last_name, street_address, city, state, zip_code, gender, marital_status, customer_type, email, phone, date_created) VALUES ('William', 'Charles', 'Taylor', '369 Ash Blvd', 'Dallas', 'TX', '75201', 'M', 'M', 'A', 'william.taylor@email.com', '214-555-0109', DATE '2024-03-15');
INSERT INTO AI_CUSTOMER (first_name, middle_name, last_name, street_address, city, state, zip_code, gender, marital_status, customer_type, email, phone, date_created) VALUES ('Amanda', 'Grace', 'Anderson', '741 Walnut St', 'San Jose', 'CA', '95101', 'F', 'W', 'AH', 'amanda.anderson@email.com', '408-555-0110', DATE '2024-04-01');
INSERT INTO AI_CUSTOMER (first_name, middle_name, last_name, street_address, city, state, zip_code, gender, marital_status, customer_type, email, phone, date_created) VALUES ('Christopher', 'Lee', 'Thomas', '852 Poplar Ave', 'Austin', 'TX', '73301', 'M', 'S', 'H', 'christopher.thomas@email.com', '512-555-0111', DATE '2024-04-05');
INSERT INTO AI_CUSTOMER (first_name, middle_name, last_name, street_address, city, state, zip_code, gender, marital_status, customer_type, email, phone, date_created) VALUES ('Ashley', 'Nicole', 'Jackson', '963 Hickory Rd', 'Jacksonville', 'FL', '32099', 'F', 'M', 'A', 'ashley.jackson@email.com', '904-555-0112', DATE '2024-04-10');
INSERT INTO AI_CUSTOMER (first_name, middle_name, last_name, street_address, city, state, zip_code, gender, marital_status, customer_type, email, phone, date_created) VALUES ('Daniel', 'Joseph', 'White', '159 Sycamore Dr', 'Fort Worth', 'TX', '76101', 'M', 'M', 'AH', 'daniel.white@email.com', '817-555-0113', DATE '2024-04-15');
INSERT INTO AI_CUSTOMER (first_name, middle_name, last_name, street_address, city, state, zip_code, gender, marital_status, customer_type, email, phone, date_created) VALUES ('Michelle', 'Elizabeth', 'Harris', '357 Willow Ln', 'Columbus', 'OH', '43004', 'F', 'S', 'H', 'michelle.harris@email.com', '614-555-0114', DATE '2024-05-01');
INSERT INTO AI_CUSTOMER (first_name, middle_name, last_name, street_address, city, state, zip_code, gender, marital_status, customer_type, email, phone, date_created) VALUES ('Matthew', 'David', 'Martin', '486 Redwood Ct', 'Charlotte', 'NC', '28201', NULL, 'M', 'A', 'matthew.martin@email.com', '704-555-0115', DATE '2024-05-05');
INSERT INTO AI_CUSTOMER (first_name, middle_name, last_name, street_address, city, state, zip_code, gender, marital_status, customer_type, email, phone, date_created) VALUES ('Stephanie', 'Ann', 'Thompson', '597 Magnolia Way', 'San Francisco', 'CA', '94101', 'F', 'W', 'AH', 'stephanie.thompson@email.com', '415-555-0116', DATE '2024-05-10');
INSERT INTO AI_CUSTOMER (first_name, middle_name, last_name, street_address, city, state, zip_code, gender, marital_status, customer_type, email, phone, date_created) VALUES ('Joshua', 'William', 'Garcia', '608 Dogwood St', 'Indianapolis', 'IN', '46201', 'M', 'S', 'H', 'joshua.garcia@email.com', '317-555-0117', DATE '2024-05-15');
INSERT INTO AI_CUSTOMER (first_name, middle_name, last_name, street_address, city, state, zip_code, gender, marital_status, customer_type, email, phone, date_created) VALUES ('Lauren', 'Michelle', 'Martinez', '719 Juniper Ave', 'Seattle', 'WA', '98101', 'F', 'M', 'A', 'lauren.martinez@email.com', '206-555-0118', DATE '2024-06-01');
INSERT INTO AI_CUSTOMER (first_name, middle_name, last_name, street_address, city, state, zip_code, gender, marital_status, customer_type, email, phone, date_created) VALUES ('Andrew', 'Scott', 'Robinson', '820 Fir Rd', 'Denver', 'CO', '80201', 'M', 'M', 'AH', 'andrew.robinson@email.com', '303-555-0119', DATE '2024-06-05');
INSERT INTO AI_CUSTOMER (first_name, middle_name, last_name, street_address, city, state, zip_code, gender, marital_status, customer_type, email, phone, date_created) VALUES ('Megan', 'Taylor', 'Clark', '931 Hemlock Dr', 'Washington', 'DC', '20001', 'F', 'S', 'H', 'megan.clark@email.com', '202-555-0120', DATE '2024-06-10');
INSERT INTO AI_CUSTOMER (first_name, middle_name, last_name, street_address, city, state, zip_code, gender, marital_status, customer_type, email, phone, date_created) VALUES ('Ryan', 'Patrick', 'Rodriguez', '142 Beech Ln', 'Boston', 'MA', '02101', NULL, 'W', 'A', 'ryan.rodriguez@email.com', '617-555-0121', DATE '2024-06-15');
INSERT INTO AI_CUSTOMER (first_name, middle_name, last_name, street_address, city, state, zip_code, gender, marital_status, customer_type, email, phone, date_created) VALUES ('Nicole', 'Christine', 'Lewis', '253 Cypress Ct', 'El Paso', 'TX', '79901', 'F', 'M', 'AH', 'nicole.lewis@email.com', '915-555-0122', DATE '2024-07-01');
INSERT INTO AI_CUSTOMER (first_name, middle_name, last_name, street_address, city, state, zip_code, gender, marital_status, customer_type, email, phone, date_created) VALUES ('Kevin', 'James', 'Lee', '364 Aspen Way', 'Nashville', 'TN', '37201', 'M', 'S', 'H', 'kevin.lee@email.com', '615-555-0123', DATE '2024-07-05');
INSERT INTO AI_CUSTOMER (first_name, middle_name, last_name, street_address, city, state, zip_code, gender, marital_status, customer_type, email, phone, date_created) VALUES ('Rachel', 'Lynn', 'Walker', '475 Sequoia Blvd', 'Detroit', 'MI', '48201', 'F', 'M', 'A', 'rachel.walker@email.com', '313-555-0124', DATE '2024-07-10');
INSERT INTO AI_CUSTOMER (first_name, middle_name, last_name, street_address, city, state, zip_code, gender, marital_status, customer_type, email, phone, date_created) VALUES ('Brandon', 'Michael', 'Hall', '586 Cottonwood St', 'Portland', 'OR', '97201', 'M', 'S', 'AH', 'brandon.hall@email.com', '503-555-0125', DATE '2024-07-15');
COMMIT;

-- =====================================================
-- AI_HOME_INSURANCE_POLICY (15 records)
-- =====================================================
INSERT INTO AI_HOME_INSURANCE_POLICY (customer_id, policy_number, policy_start_date, policy_end_date, premium_amount, policy_status, date_created) VALUES (1, 'HOM-2024-0001', DATE '2024-01-15', DATE '2025-01-14', 1250.00, 'C', DATE '2024-01-15');
INSERT INTO AI_HOME_INSURANCE_POLICY (customer_id, policy_number, policy_start_date, policy_end_date, premium_amount, policy_status, date_created) VALUES (2, 'HOM-2024-0002', DATE '2024-01-20', DATE '2025-01-19', 980.50, 'C', DATE '2024-01-20');
INSERT INTO AI_HOME_INSURANCE_POLICY (customer_id, policy_number, policy_start_date, policy_end_date, premium_amount, policy_status, date_created) VALUES (4, 'HOM-2024-0003', DATE '2024-02-10', DATE '2025-02-09', 1450.75, 'C', DATE '2024-02-10');
INSERT INTO AI_HOME_INSURANCE_POLICY (customer_id, policy_number, policy_start_date, policy_end_date, premium_amount, policy_status, date_created) VALUES (5, 'HOM-2024-0004', DATE '2024-02-15', DATE '2025-02-14', 875.25, 'C', DATE '2024-02-15');
INSERT INTO AI_HOME_INSURANCE_POLICY (customer_id, policy_number, policy_start_date, policy_end_date, premium_amount, policy_status, date_created) VALUES (7, 'HOM-2024-0005', DATE '2024-03-05', DATE '2025-03-04', 1680.00, 'C', DATE '2024-03-05');
INSERT INTO AI_HOME_INSURANCE_POLICY (customer_id, policy_number, policy_start_date, policy_end_date, premium_amount, policy_status, date_created) VALUES (8, 'HOM-2024-0006', DATE '2024-03-10', DATE '2025-03-09', 1125.50, 'C', DATE '2024-03-10');
INSERT INTO AI_HOME_INSURANCE_POLICY (customer_id, policy_number, policy_start_date, policy_end_date, premium_amount, policy_status, date_created) VALUES (10, 'HOM-2024-0007', DATE '2024-04-01', DATE '2025-03-31', 1350.00, 'C', DATE '2024-04-01');
INSERT INTO AI_HOME_INSURANCE_POLICY (customer_id, policy_number, policy_start_date, policy_end_date, premium_amount, policy_status, date_created) VALUES (11, 'HOM-2024-0008', DATE '2024-04-05', DATE '2025-04-04', 950.75, 'C', DATE '2024-04-05');
INSERT INTO AI_HOME_INSURANCE_POLICY (customer_id, policy_number, policy_start_date, policy_end_date, premium_amount, policy_status, date_created) VALUES (13, 'HOM-2024-0009', DATE '2024-04-15', DATE '2025-04-14', 1580.25, 'C', DATE '2024-04-15');
INSERT INTO AI_HOME_INSURANCE_POLICY (customer_id, policy_number, policy_start_date, policy_end_date, premium_amount, policy_status, date_created) VALUES (14, 'HOM-2024-0010', DATE '2024-05-01', DATE '2025-04-30', 1050.00, 'C', DATE '2024-05-01');
INSERT INTO AI_HOME_INSURANCE_POLICY (customer_id, policy_number, policy_start_date, policy_end_date, premium_amount, policy_status, date_created) VALUES (16, 'HOM-2024-0011', DATE '2024-05-10', DATE '2025-05-09', 1425.50, 'C', DATE '2024-05-10');
INSERT INTO AI_HOME_INSURANCE_POLICY (customer_id, policy_number, policy_start_date, policy_end_date, premium_amount, policy_status, date_created) VALUES (17, 'HOM-2024-0012', DATE '2024-05-15', DATE '2025-05-14', 890.00, 'C', DATE '2024-05-15');
INSERT INTO AI_HOME_INSURANCE_POLICY (customer_id, policy_number, policy_start_date, policy_end_date, premium_amount, policy_status, date_created) VALUES (20, 'HOM-2024-0013', DATE '2024-06-10', DATE '2025-06-09', 1275.75, 'C', DATE '2024-06-10');
INSERT INTO AI_HOME_INSURANCE_POLICY (customer_id, policy_number, policy_start_date, policy_end_date, premium_amount, policy_status, date_created) VALUES (22, 'HOM-2023-0014', DATE '2023-07-01', DATE '2024-06-30', 1180.00, 'E', DATE '2023-07-01');
INSERT INTO AI_HOME_INSURANCE_POLICY (customer_id, policy_number, policy_start_date, policy_end_date, premium_amount, policy_status, date_created) VALUES (23, 'HOM-2024-0015', DATE '2024-07-05', DATE '2025-07-04', 965.50, 'C', DATE '2024-07-05');
COMMIT;

-- =====================================================
-- AI_HOME (20 records)
-- =====================================================
INSERT INTO AI_HOME (home_policy_id, property_address, city, state, zip_code, purchase_date, purchase_value, home_area_sqft, home_type, auto_fire_notification, home_security_system, swimming_pool, basement) VALUES (1, '123 Main St', 'New York', 'NY', '10001', DATE '2020-03-15', 450000.00, 2200, 'S', 1, 1, NULL, 1);
INSERT INTO AI_HOME (home_policy_id, property_address, city, state, zip_code, purchase_date, purchase_value, home_area_sqft, home_type, auto_fire_notification, home_security_system, swimming_pool, basement) VALUES (2, '456 Oak Ave', 'Los Angeles', 'CA', '90001', DATE '2021-05-20', 675000.00, 2800, 'S', 1, 1, 'O', 0);
INSERT INTO AI_HOME (home_policy_id, property_address, city, state, zip_code, purchase_date, purchase_value, home_area_sqft, home_type, auto_fire_notification, home_security_system, swimming_pool, basement) VALUES (3, '789 Pine Rd Apt 3B', 'Chicago', 'IL', '60601', DATE '2022-01-10', 285000.00, 1400, 'C', 1, 0, NULL, 0);
INSERT INTO AI_HOME (home_policy_id, property_address, city, state, zip_code, purchase_date, purchase_value, home_area_sqft, home_type, auto_fire_notification, home_security_system, swimming_pool, basement) VALUES (4, '654 Maple Dr', 'Phoenix', 'AZ', '85001', DATE '2019-08-22', 325000.00, 1850, 'S', 0, 1, 'U', 1);
INSERT INTO AI_HOME (home_policy_id, property_address, city, state, zip_code, purchase_date, purchase_value, home_area_sqft, home_type, auto_fire_notification, home_security_system, swimming_pool, basement) VALUES (5, '987 Cedar Ln', 'San Antonio', 'TX', '78201', DATE '2023-02-14', 550000.00, 3200, 'S', 1, 1, 'I', 1);
INSERT INTO AI_HOME (home_policy_id, property_address, city, state, zip_code, purchase_date, purchase_value, home_area_sqft, home_type, auto_fire_notification, home_security_system, swimming_pool, basement) VALUES (5, '988 Cedar Ln Unit B', 'San Antonio', 'TX', '78201', DATE '2023-02-14', 275000.00, 1600, 'T', 1, 1, NULL, 0);
INSERT INTO AI_HOME (home_policy_id, property_address, city, state, zip_code, purchase_date, purchase_value, home_area_sqft, home_type, auto_fire_notification, home_security_system, swimming_pool, basement) VALUES (6, '258 Spruce Way', 'San Diego', 'CA', '92101', DATE '2020-11-30', 720000.00, 2950, 'S', 1, 1, 'O', 0);
INSERT INTO AI_HOME (home_policy_id, property_address, city, state, zip_code, purchase_date, purchase_value, home_area_sqft, home_type, auto_fire_notification, home_security_system, swimming_pool, basement) VALUES (7, '741 Walnut St', 'San Jose', 'CA', '95101', DATE '2021-07-18', 890000.00, 3500, 'S', 1, 1, 'M', 1);
INSERT INTO AI_HOME (home_policy_id, property_address, city, state, zip_code, purchase_date, purchase_value, home_area_sqft, home_type, auto_fire_notification, home_security_system, swimming_pool, basement) VALUES (8, '852 Poplar Ave', 'Austin', 'TX', '73301', DATE '2022-04-05', 425000.00, 2100, 'S', 1, 0, NULL, 1);
INSERT INTO AI_HOME (home_policy_id, property_address, city, state, zip_code, purchase_date, purchase_value, home_area_sqft, home_type, auto_fire_notification, home_security_system, swimming_pool, basement) VALUES (9, '963 Hickory Rd', 'Fort Worth', 'TX', '76101', DATE '2023-06-12', 480000.00, 2650, 'S', 1, 1, 'U', 1);
INSERT INTO AI_HOME (home_policy_id, property_address, city, state, zip_code, purchase_date, purchase_value, home_area_sqft, home_type, auto_fire_notification, home_security_system, swimming_pool, basement) VALUES (10, '357 Willow Ln', 'Columbus', 'OH', '43004', DATE '2021-09-25', 310000.00, 1950, 'S', 0, 1, NULL, 1);
INSERT INTO AI_HOME (home_policy_id, property_address, city, state, zip_code, purchase_date, purchase_value, home_area_sqft, home_type, auto_fire_notification, home_security_system, swimming_pool, basement) VALUES (11, '597 Magnolia Way', 'San Francisco', 'CA', '94101', DATE '2020-12-08', 1250000.00, 3800, 'S', 1, 1, 'I', 0);
INSERT INTO AI_HOME (home_policy_id, property_address, city, state, zip_code, purchase_date, purchase_value, home_area_sqft, home_type, auto_fire_notification, home_security_system, swimming_pool, basement) VALUES (12, '608 Dogwood St', 'Indianapolis', 'IN', '46201', DATE '2022-03-17', 245000.00, 1650, 'S', 1, 0, NULL, 1);
INSERT INTO AI_HOME (home_policy_id, property_address, city, state, zip_code, purchase_date, purchase_value, home_area_sqft, home_type, auto_fire_notification, home_security_system, swimming_pool, basement) VALUES (13, '820 Fir Rd', 'Denver', 'CO', '80201', DATE '2023-01-22', 565000.00, 2850, 'S', 1, 1, 'O', 1);
INSERT INTO AI_HOME (home_policy_id, property_address, city, state, zip_code, purchase_date, purchase_value, home_area_sqft, home_type, auto_fire_notification, home_security_system, swimming_pool, basement) VALUES (14, '931 Hemlock Dr', 'Washington', 'DC', '20001', DATE '2021-05-30', 625000.00, 2750, 'T', 1, 1, NULL, 0);
INSERT INTO AI_HOME (home_policy_id, property_address, city, state, zip_code, purchase_date, purchase_value, home_area_sqft, home_type, auto_fire_notification, home_security_system, swimming_pool, basement) VALUES (15, '253 Cypress Ct', 'El Paso', 'TX', '79901', DATE '2022-08-14', 295000.00, 1800, 'S', 0, 0, NULL, 1);
INSERT INTO AI_HOME (home_policy_id, property_address, city, state, zip_code, purchase_date, purchase_value, home_area_sqft, home_type, auto_fire_notification, home_security_system, swimming_pool, basement) VALUES (15, '254 Cypress Ct', 'El Paso', 'TX', '79901', DATE '2022-08-14', 185000.00, 1200, 'C', 1, 0, NULL, 0);
INSERT INTO AI_HOME (home_policy_id, property_address, city, state, zip_code, purchase_date, purchase_value, home_area_sqft, home_type, auto_fire_notification, home_security_system, swimming_pool, basement) VALUES (1, '125 Main St Unit 2', 'New York', 'NY', '10001', DATE '2021-06-10', 380000.00, 1850, 'C', 1, 1, NULL, 0);
INSERT INTO AI_HOME (home_policy_id, property_address, city, state, zip_code, purchase_date, purchase_value, home_area_sqft, home_type, auto_fire_notification, home_security_system, swimming_pool, basement) VALUES (3, '791 Pine Rd', 'Chicago', 'IL', '60601', DATE '2023-03-20', 195000.00, 1100, 'C', 1, 0, NULL, 0);
INSERT INTO AI_HOME (home_policy_id, property_address, city, state, zip_code, purchase_date, purchase_value, home_area_sqft, home_type, auto_fire_notification, home_security_system, swimming_pool, basement) VALUES (7, '743 Walnut St', 'San Jose', 'CA', '95101', DATE '2022-09-05', 425000.00, 1950, 'T', 1, 1, NULL, 0);
COMMIT;

-- =====================================================
-- AI_HOME_INVOICE (30 records)
-- =====================================================
INSERT INTO AI_HOME_INVOICE (home_policy_id, invoice_number, invoice_date, payment_due_date, invoice_amount, amount_paid, invoice_status) VALUES (1,'HINV-2024-0001',DATE '2024-01-15',DATE '2024-02-15',312.50,312.50,'PAID');
INSERT INTO AI_HOME_INVOICE (home_policy_id, invoice_number, invoice_date, payment_due_date, invoice_amount, amount_paid, invoice_status) VALUES (1,'HINV-2024-0002',DATE '2024-04-15',DATE '2024-05-15',312.50,312.50,'PAID');
INSERT INTO AI_HOME_INVOICE (home_policy_id, invoice_number, invoice_date, payment_due_date, invoice_amount, amount_paid, invoice_status) VALUES (1,'HINV-2024-0003',DATE '2024-07-15',DATE '2024-08-15',312.50,150.00,'PARTIAL');
INSERT INTO AI_HOME_INVOICE (home_policy_id, invoice_number, invoice_date, payment_due_date, invoice_amount, amount_paid, invoice_status) VALUES (1,'HINV-2024-0004',DATE '2024-10-15',DATE '2024-11-15',312.50,0,'PENDING');
INSERT INTO AI_HOME_INVOICE (home_policy_id, invoice_number, invoice_date, payment_due_date, invoice_amount, amount_paid, invoice_status) VALUES (2,'HINV-2024-0005',DATE '2024-01-20',DATE '2024-02-20',245.13,245.13,'PAID');
INSERT INTO AI_HOME_INVOICE (home_policy_id, invoice_number, invoice_date, payment_due_date, invoice_amount, amount_paid, invoice_status) VALUES (2,'HINV-2024-0006',DATE '2024-04-20',DATE '2024-05-20',245.13,245.13,'PAID');
INSERT INTO AI_HOME_INVOICE (home_policy_id, invoice_number, invoice_date, payment_due_date, invoice_amount, amount_paid, invoice_status) VALUES (2,'HINV-2024-0007',DATE '2024-07-20',DATE '2024-08-20',245.13,0,'PENDING');
INSERT INTO AI_HOME_INVOICE (home_policy_id, invoice_number, invoice_date, payment_due_date, invoice_amount, amount_paid, invoice_status) VALUES (3,'HINV-2024-0008',DATE '2024-02-10',DATE '2024-03-10',362.69,362.69,'PAID');
INSERT INTO AI_HOME_INVOICE (home_policy_id, invoice_number, invoice_date, payment_due_date, invoice_amount, amount_paid, invoice_status) VALUES (3,'HINV-2024-0009',DATE '2024-05-10',DATE '2024-06-10',362.69,362.69,'PAID');
INSERT INTO AI_HOME_INVOICE (home_policy_id, invoice_number, invoice_date, payment_due_date, invoice_amount, amount_paid, invoice_status) VALUES (3,'HINV-2024-0010',DATE '2024-08-10',DATE '2024-09-10',362.69,0,'PENDING');
INSERT INTO AI_HOME_INVOICE (home_policy_id, invoice_number, invoice_date, payment_due_date, invoice_amount, amount_paid, invoice_status) VALUES (4,'HINV-2024-0011',DATE '2024-02-15',DATE '2024-03-15',218.81,218.81,'PAID');
INSERT INTO AI_HOME_INVOICE (home_policy_id, invoice_number, invoice_date, payment_due_date, invoice_amount, amount_paid, invoice_status) VALUES (4,'HINV-2024-0012',DATE '2024-05-15',DATE '2024-06-15',218.81,100.00,'PARTIAL');
INSERT INTO AI_HOME_INVOICE (home_policy_id, invoice_number, invoice_date, payment_due_date, invoice_amount, amount_paid, invoice_status) VALUES (5,'HINV-2024-0013',DATE '2024-03-05',DATE '2024-04-05',420.00,420.00,'PAID');
INSERT INTO AI_HOME_INVOICE (home_policy_id, invoice_number, invoice_date, payment_due_date, invoice_amount, amount_paid, invoice_status) VALUES (5,'HINV-2024-0014',DATE '2024-06-05',DATE '2024-07-05',420.00,420.00,'PAID');
INSERT INTO AI_HOME_INVOICE (home_policy_id, invoice_number, invoice_date, payment_due_date, invoice_amount, amount_paid, invoice_status) VALUES (6,'HINV-2024-0015',DATE '2024-03-10',DATE '2024-04-10',281.38,281.38,'PAID');
INSERT INTO AI_HOME_INVOICE (home_policy_id, invoice_number, invoice_date, payment_due_date, invoice_amount, amount_paid, invoice_status) VALUES (6,'HINV-2024-0016',DATE '2024-06-10',DATE '2024-07-10',281.38,0,'PENDING');
INSERT INTO AI_HOME_INVOICE (home_policy_id, invoice_number, invoice_date, payment_due_date, invoice_amount, amount_paid, invoice_status) VALUES (7,'HINV-2024-0017',DATE '2024-04-01',DATE '2024-05-01',337.50,337.50,'PAID');
INSERT INTO AI_HOME_INVOICE (home_policy_id, invoice_number, invoice_date, payment_due_date, invoice_amount, amount_paid, invoice_status) VALUES (7,'HINV-2024-0018',DATE '2024-07-01',DATE '2024-08-01',337.50,337.50,'PAID');
INSERT INTO AI_HOME_INVOICE (home_policy_id, invoice_number, invoice_date, payment_due_date, invoice_amount, amount_paid, invoice_status) VALUES (8,'HINV-2024-0019',DATE '2024-04-05',DATE '2024-05-05',237.69,237.69,'PAID');
INSERT INTO AI_HOME_INVOICE (home_policy_id, invoice_number, invoice_date, payment_due_date, invoice_amount, amount_paid, invoice_status) VALUES (9,'HINV-2024-0020',DATE '2024-04-15',DATE '2024-05-15',395.06,395.06,'PAID');
INSERT INTO AI_HOME_INVOICE (home_policy_id, invoice_number, invoice_date, payment_due_date, invoice_amount, amount_paid, invoice_status) VALUES (9,'HINV-2024-0021',DATE '2024-07-15',DATE '2024-08-15',395.06,200.00,'PARTIAL');
INSERT INTO AI_HOME_INVOICE (home_policy_id, invoice_number, invoice_date, payment_due_date, invoice_amount, amount_paid, invoice_status) VALUES (10,'HINV-2024-0022',DATE '2024-05-01',DATE '2024-06-01',262.50,262.50,'PAID');
INSERT INTO AI_HOME_INVOICE (home_policy_id, invoice_number, invoice_date, payment_due_date, invoice_amount, amount_paid, invoice_status) VALUES (11,'HINV-2024-0023',DATE '2024-05-10',DATE '2024-06-10',356.38,356.38,'PAID');
INSERT INTO AI_HOME_INVOICE (home_policy_id, invoice_number, invoice_date, payment_due_date, invoice_amount, amount_paid, invoice_status) VALUES (12,'HINV-2024-0024',DATE '2024-05-15',DATE '2024-06-15',222.50,222.50,'PAID');
INSERT INTO AI_HOME_INVOICE (home_policy_id, invoice_number, invoice_date, payment_due_date, invoice_amount, amount_paid, invoice_status) VALUES (13,'HINV-2024-0025',DATE '2024-06-10',DATE '2024-07-10',318.94,318.94,'PAID');
INSERT INTO AI_HOME_INVOICE (home_policy_id, invoice_number, invoice_date, payment_due_date, invoice_amount, amount_paid, invoice_status) VALUES (14,'HINV-2023-0026',DATE '2023-07-01',DATE '2023-08-01',295.00,295.00,'PAID');
INSERT INTO AI_HOME_INVOICE (home_policy_id, invoice_number, invoice_date, payment_due_date, invoice_amount, amount_paid, invoice_status) VALUES (14,'HINV-2023-0027',DATE '2023-10-01',DATE '2023-11-01',295.00,295.00,'PAID');
INSERT INTO AI_HOME_INVOICE (home_policy_id, invoice_number, invoice_date, payment_due_date, invoice_amount, amount_paid, invoice_status) VALUES (14,'HINV-2024-0028',DATE '2024-01-01',DATE '2024-02-01',295.00,295.00,'PAID');
INSERT INTO AI_HOME_INVOICE (home_policy_id, invoice_number, invoice_date, payment_due_date, invoice_amount, amount_paid, invoice_status) VALUES (14,'HINV-2024-0029',DATE '2024-04-01',DATE '2024-05-01',295.00,0,'OVERDUE');
INSERT INTO AI_HOME_INVOICE (home_policy_id, invoice_number, invoice_date, payment_due_date, invoice_amount, amount_paid, invoice_status) VALUES (15,'HINV-2024-0030',DATE '2024-07-05',DATE '2024-08-05',241.38,241.38,'PAID');
COMMIT;

-- =====================================================
-- AI_HOME_PAYMENT (25 records)
-- =====================================================
INSERT INTO AI_HOME_PAYMENT (home_invoice_id, payment_date, payment_amount, payment_method, transaction_id) VALUES (1, DATE '2024-01-20', 312.50, 'Credit', 'TXN-HP-001');
INSERT INTO AI_HOME_PAYMENT (home_invoice_id, payment_date, payment_amount, payment_method, transaction_id) VALUES (2, DATE '2024-04-20', 312.50, 'Credit', 'TXN-HP-002');
INSERT INTO AI_HOME_PAYMENT (home_invoice_id, payment_date, payment_amount, payment_method, transaction_id) VALUES (3, DATE '2024-07-20', 150.00, 'Debit', 'TXN-HP-003');
INSERT INTO AI_HOME_PAYMENT (home_invoice_id, payment_date, payment_amount, payment_method, transaction_id) VALUES (5, DATE '2024-01-25', 245.13, 'PayPal', 'TXN-HP-004');
INSERT INTO AI_HOME_PAYMENT (home_invoice_id, payment_date, payment_amount, payment_method, transaction_id) VALUES (6, DATE '2024-04-25', 245.13, 'PayPal', 'TXN-HP-005');
INSERT INTO AI_HOME_PAYMENT (home_invoice_id, payment_date, payment_amount, payment_method, transaction_id) VALUES (8, DATE '2024-02-15', 362.69, 'Check', 'TXN-HP-006');
INSERT INTO AI_HOME_PAYMENT (home_invoice_id, payment_date, payment_amount, payment_method, transaction_id) VALUES (9, DATE '2024-05-15', 362.69, 'Check', 'TXN-HP-007');
INSERT INTO AI_HOME_PAYMENT (home_invoice_id, payment_date, payment_amount, payment_method, transaction_id) VALUES (11, DATE '2024-02-20', 218.81, 'Credit', 'TXN-HP-008');
INSERT INTO AI_HOME_PAYMENT (home_invoice_id, payment_date, payment_amount, payment_method, transaction_id) VALUES (12, DATE '2024-05-20', 100.00, 'Debit', 'TXN-HP-009');
INSERT INTO AI_HOME_PAYMENT (home_invoice_id, payment_date, payment_amount, payment_method, transaction_id) VALUES (13, DATE '2024-03-10', 420.00, 'Credit', 'TXN-HP-010');
INSERT INTO AI_HOME_PAYMENT (home_invoice_id, payment_date, payment_amount, payment_method, transaction_id) VALUES (14, DATE '2024-06-10', 420.00, 'Credit', 'TXN-HP-011');
INSERT INTO AI_HOME_PAYMENT (home_invoice_id, payment_date, payment_amount, payment_method, transaction_id) VALUES (15, DATE '2024-03-15', 281.38, 'PayPal', 'TXN-HP-012');
INSERT INTO AI_HOME_PAYMENT (home_invoice_id, payment_date, payment_amount, payment_method, transaction_id) VALUES (17, DATE '2024-04-06', 337.50, 'Debit', 'TXN-HP-013');
INSERT INTO AI_HOME_PAYMENT (home_invoice_id, payment_date, payment_amount, payment_method, transaction_id) VALUES (18, DATE '2024-07-06', 337.50, 'Debit', 'TXN-HP-014');
INSERT INTO AI_HOME_PAYMENT (home_invoice_id, payment_date, payment_amount, payment_method, transaction_id) VALUES (19, DATE '2024-04-10', 237.69, 'Check', 'TXN-HP-015');
INSERT INTO AI_HOME_PAYMENT (home_invoice_id, payment_date, payment_amount, payment_method, transaction_id) VALUES (20, DATE '2024-04-20', 395.06, 'Credit', 'TXN-HP-016');
INSERT INTO AI_HOME_PAYMENT (home_invoice_id, payment_date, payment_amount, payment_method, transaction_id) VALUES (21, DATE '2024-07-20', 200.00, 'Credit', 'TXN-HP-017');
INSERT INTO AI_HOME_PAYMENT (home_invoice_id, payment_date, payment_amount, payment_method, transaction_id) VALUES (22, DATE '2024-05-06', 262.50, 'PayPal', 'TXN-HP-018');
INSERT INTO AI_HOME_PAYMENT (home_invoice_id, payment_date, payment_amount, payment_method, transaction_id) VALUES (23, DATE '2024-05-15', 356.38, 'Credit', 'TXN-HP-019');
INSERT INTO AI_HOME_PAYMENT (home_invoice_id, payment_date, payment_amount, payment_method, transaction_id) VALUES (24, DATE '2024-05-20', 222.50, 'Debit', 'TXN-HP-020');
INSERT INTO AI_HOME_PAYMENT (home_invoice_id, payment_date, payment_amount, payment_method, transaction_id) VALUES (25, DATE '2024-06-15', 318.94, 'Check', 'TXN-HP-021');
INSERT INTO AI_HOME_PAYMENT (home_invoice_id, payment_date, payment_amount, payment_method, transaction_id) VALUES (26, DATE '2023-07-06', 295.00, 'Credit', 'TXN-HP-022');
INSERT INTO AI_HOME_PAYMENT (home_invoice_id, payment_date, payment_amount, payment_method, transaction_id) VALUES (27, DATE '2023-10-06', 295.00, 'Credit', 'TXN-HP-023');
INSERT INTO AI_HOME_PAYMENT (home_invoice_id, payment_date, payment_amount, payment_method, transaction_id) VALUES (28, DATE '2024-01-06', 295.00, 'Credit', 'TXN-HP-024');
INSERT INTO AI_HOME_PAYMENT (home_invoice_id, payment_date, payment_amount, payment_method, transaction_id) VALUES (30, DATE '2024-07-10', 241.38, 'PayPal', 'TXN-HP-025');
COMMIT;

-- =====================================================
-- AI_AUTO_INSURANCE_POLICY (18 records)
-- =====================================================
INSERT INTO AI_AUTO_INSURANCE_POLICY (customer_id, policy_number, policy_start_date, policy_end_date, premium_amount, policy_status, date_created) VALUES (1,'AUT-2024-0001',DATE '2024-01-15',DATE '2025-01-14',1850.00,'C',DATE '2024-01-15');
INSERT INTO AI_AUTO_INSURANCE_POLICY (customer_id, policy_number, policy_start_date, policy_end_date, premium_amount, policy_status, date_created) VALUES (3,'AUT-2024-0002',DATE '2024-02-01',DATE '2025-01-31',1250.00,'C',DATE '2024-02-01');
INSERT INTO AI_AUTO_INSURANCE_POLICY (customer_id, policy_number, policy_start_date, policy_end_date, premium_amount, policy_status, date_created) VALUES (4,'AUT-2024-0003',DATE '2024-02-10',DATE '2025-02-09',2100.00,'C',DATE '2024-02-10');
INSERT INTO AI_AUTO_INSURANCE_POLICY (customer_id, policy_number, policy_start_date, policy_end_date, premium_amount, policy_status, date_created) VALUES (6,'AUT-2024-0004',DATE '2024-03-01',DATE '2025-02-28',980.00,'C',DATE '2024-03-01');
INSERT INTO AI_AUTO_INSURANCE_POLICY (customer_id, policy_number, policy_start_date, policy_end_date, premium_amount, policy_status, date_created) VALUES (7,'AUT-2024-0005',DATE '2024-03-05',DATE '2025-03-04',1650.00,'C',DATE '2024-03-05');
INSERT INTO AI_AUTO_INSURANCE_POLICY (customer_id, policy_number, policy_start_date, policy_end_date, premium_amount, policy_status, date_created) VALUES (9,'AUT-2024-0006',DATE '2024-03-15',DATE '2025-03-14',1420.00,'C',DATE '2024-03-15');
INSERT INTO AI_AUTO_INSURANCE_POLICY (customer_id, policy_number, policy_start_date, policy_end_date, premium_amount, policy_status, date_created) VALUES (10,'AUT-2024-0007',DATE '2024-04-01',DATE '2025-03-31',1780.00,'C',DATE '2024-04-01');
INSERT INTO AI_AUTO_INSURANCE_POLICY (customer_id, policy_number, policy_start_date, policy_end_date, premium_amount, policy_status, date_created) VALUES (12,'AUT-2024-0008',DATE '2024-04-10',DATE '2025-04-09',1150.00,'C',DATE '2024-04-10');
INSERT INTO AI_AUTO_INSURANCE_POLICY (customer_id, policy_number, policy_start_date, policy_end_date, premium_amount, policy_status, date_created) VALUES (13,'AUT-2024-0009',DATE '2024-04-15',DATE '2025-04-14',2250.00,'C',DATE '2024-04-15');
INSERT INTO AI_AUTO_INSURANCE_POLICY (customer_id, policy_number, policy_start_date, policy_end_date, premium_amount, policy_status, date_created) VALUES (15,'AUT-2024-0010',DATE '2024-05-01',DATE '2025-04-30',1380.00,'C',DATE '2024-05-01');
INSERT INTO AI_AUTO_INSURANCE_POLICY (customer_id, policy_number, policy_start_date, policy_end_date, premium_amount, policy_status, date_created) VALUES (16,'AUT-2024-0011',DATE '2024-05-10',DATE '2025-05-09',1920.00,'C',DATE '2024-05-10');
INSERT INTO AI_AUTO_INSURANCE_POLICY (customer_id, policy_number, policy_start_date, policy_end_date, premium_amount, policy_status, date_created) VALUES (18,'AUT-2024-0012',DATE '2024-06-01',DATE '2025-05-31',1560.00,'C',DATE '2024-06-01');
INSERT INTO AI_AUTO_INSURANCE_POLICY (customer_id, policy_number, policy_start_date, policy_end_date, premium_amount, policy_status, date_created) VALUES (19,'AUT-2024-0013',DATE '2024-06-05',DATE '2025-06-04',1340.00,'C',DATE '2024-06-05');
INSERT INTO AI_AUTO_INSURANCE_POLICY (customer_id, policy_number, policy_start_date, policy_end_date, premium_amount, policy_status, date_created) VALUES (21,'AUT-2024-0014',DATE '2024-06-15',DATE '2025-06-14',1690.00,'C',DATE '2024-06-15');
INSERT INTO AI_AUTO_INSURANCE_POLICY (customer_id, policy_number, policy_start_date, policy_end_date, premium_amount, policy_status, date_created) VALUES (22,'AUT-2023-0015',DATE '2023-07-01',DATE '2024-06-30',1480.00,'E',DATE '2023-07-01');
INSERT INTO AI_AUTO_INSURANCE_POLICY (customer_id, policy_number, policy_start_date, policy_end_date, premium_amount, policy_status, date_created) VALUES (22,'AUT-2024-0016',DATE '2024-07-01',DATE '2025-06-30',1550.00,'C',DATE '2024-07-01');
INSERT INTO AI_AUTO_INSURANCE_POLICY (customer_id, policy_number, policy_start_date, policy_end_date, premium_amount, policy_status, date_created) VALUES (24,'AUT-2024-0017',DATE '2024-07-10',DATE '2025-07-09',1820.00,'C',DATE '2024-07-10');
INSERT INTO AI_AUTO_INSURANCE_POLICY (customer_id, policy_number, policy_start_date, policy_end_date, premium_amount, policy_status, date_created) VALUES (25,'AUT-2024-0018',DATE '2024-07-15',DATE '2025-07-14',2100.00,'C',DATE '2024-07-15');
COMMIT;

-- =====================================================
-- AI_AUTO_INVOICE (30 records)
-- =====================================================
INSERT INTO AI_AUTO_INVOICE (auto_policy_id,invoice_number,invoice_date,payment_due_date,invoice_amount,amount_paid,invoice_status) VALUES (1,'AINV-2024-0001',DATE '2024-01-15',DATE '2024-02-15',462.50,462.50,'PAID');
INSERT INTO AI_AUTO_INVOICE (auto_policy_id,invoice_number,invoice_date,payment_due_date,invoice_amount,amount_paid,invoice_status) VALUES (1,'AINV-2024-0002',DATE '2024-04-15',DATE '2024-05-15',462.50,462.50,'PAID');
INSERT INTO AI_AUTO_INVOICE (auto_policy_id,invoice_number,invoice_date,payment_due_date,invoice_amount,amount_paid,invoice_status) VALUES (1,'AINV-2024-0003',DATE '2024-07-15',DATE '2024-08-15',462.50,200.00,'PARTIAL');
INSERT INTO AI_AUTO_INVOICE (auto_policy_id,invoice_number,invoice_date,payment_due_date,invoice_amount,amount_paid,invoice_status) VALUES (2,'AINV-2024-0004',DATE '2024-02-01',DATE '2024-03-01',312.50,312.50,'PAID');
INSERT INTO AI_AUTO_INVOICE (auto_policy_id,invoice_number,invoice_date,payment_due_date,invoice_amount,amount_paid,invoice_status) VALUES (2,'AINV-2024-0005',DATE '2024-05-01',DATE '2024-06-01',312.50,312.50,'PAID');
INSERT INTO AI_AUTO_INVOICE (auto_policy_id,invoice_number,invoice_date,payment_due_date,invoice_amount,amount_paid,invoice_status) VALUES (3,'AINV-2024-0006',DATE '2024-02-10',DATE '2024-03-10',525.00,525.00,'PAID');
INSERT INTO AI_AUTO_INVOICE (auto_policy_id,invoice_number,invoice_date,payment_due_date,invoice_amount,amount_paid,invoice_status) VALUES (3,'AINV-2024-0007',DATE '2024-05-10',DATE '2024-06-10',525.00,525.00,'PAID');
INSERT INTO AI_AUTO_INVOICE (auto_policy_id,invoice_number,invoice_date,payment_due_date,invoice_amount,amount_paid,invoice_status) VALUES (4,'AINV-2024-0008',DATE '2024-03-01',DATE '2024-04-01',245.00,245.00,'PAID');
INSERT INTO AI_AUTO_INVOICE (auto_policy_id,invoice_number,invoice_date,payment_due_date,invoice_amount,amount_paid,invoice_status) VALUES (4,'AINV-2024-0009',DATE '2024-06-01',DATE '2024-07-01',245.00,0,'PENDING');
INSERT INTO AI_AUTO_INVOICE (auto_policy_id,invoice_number,invoice_date,payment_due_date,invoice_amount,amount_paid,invoice_status) VALUES (5,'AINV-2024-0010',DATE '2024-03-05',DATE '2024-04-05',412.50,412.50,'PAID');
INSERT INTO AI_AUTO_INVOICE (auto_policy_id,invoice_number,invoice_date,payment_due_date,invoice_amount,amount_paid,invoice_status) VALUES (5,'AINV-2024-0011',DATE '2024-06-05',DATE '2024-07-05',412.50,412.50,'PAID');
INSERT INTO AI_AUTO_INVOICE (auto_policy_id,invoice_number,invoice_date,payment_due_date,invoice_amount,amount_paid,invoice_status) VALUES (6,'AINV-2024-0012',DATE '2024-03-15',DATE '2024-04-15',355.00,355.00,'PAID');
INSERT INTO AI_AUTO_INVOICE (auto_policy_id,invoice_number,invoice_date,payment_due_date,invoice_amount,amount_paid,invoice_status) VALUES (7,'AINV-2024-0013',DATE '2024-04-01',DATE '2024-05-01',445.00,445.00,'PAID');
INSERT INTO AI_AUTO_INVOICE (auto_policy_id,invoice_number,invoice_date,payment_due_date,invoice_amount,amount_paid,invoice_status) VALUES (7,'AINV-2024-0014',DATE '2024-07-01',DATE '2024-08-01',445.00,300.00,'PARTIAL');
INSERT INTO AI_AUTO_INVOICE (auto_policy_id,invoice_number,invoice_date,payment_due_date,invoice_amount,amount_paid,invoice_status) VALUES (8,'AINV-2024-0015',DATE '2024-04-10',DATE '2024-05-10',287.50,287.50,'PAID');
INSERT INTO AI_AUTO_INVOICE (auto_policy_id,invoice_number,invoice_date,payment_due_date,invoice_amount,amount_paid,invoice_status) VALUES (9,'AINV-2024-0016',DATE '2024-04-15',DATE '2024-05-15',562.50,562.50,'PAID');
INSERT INTO AI_AUTO_INVOICE (auto_policy_id,invoice_number,invoice_date,payment_due_date,invoice_amount,amount_paid,invoice_status) VALUES (9,'AINV-2024-0017',DATE '2024-07-15',DATE '2024-08-15',562.50,0,'PENDING');
INSERT INTO AI_AUTO_INVOICE (auto_policy_id,invoice_number,invoice_date,payment_due_date,invoice_amount,amount_paid,invoice_status) VALUES (10,'AINV-2024-0018',DATE '2024-05-01',DATE '2024-06-01',345.00,345.00,'PAID');
INSERT INTO AI_AUTO_INVOICE (auto_policy_id,invoice_number,invoice_date,payment_due_date,invoice_amount,amount_paid,invoice_status) VALUES (11,'AINV-2024-0019',DATE '2024-05-10',DATE '2024-06-10',480.00,480.00,'PAID');
INSERT INTO AI_AUTO_INVOICE (auto_policy_id,invoice_number,invoice_date,payment_due_date,invoice_amount,amount_paid,invoice_status) VALUES (12,'AINV-2024-0020',DATE '2024-06-01',DATE '2024-07-01',390.00,390.00,'PAID');
INSERT INTO AI_AUTO_INVOICE (auto_policy_id,invoice_number,invoice_date,payment_due_date,invoice_amount,amount_paid,invoice_status) VALUES (13,'AINV-2024-0021',DATE '2024-06-05',DATE '2024-07-05',335.00,335.00,'PAID');
INSERT INTO AI_AUTO_INVOICE (auto_policy_id,invoice_number,invoice_date,payment_due_date,invoice_amount,amount_paid,invoice_status) VALUES (14,'AINV-2024-0022',DATE '2024-06-15',DATE '2024-07-15',422.50,422.50,'PAID');
INSERT INTO AI_AUTO_INVOICE (auto_policy_id,invoice_number,invoice_date,payment_due_date,invoice_amount,amount_paid,invoice_status) VALUES (15,'AINV-2023-0023',DATE '2023-07-01',DATE '2023-08-01',370.00,370.00,'PAID');
INSERT INTO AI_AUTO_INVOICE (auto_policy_id,invoice_number,invoice_date,payment_due_date,invoice_amount,amount_paid,invoice_status) VALUES (15,'AINV-2023-0024',DATE '2023-10-01',DATE '2023-11-01',370.00,370.00,'PAID');
INSERT INTO AI_AUTO_INVOICE (auto_policy_id,invoice_number,invoice_date,payment_due_date,invoice_amount,amount_paid,invoice_status) VALUES (15,'AINV-2024-0025',DATE '2024-01-01',DATE '2024-02-01',370.00,370.00,'PAID');
INSERT INTO AI_AUTO_INVOICE (auto_policy_id,invoice_number,invoice_date,payment_due_date,invoice_amount,amount_paid,invoice_status) VALUES (16,'AINV-2024-0026',DATE '2024-07-01',DATE '2024-08-01',387.50,387.50,'PAID');
INSERT INTO AI_AUTO_INVOICE (auto_policy_id,invoice_number,invoice_date,payment_due_date,invoice_amount,amount_paid,invoice_status) VALUES (17,'AINV-2024-0027',DATE '2024-07-10',DATE '2024-08-10',455.00,0,'PENDING');
INSERT INTO AI_AUTO_INVOICE (auto_policy_id,invoice_number,invoice_date,payment_due_date,invoice_amount,amount_paid,invoice_status) VALUES (18,'AINV-2024-0028',DATE '2024-07-15',DATE '2024-08-15',525.00,525.00,'PAID');
INSERT INTO AI_AUTO_INVOICE (auto_policy_id,invoice_number,invoice_date,payment_due_date,invoice_amount,amount_paid,invoice_status) VALUES (6,'AINV-2024-0029',DATE '2024-06-15',DATE '2024-07-15',355.00,355.00,'PAID');
INSERT INTO AI_AUTO_INVOICE (auto_policy_id,invoice_number,invoice_date,payment_due_date,invoice_amount,amount_paid,invoice_status) VALUES (8,'AINV-2024-0030',DATE '2024-07-10',DATE '2024-08-10',287.50,0,'PENDING');
COMMIT;

-- =====================================================
-- AI_AUTO_PAYMENT (25 records)
-- =====================================================
INSERT INTO AI_AUTO_PAYMENT (auto_invoice_id,payment_date,payment_amount,payment_method,transaction_id) VALUES (1,DATE '2024-01-20',462.50,'Credit','TXN-AP-001');
INSERT INTO AI_AUTO_PAYMENT (auto_invoice_id,payment_date,payment_amount,payment_method,transaction_id) VALUES (2,DATE '2024-04-20',462.50,'Credit','TXN-AP-002');
INSERT INTO AI_AUTO_PAYMENT (auto_invoice_id,payment_date,payment_amount,payment_method,transaction_id) VALUES (3,DATE '2024-07-20',200.00,'Debit','TXN-AP-003');
INSERT INTO AI_AUTO_PAYMENT (auto_invoice_id,payment_date,payment_amount,payment_method,transaction_id) VALUES (4,DATE '2024-02-06',312.50,'PayPal','TXN-AP-004');
INSERT INTO AI_AUTO_PAYMENT (auto_invoice_id,payment_date,payment_amount,payment_method,transaction_id) VALUES (5,DATE '2024-05-06',312.50,'PayPal','TXN-AP-005');
INSERT INTO AI_AUTO_PAYMENT (auto_invoice_id,payment_date,payment_amount,payment_method,transaction_id) VALUES (6,DATE '2024-02-15',525.00,'Check','TXN-AP-006');
INSERT INTO AI_AUTO_PAYMENT (auto_invoice_id,payment_date,payment_amount,payment_method,transaction_id) VALUES (7,DATE '2024-05-15',525.00,'Check','TXN-AP-007');
INSERT INTO AI_AUTO_PAYMENT (auto_invoice_id,payment_date,payment_amount,payment_method,transaction_id) VALUES (8,DATE '2024-03-06',245.00,'Credit','TXN-AP-008');
INSERT INTO AI_AUTO_PAYMENT (auto_invoice_id,payment_date,payment_amount,payment_method,transaction_id) VALUES (10,DATE '2024-03-10',412.50,'Debit','TXN-AP-009');
INSERT INTO AI_AUTO_PAYMENT (auto_invoice_id,payment_date,payment_amount,payment_method,transaction_id) VALUES (11,DATE '2024-06-10',412.50,'Debit','TXN-AP-010');
INSERT INTO AI_AUTO_PAYMENT (auto_invoice_id,payment_date,payment_amount,payment_method,transaction_id) VALUES (12,DATE '2024-03-20',355.00,'Credit','TXN-AP-011');
INSERT INTO AI_AUTO_PAYMENT (auto_invoice_id,payment_date,payment_amount,payment_method,transaction_id) VALUES (13,DATE '2024-04-06',445.00,'PayPal','TXN-AP-012');
INSERT INTO AI_AUTO_PAYMENT (auto_invoice_id,payment_date,payment_amount,payment_method,transaction_id) VALUES (14,DATE '2024-07-06',300.00,'PayPal','TXN-AP-013');
INSERT INTO AI_AUTO_PAYMENT (auto_invoice_id,payment_date,payment_amount,payment_method,transaction_id) VALUES (15,DATE '2024-04-15',287.50,'Check','TXN-AP-014');
INSERT INTO AI_AUTO_PAYMENT (auto_invoice_id,payment_date,payment_amount,payment_method,transaction_id) VALUES (16,DATE '2024-04-20',562.50,'Credit','TXN-AP-015');
INSERT INTO AI_AUTO_PAYMENT (auto_invoice_id,payment_date,payment_amount,payment_method,transaction_id) VALUES (18,DATE '2024-05-06',345.00,'Debit','TXN-AP-016');
INSERT INTO AI_AUTO_PAYMENT (auto_invoice_id,payment_date,payment_amount,payment_method,transaction_id) VALUES (19,DATE '2024-05-15',480.00,'Credit','TXN-AP-017');
INSERT INTO AI_AUTO_PAYMENT (auto_invoice_id,payment_date,payment_amount,payment_method,transaction_id) VALUES (20,DATE '2024-06-06',390.00,'PayPal','TXN-AP-018');
INSERT INTO AI_AUTO_PAYMENT (auto_invoice_id,payment_date,payment_amount,payment_method,transaction_id) VALUES (21,DATE '2024-06-10',335.00,'Check','TXN-AP-019');
INSERT INTO AI_AUTO_PAYMENT (auto_invoice_id,payment_date,payment_amount,payment_method,transaction_id) VALUES (22,DATE '2024-06-20',422.50,'Credit','TXN-AP-020');
INSERT INTO AI_AUTO_PAYMENT (auto_invoice_id,payment_date,payment_amount,payment_method,transaction_id) VALUES (23,DATE '2023-07-06',370.00,'Credit','TXN-AP-021');
INSERT INTO AI_AUTO_PAYMENT (auto_invoice_id,payment_date,payment_amount,payment_method,transaction_id) VALUES (24,DATE '2023-10-06',370.00,'Credit','TXN-AP-022');
INSERT INTO AI_AUTO_PAYMENT (auto_invoice_id,payment_date,payment_amount,payment_method,transaction_id) VALUES (25,DATE '2024-01-06',370.00,'Credit','TXN-AP-023');
INSERT INTO AI_AUTO_PAYMENT (auto_invoice_id,payment_date,payment_amount,payment_method,transaction_id) VALUES (26,DATE '2024-07-06',387.50,'Debit','TXN-AP-024');
INSERT INTO AI_AUTO_PAYMENT (auto_invoice_id,payment_date,payment_amount,payment_method,transaction_id) VALUES (28,DATE '2024-07-20',525.00,'Check','TXN-AP-025');
COMMIT;

-- =====================================================
-- AI_VEHICLE (25 records)
-- =====================================================
INSERT INTO AI_VEHICLE (auto_policy_id,vin,vehicle_make,vehicle_model,vehicle_year,vehicle_status,date_added) VALUES (1,'1HGBH41JXMN109186','Honda','Accord',2021,'F',DATE '2024-01-15');
INSERT INTO AI_VEHICLE (auto_policy_id,vin,vehicle_make,vehicle_model,vehicle_year,vehicle_status,date_added) VALUES (2,'1G1ZD5ST1JF123456','Chevrolet','Malibu',2020,'O',DATE '2024-02-01');
INSERT INTO AI_VEHICLE (auto_policy_id,vin,vehicle_make,vehicle_model,vehicle_year,vehicle_status,date_added) VALUES (3,'2T1BURHE0JC234567','Toyota','Corolla',2022,'F',DATE '2024-02-10');
INSERT INTO AI_VEHICLE (auto_policy_id,vin,vehicle_make,vehicle_model,vehicle_year,vehicle_status,date_added) VALUES (4,'1FTFW1ET5DFC34567','Ford','F-150',2019,'O',DATE '2024-03-01');
INSERT INTO AI_VEHICLE (auto_policy_id,vin,vehicle_make,vehicle_model,vehicle_year,vehicle_status,date_added) VALUES (5,'3VWFE21C04M000001','Volkswagen','Jetta',2020,'L',DATE '2024-03-05');
INSERT INTO AI_VEHICLE (auto_policy_id,vin,vehicle_make,vehicle_model,vehicle_year,vehicle_status,date_added) VALUES (5,'1N4BL4BV8LC345678','Nissan','Altima',2021,'O',DATE '2024-03-05');
INSERT INTO AI_VEHICLE (auto_policy_id,vin,vehicle_make,vehicle_model,vehicle_year,vehicle_status,date_added) VALUES (6,'5YFBURHE8HP456789','Toyota','Corolla',2023,'L',DATE '2024-03-15');
INSERT INTO AI_VEHICLE (auto_policy_id,vin,vehicle_make,vehicle_model,vehicle_year,vehicle_status,date_added) VALUES (7,'1C4RJFBG8JC567890','Jeep','Grand Cherokee',2021,'F',DATE '2024-04-01');
INSERT INTO AI_VEHICLE (auto_policy_id,vin,vehicle_make,vehicle_model,vehicle_year,vehicle_status,date_added) VALUES (7,'2C3CDXBG4JH678901','Dodge','Challenger',2018,'O',DATE '2024-04-01');
INSERT INTO AI_VEHICLE (auto_policy_id,vin,vehicle_make,vehicle_model,vehicle_year,vehicle_status,date_added) VALUES (8,'WMWXP5C50HWA01234','Mini','Cooper',2021,'O',DATE '2024-04-01');
INSERT INTO AI_VEHICLE (auto_policy_id,vin,vehicle_make,vehicle_model,vehicle_year,vehicle_status,date_added) VALUES (8,'2T1BURHE8HC112345','Toyota','Corolla',2019,'O',DATE '2024-04-01');
INSERT INTO AI_VEHICLE (auto_policy_id,vin,vehicle_make,vehicle_model,vehicle_year,vehicle_status,date_added) VALUES (9,'WBA3A5C56FK223456','BMW','330i',2022,'F',DATE '2024-05-10');
INSERT INTO AI_VEHICLE (auto_policy_id,vin,vehicle_make,vehicle_model,vehicle_year,vehicle_status,date_added) VALUES (10,'1C4PJMDB8JD334567','Jeep','Cherokee',2020,'O',DATE '2024-06-01');
INSERT INTO AI_VEHICLE (auto_policy_id,vin,vehicle_make,vehicle_model,vehicle_year,vehicle_status,date_added) VALUES (11,'SALGS2SE3HA445678','Land Rover','Range Rover',2023,'L',DATE '2024-06-05');
INSERT INTO AI_VEHICLE (auto_policy_id,vin,vehicle_make,vehicle_model,vehicle_year,vehicle_status,date_added) VALUES (11,'1G1BE5SM7J7556789','Chevrolet','Cruze',2018,'O',DATE '2024-06-05');
INSERT INTO AI_VEHICLE (auto_policy_id,vin,vehicle_make,vehicle_model,vehicle_year,vehicle_status,date_added) VALUES (12,'4T1BF1FK5CU667890','Toyota','Camry',2021,'F',DATE '2024-06-15');
INSERT INTO AI_VEHICLE (auto_policy_id,vin,vehicle_make,vehicle_model,vehicle_year,vehicle_status,date_added) VALUES (13,'JTHBK1GG0H2778901','Lexus','GS',2020,'O',DATE '2023-07-01');
INSERT INTO AI_VEHICLE (auto_policy_id,vin,vehicle_make,vehicle_model,vehicle_year,vehicle_status,date_added) VALUES (14,'JTHBK1GG0H2778902','Lexus','GS',2021,'O',DATE '2024-07-01');
INSERT INTO AI_VEHICLE (auto_policy_id,vin,vehicle_make,vehicle_model,vehicle_year,vehicle_status,date_added) VALUES (15,'3GNAXUEV5KL889012','Chevrolet','Equinox',2022,'F',DATE '2024-07-10');
INSERT INTO AI_VEHICLE (auto_policy_id,vin,vehicle_make,vehicle_model,vehicle_year,vehicle_status,date_added) VALUES (16,'5UXWX7C56M0990123','BMW','X3',2023,'L',DATE '2024-07-15');
INSERT INTO AI_VEHICLE (auto_policy_id,vin,vehicle_make,vehicle_model,vehicle_year,vehicle_status,date_added) VALUES (16,'1HGCR2F72FA101234','Honda','Civic',2019,'O',DATE '2024-07-15');
INSERT INTO AI_VEHICLE (auto_policy_id,vin,vehicle_make,vehicle_model,vehicle_year,vehicle_status,date_added) VALUES (17,'3VWFE21C04M112233','Volkswagen','Passat',2021,'F',DATE '2024-07-10');
INSERT INTO AI_VEHICLE (auto_policy_id,vin,vehicle_make,vehicle_model,vehicle_year,vehicle_status,date_added) VALUES (18,'1FTFW1ET5DFC45678','Ford','F-150',2022,'O',DATE '2024-07-15');
INSERT INTO AI_VEHICLE (auto_policy_id,vin,vehicle_make,vehicle_model,vehicle_year,vehicle_status,date_added) VALUES (1,'1N4AL3AP8JC112233','Nissan','Altima',2022,'F',DATE '2024-01-15');
INSERT INTO AI_VEHICLE (auto_policy_id,vin,vehicle_make,vehicle_model,vehicle_year,vehicle_status,date_added) VALUES (5,'WAUZZZ4G8EN123344','Audi','Q5',2022,'L',DATE '2024-04-01');
COMMIT;

-- =====================================================
-- AI_DRIVER (30 records)
-- =====================================================
INSERT INTO AI_DRIVER (license_number,first_name,middle_name,last_name,date_of_birth,age,license_state,license_issue_date,license_expiry_date) VALUES ('NY-123-456-789-00','John','Michael','Smith',DATE '1975-05-15',49,'NY',DATE '2020-05-15',DATE '2028-05-15');
INSERT INTO AI_DRIVER (license_number,first_name,middle_name,last_name,date_of_birth,age,license_state,license_issue_date,license_expiry_date) VALUES ('NY-234-567-890-11','Sarah','Ann','Smith',DATE '1978-08-22',46,'NY',DATE '2021-08-22',DATE '2029-08-22');
INSERT INTO AI_DRIVER (license_number,first_name,middle_name,last_name,date_of_birth,age,license_state,license_issue_date,license_expiry_date) VALUES ('CA-345-678-901-22','Michael','James','Williams',DATE '1982-03-10',42,'CA',DATE '2019-03-10',DATE '2027-03-10');
INSERT INTO AI_DRIVER (license_number,first_name,middle_name,last_name,date_of_birth,age,license_state,license_issue_date,license_expiry_date) VALUES ('IL-456-789-012-33','Emily','Rose','Brown',DATE '1990-11-28',33,'IL',DATE '2022-11-28',DATE '2030-11-28');
INSERT INTO AI_DRIVER (license_number,first_name,middle_name,last_name,date_of_birth,age,license_state,license_issue_date,license_expiry_date) VALUES ('IL-567-890-123-44','David','Robert','Miller',DATE '1988-07-14',36,'IL',DATE '2020-07-14',DATE '2028-07-14');
INSERT INTO AI_DRIVER (license_number,first_name,middle_name,last_name,date_of_birth,age,license_state,license_issue_date,license_expiry_date) VALUES ('AZ-678-901-234-55','David','Robert','Davis',DATE '1965-01-05',59,'AZ',DATE '2018-01-05',DATE '2026-01-05');
INSERT INTO AI_DRIVER (license_number,first_name,middle_name,last_name,date_of_birth,age,license_state,license_issue_date,license_expiry_date) VALUES ('PA-789-012-345-66','Jennifer','Lynn','Miller',DATE '1985-09-19',39,'PA',DATE '2021-09-19',DATE '2029-09-19');
INSERT INTO AI_DRIVER (license_number,first_name,middle_name,last_name,date_of_birth,age,license_state,license_issue_date,license_expiry_date) VALUES ('TX-890-123-456-77','Robert','Thomas','Wilson',DATE '1980-12-30',43,'TX',DATE '2019-12-30',DATE '2027-12-30');
INSERT INTO AI_DRIVER (license_number,first_name,middle_name,last_name,date_of_birth,age,license_state,license_issue_date,license_expiry_date) VALUES ('TX-901-234-567-88','Maria','Elena','Wilson',DATE '1983-06-17',41,'TX',DATE '2020-06-17',DATE '2028-06-17');
INSERT INTO AI_DRIVER (license_number,first_name,middle_name,last_name,date_of_birth,age,license_state,license_issue_date,license_expiry_date) VALUES ('CA-012-345-678-99','Jessica','Marie','Moore',DATE '1992-04-25',32,'CA',DATE '2023-04-25',DATE '2031-04-25');
INSERT INTO AI_DRIVER (license_number,first_name,middle_name,last_name,date_of_birth,age,license_state,license_issue_date,license_expiry_date) VALUES ('TX-123-456-789-00','William','Charles','Taylor',DATE '1987-02-08',37,'TX',DATE '2022-02-08',DATE '2030-02-08');
INSERT INTO AI_DRIVER (license_number,first_name,middle_name,last_name,date_of_birth,age,license_state,license_issue_date,license_expiry_date) VALUES ('CA-234-567-890-11','Amanda','Grace','Anderson',DATE '1970-10-12',53,'CA',DATE '2017-10-12',DATE '2025-10-12');
INSERT INTO AI_DRIVER (license_number,first_name,middle_name,last_name,date_of_birth,age,license_state,license_issue_date,license_expiry_date) VALUES ('CA-345-678-902-22','Robert','James','Anderson',DATE '1969-03-28',55,'CA',DATE '2016-03-28',DATE '2024-03-28');
INSERT INTO AI_DRIVER (license_number,first_name,middle_name,last_name,date_of_birth,age,license_state,license_issue_date,license_expiry_date) VALUES ('TX-456-789-012-33','Christopher','Lee','Thomas',DATE '1995-07-21',29,'TX',DATE '2023-07-21',DATE '2031-07-21');
INSERT INTO AI_DRIVER (license_number,first_name,middle_name,last_name,date_of_birth,age,license_state,license_issue_date,license_expiry_date) VALUES ('FL-567-890-123-44','Ashley','Nicole','Jackson',DATE '1986-11-03',37,'FL',DATE '2021-11-03',DATE '2029-11-03');
INSERT INTO AI_DRIVER (license_number,first_name,middle_name,last_name,date_of_birth,age,license_state,license_issue_date,license_expiry_date) VALUES ('TX-678-901-234-55','Daniel','Joseph','White',DATE '1981-05-17',43,'TX',DATE '2020-05-17',DATE '2028-05-17');
INSERT INTO AI_DRIVER (license_number,first_name,middle_name,last_name,date_of_birth,age,license_state,license_issue_date,license_expiry_date) VALUES ('TX-789-012-345-66','Jennifer','Marie','White',DATE '1984-09-09',40,'TX',DATE '2021-09-09',DATE '2029-09-09');
INSERT INTO AI_DRIVER (license_number,first_name,middle_name,last_name,date_of_birth,age,license_state,license_issue_date,license_expiry_date) VALUES ('OH-890-123-456-77','Michelle','Elizabeth','Harris',DATE '1993-01-14',31,'OH',DATE '2023-01-14',DATE '2031-01-14');
INSERT INTO AI_DRIVER (license_number,first_name,middle_name,last_name,date_of_birth,age,license_state,license_issue_date,license_expiry_date) VALUES ('NC-901-234-567-88','Matthew','David','Martin',DATE '1979-08-26',45,'NC',DATE '2018-08-26',DATE '2026-08-26');
INSERT INTO AI_DRIVER (license_number,first_name,middle_name,last_name,date_of_birth,age,license_state,license_issue_date,license_expiry_date) VALUES ('CA-012-345-679-00','Stephanie','Ann','Thompson',DATE '1968-12-07',55,'CA',DATE '2015-12-07',DATE '2023-12-07');
INSERT INTO AI_DRIVER (license_number,first_name,middle_name,last_name,date_of_birth,age,license_state,license_issue_date,license_expiry_date) VALUES ('IN-123-456-789-11','Joshua','William','Garcia',DATE '1991-04-30',33,'IN',DATE '2022-04-30',DATE '2030-04-30');
INSERT INTO AI_DRIVER (license_number,first_name,middle_name,last_name,date_of_birth,age,license_state,license_issue_date,license_expiry_date) VALUES ('WA-234-567-890-22','Lauren','Michelle','Martinez',DATE '1989-06-18',35,'WA',DATE '2021-06-18',DATE '2029-06-18');
INSERT INTO AI_DRIVER (license_number,first_name,middle_name,last_name,date_of_birth,age,license_state,license_issue_date,license_expiry_date) VALUES ('CO-345-678-901-33','Andrew','Scott','Robinson',DATE '1983-02-23',41,'CO',DATE '2020-02-23',DATE '2028-02-23');
INSERT INTO AI_DRIVER (license_number,first_name,middle_name,last_name,date_of_birth,age,license_state,license_issue_date,license_expiry_date) VALUES ('DC-456-789-012-44','Megan','Taylor','Clark',DATE '1994-10-11',29,'DC',DATE '2023-10-11',DATE '2031-10-11');
INSERT INTO AI_DRIVER (license_number,first_name,middle_name,last_name,date_of_birth,age,license_state,license_issue_date,license_expiry_date) VALUES ('MA-567-890-123-55','Ryan','Patrick','Rodriguez',DATE '1972-07-28',52,'MA',DATE '2017-07-28',DATE '2025-07-28');
INSERT INTO AI_DRIVER (license_number,first_name,middle_name,last_name,date_of_birth,age,license_state,license_issue_date,license_expiry_date) VALUES ('TX-678-901-234-66','Nicole','Christine','Lewis',DATE '1986-03-15',38,'TX',DATE '2021-03-15',DATE '2029-03-15');
INSERT INTO AI_DRIVER (license_number,first_name,middle_name,last_name,date_of_birth,age,license_state,license_issue_date,license_expiry_date) VALUES ('TN-789-012-345-77','Kevin','James','Lee',DATE '1996-09-05',28,'TN',DATE '2023-09-05',DATE '2031-09-05');
INSERT INTO AI_DRIVER (license_number,first_name,middle_name,last_name,date_of_birth,age,license_state,license_issue_date,license_expiry_date) VALUES ('MI-890-123-456-88','Rachel','Lynn','Walker',DATE '1988-11-20',35,'MI',DATE '2022-11-20',DATE '2030-11-20');
INSERT INTO AI_DRIVER (license_number,first_name,middle_name,last_name,date_of_birth,age,license_state,license_issue_date,license_expiry_date) VALUES ('OR-901-234-567-99','Brandon','Michael','Hall',DATE '1990-01-12',34,'OR',DATE '2022-01-12',DATE '2030-01-12');
INSERT INTO AI_DRIVER (license_number,first_name,middle_name,last_name,date_of_birth,age,license_state,license_issue_date,license_expiry_date) VALUES ('NY-012-345-678-10','Lisa','Marie','Johnson',DATE '1977-05-08',47,'NY',DATE '2019-05-08',DATE '2027-05-08');
COMMIT;

-- =====================================================
-- AI_VEHICLE_DRIVER (40 records)
-- =====================================================
INSERT INTO AI_VEHICLE_DRIVER (vehicle_id,driver_id,relationship_type,date_added) VALUES (1,1,'Primary',DATE '2024-01-15');
INSERT INTO AI_VEHICLE_DRIVER (vehicle_id,driver_id,relationship_type,date_added) VALUES (1,2,'Secondary',DATE '2024-01-15');
INSERT INTO AI_VEHICLE_DRIVER (vehicle_id,driver_id,relationship_type,date_added) VALUES (24,1,'Secondary',DATE '2024-01-15');
INSERT INTO AI_VEHICLE_DRIVER (vehicle_id,driver_id,relationship_type,date_added) VALUES (24,2,'Primary',DATE '2024-01-15');
INSERT INTO AI_VEHICLE_DRIVER (vehicle_id,driver_id,relationship_type,date_added) VALUES (2,3,'Primary',DATE '2024-02-01');
INSERT INTO AI_VEHICLE_DRIVER (vehicle_id,driver_id,relationship_type,date_added) VALUES (3,4,'Primary',DATE '2024-02-10');
INSERT INTO AI_VEHICLE_DRIVER (vehicle_id,driver_id,relationship_type,date_added) VALUES (3,5,'Occasional',DATE '2024-02-10');
INSERT INTO AI_VEHICLE_DRIVER (vehicle_id,driver_id,relationship_type,date_added) VALUES (4,6,'Primary',DATE '2024-03-01');
INSERT INTO AI_VEHICLE_DRIVER (vehicle_id,driver_id,relationship_type,date_added) VALUES (5,7,'Primary',DATE '2024-03-05');
INSERT INTO AI_VEHICLE_DRIVER (vehicle_id,driver_id,relationship_type,date_added) VALUES (6,8,'Primary',DATE '2024-03-05');
INSERT INTO AI_VEHICLE_DRIVER (vehicle_id,driver_id,relationship_type,date_added) VALUES (6,9,'Secondary',DATE '2024-03-05');
INSERT INTO AI_VEHICLE_DRIVER (vehicle_id,driver_id,relationship_type,date_added) VALUES (7,10,'Primary',DATE '2024-03-15');
INSERT INTO AI_VEHICLE_DRIVER (vehicle_id,driver_id,relationship_type,date_added) VALUES (8,11,'Primary',DATE '2024-04-01');
INSERT INTO AI_VEHICLE_DRIVER (vehicle_id,driver_id,relationship_type,date_added) VALUES (8,7,'Secondary',DATE '2024-04-01');
INSERT INTO AI_VEHICLE_DRIVER (vehicle_id,driver_id,relationship_type,date_added) VALUES (9,7,'Primary',DATE '2024-04-01');
INSERT INTO AI_VEHICLE_DRIVER (vehicle_id,driver_id,relationship_type,date_added) VALUES (9,9,'Secondary',DATE '2024-04-01');
INSERT INTO AI_VEHICLE_DRIVER (vehicle_id,driver_id,relationship_type,date_added) VALUES (25,7,'Secondary',DATE '2024-04-01');
INSERT INTO AI_VEHICLE_DRIVER (vehicle_id,driver_id,relationship_type,date_added) VALUES (10,12,'Primary',DATE '2024-04-10');
INSERT INTO AI_VEHICLE_DRIVER (vehicle_id,driver_id,relationship_type,date_added) VALUES (11,13,'Primary',DATE '2024-04-15');
INSERT INTO AI_VEHICLE_DRIVER (vehicle_id,driver_id,relationship_type,date_added) VALUES (11,4,'Secondary',DATE '2024-04-15');
INSERT INTO AI_VEHICLE_DRIVER (vehicle_id,driver_id,relationship_type,date_added) VALUES (12,14,'Primary',DATE '2024-04-01');
INSERT INTO AI_VEHICLE_DRIVER (vehicle_id,driver_id,relationship_type,date_added) VALUES (13,14,'Secondary',DATE '2024-04-01');
INSERT INTO AI_VEHICLE_DRIVER (vehicle_id,driver_id,relationship_type,date_added) VALUES (13,15,'Occasional',DATE '2024-04-01');
INSERT INTO AI_VEHICLE_DRIVER (vehicle_id,driver_id,relationship_type,date_added) VALUES (14,16,'Primary',DATE '2024-05-10');
INSERT INTO AI_VEHICLE_DRIVER (vehicle_id,driver_id,relationship_type,date_added) VALUES (15,17,'Primary',DATE '2024-06-01');
INSERT INTO AI_VEHICLE_DRIVER (vehicle_id,driver_id,relationship_type,date_added) VALUES (16,18,'Primary',DATE '2024-06-05');
INSERT INTO AI_VEHICLE_DRIVER (vehicle_id,driver_id,relationship_type,date_added) VALUES (17,18,'Secondary',DATE '2024-06-05');
INSERT INTO AI_VEHICLE_DRIVER (vehicle_id,driver_id,relationship_type,date_added) VALUES (17,19,'Occasional',DATE '2024-06-05');
INSERT INTO AI_VEHICLE_DRIVER (vehicle_id,driver_id,relationship_type,date_added) VALUES (18,20,'Primary',DATE '2024-06-15');
INSERT INTO AI_VEHICLE_DRIVER (vehicle_id,driver_id,relationship_type,date_added) VALUES (19,21,'Primary',DATE '2023-07-01');
INSERT INTO AI_VEHICLE_DRIVER (vehicle_id,driver_id,relationship_type,date_added) VALUES (20,21,'Primary',DATE '2024-07-01');
INSERT INTO AI_VEHICLE_DRIVER (vehicle_id,driver_id,relationship_type,date_added) VALUES (21,22,'Primary',DATE '2024-07-10');
INSERT INTO AI_VEHICLE_DRIVER (vehicle_id,driver_id,relationship_type,date_added) VALUES (22,23,'Primary',DATE '2024-07-15');
INSERT INTO AI_VEHICLE_DRIVER (vehicle_id,driver_id,relationship_type,date_added) VALUES (23,23,'Secondary',DATE '2024-07-15');
INSERT INTO AI_VEHICLE_DRIVER (vehicle_id,driver_id,relationship_type,date_added) VALUES (23,24,'Occasional',DATE '2024-07-15');
INSERT INTO AI_VEHICLE_DRIVER (vehicle_id,driver_id,relationship_type,date_added) VALUES (2,25,'Occasional',DATE '2024-02-15');
INSERT INTO AI_VEHICLE_DRIVER (vehicle_id,driver_id,relationship_type,date_added) VALUES (10,26,'Secondary',DATE '2024-04-15');
INSERT INTO AI_VEHICLE_DRIVER (vehicle_id,driver_id,relationship_type,date_added) VALUES (15,27,'Secondary',DATE '2024-06-10');
INSERT INTO AI_VEHICLE_DRIVER (vehicle_id,driver_id,relationship_type,date_added) VALUES (21,28,'Occasional',DATE '2024-07-20');
INSERT INTO AI_VEHICLE_DRIVER (vehicle_id,driver_id,relationship_type,date_added) VALUES (1,30,'Occasional',DATE '2024-02-01');
COMMIT;

-- =====================================================
-- END OF SAMPLE DATA
-- Team: Anurag & Ibrahim (AI)
-- Course: CS-GY 6083 - B, Spring 2026
-- =====================================================
