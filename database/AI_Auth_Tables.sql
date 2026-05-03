-- =====================================================
-- NICE Insurance - Authentication Tables
-- Team AI (Anurag Kunde & Ibrahim Mohammed)
-- CS-GY 6083, Spring 2026
-- Run: mysql -u root -p nice_insurance_ai < database/AI_Auth_Tables.sql
-- =====================================================

USE nice_insurance_ai;

DROP TABLE IF EXISTS AI_USER_SESSIONS;
DROP TABLE IF EXISTS AI_USERS;

CREATE TABLE AI_USERS (
    user_id       INT AUTO_INCREMENT,
    email         VARCHAR(100)  NOT NULL UNIQUE,
    password_hash VARCHAR(255)  NOT NULL,
    role          VARCHAR(10)   NOT NULL,
    customer_id   INT           NULL,
    first_name    VARCHAR(50)   NOT NULL,
    last_name     VARCHAR(50)   NOT NULL,
    is_active     TINYINT(1)    NOT NULL DEFAULT 1,
    created_at    DATETIME      NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT pk_users          PRIMARY KEY (user_id),
    CONSTRAINT uk_users_email    UNIQUE (email),
    CONSTRAINT chk_users_role    CHECK (role IN ('customer', 'employee')),
    CONSTRAINT fk_users_customer FOREIGN KEY (customer_id)
        REFERENCES AI_CUSTOMER(customer_id)
        ON DELETE SET NULL
        ON UPDATE CASCADE
) COMMENT='User accounts for web application authentication';

-- Employee / Admin account  (password: "password")
INSERT INTO AI_USERS (email, password_hash, role, first_name, last_name) VALUES (
    'admin@nice-insurance.com',
    '$2b$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi',
    'employee', 'Admin', 'User'
);

-- Demo customer account linked to customer_id=1  (password: "password")
INSERT INTO AI_USERS (email, password_hash, role, customer_id, first_name, last_name) VALUES (
    'customer@nice-insurance.com',
    '$2b$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi',
    'customer', 1, 'Demo', 'Customer'
);

SELECT user_id, email, role, customer_id, first_name, last_name, is_active FROM AI_USERS;
-- Credentials:
--   Employee : admin@nice-insurance.com  / password
--   Customer : customer@nice-insurance.com / password  (links to AI_CUSTOMER.customer_id=1)
