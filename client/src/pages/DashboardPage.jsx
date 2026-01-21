import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../lib/auth';
import api from '../lib/api';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import {
  Search,
  BookOpen,
  IndianRupee,
  GraduationCap,
  Sparkles,
  TrendingUp,
  Users,
  ChevronRight,
} from 'lucide-react';




export function DashboardPage() {

  const [courses, setCourses] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();
  const [purchasedCourses, setPurchasedCourses] = useState([]);

  useEffect(() => {
    fetchCourses();
    fetchPurchasedCourses();
  }, []);

  const fetchCourses = async () => {
    try {
      setLoading(true);
      const response = await api.get('/getCourse', {
        params: searchQuery ? { search: searchQuery } : {},
      });
      setCourses(response.data.courses || []);
    } catch (error) {
      console.error('Error fetching courses:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchPurchasedCourses = async () => {
    try {
      const response = await api.get('/getAllCoursePurchase');
      const purchasedIds = (response.data.courses || []).map((c) => c._id);
      setPurchasedCourses(purchasedIds);
    } catch (error) {
      console.error('Error fetching purchased courses:', error);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    fetchCourses();
  };

  const isPurchased = (courseId) => purchasedCourses.includes(courseId);



  return (
    <div className="space-y-10 animate-fade-in">
      {/* HERO */}
      <section className="hero-section hero-section-dark p-8 md:p-12">
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-white/20 rounded-lg">
              <GraduationCap className="h-8 w-8 text-white" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold">
              Explore Courses
            </h1>
          </div>

          <p className="text-white/90 max-w-2xl text-lg">
            Learn in-demand skills with structured, industry-focused courses taught by industry experts.
          </p>

          {user && (
            <div className="flex items-center gap-2 text-white/80 pt-4">
              <Users className="h-5 w-5" />
              <span className="font-medium">Welcome back, {user.fullName}! 👋</span>
            </div>
          )}
        </div>
      </section>

      {/* STATS */}
      {!loading && courses.length > 0 && (
        <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white dark:bg-slate-950 rounded-xl border border-slate-200 dark:border-slate-800 p-6 hover:shadow-lg transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-600 dark:text-slate-400">Total Courses</p>
                <p className="text-3xl font-bold text-slate-900 dark:text-slate-50 mt-2">{courses.length}</p>
              </div>
              <div className="p-3 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
                <BookOpen className="h-6 w-6 text-blue-600 dark:text-blue-400" />
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-slate-950 rounded-xl border border-slate-200 dark:border-slate-800 p-6 hover:shadow-lg transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-600 dark:text-slate-400">My Courses</p>
                <p className="text-3xl font-bold text-slate-900 dark:text-slate-50 mt-2">{purchasedCourses.length}</p>
              </div>
              <div className="p-3 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
                <GraduationCap className="h-6 w-6 text-blue-600 dark:text-blue-400" />
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-slate-950 rounded-xl border border-slate-200 dark:border-slate-800 p-6 hover:shadow-lg transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-600 dark:text-slate-400">Learning Path</p>
                <p className="text-3xl font-bold text-slate-900 dark:text-slate-50 mt-2 flex items-center gap-2">
                  Personalized
                </p>
              </div>
              <div className="p-3 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
                <Sparkles className="h-6 w-6 text-blue-600 dark:text-blue-400" />
              </div>
            </div>
          </div>
        </section>
      )}

      {/* SEARCH */}
      <section>
        <form onSubmit={handleSearch}>
          <div className="bg-white dark:bg-slate-950 rounded-xl border border-slate-200 dark:border-slate-800 p-6">
            <div className="flex flex-col sm:flex-row gap-3">
              <div className="relative flex-1">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
                <Input
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search courses (MERN Stack, AI, DevOps, Mobile Development...)"
                  className="pl-11 h-12 text-base rounded-lg border-slate-200 dark:border-slate-700 focus:border-blue-500 dark:focus:border-blue-400"
                />
              </div>
              <Button type="submit" className="h-12 px-8 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-colors">
                <Search className="h-4 w-4 mr-2" />
                Search
              </Button>
            </div>
          </div>
        </form>
      </section>

      {/* CONTENT */}
      {loading ? (
        <div className="text-center py-20">
          <div className="inline-flex items-center justify-center">
            <div className="h-12 w-12 animate-spin rounded-full border-4 border-slate-200 dark:border-slate-700 border-b-blue-600" />
          </div>
          <p className="text-slate-600 dark:text-slate-400 mt-4 text-lg">Loading amazing courses...</p>
        </div>
      ) : courses.length === 0 ? (
        <div className="bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl py-16 text-center">
          <BookOpen className="h-16 w-16 mx-auto text-slate-300 dark:text-slate-700 mb-4" />
          <h3 className="text-2xl font-semibold text-slate-900 dark:text-slate-50 mb-2">No courses found</h3>
          <p className="text-slate-600 dark:text-slate-400 max-w-md mx-auto">
            Try searching with different keywords or explore all available courses.
          </p>
        </div>
      ) : (
        <section className="space-y-8">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-50">
              Available Courses
              <span className="ml-3 inline-flex items-center justify-center w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 text-sm font-semibold">
                {courses.length}
              </span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {courses.map((course, idx) => (
              <div
                key={course._id}
                className="bg-white dark:bg-slate-950 rounded-xl border border-slate-200 dark:border-slate-800 overflow-hidden hover:shadow-lg hover:border-blue-300 dark:hover:border-blue-700 transition-all duration-300 flex flex-col"
                style={{ animationDelay: `${idx * 50}ms` }}
              >
                <div className="relative h-48 overflow-hidden bg-gradient-to-br from-blue-50 to-slate-100 dark:from-blue-900/20 dark:to-slate-900">
                  {course.thumbnail ? (
                    <img
                      src={course.thumbnail}
                      alt={course.title}
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <BookOpen className="h-16 w-16 text-slate-300 dark:text-slate-700" />
                    </div>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                </div>

                <div className="p-6 flex flex-col flex-1">
                  <h3 className="font-bold text-lg line-clamp-2 mb-2 text-slate-900 dark:text-slate-50">
                    {course.title}
                  </h3>
                  <p className="text-sm text-slate-600 dark:text-slate-400 line-clamp-3 mb-4 flex-1">
                    {course.description}
                  </p>

                  <div className="flex items-center justify-between mb-4 pt-4 border-t border-slate-200 dark:border-slate-800">
                    <div className="flex items-center gap-1 font-bold text-lg text-blue-600 dark:text-blue-400">
                      <IndianRupee className="h-5 w-5" />
                      {course.amount}
                    </div>
                    {course.modules && (
                      <span className="text-xs font-medium text-slate-600 dark:text-slate-400 bg-slate-100 dark:bg-slate-800 px-3 py-1 rounded-full">
                        {course.modules.length} modules
                      </span>
                    )}
                  </div>

                  {isPurchased(course._id) ? (
                    <Link
                      to={`/course/${course._id}/learn`}
                      className="block"
                    >
                      <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-lg flex items-center justify-center gap-2 transition-all">
                        <GraduationCap className="h-4 w-4" />
                        Continue Learning
                        <ChevronRight className="h-4 w-4" />
                      </Button>
                    </Link>
                  ) : (
                    <Link to={`/course/${course._id}`} className="block">
                      <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-lg flex items-center justify-center gap-2 transition-all">
                        Explore
                        <ChevronRight className="h-4 w-4" />
                      </Button>
                    </Link>
                  )}
                </div>
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}

