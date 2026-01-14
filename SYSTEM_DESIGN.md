
# 🏗️ System Design – LMS Platform

This document explains the **architectural decisions, data flow, and scalability considerations** behind the LMS Platform.

---

## 📌 High-Level Architecture

```
LMS platform project/
├── server/                          # Backend API
│   ├── index.js                    # Server entry point
│   ├── package.json                 # Backend dependencies
│   ├── README.md                    # Backend documentation
│   └── src/
│       ├── config/                  # Configuration files
│       │   ├── db.js               # MongoDB connection
│       │   ├── env.js              # Environment variables
│       │   ├── cloudinary.js       # Cloudinary setup
│       │   └── stripe.js           # Stripe configuration
│       ├── controllers/             # Business logic
│       │   ├── user.controller.js
│       │   ├── course.controller.js
│       │   ├── module.controller.js
│       │   ├── quiz.controller.js
│       │   ├── comment.controller.js
│       │   ├── payment.controller.js
│       │   └── analytic.controller.js
│       ├── middleware/              # Custom middleware
│       │   ├── auth.middleware.js  # Authentication & authorization
│       │   ├── upload.js           # Image upload handler
│       │   └── video.upload.js    # Video upload handler
│       ├── models/                  # Database schemas
│       │   ├── user.model.js
│       │   ├── course.model.js
│       │   ├── modules.model.js
│       │   ├── enrollment.model.js
│       │   ├── order.model.js
│       │   ├── quiz.model.js
│       │   ├── questions.model.js
│       │   └── comment.model.js
│       └── routes/                  # API routes
│           ├── user.route.js
│           ├── course.route.js
│           ├── module.route.js
│           ├── quiz.route.js
│           ├── comment.route.js
│           ├── payment.route.js
│           └── analytic.route.js
│
└── client/                          # Frontend Application
    ├── package.json                 # Frontend dependencies
    ├── README.md                    # Frontend documentation
    ├── FRONTEND_EXPLAINED.md        # Beginner's guide
    ├── BACKEND_INTEGRATION_CHECKLIST.md
    ├── vite.config.js               # Vite configuration
    ├── tailwind.config.js           # Tailwind configuration
    └── src/
        ├── main.jsx                 # React entry point
        ├── App.jsx                  # Main app component
        ├── index.css                # Global styles
        ├── lib/                     # Utilities
        │   ├── api.js              # Axios configuration
        │   ├── auth.jsx            # Authentication context
        │   ├── theme.jsx           # Theme context
        │   └── utils.js            # Helper functions
        ├── components/              # Reusable components
        │   ├── ui/                 # Basic UI components
        │   │   ├── button.jsx
        │   │   ├── input.jsx
        │   │   ├── card.jsx
        │   │   └── textarea.jsx
        │   ├── layout/            # Layout components
        │   │   ├── Header.jsx
        │   │   ├── Footer.jsx
        │   │   └── Layout.jsx
        │   └── ProtectedRoute.jsx  # Route protection
        └── pages/                  # Page components
            ├── LoginPage.jsx
            ├── RegisterPage.jsx
            ├── DashboardPage.jsx
            ├── CourseDetailPage.jsx
            ├── CourseLearnPage.jsx
            ├── QuizPage.jsx
            ├── ProfilePage.jsx
            ├── AdminDashboardPage.jsx
            └── PurchaseSuccessPage.jsx
```


External Services:
- **Stripe** → Payments
- **Cloudinary** → Image & Video Storage
- **Google Gemini AI** → Search & Quiz Generation

---

## 🔐 Authentication & Authorization Design

### Authentication Strategy
- Uses **JWT tokens stored in httpOnly cookies**
- Prevents XSS-based token access
- Stateless authentication (no server-side session storage)

### Authorization
- Role-Based Access Control (**Admin / User**)
- Middleware verifies:
  - Token validity
  - User role
  - Resource ownership (where applicable)

### Why JWT?
- Horizontally scalable
- No session store required
- Works seamlessly with distributed systems

---

## 📚 Course & Enrollment Flow

### Course Creation (Admin)
1. Admin creates course metadata
2. Course thumbnail uploaded to Cloudinary
3. Modules and videos added incrementally
4. Course published for users

### Enrollment Logic
- Enrollment is created **only after successful payment verification**
- Prevents duplicate or unpaid enrollments
- Ensures data consistency

---

## 💳 Payment System Design (Stripe)

### Payment Flow
1. User initiates purchase
2. Backend creates Stripe Checkout Session
3. User completes payment on Stripe
4. Stripe redirects to success URL
5. Backend verifies payment session
6. Enrollment record is created atomically

### Safety Measures
- Enrollment is **never created on frontend**
- Payment status verified using Stripe API
- Order records stored for audit and analytics

---

## 🤖 AI Features Design

### AI-Powered Course Search
- User enters natural language query
- Query sent to Gemini AI
- AI extracts keywords & intent
- Courses filtered using AI-processed results

### AI Quiz Generation
- Triggered on-demand per module
- Gemini generates:
  - 10 MCQs
  - Options
  - Correct answer
  - Explanation
- Quiz stored in database to avoid regeneration cost

### Cost Control Strategy
- Quizzes generated once per module
- Cached in database
- Regenerated only if explicitly requested

---

## 📊 Analytics System

### Metrics Tracked
- Total users
- Total courses
- Total enrollments
- Revenue
- Daily activity trends

### Design Choice
- Aggregation queries used instead of raw logs
- Date-based filtering for dashboards
- Read-heavy operations optimized for admin usage

---

## 🗄️ Database Design Rationale

### Why MongoDB?
- Flexible schema for evolving course content
- Nested documents for modules and quizzes
- High write throughput
- Easy horizontal scaling

### Key Collections
- `users`
- `courses`
- `modules`
- `enrollments`
- `orders`
- `quizzes`
- `comments`

---

## 📦 File Storage Strategy

- **Cloudinary** used for:
  - Profile images
  - Course thumbnails
  - Video modules
- Backend handles:
  - Secure upload
  - URL storage
  - Access control

---

## ⚙️ Scalability Considerations

- Stateless backend → horizontal scaling
- JWT-based auth → no shared session store
- Externalized media storage
- AI services isolated for future replacement
- Frontend and backend deployable independently

---

## 🔒 Security Considerations

- httpOnly cookies for JWT
- bcrypt password hashing
- Role validation on every protected route
- CORS configuration per environment
- No sensitive keys exposed to frontend

---

## 🧠 Future Improvements

- Redis caching for analytics & quizzes
- WebSockets for live learning features
- Rate limiting for AI endpoints
- Microservice separation for payments & AI

---

## 🎯 Design Philosophy

> Build systems that are **correct, secure, and scalable first** — polish comes later.

This LMS prioritizes **real-world engineering practices** over demo-driven development.
