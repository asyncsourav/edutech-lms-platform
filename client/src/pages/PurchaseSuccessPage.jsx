import { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import api from '../lib/api';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { CheckCircle2, BookOpen, Zap, Award, ArrowRight } from 'lucide-react';

export function PurchaseSuccessPage() {
  const [searchParams] = useSearchParams();
  const sessionId = searchParams.get('session_id');
  const [processing, setProcessing] = useState(true);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (sessionId) {
      finalizePurchase();
    } else {
      setError('No session ID found');
      setProcessing(false);
    }
  }, [sessionId]);

  const finalizePurchase = async () => {
    try {
      const response = await api.post('/payment/checkout-success', {
        sessionId,
      });

      if (response.data.success) {
        setSuccess(true);
      } else {
        setError('Payment verification failed');
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to verify payment');
    } finally {
      setProcessing(false);
    }
  };

  if (processing) {
    return (
      <div className="min-h-[calc(100vh-80px)] flex items-center justify-center bg-white dark:bg-slate-950 p-4">
        <div className="text-center space-y-6">
          <div className="inline-flex items-center justify-center">
            <div className="h-16 w-16 animate-spin rounded-full border-4 border-slate-200 dark:border-slate-700 border-b-blue-600" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Processing Payment</h2>
            <p className="text-slate-600 dark:text-slate-400 mt-2">Please wait while we confirm your purchase...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-[calc(100vh-80px)] flex items-center justify-center bg-white dark:bg-slate-950 p-4">
        <div className="max-w-md w-full">
          <div className="bg-white dark:bg-slate-900 rounded-2xl border border-red-200 dark:border-red-900/50 p-8 text-center shadow-lg">
            <div className="mb-4 flex justify-center">
              <div className="p-3 bg-red-100 dark:bg-red-900/20 rounded-full">
                <CheckCircle2 className="h-12 w-12 text-red-600 dark:text-red-400" />
              </div>
            </div>
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">Payment Failed</h2>
            <p className="text-slate-600 dark:text-slate-400 mb-6">{error}</p>
            <Link to="/dashboard">
              <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold">
                Back to Dashboard
              </Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-[calc(100vh-80px)] flex items-center justify-center bg-white dark:bg-slate-950 p-4">
      <div className="max-w-2xl w-full">
        {/* Success Card */}
        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-blue-200 dark:border-blue-900/50 p-8 sm:p-12 shadow-lg text-center space-y-8">
          {/* Success Icon */}
          <div className="flex justify-center">
            <div className="p-4 bg-green-100 dark:bg-green-900/20 rounded-full animate-pulse">
              <CheckCircle2 className="h-16 w-16 text-green-600 dark:text-green-400" />
            </div>
          </div>

          {/* Success Message */}
          <div className="space-y-3">
            <h1 className="text-4xl font-bold text-slate-900 dark:text-white">Payment Successful!</h1>
            <p className="text-lg text-slate-600 dark:text-slate-400">
              Your course enrollment has been confirmed. Welcome to your learning journey!
            </p>
          </div>

          {/* What's Next */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 py-8">
            <div className="p-4 bg-blue-50 dark:bg-blue-900/10 rounded-xl border border-blue-100 dark:border-blue-900/30">
              <BookOpen className="h-6 w-6 text-blue-600 dark:text-blue-400 mx-auto mb-2" />
              <p className="text-sm font-semibold text-slate-700 dark:text-slate-300">Access Content</p>
            </div>
            <div className="p-4 bg-blue-50 dark:bg-blue-900/10 rounded-xl border border-blue-100 dark:border-blue-900/30">
              <Zap className="h-6 w-6 text-blue-600 dark:text-blue-400 mx-auto mb-2" />
              <p className="text-sm font-semibold text-slate-700 dark:text-slate-300">Learn & Grow</p>
            </div>
            <div className="p-4 bg-blue-50 dark:bg-blue-900/10 rounded-xl border border-blue-100 dark:border-blue-900/30">
              <Award className="h-6 w-6 text-blue-600 dark:text-blue-400 mx-auto mb-2" />
              <p className="text-sm font-semibold text-slate-700 dark:text-slate-300">Get Certified</p>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 pt-4">
            <Link to="/dashboard" className="flex-1">
              <Button className="w-full h-12 bg-blue-600 hover:bg-blue-700 text-white font-semibold text-base flex items-center justify-center gap-2">
                Go to Dashboard
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
            <Link to="/" className="flex-1">
              <Button variant="outline" className="w-full h-12 border-blue-300 dark:border-blue-900/50 text-slate-700 dark:text-slate-300 font-semibold hover:bg-slate-50 dark:hover:bg-slate-800">
                Browse More Courses
              </Button>
            </Link>
          </div>

          {/* Footer Message */}
          <div className="pt-6 border-t border-slate-200 dark:border-slate-800">
            <p className="text-sm text-slate-600 dark:text-slate-400">
              A confirmation email has been sent to your registered email address. You have lifetime access to this course.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

