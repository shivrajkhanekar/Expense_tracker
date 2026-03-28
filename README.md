# SpendSync - Expense Tracker

A modern, full-stack Expense Tracker built with Next.js App Router, Tailwind CSS, Prisma, and PostgreSQL. It features full CRUD operations, user authentication (JWT), dynamic dashboard charts with Recharts, CSV exports, dark mode context, and a clean beautiful UI.

## Features

- **Authentication System:** Secure JWT-based login/signup with Next.js Middleware route protection.
- **Dashboard Overview:** Displays total balance, income, expenses, and visualizes data using interactive charts.
- **Transaction Management:** Add, edit, delete, and list transactions seamlessly.
- **Filtering & Search:** Easily find specific transactions by month, category, or search term.
- **CSV Export:** Generate and download monthly CSV reports of your transactions.
- **Modern UI:** Built with Tailwind CSS, supporting out-of-the-box Dark Mode and responsive design.

## Tech Stack

- **Frontend:** Next.js (App Router), TypeScript, Tailwind CSS, Recharts, Lucide Icons, Date-fns.
- **Backend:** Next.js API Routes (Edge-compatible JWT via `jose`), bcrypt.
- **Database:** PostgreSQL, Prisma ORM.

## Setup Instructions

### 1. Clone the repository and install dependencies

```bash
npm install
```

### 2. Configure Environment Variables

Create a `.env` file in the root directory and add your PostgreSQL connection string and a secure JWT secret:

```bash
# Duplicate .env.example into .env
cp .env.example .env
```

Update your `.env` with actual values:

```env
DATABASE_URL="postgresql://user:password@localhost:5432/expense_tracker?schema=public"
JWT_SECRET="your_super_secret_jwt_key_here"
```

### 3. Setup the Database

Push the Prisma schema to your PostgreSQL database and generate the Prisma client:

```bash
npx prisma db push
npx prisma generate
```

*(Note: We use `db push` for quick prototyping, or you can use `prisma migrate dev` for structured migrations).*

### 4. Run the Development Server

Start the application locally:

```bash
npm run dev
```

The application will be running at [http://localhost:3000](http://localhost:3000).

---

### Enjoy organizing your finances with SpendSync! 🚀
