# LMS Platform - Frontend

A modern, beginner-friendly React frontend for the LMS Platform built with **React + Vite + Tailwind CSS**. This frontend provides a clean, intuitive interface for course management, learning, and administration.

## 🚀 Features

- **User Authentication**
  - Login and registration with JWT-based authentication
  - Secure httpOnly cookie management
  - Automatic role detection (Admin/User)

- **Course Management**
  - Browse and search courses with AI-powered search
  - Course detail pages with purchase functionality
  - Course learning interface with video playback

- **Learning Experience**
  - Video player for course modules
  - Comments system for each module
  - AI-generated quizzes with instant feedback
  - Progress tracking

- **Payment Integration**
  - Stripe checkout integration
  - Secure payment processing
  - Purchase success handling

- **Admin Dashboard**
  - Course creation interface
  - Analytics dashboard with user, course, and revenue statistics
  - Daily analytics with date range filtering

- **User Profile**
  - Profile photo upload
  - Name and information updates
  - Profile management

- **Theme Support**
  - Dark/Light mode toggle
  - Theme persistence across sessions
  - Smooth theme transitions

<br>

## 📋 Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v18 or higher) - [Download Node.js](https://nodejs.org/)
- **npm** or **yarn** package manager
- **Backend server** running (see `server/README.md`)

<br>

## 🛠️ Installation

1. **Navigate to client directory**
   ```bash
   cd client
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   
   Create a `.env` file in the `client` directory:
   ```env
   VITE_API_URL=http://localhost:5000
   VITE_ADMIN_EMAIL=admin@example.com
   ```
   
   - `VITE_API_URL`: Backend API URL (must match backend `PORT`)
   - `VITE_ADMIN_EMAIL`: Admin email address (must match backend `ADMIN`)

4. **Start development server**
   ```bash
   npm run dev
   ```

   The app will start on `http://localhost:5173` (or the next available port).

<br>

## 📁 Project Structure

```
client/
├── src/
│   ├── main.jsx                    # Entry point
│   ├── App.jsx                     # Main app component with routing
│   ├── index.css                   # Global styles and Tailwind CSS
│   ├── lib/                        # Utility files
│   │   ├── api.js                 # Axios instance with API configuration
│   │   ├── theme.jsx              # Theme context provider
│   │   └── utils.js               # Utility functions (cn helper)
│   ├── components/                # Reusable components
│   │   ├── ui/                    # Basic UI components
│   │   │   ├── button.jsx        # Button component
│   │   │   ├── input.jsx         # Input component
│   │   │   ├── card.jsx          # Card components
│   │   │   └── textarea.jsx      # Textarea component
│   │   └── layout/                # Layout components
│   │       ├── Header.jsx        # Navigation header
│   │       └── Layout.jsx        # Main layout wrapper
│   └── pages/                     # Page components
│       ├── LoginPage.jsx          # Login screen
│       ├── RegisterPage.jsx       # Registration screen
│       ├── DashboardPage.jsx      # Course listing dashboard
│       ├── CourseDetailPage.jsx   # Course details and purchase
│       ├── CourseLearnPage.jsx   # Course learning interface
│       ├── QuizPage.jsx           # Quiz taking interface
│       ├── ProfilePage.jsx        # User profile management
│       ├── AdminDashboardPage.jsx # Admin dashboard
│       └── PurchaseSuccessPage.jsx # Payment success handler
├── .env                           # Environment variables (not in git)
├── .env.example                   # Environment variables template
├── package.json                   # Dependencies and scripts
├── tailwind.config.js            # Tailwind CSS configuration
├── postcss.config.js             # PostCSS configuration
├── vite.config.js                # Vite configuration
├── README.md                      # This file
└── FRONTEND_EXPLAINED.md         # Detailed beginner's guide
```

<br>

## 🔌 API Integration

The frontend communicates with the backend through a centralized API utility (`lib/api.js`):

### API Configuration

```javascript
import api from './lib/api';

// GET request
const response = await api.get('/getUser');
const user = response.data;

// POST request
await api.post('/login', { email, password });

// POST with file upload
const formData = new FormData();
formData.append('file', file);
await api.post('/updateProfile', formData, {
  headers: { 'Content-Type': 'multipart/form-data' }
});
```

### Authentication

- Uses httpOnly cookies for JWT tokens
- Automatically sends cookies with every request (`withCredentials: true`)
- Redirects to login on 401 errors

<br>

## 🎨 Styling

### Tailwind CSS

The project uses Tailwind CSS for styling. All styles are utility-based:

```jsx
<div className="container mx-auto px-4 py-8">
  <h1 className="text-3xl font-bold">Title</h1>
</div>
```

### Dark Mode

Dark mode is implemented using Tailwind's dark mode feature:

