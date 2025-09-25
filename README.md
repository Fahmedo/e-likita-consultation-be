# 📋 e-Likita Consultation Backend

This is the backend service for the **e-Likita Consultation** application.
It provides APIs for managing online medical consultations with full **CRUD functionality**.
The project is built using **NestJS**, **PostgreSQL**, and **TypeORM**, following clean architecture principles.

---

## 🚀 Features

- RESTful API endpoints for consultation management (Create, Read, Update, Delete).
- Database integration with **PostgreSQL**.
- Built with **NestJS** for modular, scalable backend development.
- Validation and serialization with **class-validator** and **class-transformer**.
- Database migrations with **TypeORM**.
- Swagger API documentation for easy testing.
- Secure configuration management via `@nestjs/config`.
- Ready for deployment on \*\*Render .

---

## 🛠️ Tech Stack

- **Backend Framework:** [NestJS](https://nestjs.com/)
- **Database:** PostgreSQL
- **ORM:** TypeORM
- **Validation:** class-validator, class-transformer
- **API Docs:** Swagger (OpenAPI)
- **Deployment:** Any Node.js-compatible cloud platform (e.g. Render, Heroku, AWS, Vercel)

---

## 📂 Project Structure

```
src/
│── consultations/     # Consultation module, controller, service & entity
│── config/            # Database configuration (env-based)
│── migrations/        # Database migration files
│── app.module.ts      # Root application module
│── main.ts            # Entry point
```

---

## ⚙️ Installation & Setup

### 1. Clone Repository

```bash
git clone https://github.com/Fahmedo/e-likita-consultation-be.git
cd e-likita-consultation-be
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Configure Environment Variables

Create a `.env` file in the root directory:

```env
DATABASE_TYPE=postgres
DATABASE_URL=postgres://username:password@localhost:5432/e-likita
DATABASE_HOST=localhost
DATABASE_PORT=5432
DATABASE_USERNAME=your_username
DATABASE_PASSWORD=your_password
DATABASE_DATABASE=e-likita
DATABASE_SYNCHRONIZE=false
```

### 4. Run Migrations

```bash
npm run migration:run
```

### 5. Start the Server

- Development:

```bash
npm run start:dev
```

- Production:

```bash
npm run start:prod
```

---

## 📖 API Documentation

Once running, API docs will be available at:

```
http://localhost:3000/api/docs
```

(Swagger UI enabled via `@nestjs/swagger`)

---

## 🧪 Testing

Run unit and e2e tests:

```bash
npm run test
npm run test:e2e
npm run test:cov
```

---

## 🌍 Deployment

This project is ready for deployment on platforms like:

- **Render**

Just ensure environment variables are properly set in the deployment platform.

---

## 📌 Submission Checklist

✅ Live link to deployed app
✅ Link to GitHub repository
✅ Clean, maintainable, well-structured code
✅ Backend connected seamlessly with frontend

---

## 👨‍💻 Author

**Faruq Ahmed**
🔗 [GitHub](https://github.com/your-username)

---
