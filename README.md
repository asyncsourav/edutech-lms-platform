## LMS Platform (MERN)

Role-based course management system with secure authentication, course enrollment, Stripe payments, AI-powered quiz generation, and basic analytics. Backend is built with **Node.js + Express + MongoDB**, frontend with **React + Vite + Tailwind CSS**.

---

## 🔧 Project Structure

```text
LMS platform project/
├── server/                  # Backend API (Node.js, Express, MongoDB)
│   ├── README.md
│   └── src/
│       ├── config/          # env, db, cloudinary, stripe
│       ├── controllers/     # user, course, module, quiz, comment, payment, analytic
│       ├── middleware/      # auth, file uploads
│       ├── models/          # mongoose schemas
│       └── routes/          # REST API routes
└── client/                  # Frontend (React, Vite, Tailwind)
    ├── README.md
    ├── FRONTEND_EXPLAINED.md
    └── src/
        ├── main.jsx         # Entry point + React Router (/, /purchase)
        ├── App.jsx          # Main app logic (auth, courses, modules, quiz, analytics)
        ├── index.css        # Tailwind + base styles
        ├── lib/
        │   └── api.js       # Axios instance with baseURL + cookies
        ├── pages/           # Screens
        │   ├── AuthPage.jsx
        │   ├── DashboardPage.jsx
        │   └── PurchaseSuccessPage.jsx
        └── components/      # Reusable UI and layout
            ├── layout/
            ├── dashboard/
            └── ui/
```

---

## 🧩 Tech Stack (Overview)

- **Frontend**
  - React (Vite)
  - Tailwind CSS
  - Axios

- **Backend**
  - Node.js + Express
  - MongoDB + Mongoose
  - Stripe (payments)
  - Cloudinary (media)
  - Google Gemini (AI quiz + search assistance)

---

## 🌐 Major Features

- **Authentication & Authorization**
  - JWT-based auth with httpOnly cookies
  - Role-based access (`admin` / `user`)

- **Course & Module Management**
  - Course creation, listing, and search (Gemini-assisted)
  - Modules with video URLs

- **Enrollment & Payments**
  - Stripe Checkout session creation
  - Order + enrollment tracking

- **Learning Experience**
  - Comments per module
  - AI-generated quizzes per module (10 MCQs with explanations)

- **Analytics (Admin)**
  - Total users, courses, enrollments, revenue

Frontend UI exposes these flows in a simple, beginner-friendly dashboard.

---

## 🔐 Environment Variables (Summary)

### Backend (`server/.env`)

See detailed table in `server/README.md`. Key values:

- `PORT` – e.g. `5000`
- `MONGO_URI` – MongoDB connection string
- `JWT_SECRET` – strong secret key
- `ADMIN` – admin email (e.g. `admin@example.com`)
- `CLIENT_URL` – frontend base URL (dev: `http://localhost:5173`)
- `CLOUD_NAME`, `CLOUD_API_KEY`, `CLOUD_API_SECRET`
- `STRIPE_PUBLISHABLE_KEY`, `STRIPE_SECRET_KEY`
- `GEMINI_API_KEY`
- `NODE_ENV` – `development` or `production`

### Frontend (`client/.env`)

```env
VITE_API_URL=http://localhost:5000
VITE_ADMIN_EMAIL=admin@example.com
```

- `VITE_API_URL` must point to the backend URL (`PORT` from server).  
- `VITE_ADMIN_EMAIL` must match `ADMIN` from backend `.env` for admin UI.

> All frontend env vars must start with `VITE_`.

---

## 🧪 Running Locally (Development)

### 1. Backend

1. Go to server folder and install deps:

   ```bash
   cd "LMS platform project/server"
   npm install
   ```

2. Create `server/.env` as shown in `server/README.md` (use test keys for Stripe and Gemini).

3. Start dev server:

   ```bash
   npm run dev
   ```

### 2. Frontend

1. Go to client folder and install deps:

   ```bash
   cd "LMS platform project/client"
   npm install
   ```

2. Create `client/.env`:

   ```env
   VITE_API_URL=http://localhost:5000
   VITE_ADMIN_EMAIL=admin@example.com
   ```

3. Start Vite dev server:

   ```bash
   npm run dev
   ```

4. Open the printed URL (usually `http://localhost:5173`).  
   Make sure backend is running on `http://localhost:5000` (or set `VITE_API_URL` accordingly).

5. When testing Stripe:
   - Start from the dashboard, click **Buy with Stripe**.
   - After payment, Stripe redirects to `/purchase?session_id=...`.
   - The `PurchaseSuccessPage` calls `/api/payment/checkout-success` to finalize the order and unlock the course.


---

### Environment Variables Summary

**Backend (`server/.env`):**
- `PORT` - Server port (usually 5000 or hosting default)
- `MONGO_URI` - MongoDB connection string
- `JWT_SECRET` - Secret for JWT tokens
- `ADMIN` - Admin email address
- `CLIENT_URL` - Frontend production URL
- `CLOUD_NAME`, `CLOUD_API_KEY`, `CLOUD_API_SECRET` - Cloudinary
- `STRIPE_PUBLISHABLE_KEY`, `STRIPE_SECRET_KEY` - Stripe live keys
- `GEMINI_API_KEY` - Google Gemini API key
- `NODE_ENV` - Set to `production`

**Frontend (`client/.env`):**
- `VITE_API_URL` - Backend production URL
- `VITE_ADMIN_EMAIL` - Admin email (must match backend)

**Important:** Never commit `.env` files to version control!

---

## 📚 Further Documentation

- **Backend**: see `server/README.md` for full API and environment details.
- **Frontend (high level)**: see `client/README.md`.
- **Frontend (beginner deep dive)**: see `client/FRONTEND_EXPLAINED.md` for a line-by-line explanation of how the React app talks to the backend.

