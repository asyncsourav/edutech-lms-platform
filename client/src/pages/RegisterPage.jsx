import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../lib/auth';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { GraduationCap, Mail, Lock, UserPlus, User, Sparkles, BookOpen, CheckCircle2, Star } from 'lucide-react';

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
        navigate('/dashboard');
      }
    } else {
      setError(result.message || 'Registration failed. Please try again.');
    }

    setLoading(false);
  };

  return (
    <div className="min-h-[calc(100vh-80px)] bg-white dark:bg-slate-950 grid grid-cols-1 lg:grid-cols-2">
      {/* Left: Showcase (Hidden on mobile) */}
      <div className="hidden lg:flex items-center justify-center p-12 bg-gradient-to-br from-blue-600 to-blue-700 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <BookOpen className="absolute top-10 left-10 h-32 w-32" />
          <Star className="absolute bottom-10 right-10 h-32 w-32" />
        </div>
        <div className="relative z-10 text-center text-white space-y-8">
          <h2 className="text-4xl font-bold">Start Learning Today</h2>
          <div className="space-y-4">
            <div className="flex items-center gap-4 text-lg">
              <CheckCircle2 className="h-6 w-6 flex-shrink-0" />
              <span>Access to 100+ courses</span>
            </div>
            <div className="flex items-center gap-4 text-lg">
              <CheckCircle2 className="h-6 w-6 flex-shrink-0" />
              <span>Learn from industry experts</span>
            </div>
            <div className="flex items-center gap-4 text-lg">
              <CheckCircle2 className="h-6 w-6 flex-shrink-0" />
              <span>Get certified & recognized</span>
            </div>
            <div className="flex items-center gap-4 text-lg">
              <CheckCircle2 className="h-6 w-6 flex-shrink-0" />
              <span>Lifetime access included</span>
            </div>
          </div>
          <div className="pt-8 border-t border-blue-400/30">
            <div className="flex items-center justify-center gap-2 mb-3">
              {[1, 2, 3, 4, 5].map((i) => (
                <Star key={i} className="h-5 w-5 fill-white" />
              ))}
            </div>
            <p className="text-blue-100 font-semibold mb-1">4.8/5 Rating</p>
            <p className="text-blue-100 text-sm">From 10,000+ Students</p>
          </div>
        </div>
      </div>

      {/* Right: Form */}
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
            <h1 className="text-3xl font-bold text-slate-900 dark:text-white">Join Us Today</h1>
            <p className="text-slate-600 dark:text-slate-400">Start your learning journey with us</p>
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
                <label htmlFor="fullName" className="text-sm font-semibold text-slate-700 dark:text-slate-300 flex items-center gap-2">
                  <User className="h-4 w-4 text-blue-600" />
                  Full Name
                </label>
                <Input
                  id="fullName"
                  type="text"
                  placeholder="John Doe"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  required
                  className="h-11 border-slate-200 dark:border-slate-700 focus:border-blue-500 dark:focus:border-blue-400 bg-slate-50 dark:bg-slate-800"
                />
              </div>

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
                  minLength={6}
                  className="h-11 border-slate-200 dark:border-slate-700 focus:border-blue-500 dark:focus:border-blue-400 bg-slate-50 dark:bg-slate-800"
                />
                <p className="text-xs text-slate-500 dark:text-slate-400">Minimum 6 characters</p>
              </div>

              <Button type="submit" className="w-full h-11 bg-blue-600 hover:bg-blue-700 text-white font-semibold flex items-center justify-center gap-2" disabled={loading}>
                {loading ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent"></div>
                    Creating account...
                  </>
                ) : (
                  <>
                    <UserPlus className="h-4 w-4" />
                    Create Account
                  </>
                )}
              </Button>

              <p className="text-center text-sm text-slate-600 dark:text-slate-400">
                Already have an account?{' '}
                <Link to="/login" className="text-blue-600 dark:text-blue-400 hover:underline font-semibold">
                  Sign in
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
              <p className="text-xs font-semibold text-slate-700 dark:text-slate-300">100+ Courses</p>
            </div>
            <div className="p-4 rounded-xl bg-blue-50 dark:bg-blue-900/20 border border-blue-100 dark:border-blue-900/50 text-center">
              <CheckCircle2 className="h-5 w-5 text-blue-600 mx-auto mb-2" />
              <p className="text-xs font-semibold text-slate-700 dark:text-slate-300">Certificates</p>
            </div>
            <div className="p-4 rounded-xl bg-blue-50 dark:bg-blue-900/20 border border-blue-100 dark:border-blue-900/50 text-center">
              <Lock className="h-5 w-5 text-blue-600 mx-auto mb-2" />
              <p className="text-xs font-semibold text-slate-700 dark:text-slate-300">Secure</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
