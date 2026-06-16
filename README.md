# 📋 Form Builder REST API

A RESTful API for a dynamic form/survey builder with JWT authentication, built with **Node.js**, **Express**, and **MongoDB**.

## ✨ Features

- 🔐 JWT Authentication (Access Token + Refresh Token)
- 📝 Dynamic Form & Question Management
- 🔘 Multiple Choice Options per Question
- 👥 Form Sharing via Email Invites (public/private forms)
- 📄 Pagination Support
- 🛡️ Protected Routes with Middleware

## 🛠 Tech Stack

| Layer       | Technology                  |
|-------------|-----------------------------|
| Runtime     | Node.js (ES Modules)        |
| Framework   | Express.js                  |
| Database    | MongoDB + Mongoose          |
| Auth        | JSON Web Token (JWT)        |
| Password    | bcrypt                      |
| Pagination  | mongoose-paginate-v2        |

## 🚀 Getting Started

### Prerequisites

- Node.js >= 16
- MongoDB running locally or a connection URI

### Installation

```bash
git clone https://github.com/your-username/backend-express-js.git
cd backend-express-js
npm install
```

### Environment Variables

Copy `.env.example` and fill in the values:

```bash
cp .env.example .env
```

```env
APP_PORT=3000

MONGODB_URI=mongodb://localhost:27017
MONGODB_NAME=your_db_name

JWT_ACCESS_TOKEN_SECRET=your_access_secret
JWT_ACCESS_TOKEN_EXPIRATION_TIME=30m
JWT_REFRESH_TOKEN_SECRET=your_refresh_secret
JWT_REFRESH_TOKEN_EXPIRATION_TIME=1h
```

### Run

```bash
# Development (with hot reload)
npm run dev

# Production
npm start
```

## 📡 API Endpoints

### Auth

| Method | Endpoint         | Description              | Auth |
|--------|------------------|--------------------------|------|
| POST   | `/api/register`  | Register new user        | ❌   |
| POST   | `/api/login`     | Login & get tokens       | ❌   |
| POST   | `/api/refresh-token` | Refresh access token | ✅   |

### Mahasiswa

| Method | Endpoint                     | Description         | Auth |
|--------|------------------------------|---------------------|------|
| POST   | `/api/mahasiswa`             | Register mahasiswa  | ❌   |
| POST   | `/api/mahasiswa/store`       | Add mahasiswa data  | ✅   |
| GET    | `/api/mahasiswa/show/:id`    | Get mahasiswa       | ✅   |
| PUT    | `/api/mahasiswa/update/:id`  | Update mahasiswa    | ✅   |
| DELETE | `/api/mahasiswa/destroy/:id` | Delete mahasiswa    | ✅   |

### Forms

| Method | Endpoint              | Description             | Auth |
|--------|-----------------------|-------------------------|------|
| GET    | `/api/form`           | Get all forms (paginated) | ✅ |
| POST   | `/api/form/store`     | Create new form         | ✅   |
| GET    | `/api/form/:id`       | Get form (owner)        | ✅   |
| PUT    | `/api/form/update/:id` | Update form            | ✅   |
| DELETE | `/api/form/destroy/:id` | Delete form           | ✅   |
| GET    | `/api/form/:id/users` | Get form (user view)    | ✅   |

### Questions

| Method | Endpoint                               | Description      | Auth |
|--------|----------------------------------------|------------------|------|
| GET    | `/api/form/:id/questions`              | Get questions    | ✅   |
| POST   | `/api/form/:id/questions`              | Add question     | ✅   |
| PUT    | `/api/form/:id/questions/:questionId`  | Update question  | ✅   |
| DELETE | `/api/form/:id/questions/:questionId`  | Delete question  | ✅   |

### Options

| Method | Endpoint                                              | Description   | Auth |
|--------|-------------------------------------------------------|---------------|------|
| POST   | `/api/form/:id/questions/:questionId/option`          | Add option    | ✅   |
| PUT    | `/api/form/:id/questions/:questionId/option/:optionId` | Update option | ✅  |
| DELETE | `/api/form/:id/questions/:questionId/option/:optionId` | Delete option | ✅  |

## 📁 Project Structure

```
├── Controllers/
│   ├── AuthController.js
│   ├── FormController.js
│   ├── MahasiswaController.js
│   ├── OptionController.js
│   └── QuestionController.js
├── middleware/
│   └── jwtAuth.js
├── models/
│   ├── Answer.js
│   ├── Form.js
│   ├── Mahasiswa.js
│   └── User.js
├── routes/
│   └── api.js
├── libraries/
│   └── emailExist.js
├── app.js
└── connection.js
```

## 📄 License

ISC © [Fazril Ramadhan](https://github.com/your-username)
