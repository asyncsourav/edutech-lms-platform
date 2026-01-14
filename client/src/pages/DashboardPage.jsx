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
    <div className="space-y-10">
      {/* HERO */}
      <section className="text-center space-y-4">
        <div className="flex items-center justify-center gap-3">
          <GraduationCap className="h-10 w-10 text-primary" />
          <h1 className="text-3xl md:text-4xl font-semibold">
            Explore Courses
          </h1>
        </div>

        <p className="text-muted-foreground max-w-2xl mx-auto text-base">
          Learn in-demand skills with structured, industry-focused courses.
        </p>

        {user && (
          <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
            <Users className="h-4 w-4" />
            <span>Welcome back, {user.fullName}</span>
          </div>
        )}
      </section>

      {/* STATS */}
      {!loading && courses.length > 0 && (
        <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="shadow-sm">
            <CardContent className="p-6 flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Courses</p>
                <p className="text-2xl font-semibold">{courses.length}</p>
              </div>
              <BookOpen className="h-8 w-8 text-primary" />
            </CardContent>
          </Card>

          <Card className="shadow-sm">
            <CardContent className="p-6 flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">My Courses</p>
                <p className="text-2xl font-semibold">
                  {purchasedCourses.length}
                </p>
              </div>
              <GraduationCap className="h-8 w-8 text-primary" />
            </CardContent>
          </Card>

          <Card className="shadow-sm">
            <CardContent className="p-6 flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Platform</p>
                <p className="text-2xl font-semibold flex items-center gap-1">
                  AI Powered <Sparkles className="h-4 w-4 text-primary" />
                </p>
              </div>
              <TrendingUp className="h-8 w-8 text-primary" />
            </CardContent>
          </Card>
        </section>
      )}

      {/* SEARCH */}
      <section>
        <form onSubmit={handleSearch}>
          <Card className="p-4 shadow-sm">
            <div className="flex flex-col sm:flex-row gap-3">
              <div className="relative flex-1">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search courses (MERN, AI, DevOps...)"
                  className="pl-10 h-11"
                />
              </div>
              <Button type="submit" className="h-11 px-6">
                Search
              </Button>
            </div>
          </Card>
        </form>
      </section>

      {/* CONTENT */}
      {loading ? (
        <div className="text-center py-20">
          <div className="h-10 w-10 mx-auto animate-spin rounded-full border-b-2 border-primary mb-4" />
          <p className="text-muted-foreground">Loading courses...</p>
        </div>
      ) : courses.length === 0 ? (
        <Card className="py-16 shadow-sm">
          <CardContent className="text-center space-y-2">
            <BookOpen className="h-12 w-12 mx-auto text-muted-foreground" />
            <h3 className="text-lg font-medium">No courses found</h3>
            <p className="text-sm text-muted-foreground">
              Try searching with different keywords.
            </p>
          </CardContent>
        </Card>
      ) : (
        <section className="space-y-6">
          <h2 className="text-xl font-medium">
            Available Courses ({courses.length})
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {courses.map((course) => (
              <Card
                key={course._id}
                className="flex flex-col shadow-sm hover:shadow-md transition"
              >
                <img
                  src={course.thumbnail || '/placeholder-course.jpg'}
                  alt={course.title}
                  className="h-44 w-full object-cover rounded-t-xl"
                />

                <CardHeader className="space-y-1">
                  <CardTitle className="text-base line-clamp-2">
                    {course.title}
                  </CardTitle>
                  <CardDescription className="line-clamp-3">
                    {course.description}
                  </CardDescription>
                </CardHeader>

                <CardContent className="flex items-center justify-between">
                  <div className="flex items-center gap-1 font-semibold">
                    <IndianRupee className="h-4 w-4" />
                    {course.amount}
                  </div>
                  {course.modules && (
                    <span className="text-xs text-muted-foreground">
                      {course.modules.length} modules
                    </span>
                  )}
                </CardContent>

                <CardFooter>
                  {isPurchased(course._id) ? (
                    <Link
                      to={`/course/${course._id}/learn`}
                      className="w-full"
                    >
                      <Button className="w-full">
                        Continue Learning
                      </Button>
                    </Link>
                  ) : (
                    <Link to={`/course/${course._id}`} className="w-full">
                      <Button className="w-full" variant="outline">
                        View Details
                      </Button>
                    </Link>
                  )}
                </CardFooter>
              </Card>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}

