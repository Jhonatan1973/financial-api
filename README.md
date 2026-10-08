<h1 align="center">
  💳 Financial API - Personal Finance Manager
</h1>

<p align="center">
  <img alt="GitHub language count" src="https://img.shields.io/github/languages/count/Jhonatan1973/financial-api">
  <img alt="Repository size" src="https://img.shields.io/github/repo-size/Jhonatan1973/financial-api">
  <img alt="License" src="https://img.shields.io/badge/license-MIT-brightgreen">
</p>

<p align="center">
  <a href="#-about">About</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#-features">Features</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#-technologies">Technologies</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#-getting-started">Getting Started</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#-api-documentation">API Documentation</a>
</p>

<br>

## 🚀 About

**Financial API** is a complete backend service for personal finance management. Built with Clean Code practices and a modular architecture, it allows users to manage their income and expenses, organize transactions into categories, and generate monthly financial reports with category-based breakdowns.

*(Insert Demo GIF or Screenshot here)*

---

## ✨ Features

- **Authentication:** Secure user registration and login with JWT and bcrypt password hashing.
- **Accounts:** Support for multiple account types (Checking, Savings, Credit Card, Cash) per user.
- **Categories:** Organize transactions dynamically by user-defined categories.
- **Transactions:** Record incomes and expenses with automatic account balance updates.
- **Reports:** Get real-time monthly financial statements and expense breakdowns.
- **Data Integrity:** ACID-compliant operations using Prisma transactions.

---

## 💻 Technologies

This project was developed with the following technologies:

- **[Node.js](https://nodejs.org/en/)** & **[TypeScript](https://www.typescriptlang.org/)**
- **[NestJS](https://nestjs.com/)** - Progressive Node.js framework
- **[Prisma](https://www.prisma.io/)** - Next-generation ORM
- **[PostgreSQL](https://www.postgresql.org/)** - Relational Database
- **[Docker](https://www.docker.com/)** - Containerization
- **[Swagger](https://swagger.io/)** - API Documentation
- **[Jest](https://jestjs.io/)** - Unit and Integration Testing

---

## 🏁 Getting Started

Follow these instructions to get a copy of the project up and running on your local machine.

### Prerequisites

- Node.js (v20+)
- Docker & Docker Compose (for the PostgreSQL database)
- Git

### Installation

**1. Clone the repository:**
```bash
git clone https://github.com/Jhonatan1973/financial-api.git
cd financial-api
```

**2. Setup environment variables:**
```bash
cp .env.example .env
```
Make sure to fill in the variables in your `.env` file. By default, the database URL points to the Docker container.

**3. Start the database using Docker:**
```bash
docker-compose up -d
```

**4. Install dependencies:**
```bash
npm install
```

**5. Run Prisma Migrations:**
```bash
npx prisma migrate dev
```

**6. Start the server:**
```bash
# Development mode
npm run start:dev
```
The server will start running at `http://localhost:3000`.

---

## 📚 API Documentation

Once the server is running, you can access the full Swagger API documentation by navigating to:

👉 **[http://localhost:3000/api/docs](http://localhost:3000/api/docs)**

From there, you can test endpoints directly. To access protected routes, create a user, log in, and click the **Authorize** button in Swagger to paste your JWT token.

---

## 📝 License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

<br>
<p align="center">Developed with 💙 by Jhonatan Silva</p>
