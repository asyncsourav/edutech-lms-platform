# 🚀 Production-Grade Full Stack LMS (MERN + AI + Payments)

This project is a **production-oriented Learning Management System (LMS)** designed to closely resemble **real-world edtech platforms**. It focuses on **scalability, security, and maintainable architecture**, rather than UI animations or demo-only features.


## 🎯 Overview

The system supports **role-based users**, **secure payments**, **AI-powered learning tools**, and **analytics**, making it suitable for **startup-grade applications and paid full-stack internships**.

This project was built with a **backend-first, production mindset**, prioritizing correctness, security, and extensibility.

---


## ✨ Features

### 🔐 Authentication & Authorization
- JWT-based authentication with httpOnly cookies
- Role-based access control (Admin/User)
- Secure password hashing with bcrypt
- Protected routes and API endpoints
- Session management

### 📚 Course Management
- Course creation and management (Admin)
- AI-powered intelligent course search
- Course browsing and filtering
- Course detail pages with purchase options
- Module and video content management
- Course enrollment tracking

### 💳 Payment Integration
- Stripe Checkout integration
- Secure payment processing
- Order and enrollment management
- Purchase success handling
- Payment verification

### 🤖 AI-Powered Features
- Google Gemini AI integration
- Intelligent course search with natural language processing
- Automatic quiz generation from course content
- 10 MCQ questions with explanations per quiz

### 📊 Analytics Dashboard (Admin)
- Total users, courses, and enrollments
- Revenue tracking and reporting
- Daily analytics with date range filtering
- Visual data representation

### 🎥 Learning Experience
- Video player for course modules
- Comments system for each module
- AI-generated quizzes with instant feedback
- Progress tracking
- Responsive learning interface

### 👤 User Profile
- Profile photo upload (Cloudinary)
- Name and information updates
- Profile management

### 🎨 User Interface
- Modern, responsive design
- Dark/Light theme toggle
- Intuitive navigation
- Loading states and error handling
- Mobile-friendly interface

---

## 🛠️ Tech Stack

### Frontend
- **React 19** - Modern UI library
- **Vite** - Fast build tool and dev server
- **Tailwind CSS 3** - Utility-first CSS framework
- **React Router DOM** - Client-side routing
- **Axios** - HTTP client for API calls
- **Lucide React** - Icon library
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

## 📁 Project Structure

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

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** (v18 or higher)
- **MongoDB** (v6 or higher) or MongoDB Atlas account
- **npm** or **yarn**
- **Cloudinary** account (for media storage)
- **Stripe** account (for payments)
- **Google AI Studio** account (for Gemini API)

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd "LMS platform project"
   ```

2. **Backend Setup**
   ```bash
   cd server
   npm install
   ```
   
   Create `server/.env` file:
   ```env
   PORT=5000
   NODE_ENV=development
   MONGO_URI=mongodb://localhost:27017/lms-platform
   JWT_SECRET=your-super-secret-jwt-key-min-32-characters
   ADMIN=admin@example.com
   CLIENT_URL=http://localhost:5173
   CLOUD_NAME=your-cloudinary-cloud-name
   CLOUD_API_KEY=your-cloudinary-api-key
   CLOUD_API_SECRET=your-cloudinary-api-secret
   STRIPE_PUBLISHABLE_KEY=pk_test_your-stripe-publishable-key
   STRIPE_SECRET_KEY=sk_test_your-stripe-secret-key
   GEMINI_API_KEY=your-google-gemini-api-key
   ```

3. **Frontend Setup**
   ```bash
   cd ../client
   npm install
   ```
   
   Create `client/.env` file:
   ```env
   VITE_API_URL=http://localhost:5000
   VITE_ADMIN_EMAIL=admin@example.com
   ```

4. **Start Development Servers**
   
   Terminal 1 (Backend):
   ```bash
   cd server
   npm run dev
   ```
   
   Terminal 2 (Frontend):
   ```bash
   cd client
   npm run dev
   ```

5. **Access the Application**
   - Frontend: http://localhost:5173
   - Backend API: http://localhost:5000

---

## 🔐 Environment Variables

### Backend (`server/.env`)

| Variable | Description | Required | Example |
|----------|-------------|----------|---------|
| `PORT` | Server port | Yes | `5000` |
| `MONGO_URI` | MongoDB connection string | Yes | `mongodb://localhost:27017/lms` |
| `JWT_SECRET` | Secret for JWT tokens | Yes | `your-secret-key-32-chars` |
| `ADMIN` | Admin email address | Yes | `admin@example.com` |
| `CLIENT_URL` | Frontend URL | Yes | `http://localhost:5173` |
| `CLOUD_NAME` | Cloudinary cloud name | Yes | `your-cloud-name` |
| `CLOUD_API_KEY` | Cloudinary API key | Yes | `123456789012345` |
| `CLOUD_API_SECRET` | Cloudinary API secret | Yes | `your-api-secret` |
| `STRIPE_PUBLISHABLE_KEY` | Stripe publishable key | Yes | `pk_test_...` |
| `STRIPE_SECRET_KEY` | Stripe secret key | Yes | `sk_test_...` |
| `GEMINI_API_KEY` | Google Gemini API key | Yes | `your-gemini-key` |
| `NODE_ENV` | Environment mode | No | `development` |

