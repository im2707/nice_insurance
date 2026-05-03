# NICE Insurance
**CS-GY 6083 - Principles of Database Systems - Spring 2026**
Team AI: Ibrahim Mohammed (im2707) and Anurag Kunde (ak12754)

A full-stack web application for managing auto and home insurance policies, invoices, and payments.

## Tech Stack
- Next.js 14, React 18, TypeScript, Tailwind CSS
- MySQL 8 - 11 tables, 30 CHECK constraints
- JWT authentication with bcryptjs password hashing
- Role-based access control, parameterized queries, session timeout

## Features
**Customer Portal** - view policies, track invoices, make payments, register and manage account

**Employee Dashboard** - manage customers, home and auto policies, vehicles, invoices with full CRUD operations

## Local Setup
```bash
npm install
cp .env.example .env.local
# Edit .env.local with your MySQL credentials
npm run dev
```

## Demo Credentials
| Role | Email | Password |
|---|---|---|
| Employee | admin@nice-insurance.com | password |
| Customer | customer@nice-insurance.com | password |
