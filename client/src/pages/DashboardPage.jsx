import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../lib/auth';
import api from '../lib/api';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Search, BookOpen, IndianRupee } from 'lucide-react';

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
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Welcome to LMS Platform</h1>
        <p className="text-muted-foreground">Discover and enroll in courses</p>
      </div>

      <form onSubmit={handleSearch} className="mb-8">
        <div className="flex gap-2">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Search courses (e.g., MERN Stack, AI, DevOps)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          <Button type="submit">Search</Button>
        </div>
      </form>

      {loading ? (
        <div className="text-center py-12">
          <p className="text-muted-foreground">Loading courses...</p>
        </div>
      ) : courses.length === 0 ? (
        <div className="text-center py-12">
          <BookOpen className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
          <p className="text-muted-foreground">No courses found</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {courses.map((course) => (
            <Card key={course._id} className="flex flex-col">
              <CardHeader>
                <img
                  src={course.thumbnail || '/placeholder-course.jpg'}
                  alt={course.title}
                  className="w-full h-48 object-cover rounded-md mb-4"
                />
                <CardTitle>{course.title}</CardTitle>
                <CardDescription className="line-clamp-2">
                  {course.description}
                </CardDescription>
              </CardHeader>
              <CardContent className="flex-1">
                <div className="flex items-center gap-2 text-lg font-semibold">
                  <IndianRupee className="h-5 w-5" />
                  {course.amount}
                </div>
              </CardContent>
              <CardFooter>
                {isPurchased(course._id) ? (
                  <Link to={`/course/${course._id}`} className="w-full">
                    <Button className="w-full">View Course</Button>
                  </Link>
                ) : (
                  <Link to={`/course/${course._id}`} className="w-full">
                    <Button className="w-full">View Details</Button>
                  </Link>
                )}
              </CardFooter>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}

