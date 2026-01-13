

import { Link, useNavigate } from 'react-router-dom';
import { useTheme } from '../../lib/theme';
import { useAuth } from '../../lib/auth';
import { Moon, Sun, LogOut, User, Home } from 'lucide-react';
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
          <div className="text-xl font-bold">LMS Platform</div>
        </div>
      </header>
    );
  }

  return (

    <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">

        <Link to="/" className="text-xl font-bold">
          LMS Platform
        </Link>

        <nav className="flex items-center gap-4">
          {user ? (
            <>
              <Link to="/">
                <Button variant="ghost" size="icon">
                  <Home className="h-5 w-5" />
                </Button>
              </Link>

              <Link to="/profile">
                <Button variant="ghost" size="icon">
                  <User className="h-5 w-5" />
                </Button>
              </Link>

              {isAdmin && (
                <Link to="/admin">
                  <Button variant="outline">Admin</Button>
                </Link>
              )}

              <Button variant="ghost" size="icon" onClick={toggleTheme}>
                {theme === 'dark' ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
              </Button>

              <Button variant="ghost" size="icon" onClick={handleLogout}>
                <LogOut className="h-5 w-5" />
              </Button>

            </>
          ) : (
            <>
              <Button variant="ghost" size="icon" onClick={toggleTheme}>
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

