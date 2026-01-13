import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../lib/auth';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { GraduationCap, Mail, Lock, UserPlus, User, Sparkles } from 'lucide-react';

export function RegisterPage() {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    const result = await register(fullName, email, password);
    
    if (result.success) {
      if (result.user?.email === import.meta.env.VITE_ADMIN_EMAIL) {
        navigate('/admin');
      } else {
        navigate('/');
      }
    } else {
      setError(result.message || 'Registration failed. Please try again.');
    }
    
    setLoading(false);
  };

  return (
    <div className="flex items-center justify-center min-h-[calc(100vh-80px)] p-4 bg-gradient-to-br from-background via-primary/5 to-background">
      <div className="w-full max-w-md space-y-6">
        {/* Header */}
        <div className="text-center space-y-2">
          <div className="flex items-center justify-center gap-3 mb-4">
            <GraduationCap className="h-10 w-10 text-primary" />
            <h1 className="text-3xl font-bold">Join Us Today</h1>
          </div>
          <p className="text-muted-foreground">Start your learning journey with thousands of courses</p>
        </div>

        <Card className="shadow-lg border-primary/20">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl text-center">Create Account</CardTitle>
            <CardDescription className="text-center">
              Enter your information to create an account
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              {error && (
                <div className="p-3 text-sm text-destructive bg-destructive/10 rounded-md border border-destructive/20 flex items-center gap-2">
                  <Lock className="h-4 w-4" />
                  {error}
                </div>
              )}
              
              <div className="space-y-2">
                <label htmlFor="fullName" className="text-sm font-medium flex items-center gap-2">
                  <User className="h-4 w-4" />
                  Full Name
                </label>
                <Input
                  id="fullName"
                  type="text"
                  placeholder="John Doe"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  required
                  className="h-11"
                />
              </div>
              
              <div className="space-y-2">
                <label htmlFor="email" className="text-sm font-medium flex items-center gap-2">
                  <Mail className="h-4 w-4" />
                  Email
                </label>
                <Input
                  id="email"
                  type="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="h-11"
                />
              </div>
              
              <div className="space-y-2">
                <label htmlFor="password" className="text-sm font-medium flex items-center gap-2">
                  <Lock className="h-4 w-4" />
                  Password
                </label>
                <Input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  minLength={6}
                  className="h-11"
                />
                <p className="text-xs text-muted-foreground">Minimum 6 characters</p>
              </div>
              
              <Button type="submit" className="w-full h-11" disabled={loading}>
                {loading ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    Creating account...
                  </>
                ) : (
                  <>
                    <UserPlus className="mr-2 h-4 w-4" />
                    Sign Up
                  </>
                )}
              </Button>
              
              <p className="text-center text-sm text-muted-foreground">
                Already have an account?{' '}
                <Link to="/login" className="text-primary hover:underline font-medium">
                  Login
                </Link>
              </p>
            </form>
          </CardContent>
        </Card>

        {/* Features */}
        <div className="grid grid-cols-3 gap-4 text-center">
          <div className="p-3 rounded-lg bg-primary/5 border border-primary/10">
            <Sparkles className="h-5 w-5 text-primary mx-auto mb-1" />
            <p className="text-xs text-muted-foreground">AI Powered</p>
          </div>
          <div className="p-3 rounded-lg bg-primary/5 border border-primary/10">
            <GraduationCap className="h-5 w-5 text-primary mx-auto mb-1" />
            <p className="text-xs text-muted-foreground">Expert Courses</p>
          </div>
          <div className="p-3 rounded-lg bg-primary/5 border border-primary/10">
            <Lock className="h-5 w-5 text-primary mx-auto mb-1" />
            <p className="text-xs text-muted-foreground">Secure</p>
          </div>
        </div>
      </div>
    </div>
  );
}
