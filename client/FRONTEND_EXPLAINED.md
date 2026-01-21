# Frontend Architecture Explained - Beginner's Guide

This document explains every part of the frontend codebase in simple terms, so you can understand how everything works together.

---

## 📁 Project Structure

```
client/
├── src/
│   ├── main.jsx              # Entry point - starts the React app
│   ├── App.jsx               # Main app component with routing
│   ├── index.css             # Global styles and Tailwind CSS
│   ├── lib/                  # Utility files
│   │   ├── api.js           # Axios configuration for API calls
│   │   ├── theme.jsx        # Theme context (dark/light mode)
│   │   └── utils.js         # Helper functions
│   ├── components/          # Reusable UI components
│   │   ├── ui/              # Basic UI components (Button, Input, Card)
│   │   └── layout/          # Layout components (Header, Layout)
│   └── pages/               # Page components (screens)
│       ├── LoginPage.jsx
│       ├── RegisterPage.jsx
│       ├── DashboardPage.jsx
│       ├── CourseDetailPage.jsx
│       ├── CourseLearnPage.jsx
│       ├── QuizPage.jsx
│       ├── ProfilePage.jsx
│       ├── AdminDashboardPage.jsx
│       └── PurchaseSuccessPage.jsx
├── .env                     # Environment variables
└── package.json             # Dependencies and scripts
```

---

## 🔧 How It Works - Step by Step

### 1. **Starting the App (`main.jsx`)**

```jsx
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>
)
```

**What happens:**
- React finds the `<div id="root">` in `index.html`
- It renders the `App` component inside it
- `StrictMode` helps catch bugs during development

---

### 2. **Main App Component (`App.jsx`)**

```jsx
<ThemeProvider>
  <BrowserRouter>
    <Layout>
      <Routes>
        <Route path="/" element={<DashboardPage />} />
        <Route path="/login" element={<LoginPage />} />
        ...
      </Routes>
    </Layout>
  </BrowserRouter>
</ThemeProvider>
```

**What happens:**
- `ThemeProvider`: Wraps the app to provide dark/light theme to all components
- `BrowserRouter`: Enables routing (navigation between pages)
- `Layout`: Wraps all pages with Header and common layout
- `Routes`: Defines which component to show for each URL path

**Example:**
- User visits `http://localhost:5173/login` → Shows `LoginPage`
- User visits `http://localhost:5173/` → Shows `DashboardPage`

---

### 3. **API Communication (`lib/api.js`)**

```javascript
const api = axios.create({
  baseURL: `${API_URL}/api`,
  withCredentials: true,  // Sends cookies automatically
});
```

**What happens:**
- Creates an axios instance configured to talk to your backend
- `baseURL`: All requests go to `http://localhost:5000/api`
- `withCredentials: true`: Automatically sends cookies (JWT tokens) with every request
- Interceptors handle errors globally (e.g., redirect to login if unauthorized)

**How to use:**
```javascript
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

---

### 4. **Theme System (`lib/theme.jsx`)**

```jsx
const [theme, setTheme] = useState(() => {
  const savedTheme = localStorage.getItem('theme');
  return savedTheme || 'light';
});

useEffect(() => {
  if (theme === 'dark') {
    document.documentElement.classList.add('dark');
  } else {
    document.documentElement.classList.remove('dark');
  }
  localStorage.setItem('theme', theme);
}, [theme]);
```

**What happens:**
- Stores theme preference in browser's localStorage
- Adds/removes `dark` class on `<html>` element
- Tailwind CSS uses this class to apply dark mode styles
- All components automatically get dark mode when theme changes

**How to use in components:**
```jsx
import { useTheme } from '../lib/theme';

function MyComponent() {
  const { theme, toggleTheme } = useTheme();
  
  return (
    <button onClick={toggleTheme}>
      Current theme: {theme}
    </button>
  );
}
```

---

### 5. **Authentication Flow**

#### **Login Process (`pages/LoginPage.jsx`)**

```jsx
const handleSubmit = async (e) => {
  e.preventDefault();
  
  // 1. Send login request to backend
  const response = await api.post('/login', { email, password });
  
  // 2. Backend sets httpOnly cookie with JWT token
  // 3. Get user data to check if admin
  const userResponse = await api.get('/getUser');
  const isAdmin = userResponse.data.email === import.meta.env.VITE_ADMIN_EMAIL;
  
  // 4. Redirect based on role
  if (isAdmin) {
    navigate('/admin');
  } else {
    navigate('/');
  }
};
```

**What happens:**
1. User enters email/password and clicks "Login"
2. Frontend sends POST request to `/api/login`
3. Backend validates credentials and sets httpOnly cookie with JWT token
4. Frontend fetches user data to check role
5. Redirects to admin dashboard or regular dashboard

**Why httpOnly cookies?**
- More secure than storing tokens in localStorage
- JavaScript cannot access them (prevents XSS attacks)
- Automatically sent with every request via `withCredentials: true`

---

### 6. **Data Fetching Pattern**

#### **Example: Dashboard Page (`pages/DashboardPage.jsx`)**

```jsx
const [courses, setCourses] = useState([]);
const [loading, setLoading] = useState(true);

