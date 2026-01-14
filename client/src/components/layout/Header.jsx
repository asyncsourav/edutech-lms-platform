

import { Link, useNavigate } from 'react-router-dom';
import { useTheme } from '../../lib/theme';
import { useAuth } from '../../lib/auth';
import { Moon, Sun, LogOut, User, Home, GraduationCap } from 'lucide-react';
import { Button } from '../ui/button';

export function Header() {

  const { theme, toggleTheme } = useTheme();
  const { user, loading, logout, isAdmin } = useAuth();
  const navigate = useNavigate();

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
          <span>LMS Platform</span>
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

