import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../lib/auth';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { GraduationCap, Mail, Lock, LogIn, Sparkles, BookOpen, CheckCircle2, ArrowRight } from 'lucide-react';

export function LoginPage() {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const { login, isAdmin } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    const result = await login(email, password);

    if (result.success) {
      if (result.user?.email === import.meta.env.VITE_ADMIN_EMAIL) {
        navigate('/admin');
      } else {
        navigate('/dashboard');
      }
    } else {
      setError(result.message || 'Login failed. Please try again.');
    }

    setLoading(false);
  };

  return (
    <div className="min-h-[calc(100vh-80px)] bg-white dark:bg-slate-950 grid grid-cols-1 lg:grid-cols-2">
      {/* Left: Form */}
      <div className="flex items-center justify-center p-4 sm:p-8 lg:p-12">
        <div className="w-full max-w-md space-y-6">
          {/* Header */}
          <div className="text-center space-y-3">
            <div className="flex items-center justify-center gap-2">
              <div className="p-2 bg-blue-600 rounded-lg">
                <BookOpen className="h-6 w-6 text-white" />
              </div>
              <span className="text-2xl font-bold text-slate-900 dark:text-white">LearnHub</span>
            </div>
            <h1 className="text-3xl font-bold text-slate-900 dark:text-white">Welcome Back</h1>
            <p className="text-slate-600 dark:text-slate-400">Sign in to continue your learning journey</p>
          </div>

          {/* Form Card */}
          <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-8 shadow-lg">
            <form onSubmit={handleSubmit} className="space-y-5">
              {error && (
                <div className="p-4 text-sm text-red-600 bg-red-50 dark:bg-red-950/30 dark:text-red-400 rounded-lg border border-red-200 dark:border-red-900/50 flex items-center gap-2">
                  <Lock className="h-4 w-4 flex-shrink-0" />
                  {error}
                </div>
              )}

              <div className="space-y-2">
                <label htmlFor="email" className="text-sm font-semibold text-slate-700 dark:text-slate-300 flex items-center gap-2">
                  <Mail className="h-4 w-4 text-blue-600" />
                  Email Address
                </label>
                <Input
                  id="email"
                  type="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="h-11 border-slate-200 dark:border-slate-700 focus:border-blue-500 dark:focus:border-blue-400 bg-slate-50 dark:bg-slate-800"
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="password" className="text-sm font-semibold text-slate-700 dark:text-slate-300 flex items-center gap-2">
                  <Lock className="h-4 w-4 text-blue-600" />
                  Password
                </label>
                <Input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="h-11 border-slate-200 dark:border-slate-700 focus:border-blue-500 dark:focus:border-blue-400 bg-slate-50 dark:bg-slate-800"
                />
              </div>

              <Button type="submit" className="w-full h-11 bg-blue-600 hover:bg-blue-700 text-white font-semibold flex items-center justify-center gap-2" disabled={loading}>
                {loading ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent"></div>
                    Signing in...
                  </>
                ) : (
                  <>
                    <LogIn className="h-4 w-4" />
                    Sign In
                  </>
                )}
              </Button>

              <p className="text-center text-sm text-slate-600 dark:text-slate-400">
                Don't have an account?{' '}
                <Link to="/register" className="text-blue-600 dark:text-blue-400 hover:underline font-semibold">
                  Create one
                </Link>
              </p>
            </form>
          </div>

          {/* Features Grid */}
          <div className="grid grid-cols-2 gap-3">
            <div className="p-4 rounded-xl bg-blue-50 dark:bg-blue-900/20 border border-blue-100 dark:border-blue-900/50 text-center">
              <Sparkles className="h-5 w-5 text-blue-600 mx-auto mb-2" />
              <p className="text-xs font-semibold text-slate-700 dark:text-slate-300">AI Powered</p>
            </div>
            <div className="p-4 rounded-xl bg-blue-50 dark:bg-blue-900/20 border border-blue-100 dark:border-blue-900/50 text-center">
              <GraduationCap className="h-5 w-5 text-blue-600 mx-auto mb-2" />
              <p className="text-xs font-semibold text-slate-700 dark:text-slate-300">Expert Courses</p>
            </div>
            <div className="p-4 rounded-xl bg-blue-50 dark:bg-blue-900/20 border border-blue-100 dark:border-blue-900/50 text-center">
              <CheckCircle2 className="h-5 w-5 text-blue-600 mx-auto mb-2" />
              <p className="text-xs font-semibold text-slate-700 dark:text-slate-300">Certified</p>
            </div>
            <div className="p-4 rounded-xl bg-blue-50 dark:bg-blue-900/20 border border-blue-100 dark:border-blue-900/50 text-center">
              <Lock className="h-5 w-5 text-blue-600 mx-auto mb-2" />
              <p className="text-xs font-semibold text-slate-700 dark:text-slate-300">Secure</p>
            </div>
          </div>
        </div>
      </div>

      {/* Right: Showcase (Hidden on mobile) */}
      <div className="hidden lg:flex items-center justify-center p-12 bg-gradient-to-br from-blue-600 to-blue-700 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <BookOpen className="absolute top-10 left-10 h-32 w-32" />
          <GraduationCap className="absolute bottom-10 right-10 h-32 w-32" />
        </div>
        <div className="relative z-10 text-center text-white space-y-8">
          <h2 className="text-4xl font-bold">Unlock Your Potential</h2>
          <div className="space-y-4">
            <div className="flex items-center gap-4 text-lg">
              <CheckCircle2 className="h-6 w-6 flex-shrink-0" />
              <span>Learn from industry experts</span>
            </div>
            <div className="flex items-center gap-4 text-lg">
              <CheckCircle2 className="h-6 w-6 flex-shrink-0" />
              <span>Lifetime access to courses</span>
            </div>
            <div className="flex items-center gap-4 text-lg">
              <CheckCircle2 className="h-6 w-6 flex-shrink-0" />
              <span>Earn recognized certificates</span>
            </div>
            <div className="flex items-center gap-4 text-lg">
              <CheckCircle2 className="h-6 w-6 flex-shrink-0" />
              <span>24/7 support and community</span>
            </div>
          </div>
          <p className="text-blue-100 text-sm max-w-sm">
            Join thousands of successful learners who have transformed their careers with LearnHub.
          </p>
        </div>
      </div>
    </div>
  );
}