useEffect(() => {
  fetchCourses();
}, []);

const fetchCourses = async () => {
  try {
    setLoading(true);
    const response = await api.get('/getCourse');
    setCourses(response.data.courses || []);
  } catch (error) {
    console.error('Error:', error);
  } finally {
    setLoading(false);
  }
};
```

**What happens:**
1. Component mounts → `useEffect` runs → calls `fetchCourses()`
2. Shows loading state (`loading = true`)
3. Sends GET request to `/api/getCourse`
4. Backend returns courses array
5. Updates state with `setCourses()`
6. Component re-renders with courses displayed
7. Hides loading state (`loading = false`)

**Why useState?**
- `courses`: Stores the list of courses
- `loading`: Tracks if data is being fetched
- `setCourses()`: Updates state → triggers re-render → UI updates

---

### 7. **Form Submission Pattern**

#### **Example: Creating a Comment (`pages/CourseLearnPage.jsx`)**

```jsx
const [newComment, setNewComment] = useState('');

const handleCommentSubmit = async (e) => {
  e.preventDefault();  // Prevents page refresh
  
  // 1. Send comment to backend
  await api.post(`/comment/createComment/${moduleId}`, {
    comment: newComment,
  });
  
  // 2. Clear input
  setNewComment('');
  
  // 3. Refresh comments list
  fetchModuleDetails();
};
```

**What happens:**
1. User types comment → `setNewComment()` updates state
2. User clicks "Post Comment" → form submits
3. `e.preventDefault()` stops page refresh
4. Sends POST request with comment text
5. Backend saves comment to database
6. Frontend clears input and refreshes comments list

---

### 8. **File Upload Pattern**

#### **Example: Profile Photo Upload (`pages/ProfilePage.jsx`)**

```jsx
const [profilePhoto, setProfilePhoto] = useState(null);

const handleFileChange = (e) => {
  const file = e.target.files[0];
  setProfilePhoto(file);
  
  // Show preview
  const reader = new FileReader();
  reader.onloadend = () => {
    setPreview(reader.result);
  };
  reader.readAsDataURL(file);
};

const handleSubmit = async (e) => {
  e.preventDefault();
  
  const formData = new FormData();
  formData.append('fullName', fullName);
  formData.append('profilePhoto', profilePhoto);
  
  await api.post('/updateProfile', formData, {
    headers: { 'Content-Type': 'multipart/form-data' }
  });
};
```

**What happens:**
1. User selects file → `handleFileChange()` runs
2. File stored in state, preview shown using FileReader
3. User clicks "Update Profile" → `handleSubmit()` runs
4. Creates FormData object and appends file
5. Sends POST request with `multipart/form-data` header
6. Backend receives file, uploads to Cloudinary, saves URL

---

### 9. **Protected Routes**

Currently, we don't have route protection middleware, but the Header component checks authentication:

```jsx
useEffect(() => {
  const fetchUser = async () => {
    try {
      const response = await api.get('/getUser');
      setUser(response.data);
    } catch (error) {
      setUser(null);  // Not logged in
    }
  };
  fetchUser();
}, []);
```

**What happens:**
- Header tries to fetch user data on mount
- If successful → user is logged in → show logout button
- If error (401) → user not logged in → show login/register buttons

**Note:** Backend protects routes - if user not logged in, API returns 401, and interceptor redirects to login.

---

### 10. **State Management (No Redux)**

We use React's built-in `useState` and `useEffect` for state management:

**Local State (Component-level):**
```jsx
const [courses, setCourses] = useState([]);  // Only in DashboardPage
```

**Shared State (Context):**
```jsx
// Theme is shared via Context (lib/theme.jsx)
const { theme, toggleTheme } = useTheme();  // Available everywhere
```

**Why no Redux?**
- Simple state needs → useState is enough
- Only theme needs to be shared → Context is perfect
- Less complexity → easier to understand for beginners

---

## 🔄 Complete Data Flow Examples

### Example 1: User Logs In

```
1. User fills login form → clicks "Login"
   ↓
2. LoginPage.jsx: handleSubmit() runs
   ↓
3. api.post('/login', { email, password })
   ↓
4. Backend validates → sets httpOnly cookie → returns success
   ↓
5. LoginPage.jsx: api.get('/getUser') to check role
   ↓
6. Backend reads cookie → returns user data
   ↓
7. LoginPage.jsx: navigate('/admin') or navigate('/')
   ↓
8. DashboardPage renders → fetches courses
```

### Example 2: User Purchases Course

```
1. User clicks "Buy with Stripe" on CourseDetailPage
   ↓
2. CourseDetailPage.jsx: handlePurchase() runs
   ↓
3. api.post('/checkout', { products: { _id: courseId } })
   ↓
