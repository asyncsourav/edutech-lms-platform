# LMS Platform - Backend API

A comprehensive Learning Management System (LMS) backend built with Node.js, Express.js, and MongoDB. This RESTful API provides secure authentication, course management, payment processing, AI-powered quiz generation, and analytics capabilities.

## 🚀 Features

- **User Authentication & Authorization**
  - JWT-based authentication with secure httpOnly cookies
  - Role-based access control (Admin/User)
  - Password hashing with bcrypt
  - Protected routes middleware

- **Course Management**
  - Create, read, and manage courses
  - Course search with AI-powered query understanding
  - Course enrollment tracking
  - Module and video content management

- **Payment Integration**
  - Stripe payment gateway integration
  - Secure checkout sessions
  - Order and enrollment management

- **AI-Powered Features**
  - Google Gemini AI integration for intelligent course search
  - Automatic quiz generation from course content
  - Natural language query processing

- **Content Management**
  - Cloudinary integration for image and video storage
  - Video upload with size limits
  - Profile photo management

- **Analytics Dashboard**
  - User and course statistics
  - Revenue and enrollment tracking
  - Daily analytics with date range filtering

- **Interactive Features**
  - Comments system for course modules
  - Quiz system with AI-generated questions
  - User progress tracking

## 📋 Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v18 or higher) - [Download Node.js](https://nodejs.org/)
- **MongoDB** (v6 or higher) - [Download MongoDB](https://www.mongodb.com/try/download/community)
- **npm** or **yarn** package manager
- **MongoDB Atlas** account (for cloud database) or local MongoDB instance
- **Cloudinary** account (for media storage) - [Sign up](https://cloudinary.com/)
- **Stripe** account (for payments) - [Sign up](https://stripe.com/)
- **Google AI Studio** account (for Gemini API) - [Get API Key](https://makersuite.google.com/app/apikey)

## 🛠️ Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd "LMS platform project/server"
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   
   Create a `.env` file in the `server` directory with the following variables:
   ```env
   # Server Configuration
   PORT=5000
   NODE_ENV=development

   # Database
   MONGO_URI=mongodb://localhost:27017/lms-platform
   # OR for MongoDB Atlas:
   # MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/lms-platform

   # JWT Configuration
   JWT_SECRET=your-super-secret-jwt-key-change-this-in-production

   # Admin Configuration
   ADMIN=admin@example.com

   # Client URL (Frontend URL)
   CLIENT_URL=http://localhost:3000

   # Cloudinary Configuration
   CLOUD_NAME=your-cloudinary-cloud-name
   CLOUD_API_KEY=your-cloudinary-api-key
   CLOUD_API_SECRET=your-cloudinary-api-secret

   # Stripe Configuration
   STRIPE_PUBLISHABLE_KEY=pk_test_your-stripe-publishable-key
   STRIPE_SECRET_KEY=sk_test_your-stripe-secret-key

   # Google Gemini AI
   GEMINI_API_KEY=your-google-gemini-api-key
   ```

4. **Start the development server**
   ```bash
   npm run dev
   ```

   The server will start on `http://localhost:5000` (or the port specified in your `.env` file).

## 📁 Project Structure

```
server/
├── index.js                 # Main server entry point
├── package.json             # Dependencies and scripts
├── src/
│   ├── config/             # Configuration files
│   │   ├── db.js           # MongoDB connection
│   │   ├── env.js          # Environment variables
│   │   ├── cloudinary.js   # Cloudinary configuration
│   │   └── stripe.js       # Stripe configuration
│   ├── controllers/        # Route controllers
│   │   ├── user.controller.js
│   │   ├── course.controller.js
│   │   ├── module.controller.js
│   │   ├── quiz.controller.js
│   │   ├── comment.controller.js
│   │   ├── payment.controller.js
│   │   └── analytic.controller.js
│   ├── middleware/         # Custom middleware
│   │   ├── auth.middleware.js  # Authentication & authorization
│   │   ├── upload.js           # Image upload handler
│   │   └── video.upload.js     # Video upload handler
│   ├── models/             # Mongoose schemas
│   │   ├── user.model.js
│   │   ├── course.model.js
│   │   ├── modules.model.js
│   │   ├── enrollment.model.js
│   │   ├── order.model.js
│   │   ├── quiz.model.js
│   │   ├── questions.model.js
│   │   └── comment.model.js
│   └── routes/             # API routes
│       ├── user.route.js
│       ├── course.route.js
│       ├── module.route.js
│       ├── quiz.route.js
│       ├── comment.route.js
│       ├── payment.route.js
│       └── analytic.route.js
```

## 🔌 API Endpoints

### Authentication Routes (`/api`)

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST | `/register` | Register a new user | No |
| POST | `/login` | Login user | No |
| GET | `/getUser` | Get current user data | Yes |
| POST | `/logout` | Logout user | Yes |
| POST | `/updateProfile` | Update user profile | Yes |

<br>

### Course Routes (`/api`)
| Method | Endpoint | Description | Auth Required | Admin Only |
|--------|----------|-------------|---------------|------------|
| POST | `/createCourse` | Create a new course | Yes | Yes |
| GET | `/getCourse` | Get all courses (with search) | Yes | No |
| GET | `/getSingleCourse/:id` | Get single course details | Yes | No |
| GET | `/purchasedCourse/:id` | Get purchased course with modules | Yes | No |
| GET | `/getAllCoursePurchase` | Get all purchased courses | Yes | No |

<br>

### Module Routes (`/api`)

| Method | Endpoint | Description | Auth Required | Admin Only |
|--------|----------|-------------|---------------|------------|
| POST | `/createModule` | Create a course module | Yes | Yes |
| GET | `/getModule/:id` | Get single module with comments | Yes | No |
| GET | `/comment/:id` | Get comments for a module | Yes | No |

<br>

### Quiz Routes (`/api/quiz`)

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| GET | `/checkQuiz/:id` | Check if quiz exists for module | Yes |
| POST | `/generateQuiz` | Generate AI-powered quiz | Yes |
| GET | `/getQuiz/:id` | Get quiz with questions | Yes |

<br>

### Comment Routes (`/api/comment`)

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST | `/createComment/:id` | Add comment to module | Yes |

<br>

### Payment Routes (`/api/payment`)

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST | `/checkout` | Create Stripe checkout session | Yes |
| POST | `/checkout-success` | Handle successful payment | Yes |

<br>

### Analytics Routes (`/api/analytic`)

| Method | Endpoint | Description | Auth Required | Admin Only |
|--------|----------|-------------|---------------|------------|
| GET | `/getAnalytic` | Get overall analytics | Yes | Yes |
| GET | `/getDailyData` | Get daily analytics (query: startDate, endDate) | Yes | Yes |

<br>

## 📦 Dependencies

### Core Dependencies

#### [Express.js](https://expressjs.com/) (v5.2.1)
- **Why:** Fast, unopinionated web framework for Node.js
- **Usage:** Main server framework, routing, and middleware handling
- **Link:** https://expressjs.com/

#### [Mongoose](https://mongoosejs.com/) (v9.1.2)
- **Why:** Elegant MongoDB object modeling for Node.js
- **Usage:** Database schema definitions, queries, and data validation
- **Link:** https://mongoosejs.com/

#### [jsonwebtoken](https://github.com/auth0/node-jsonwebtoken) (v9.0.3)
- **Why:** JSON Web Token implementation for secure authentication
- **Usage:** Generating and verifying JWT tokens for user sessions
- **Link:** https://github.com/auth0/node-jsonwebtoken

#### [bcrypt](https://www.npmjs.com/package/bcrypt) (v6.0.0)
- **Why:** Password hashing library for secure password storage
- **Usage:** Hashing user passwords before storing in database
- **Link:** https://www.npmjs.com/package/bcrypt

### Authentication & Security

#### [cookie-parser](https://github.com/expressjs/cookie-parser) (v1.4.7)
- **Why:** Parse Cookie header and populate req.cookies
- **Usage:** Handling httpOnly cookies for JWT token storage
- **Link:** https://github.com/expressjs/cookie-parser

#### [cors](https://github.com/expressjs/cors) (v2.8.5)
- **Why:** Enable Cross-Origin Resource Sharing (CORS)
- **Usage:** Allowing frontend to make requests from different origins
- **Link:** https://github.com/expressjs/cors

### Payment Processing

#### [Stripe](https://stripe.com/docs/api) (v20.1.2)
- **Why:** Payment processing platform for secure transactions
- **Usage:** Creating checkout sessions, handling payments, and managing orders
- **Link:** https://stripe.com/docs/api

### File Upload & Storage

#### [Multer](https://github.com/expressjs/multer) (v2.0.2)
- **Why:** Middleware for handling multipart/form-data (file uploads)
- **Usage:** Processing image and video file uploads
- **Link:** https://github.com/expressjs/multer

#### [Cloudinary](https://cloudinary.com/) (v2.8.0)
- **Why:** Cloud-based image and video management service
- **Usage:** Storing and serving course thumbnails, profile photos, and video content
- **Link:** https://cloudinary.com/

#### [multer-storage-cloudinary](https://www.npmjs.com/package/multer-storage-cloudinary) (v4.0.0)
- **Why:** Cloudinary storage engine for Multer
- **Usage:** Direct upload of files to Cloudinary from Multer
- **Link:** https://www.npmjs.com/package/multer-storage-cloudinary

### AI Integration

#### [@google/generative-ai](https://ai.google.dev/) (v0.24.1)
- **Why:** Google's Generative AI SDK for Gemini models
- **Usage:** AI-powered course search and automatic quiz generation
- **Link:** https://ai.google.dev/

### Development Tools

#### [dotenv](https://github.com/motdotla/dotenv) (v17.2.3)
- **Why:** Loads environment variables from .env file
- **Usage:** Managing configuration and secrets
- **Link:** https://github.com/motdotla/dotenv

#### [nodemon](https://nodemon.io/) (v3.1.11)
- **Why:** Automatically restart Node.js application on file changes
- **Usage:** Development server auto-reload
- **Link:** https://nodemon.io/

## 🔐 Security Features

- **Password Hashing:** All passwords are hashed using bcrypt with salt rounds of 10
- **JWT Authentication:** Secure token-based authentication with httpOnly cookies
- **Role-Based Access Control:** Admin and user roles with middleware protection
- **Input Validation:** Request validation for all endpoints
- **Secure Cookies:** Cookies configured with httpOnly, secure (in production), and sameSite flags
- **CORS Protection:** Configured CORS to allow only trusted origins

## 🧪 Testing

Currently, the project uses a placeholder test script. To add testing:

```bash
# Install testing dependencies (example with Jest)
npm install --save-dev jest supertest

# Run tests
npm test
```

## 🚀 Deployment

### Production Checklist

1. **Environment Variables**
   - Set `NODE_ENV=production`
   - Use strong `JWT_SECRET`
   - Configure production MongoDB URI
   - Set production Cloudinary credentials
   - Use Stripe live keys (not test keys)

2. **Security**
   - Enable HTTPS
   - Set secure cookie flags
   - Configure CORS for production domain
   - Review and update rate limiting

3. **Database**
   - Use MongoDB Atlas or managed MongoDB service
   - Enable database backups
   - Set up connection pooling


## 📝 Environment Variables Reference

| Variable | Description | Required | Example |
|----------|-------------|----------|---------|
| `PORT` | Server port number | Yes | `5000` |
| `MONGO_URI` | MongoDB connection string | Yes | `mongodb://localhost:27017/lms` |
| `JWT_SECRET` | Secret key for JWT tokens | Yes | `your-secret-key` |
| `ADMIN` | Admin user email | Yes | `admin@example.com` |
| `CLIENT_URL` | Frontend application URL | Yes | `http://localhost:3000` |
| `CLOUD_NAME` | Cloudinary cloud name | Yes | `your-cloud-name` |
| `CLOUD_API_KEY` | Cloudinary API key | Yes | `123456789012345` |
| `CLOUD_API_SECRET` | Cloudinary API secret | Yes | `your-api-secret` |
| `STRIPE_PUBLISHABLE_KEY` | Stripe publishable key | Yes | `pk_test_...` |
| `STRIPE_SECRET_KEY` | Stripe secret key | Yes | `sk_test_...` |
| `GEMINI_API_KEY` | Google Gemini API key | Yes | `your-gemini-key` |
| `NODE_ENV` | Environment mode | No | `development` or `production` |

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request


## 👤 Author

**Sourav Kumar**

## 🙏 Acknowledgments

- Express.js community
- MongoDB for excellent database solution
- Stripe for payment processing
- Cloudinary for media management
- Google for Gemini AI capabilities

## 📞 Support

For support, email xsouravkumar357@gmail.com or open an issue in the repository.

---

