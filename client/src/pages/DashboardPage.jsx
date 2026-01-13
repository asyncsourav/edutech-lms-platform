import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../lib/auth';
import api from '../lib/api';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Search, BookOpen, IndianRupee, GraduationCap, Sparkles, TrendingUp, Users } from 'lucide-react';

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
      const purchasedIds = (response.data.courses || []).map(c => c._id);
      setPurchasedCourses(purchasedIds);
    } catch (error) {
      console.error('Error fetching purchased courses:', error);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    fetchCourses();
  };

  const isPurchased = (courseId) => {
    return purchasedCourses.includes(courseId);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Hero Section */}
      <div className="mb-12 text-center">
        <div className="flex items-center justify-center gap-3 mb-4">
          <GraduationCap className="h-12 w-12 text-primary" />
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
            Welcome to LMS Platform
          </h1>
        </div>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Discover and master new skills with our comprehensive online courses. Learn from experts and advance your career.
        </p>
        {user && (
          <div className="mt-4 flex items-center justify-center gap-2 text-sm text-muted-foreground">
            <Users className="h-4 w-4" />
            <span>Welcome back, {user.fullName}!</span>
          </div>
        )}
      </div>

      {/* Stats Section */}
      {!loading && courses.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <Card className="bg-gradient-to-br from-primary/10 to-primary/5 border-primary/20">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Total Courses</p>
                  <p className="text-3xl font-bold">{courses.length}</p>
                </div>
                <BookOpen className="h-10 w-10 text-primary opacity-50" />
              </div>
            </CardContent>
          </Card>
          <Card className="bg-gradient-to-br from-green-500/10 to-green-500/5 border-green-500/20">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">My Courses</p>
                  <p className="text-3xl font-bold">{purchasedCourses.length}</p>
                </div>
                <GraduationCap className="h-10 w-10 text-green-500 opacity-50" />
              </div>
            </CardContent>
          </Card>
          <Card className="bg-gradient-to-br from-purple-500/10 to-purple-500/5 border-purple-500/20">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">AI Powered</p>
                  <p className="text-3xl font-bold flex items-center gap-1">
                    <Sparkles className="h-6 w-6 text-purple-500" />
                  </p>
                </div>
                <TrendingUp className="h-10 w-10 text-purple-500 opacity-50" />
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Enhanced Search Bar */}
      <form onSubmit={handleSearch} className="mb-8">
        <Card className="p-2">
          <div className="flex gap-2">
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Search courses with AI (e.g., MERN Stack, AI, DevOps, Mobile Development)..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-12 h-12 text-base"
              />
            </div>
            <Button type="submit" size="lg" className="px-8">
              <Search className="mr-2 h-5 w-5" />
              Search
            </Button>
          </div>
        </Card>
      </form>

      {loading ? (
        <div className="text-center py-20">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-primary mb-4"></div>
          <p className="text-muted-foreground text-lg">Loading courses...</p>
        </div>
      ) : courses.length === 0 ? (
        <Card className="py-16">
          <CardContent className="text-center">
            <BookOpen className="h-16 w-16 text-muted-foreground mx-auto mb-4 opacity-50" />
            <h3 className="text-xl font-semibold mb-2">No courses found</h3>
            <p className="text-muted-foreground">Try adjusting your search terms or check back later.</p>
          </CardContent>
        </Card>
      ) : (
        <>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold flex items-center gap-2">
              <BookOpen className="h-6 w-6 text-primary" />
              Available Courses ({courses.length})
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {courses.map((course) => (
              <Card key={course._id} className="flex flex-col hover:shadow-lg transition-shadow duration-300 overflow-hidden group">
                <div className="relative overflow-hidden">
                  <img
                    src={course.thumbnail || '/placeholder-course.jpg'}
                    alt={course.title}
                    className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-110"
                  />
                  {isPurchased(course._id) && (
                    <div className="absolute top-2 right-2 bg-green-500 text-white px-2 py-1 rounded-md text-xs font-semibold flex items-center gap-1">
                      <GraduationCap className="h-3 w-3" />
                      Enrolled
                    </div>
                  )}
                </div>
                <CardHeader>
                  <CardTitle className="line-clamp-2">{course.title}</CardTitle>
                  <CardDescription className="line-clamp-3">
                    {course.description}
                  </CardDescription>
                </CardHeader>
                <CardContent className="flex-1 flex items-center justify-between">
                  <div className="flex items-center gap-2 text-xl font-bold text-primary">
                    <IndianRupee className="h-6 w-6" />
                    {course.amount}
                  </div>
                  {course.modules && (
                    <div className="text-sm text-muted-foreground flex items-center gap-1">
                      <BookOpen className="h-4 w-4" />
                      {course.modules.length} modules
                    </div>
                  )}
                </CardContent>
                <CardFooter>
                  {isPurchased(course._id) ? (
                    <Link to={`/course/${course._id}/learn`} className="w-full">
                      <Button className="w-full" size="lg">
                        <GraduationCap className="mr-2 h-4 w-4" />
                        Continue Learning
                      </Button>
                    </Link>
                  ) : (
                    <Link to={`/course/${course._id}`} className="w-full">
                      <Button className="w-full" size="lg" variant="default">
                        View Details
                      </Button>
                    </Link>
                  )}
                </CardFooter>
              </Card>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