### Frontend (`client/.env`)

| Variable | Description | Required | Example |
|----------|-------------|----------|---------|
| `VITE_API_URL` | Backend API URL | Yes | `http://localhost:5000` |
| `VITE_ADMIN_EMAIL` | Admin email | Yes | `admin@example.com` |

**Note:** All frontend env vars must start with `VITE_`

---

## 📡 API Documentation

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
| GET | `/api/getCourse` | Get all courses | Yes | No |
| GET | `/api/getSingleCourse/:id` | Get course details | Yes | No |
| GET | `/api/purchasedCourse/:id` | Get purchased course | Yes | No |
| GET | `/api/getAllCoursePurchase` | Get all purchased | Yes | No |

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

## 🎯 Key Features Explained

### 1. Authentication System
- Uses JWT tokens stored in httpOnly cookies for security
- Automatic token refresh and validation
- Role-based access control (Admin/User)
- Protected routes on both frontend and backend

### 2. AI-Powered Search
- Google Gemini AI processes natural language queries
- Converts user queries to relevant course keywords
- Intelligent course matching and filtering

### 3. Quiz Generation
- AI automatically generates 10 MCQ questions per module
- Questions include 4 options, correct answer, and explanation
- Quizzes are generated on-demand and stored in database

### 4. Payment Flow
1. User clicks "Buy with Stripe"
2. Backend creates Stripe checkout session
3. User redirected to Stripe payment page
4. After payment, Stripe redirects back
5. Backend verifies payment and enrolls user

### 5. File Uploads
- Profile photos uploaded to Cloudinary
- Course thumbnails stored in Cloudinary
- Video modules uploaded to Cloudinary
- Automatic URL generation and storage

---

## 🚀 Deployment

### Production Checklist

#### Backend
- [ ] Set `NODE_ENV=production`
- [ ] Use production MongoDB (Atlas)
- [ ] Strong `JWT_SECRET` (32+ characters)
- [ ] Live Stripe keys
- [ ] Production Cloudinary credentials
- [ ] Set `CLIENT_URL` to production frontend URL
- [ ] Enable HTTPS
- [ ] Configure CORS for production domain

#### Frontend
- [ ] Set `VITE_API_URL` to production backend URL
- [ ] Set `VITE_ADMIN_EMAIL` to match backend
- [ ] Build: `npm run build`
- [ ] Deploy `dist` folder to hosting (Vercel, Netlify, etc.)
- [ ] Configure SPA routing (all routes → `index.html`)

### Deployment Platforms

**Backend:**
- Railway, Render, Heroku, AWS EC2, DigitalOcean

**Frontend:**
- Vercel (recommended), Netlify, AWS S3+CloudFront

See detailed deployment guide in `server/README.md` and `client/README.md`.

---

## 📚 Documentation

- **Backend API**: See `server/README.md`
- **Frontend Guide**: See `client/README.md`
- **Frontend Deep Dive**: See `client/FRONTEND_EXPLAINED.md`
- **Integration Checklist**: See `client/BACKEND_INTEGRATION_CHECKLIST.md`

---

## 🧪 Testing

### Manual Testing Checklist

- [ ] User registration and login
- [ ] Course browsing and search
- [ ] Course purchase flow
- [ ] Video playback
- [ ] Comment system
- [ ] Quiz generation and taking
- [ ] Profile updates
- [ ] Admin course creation
- [ ] Admin analytics
- [ ] Theme toggle
- [ ] Responsive design

---

## 🔒 Security Features

- Password hashing with bcrypt (10 salt rounds)
- JWT tokens in httpOnly cookies
- CORS protection
- Input validation
- Secure file uploads
- Role-based access control
- Protected API endpoints

---

## 🤝 Contributing

1. Fork the repository
2. Create feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add AmazingFeature'`)
4. Push to branch (`git push origin feature/AmazingFeature`)
5. Open Pull Request

---

## 📝 License

This project is licensed under the ISC License.

---

## 👤 Author

**Sourav Kumar**

- Email: xsouravkumar357@gmail.com
- GitHub: [Your GitHub](https://github.com)
- LinkedIn: [Your LinkedIn](https://linkedin.com)

---

## 🙏 Acknowledgments

- Express.js community
- React team
- MongoDB for excellent database solution
- Stripe for payment processing
- Cloudinary for media management
- Google for Gemini AI capabilities
- All open-source contributors

---

## 📞 Support

For support, email xsouravkumar357@gmail.com or open an issue in the repository.

---

## 🎓 Learning Resources

This project demonstrates:
- Full-stack MERN development
- RESTful API design
- Authentication and authorization
- Payment integration
- AI integration
- File uploads and storage
- State management
- Responsive UI design
- Production deployment

Perfect for portfolio projects and learning modern web development!

---

**Built with ❤️ using the MERN Stack**