```jsx
<div className="bg-white dark:bg-gray-900">
  <p className="text-black dark:text-white">Text</p>
</div>
```

Theme preference is stored in localStorage and persists across sessions.

<br>

## 📦 Dependencies

### Core Dependencies

#### [React](https://react.dev/) (v19.2.0)
- **Why:** JavaScript library for building user interfaces
- **Usage:** Component-based UI development
- **Link:** https://react.dev/

#### [React Router DOM](https://reactrouter.com/) (v7.12.0)
- **Why:** Declarative routing for React applications
- **Usage:** Navigation between pages and route management
- **Link:** https://reactrouter.com/

#### [Vite](https://vitejs.dev/) (v7.2.4)
- **Why:** Fast build tool and development server
- **Usage:** Development server, hot module replacement, production builds
- **Link:** https://vitejs.dev/

#### [Axios](https://axios-http.com/) (v1.13.2)
- **Why:** Promise-based HTTP client for API requests
- **Usage:** All backend API communication
- **Link:** https://axios-http.com/

#### [Tailwind CSS](https://tailwindcss.com/) (v4.1.18)
- **Why:** Utility-first CSS framework
- **Usage:** Styling all components and pages
- **Link:** https://tailwindcss.com/

### UI & Icons

#### [Lucide React](https://lucide.dev/) (v0.562.0)
- **Why:** Beautiful, consistent icon library
- **Usage:** Icons throughout the application
- **Link:** https://lucide.dev/

#### [clsx](https://github.com/lukeed/clsx) (v2.1.1)
- **Why:** Utility for constructing className strings
- **Usage:** Conditional class names
- **Link:** https://github.com/lukeed/clsx

#### [tailwind-merge](https://github.com/dcastil/tailwind-merge) (v3.4.0)
- **Why:** Merge Tailwind CSS classes without conflicts
- **Usage:** Combining Tailwind classes safely
- **Link:** https://github.com/dcastil/tailwind-merge

<br>

## 🧪 Available Scripts

### Development

```bash
npm run dev
```
Starts the development server with hot module replacement.

### Build

```bash
npm run build
```
Creates an optimized production build in the `dist` directory.

### Preview

```bash
npm run preview
```
Previews the production build locally.

### Lint

```bash
npm run lint
```
Runs ESLint to check for code issues.

<br>

## 🔐 Environment Variables

| Variable | Description | Required | Example |
|----------|-------------|----------|---------|
| `VITE_API_URL` | Backend API base URL | Yes | `http://localhost:5000` |
| `VITE_ADMIN_EMAIL` | Admin email for role detection | Yes | `admin@example.com` |

**Important Notes:**
- All frontend environment variables must start with `VITE_`
- Access them using `import.meta.env.VITE_API_URL`
- Never commit `.env` file to version control

<br>

## 🎯 Key Features Explained

### Authentication Flow

1. User logs in → Backend sets httpOnly cookie
2. Frontend stores user data in component state
3. All API requests automatically include cookie
4. On logout → Cookie cleared → Redirect to login

### Course Purchase Flow

1. User clicks "Buy with Stripe" → Frontend calls `/api/checkout`
2. Backend creates Stripe session → Returns checkout URL
3. User redirected to Stripe → Completes payment
4. Stripe redirects to `/purchase?session_id=xxx`
5. Frontend calls `/api/payment/checkout-success` → Backend verifies and enrolls

### Theme System

1. Theme preference stored in localStorage
2. `ThemeProvider` manages theme state
3. Adds/removes `dark` class on `<html>` element
4. Tailwind CSS applies dark mode styles automatically

<br>

## 📚 Further Documentation

- **Beginner's Guide:** See `FRONTEND_EXPLAINED.md` for detailed explanations of every component and data flow
- **Backend API:** See `../server/README.md` for API documentation
- **Root README:** See `../README.md` for project overview

<br>

## 🐛 Troubleshooting

### Issue: API calls fail with CORS error
**Solution:** Ensure backend `CLIENT_URL` matches frontend URL and CORS is configured correctly.

### Issue: Cookies not being sent
**Solution:** Verify `withCredentials: true` in `lib/api.js` and backend CORS allows credentials.

### Issue: Theme not persisting
**Solution:** Check browser localStorage - theme preference is stored there.

### Issue: Build fails
**Solution:** Ensure all environment variables are set and Node.js version is 18+.

<br>

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

<br>

## 👤 Author

**Sourav Kumar**

## 🙏 Acknowledgments

- React team for the amazing framework
- Vite for the fast build tool
- Tailwind CSS for the utility-first approach
- Lucide for beautiful icons
- All open-source contributors

<br>

## 📞 Support

For support, email xsouravkumar357@gmail.com or open an issue in the repository.

---
