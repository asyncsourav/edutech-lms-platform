# Production-Grade Full Stack LMS (MERN + AI + Payments)

This project is a **production-oriented Learning Management System (LMS)** designed to closely resemble **real-world edtech platforms**. It focuses on **scalability, security, and maintainable architecture**, with a professional UI/UX that rivals commercial LMS solutions.


## Overview

The system supports **role-based users**, **secure payments**, **AI-powered learning tools**, and **comprehensive analytics**, making it suitable for **startup-grade applications and paid full-stack internships**.

This project was built with a **backend-first, production mindset**, prioritizing correctness, security, extensibility, and professional design.

---

## Features

### Authentication & Authorization
- JWT-based authentication with httpOnly cookies
- Role-based access control (Admin/User)
- Secure password hashing with bcrypt
- Protected routes and API endpoints
- Session management
- Automatic token refresh

### Course Management
- **Admin Features:**
  - Create, read, update, and delete courses
  - Hide/unhide courses for visibility control
  - Edit course details and pricing
  - Bulk course management dashboard
- **User Features:**
  - Browse all available courses
  - AI-powered intelligent course search
  - Course detail pages with purchase options
  - Quick access to purchased courses from header
- Module and video content management
- Course enrollment tracking

### User Purchased Courses Feature
- **Quick Access:** View count badge in header
- **Dropdown Menu:** Click to see all purchased courses
- **Easy Navigation:** Direct links to learning pages
- **Course Preview:** Thumbnail and price display in dropdown

### Payment Integration
- Stripe Checkout integration
- Secure payment processing
- Order and enrollment management
- Purchase success handling
- Payment verification

### AI-Powered Features
- Google Gemini AI integration
- Intelligent course search with natural language processing
- Automatic quiz generation from course content
- 10 MCQ questions with explanations per quiz

### Analytics Dashboard (Admin)
- Total users, courses, and enrollments
- Revenue tracking and reporting
- Daily analytics with date range filtering
- Visual data representation
- Course management interface

### Learning Experience
- Video player for course modules
- Comments system for each module
- AI-generated quizzes with instant feedback
- Progress tracking
- Responsive learning interface

### User Profile
- Profile photo upload (Cloudinary)
- Name and information updates
- Profile management
- Professional profile interface

### Professional UI/UX
- Modern, responsive design with premium aesthetics
- Dark/Light theme toggle with smooth transitions
- Intuitive navigation
- Loading states and error handling
- Mobile-first design approach
- Gradient backgrounds and card-based layouts
- Smooth animations and transitions
- Professional typography and color schemes

---

## Tech Stack

### Frontend
- **React 19** - Modern UI library
- **Vite** - Fast build tool and dev server
- **Tailwind CSS 3** - Utility-first CSS framework
- **React Router DOM** - Client-side routing
- **Axios** - HTTP client for API calls
- **Lucide React** - Professional icon library
- **Context API** - State management (no Redux needed)

### Backend
- **Node.js** - JavaScript runtime
- **Express.js 5** - Web framework
- **MongoDB** - NoSQL database
- **Mongoose** - MongoDB object modeling
- **JWT** - Authentication tokens
- **bcrypt** - Password hashing
- **Stripe** - Payment processing
- **Cloudinary** - Media storage
- **Google Gemini AI** - AI capabilities

### Development Tools
- **ESLint** - Code linting
- **Nodemon** - Auto-restart server
- **dotenv** - Environment variables

---

## Project Structure

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
│       │   ├── course.controller.js (NEW: edit, delete, hide)
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
│       │   ├── course.model.js (NEW: isHidden field)
│       │   ├── modules.model.js
│       │   ├── enrollment.model.js
│       │   ├── order.model.js
│       │   ├── quiz.model.js
│       │   ├── questions.model.js
│       │   └── comment.model.js
│       └── routes/                  # API routes
│           ├── user.route.js
│           ├── course.route.js (NEW: edit, delete, hide endpoints)
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
        ├── index.css                # Global styles (ENHANCED)
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
        │   │   ├── Header.jsx (NEW: purchased courses dropdown)
        │   │   ├── Footer.jsx
        │   │   └── Layout.jsx
        │   └── ProtectedRoute.jsx  # Route protection
        └── pages/                  # Page components
            ├── LoginPage.jsx (ENHANCED UI)
            ├── RegisterPage.jsx (ENHANCED UI)
            ├── DashboardPage.jsx (ENHANCED UI)
            ├── CourseDetailPage.jsx (ENHANCED UI)
            ├── CourseLearnPage.jsx (ENHANCED UI)
            ├── QuizPage.jsx (ENHANCED UI)
            ├── ProfilePage.jsx (ENHANCED UI)
            ├── AdminDashboardPage.jsx (NEW: course management section)
            └── PurchaseSuccessPage.jsx (ENHANCED UI)
```

## API Documentation

### Authentication Endpoints

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST | `/api/register` | Register new user | No |
| POST | `/api/login` | Login user | No |
| GET | `/api/getUser` | Get current user | Yes |
| POST | `/api/logout` | Logout user | Yes |
| POST | `/api/updateProfile` | Update profile | Yes |

### Course Endpoints

| Method | Endpoint | Description | Auth | Admin |
|--------|----------|-------------|------|-------|
| POST | `/api/createCourse` | Create course | Yes | Yes |
| GET | `/api/getCourse` | Get all visible courses | Yes | No |
| GET | `/api/getSingleCourse/:id` | Get course details | Yes | No |
| GET | `/api/purchasedCourse/:id` | Get purchased course | Yes | No |
| GET | `/api/getAllCoursePurchase` | Get all purchased | Yes | No |
| **PUT** | **`/api/editCourse/:id`** | **Edit course (NEW)** | **Yes** | **Yes** |
| **DELETE** | **`/api/deleteCourse/:id`** | **Delete course (NEW)** | **Yes** | **Yes** |
| **PATCH** | **`/api/hideCourse/:id`** | **Hide/unhide course (NEW)** | **Yes** | **Yes** |

### Module Endpoints

| Method | Endpoint | Description | Auth | Admin |
|--------|----------|-------------|------|-------|
| POST | `/api/createModule` | Create module | Yes | Yes |
| GET | `/api/getModule/:id` | Get module | Yes | No |
| GET | `/api/comment/:id` | Get comments | Yes | No |

### Quiz Endpoints

| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| GET | `/api/quiz/checkQuiz/:id` | Check quiz exists | Yes |
| POST | `/api/quiz/generateQuiz` | Generate quiz | Yes |
| GET | `/api/quiz/getQuiz/:id` | Get quiz | Yes |

### Comment Endpoints

| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| POST | `/api/comment/createComment/:id` | Add comment | Yes |

### Payment Endpoints

| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| POST | `/api/payment/checkout` | Create checkout | Yes |
| POST | `/api/payment/checkout-success` | Verify payment | Yes |

### Analytics Endpoints

| Method | Endpoint | Description | Auth | Admin |
|--------|----------|-------------|------|-------|
| GET | `/api/analytic/getAnalytic` | Get analytics | Yes | Yes |
| GET | `/api/analytic/getDailyData` | Get daily data | Yes | Yes |

---
