

import { Link, useNavigate } from 'react-router-dom';
import { useTheme } from '../../lib/theme';
import { useAuth } from '../../lib/auth';
import { Moon, Sun, LogOut, User, Home, GraduationCap, BookOpen } from 'lucide-react';
import { Button } from '../ui/button';
import { useState, useEffect } from 'react';
import api from '../../lib/api';

export function Header() {

  const { theme, toggleTheme } = useTheme();
  const { user, loading, logout, isAdmin } = useAuth();
  const navigate = useNavigate();
  const [purchasedCoursesCount, setPurchasedCoursesCount] = useState(0);
  const [showPurchasedDropdown, setShowPurchasedDropdown] = useState(false);
  const [purchasedCourses, setPurchasedCourses] = useState([]);
  const [loadingCourses, setLoadingCourses] = useState(false);

  useEffect(() => {
    if (user) {
      fetchPurchasedCourses();
    }
  }, [user]);

  const fetchPurchasedCourses = async () => {
    try {
      setLoadingCourses(true);
      const response = await api.get('/getAllCoursePurchase');
      const courses = response.data.courses || [];
      setPurchasedCoursesCount(courses.length);
      setPurchasedCourses(courses);
    } catch (error) {
      console.error('Error fetching purchased courses:', error);
    } finally {
      setLoadingCourses(false);
    }
  };

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  if (loading) {
    return (
      <header className="sticky top-0 z-50 border-b bg-background/95 backdrop-blur">
        <div className="mx-auto flex h-16 max-w-[1200px] items-center px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2 text-lg font-semibold">
            <GraduationCap className="h-6 w-6 text-primary" />
            LMS Platform
          </div>
        </div>
      </header>
    );
  }



  return (
    <header className="sticky top-0 z-50 border-b bg-background/95 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-[1200px] items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <Link
          to="/"
          className="flex items-center gap-2 text-lg font-semibold transition-colors hover:text-primary"
        >
          <GraduationCap className="h-6 w-6 text-primary" />
          <span className="hidden sm:inline">LMS Platform</span>
        </Link>

        {/* Navigation */}
        <nav className="flex items-center gap-2 sm:gap-3">
          {user ? (
            <>
              <Link to="/">
                <Button variant="ghost" size="icon" title="Home">
                  <Home className="h-5 w-5" />
                </Button>
              </Link>

              {/* Main Courses button (goes to all courses) */}
              <Link to="/dashboard">
                <Button variant="outline" size="sm" className="hidden sm:flex">
                  <BookOpen className="mr-2 h-4 w-4" />
                  <span className="hidden sm:inline">Courses</span>
                </Button>
              </Link>

              {/* My Purchased Courses dropdown (separate) */}
              <div className="relative">
                <Button
                  variant="outline"
                  size="sm"
                  className="ml-2"
                  onClick={() => setShowPurchasedDropdown(!showPurchasedDropdown)}
                  title="My Courses"
                >
                  <BookOpen className="mr-2 h-4 w-4" />
                  <span className="hidden sm:inline">My Courses</span>
                  {purchasedCoursesCount > 0 && (
                    <span className="ml-1 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white transform translate-x-1/2 -translate-y-1/2 bg-primary rounded-full">
                      {purchasedCoursesCount}
                    </span>
                  )}
                </Button>

                {showPurchasedDropdown && (
                  <div className="absolute right-0 mt-2 w-80 bg-background border border-border rounded-lg shadow-lg z-50">
                    <div className="p-4 border-b">
                      <h3 className="font-semibold">My Purchased Courses ({purchasedCoursesCount})</h3>
                    </div>
                    <div className="max-h-96 overflow-y-auto">
                      {loadingCourses ? (
                        <div className="p-4 text-center text-sm text-muted-foreground">Loading...</div>
                      ) : purchasedCourses.length === 0 ? (
                        <div className="p-4 text-center text-sm text-muted-foreground">No courses purchased yet</div>
                      ) : (
                        purchasedCourses.map((course) => (
                          <Link key={course._id} to={`/course/${course._id}/learn`}>
                            <div
                              className="p-3 border-b hover:bg-accent transition-colors cursor-pointer"
                              onClick={() => setShowPurchasedDropdown(false)}
                            >
                              {course.thumbnail && (
                                <img
                                  src={course.thumbnail}
                                  alt={course.title}
                                  className="w-full h-32 object-cover rounded mb-2"
                                />
                              )}
                              <h4 className="font-medium text-sm line-clamp-2">{course.title}</h4>
                              <p className="text-xs text-muted-foreground mt-1">₹{course.amount}</p>
                            </div>
                          </Link>
                        ))
                      )}
                    </div>
                  </div>
                )}
              </div>

              {isAdmin && (
                <Link to="/admin">
                  <Button variant="outline" size="sm" className="hidden sm:flex">
                    <User className="mr-2 h-4 w-4" />
                    Admin
                  </Button>
                </Link>
              )}

              <Link to="/profile">
                <div className="flex items-center gap-2 rounded-lg px-2 py-1.5 hover:bg-accent transition-colors">
                  {user.profilePhoto ? (
                    <img
                      src={user.profilePhoto}
                      alt={user.fullName}
                      className="h-8 w-8 rounded-full object-cover border border-primary"
                    />
                  ) : (
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10">
                      <User className="h-4 w-4 text-primary" />
                    </div>
                  )}
                  <span className="hidden text-sm font-medium md:block">
                    {user.fullName}
                  </span>
                </div>
              </Link>

              <Button
                variant="ghost"
                size="icon"
                onClick={toggleTheme}
                title="Toggle theme"
              >
                {theme === 'dark' ? (
                  <Sun className="h-5 w-5" />
                ) : (
                  <Moon className="h-5 w-5" />
                )}
              </Button>

              <Button
                variant="ghost"
                size="icon"
                onClick={handleLogout}
                title="Logout"
              >
                <LogOut className="h-5 w-5" />
              </Button>
            </>
          ) : (
            <>
              <Button
                variant="ghost"
                size="icon"
                onClick={toggleTheme}
                title="Toggle theme"
              >
                {theme === 'dark' ? (
                  <Sun className="h-5 w-5" />
                ) : (
                  <Moon className="h-5 w-5" />
                )}
              </Button>

              <Link to="/login">
                <Button variant="outline" size="sm">
                  Login
                </Button>
              </Link>

              <Link to="/register">
                <Button size="sm">Sign Up</Button>
              </Link>
            </>
          )}
        </nav>
      </div>
    </header>
  );
}