4. Backend creates Stripe session → returns checkout URL
   ↓
5. window.location.href = checkoutUrl (redirects to Stripe)
   ↓
6. User completes payment on Stripe
   ↓
7. Stripe redirects to /purchase?session_id=xxx
   ↓
8. PurchaseSuccessPage.jsx: finalizePurchase() runs
   ↓
9. api.post('/payment/checkout-success', { sessionId })
   ↓
10. Backend verifies payment → creates order → enrolls user
    ↓
11. PurchaseSuccessPage shows success message
```

### Example 3: User Watches Module Video

```
1. User clicks module in CourseLearnPage
   ↓
2. CourseLearnPage.jsx: setSelectedModule(module)
   ↓
3. useEffect detects change → fetchModuleDetails() runs
   ↓
4. api.get(`/getModule/${moduleId}`)
   ↓
5. Backend returns module with video URL and comments
   ↓
6. CourseLearnPage renders video player and comments
   ↓
7. User adds comment → handleCommentSubmit() runs
   ↓
8. api.post(`/comment/createComment/${moduleId}`, { comment })
   ↓
9. Backend saves comment → returns success
   ↓
10. CourseLearnPage: fetchModuleDetails() refreshes comments
```

---

## 🎨 Styling System

### Tailwind CSS

We use Tailwind CSS for styling. Classes are applied directly to elements:

```jsx
<div className="container mx-auto px-4 py-8">
  <h1 className="text-3xl font-bold">Title</h1>
</div>
```

**Common classes:**
- `container`: Max-width container
- `mx-auto`: Center horizontally
- `px-4`: Horizontal padding
- `text-3xl`: Large text size
- `font-bold`: Bold text
- `bg-primary`: Primary background color
- `text-primary-foreground`: Text color that contrasts with primary

### Dark Mode

Tailwind uses the `dark:` prefix for dark mode styles:

```jsx
<div className="bg-white dark:bg-gray-900">
  <p className="text-black dark:text-white">Text</p>
</div>
```

When `dark` class is on `<html>`, dark mode styles apply automatically.

---

## 📦 Component Breakdown

### UI Components (`components/ui/`)

**Button (`button.jsx`):**
- Reusable button with variants (default, outline, ghost, etc.)
- Handles different sizes and styles
- Used throughout the app for consistency

**Input (`input.jsx`):**
- Styled input field
- Consistent appearance across forms
- Supports all input types

**Card (`card.jsx`):**
- Container component for grouping content
- Includes CardHeader, CardTitle, CardContent, CardFooter
- Used for course cards, forms, etc.

### Layout Components (`components/layout/`)

**Header (`Header.jsx`):**
- Navigation bar at top of every page
- Shows user info, theme toggle, logout button
- Fetches user data on mount

**Layout (`Layout.jsx`):**
- Wraps all pages
- Includes Header and main content area
- Provides consistent page structure

---

## 🔐 Environment Variables

Create a `.env` file in the `client` folder:

```env
VITE_API_URL=http://localhost:5000
VITE_ADMIN_EMAIL=admin@example.com
```

**Important:**
- All frontend env vars must start with `VITE_`
- Access them with `import.meta.env.VITE_API_URL`
- Never commit `.env` to git (already in .gitignore)

---

## 🚀 Running the App

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Start development server:**
   ```bash
   npm run dev
   ```

3. **Build for production:**
   ```bash
   npm run build
   ```

4. **Preview production build:**
   ```bash
   npm run preview
   ```

---

## 🐛 Common Issues & Solutions

### Issue: API calls fail with CORS error
**Solution:** Make sure backend `CLIENT_URL` matches frontend URL (e.g., `http://localhost:5173`)

### Issue: Cookies not being sent
**Solution:** Ensure `withCredentials: true` in `api.js` and backend CORS allows credentials

### Issue: Theme not persisting
**Solution:** Check browser localStorage - theme is saved there

### Issue: Images not loading
**Solution:** Check image URLs are correct and accessible (Cloudinary URLs)

---

## 📚 Key React Concepts Used

1. **useState:** Store component state (data that changes)
2. **useEffect:** Run code when component mounts or dependencies change
3. **useContext:** Access theme context from any component
4. **useNavigate:** Programmatically navigate between pages
5. **useParams:** Get URL parameters (e.g., course ID)
6. **useSearchParams:** Get query parameters (e.g., session_id)

---

## 🎯 Best Practices Followed

1. **Separation of Concerns:** API calls in `api.js`, UI in components
2. **Reusable Components:** Button, Input, Card used everywhere
3. **Error Handling:** Try-catch blocks and user-friendly error messages
4. **Loading States:** Show loading indicators during API calls
5. **Form Validation:** Required fields and proper input types
6. **Responsive Design:** Mobile-friendly with Tailwind breakpoints

---

This frontend is designed to be simple and beginner-friendly while still being production-ready. Every component is self-contained and easy to understand. If you have questions about any specific part, refer to the inline comments in the code!

