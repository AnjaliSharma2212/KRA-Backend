# 🚀 Node.js + PostgreSQL Backend Project

This project demonstrates a production-style backend setup using:

* Node.js
* Express
* PostgreSQL
* Environment Variables (dotenv)
* Modular Folder Structure
* Migrations
* Docker

---

# 📌 1. Project Setup

## Step 1: Initialize Project

```bash
npm init -y
```

## Step 2: Install Dependencies

```bash
npm install express pg dotenv cors
npm install --save-dev nodemon
```

### Why These Packages?

* **express** → Web framework for building APIs
* **pg** → PostgreSQL client for Node.js
* **dotenv** → Loads environment variables from .env file
* **cors** → Enables cross-origin requests
* **nodemon** → Auto restarts server during development

---

# 📁 2. Project Structure

```
project/
│
├── src/
│   ├── app.js
│   ├── server.js
│   │
│   ├── config/
│   │   └── db.js
│   │
│   ├── modules/
│   │   └── user/
│   │       ├── user.controller.js
│   │       ├── user.service.js
│   │       ├── user.routes.js
│   │       └── user.entity.js
│   │
│   ├── shared/
│   │   ├── middleware/
│   │   ├── utils/
│   │   └── constants/
│   │
│   └── migrations/
│
├── .env
├── package.json
├── Dockerfile
└── docker-compose.yml
```

### Explanation

* **config/** → Database configuration
* **modules/** → Feature-based structure (each module has its own logic)
* **shared/** → Reusable logic (middleware, helpers)
* **migrations/** → Database version control files
* **Docker files** → Container configuration

---

# 🗄 3. PostgreSQL Setup

## Step 1: Create Database

```sql
CREATE DATABASE demo_db;
```

## Step 2: Connect to Database

```sql
\c demo_db
```

## Step 3: Create Table

```sql
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100),
  email VARCHAR(100) UNIQUE NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

---

# 🔐 4. Environment Variables (.env)

Create a `.env` file in the root directory:

```
PORT=5000
DB_HOST=localhost
DB_PORT=5432
DB_USER=postgres
DB_PASSWORD=yourpassword
DB_NAME=demo_db
```

### Why Use Environment Variables?

* Keeps credentials secure
* Allows different configs for dev, staging, production
* Prevents hardcoding sensitive data

---

# 🔌 5. Database Connection (config/db.js)

```js
const { Pool } = require("pg");
require("dotenv").config();

const pool = new Pool({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

module.exports = pool;
```

---

# 🧩 6. Modular Architecture

## user.routes.js

Handles HTTP routes.

## user.controller.js

Handles request & response logic.

## user.service.js

Handles business logic and database queries.

## user.entity.js

Represents database structure.

### Why Modular?

* Clean code separation
* Easier maintenance
* Scalable for large applications

---

# 🔄 7. Migrations

Migrations allow version control for database schema.

Install migration tool:

```bash
npm install node-pg-migrate
```

Create migration:

```bash
npx node-pg-migrate create create-users-table
```

Run migration:

```bash
npx node-pg-migrate
```

---

# 🐳 8. Docker Setup

## docker-compose.yml

Defines services:

* PostgreSQL container
* Node.js container

Run project using:

```bash
docker-compose up --build
```

### Why Docker?

* Same environment everywhere
* Easy deployment
* No local dependency conflicts

---

# 🧪 9. Testing API (Postman)

## Create User

Method: POST

```
http://localhost:5000/users
```

Body (JSON):

```json
{
  "name": "Anjali",
  "email": "anjali@gmail.com"
}
```

Expected Response:

```json
{
  "id": 1,
  "name": "Anjali",
  "email": "anjali@gmail.com"
}
```

---

# 🛠 10. Run Application

Development Mode:

```bash
npm run dev
```

Production Mode:

```bash
node src/server.js
```

---

# 🎯 What This Project Demonstrates

* Clean architecture
* Modular design
* Environment configuration
* Secure DB connection
* Migration management
* Dockerized setup
* Scalable backend structure

---

---

# ✅ Conclusion

This backend setup follows industry best practices and is scalable for real-world applications. It separates concerns properly, secures environment variables, manages database changes through migrations, and ensures consistency using Docker.

You now have a production-ready backend foundation 🚀
