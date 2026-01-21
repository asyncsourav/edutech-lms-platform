# LMS Platform - Frontend

A modern, professional React frontend for the LMS Platform built with **React + Vite + Tailwind CSS**. This frontend provides a beautiful, intuitive interface for course management, learning, and administration with premium UI/UX design.

## 🚀 Features

- **User Authentication**
  - Login and registration with JWT-based authentication
  - Secure httpOnly cookie management
  - Automatic role detection (Admin/User)
  - Protected routes and role-based navigation

- **Course Management**
  - Browse and search courses with AI-powered search
  - Course detail pages with purchase functionality
  - Course learning interface with video playback
  - Course filtering and categorization

- **🆕 Purchased Courses Quick Access**
  - Header badge showing purchased course count
  - Dropdown menu with all purchased courses
  - Quick navigation to learning pages
  - Course preview with thumbnails and prices

- **Learning Experience**
  - Video player for course modules
  - Comments system for each module
  - AI-generated quizzes with instant feedback
  - Progress tracking
  - Responsive learning interface

- **Payment Integration**
  - Stripe checkout integration
  - Secure payment processing
  - Purchase success handling
  - Order confirmation

- **Advanced Admin Dashboard**
  - **NEW:** Course management section with edit, delete, hide options
  - Course creation interface
  - Analytics dashboard with user, course, and revenue statistics
  - Daily analytics with date range filtering
  - Professional dashboard layouts

- **User Profile**
  - Profile photo upload
  - Name and information updates
  - Profile management
  - Professional profile interface

- **Professional Theme Support**
  - Dark/Light mode toggle
  - Theme persistence across sessions
  - Smooth theme transitions
  - Premium color schemes

- **Professional UI/UX**
  - Modern, responsive design inspired by leading platforms
  - Beautiful gradient backgrounds
  - Card-based layouts
  - Smooth animations and transitions
  - Professional typography
  - Comprehensive error handling
  - Loading states and skeleton screens

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
│   │   ├── auth.jsx               # Authentication context (NEW: auth provider)
│   │   ├── theme.jsx              # Theme context provider
│   │   └── utils.js               # Utility functions (cn helper)
│   ├── components/                # Reusable components
│   │   ├── ui/                    # Basic UI components
│   │   │   ├── button.jsx        # Button component
│   │   │   ├── input.jsx         # Input component
│   │   │   ├── card.jsx          # Card components
│   │   │   └── textarea.jsx      # Textarea component
│   │   ├── layout/                # Layout components
│   │   │   ├── Header.jsx        # Navigation header (NEW: purchased courses dropdown)
│   │   │   ├── Footer.jsx        # Footer component
│   │   │   └── Layout.jsx        # Main layout wrapper
│   │   └── ProtectedRoute.jsx     # Route protection component
│   └── pages/                     # Page components
│       ├── LoginPage.jsx          # Login screen (ENHANCED UI)
│       ├── RegisterPage.jsx       # Registration screen (ENHANCED UI)
│       ├── DashboardPage.jsx      # Course listing dashboard (ENHANCED UI)
│       ├── CourseDetailPage.jsx   # Course details and purchase (ENHANCED UI)
│       ├── CourseLearnPage.jsx   # Course learning interface (ENHANCED UI)
│       ├── QuizPage.jsx           # Quiz taking interface (ENHANCED UI)
│       ├── ProfilePage.jsx        # User profile management (ENHANCED UI)
│       ├── AdminDashboardPage.jsx # Admin dashboard (NEW: course management section)
│       └── PurchaseSuccessPage.jsx # Payment success handler (ENHANCED UI)
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

// NEW - Course management endpoints
await api.put(`/editCourse/${courseId}`, formData);
await api.delete(`/deleteCourse/${courseId}`);
await api.patch(`/hideCourse/${courseId}`);
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

### Design Improvements

The application features a **premium, professional UI** inspired by leading edtech platforms:

1. **Color Scheme:** Gradient backgrounds with complementary colors
2. **Typography:** Readable fonts with proper hierarchy
3. **Spacing:** Consistent padding and margins
4. **Cards:** Beautiful card-based layouts
5. **Transitions:** Smooth hover effects and animations
6. **Icons:** Lucide icons for visual clarity
7. **Responsiveness:** Mobile-first design approach
8. **Accessibility:** Semantic HTML and ARIA labels

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

## 🎯 New Features Explained

### 1. Purchased Courses Dropdown (NEW)

**Location:** Header component

**Features:**
- Badge showing count of purchased courses
- Dropdown menu with all purchased courses
- Course thumbnails and prices
- Direct links to learning pages
- Responsive design

**How to use:**
1. Purchase a course
2. Badge appears in header with count
3. Click button to open dropdown
4. Click course to start learning

### 2. Admin Course Management (NEW)

**Location:** Admin Dashboard → Manage Your Courses section

**Features:**
- View all created courses
- Edit course details (title, description, price, thumbnail)
- Delete courses permanently
- Hide/unhide courses
- Course thumbnail previews
- Module count display

**How to use:**
1. Go to Admin Dashboard (`/admin`)
2. Scroll to "Manage Your Courses" section
3. Click Edit, Delete, or Hide buttons
4. Changes apply immediately

### 3. Authentication Flow

1. User logs in → Backend sets httpOnly cookie
2. Frontend stores user data in component state
3. All API requests automatically include cookie
4. On logout → Cookie cleared → Redirect to login

### 4. Course Purchase Flow

1. User clicks "Buy with Stripe" → Frontend calls `/api/checkout`
2. Backend creates Stripe session → Returns checkout URL
3. User redirected to Stripe → Completes payment
4. Stripe redirects to `/purchase?session_id=xxx`
5. Frontend calls `/api/payment/checkout-success` → Backend verifies and enrolls

### 5. Theme System

1. Theme preference stored in localStorage
2. `ThemeProvider` manages theme state
3. Adds/removes `dark` class on `<html>` element
4. Tailwind CSS applies dark mode styles automatically

<br>

## 🎨 UI/UX Improvements Summary

### Pages Enhanced

| Page | Improvements |
|------|--------------|
| **Login/Register** | Modern card-based forms, gradient backgrounds, validation messages |
| **Dashboard** | Grid layouts, course cards with images, search bar, stats cards |
| **Course Detail** | Rich information display, purchase options, module list |
| **Learning** | Clean video player, comments section, quiz access |
| **Admin Dashboard** | Course management section, analytics cards, daily data table |
| **Profile** | Professional profile card, photo upload, information display |
| **Header** | Sticky navigation, dropdown menus, theme toggle |

### Design Elements

- **Gradients:** Subtle gradient backgrounds for visual appeal
- **Cards:** Consistent card-based layouts with shadows
- **Icons:** Lucide icons for better communication
- **Colors:** Professional color scheme with light/dark variants
- **Spacing:** Consistent padding and margins
- **Typography:** Clear hierarchy and readable fonts
- **Transitions:** Smooth hover effects and animations
- **Loading States:** Professional spinners and skeleton loaders
- **Error Handling:** User-friendly error messages

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

### Issue: Purchased courses dropdown not showing
**Solution:** Ensure user has logged in and at least one course has been purchased. Check network tab for API errors.

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
