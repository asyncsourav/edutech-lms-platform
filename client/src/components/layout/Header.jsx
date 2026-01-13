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
      <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="text-xl font-bold flex items-center gap-2">
            <GraduationCap className="h-6 w-6 text-primary" />
            LMS Platform
          </div>
        </div>
      </header>
    );
  }

  return (
    <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50 shadow-sm">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <Link to="/" className="text-xl font-bold flex items-center gap-2 hover:text-primary transition-colors">
          <GraduationCap className="h-6 w-6 text-primary" />
          <span>LMS Platform</span>
        </Link>

        <nav className="flex items-center gap-3">
          {user ? (
            <>
              <Link to="/">
                <Button variant="ghost" size="icon" title="Home">
                  <Home className="h-5 w-5" />
                </Button>
              </Link>
              {isAdmin && (
                <Link to="/admin">
                  <Button variant="outline" size="sm">
                    <User className="mr-2 h-4 w-4" />
                    Admin
                  </Button>
                </Link>
              )}
              <Link to="/profile">
                <div className="flex items-center gap-2 px-3 py-2 rounded-md hover:bg-accent transition-colors cursor-pointer">
                  {user.profilePhoto ? (
                    <img
                      src={user.profilePhoto}
                      alt={user.fullName}
                      className="w-8 h-8 rounded-full object-cover border-2 border-primary"
                    />
                  ) : (
                    <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                      <User className="h-4 w-4 text-primary" />
                    </div>
                  )}
                  <span className="text-sm font-medium hidden md:block">{user.fullName}</span>
                </div>
              </Link>
              <Button variant="ghost" size="icon" onClick={toggleTheme} title="Toggle theme">
                {theme === 'dark' ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
              </Button>
              <Button variant="ghost" size="icon" onClick={handleLogout} title="Logout">
                <LogOut className="h-5 w-5" />
              </Button>
            </>
          ) : (
            <>
              <Button variant="ghost" size="icon" onClick={toggleTheme} title="Toggle theme">
                {theme === 'dark' ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
              </Button>
              <Link to="/login">
                <Button variant="outline">Login</Button>
              </Link>
              <Link to="/register">
                <Button>Sign Up</Button>
              </Link>
            </>
          )}
        </nav>
      </div>
    </header>
  );
}
