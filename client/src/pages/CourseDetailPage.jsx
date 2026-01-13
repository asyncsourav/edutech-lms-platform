

import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import api from '../lib/api';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { IndianRupee, BookOpen, PlayCircle, Plus, Video } from 'lucide-react';


export function CourseDetailPage() {

  const { id } = useParams();
  const navigate = useNavigate();
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [purchasedCourses, setPurchasedCourses] = useState([]);
  const [purchasing, setPurchasing] = useState(false);
  const [user, setUser] = useState(null);
  const [showAddModule, setShowAddModule] = useState(false);
  const [moduleTitle, setModuleTitle] = useState('');
  const [moduleVideo, setModuleVideo] = useState(null);
  const [addingModule, setAddingModule] = useState(false);

  useEffect(() => {
    fetchCourse();
    fetchPurchasedCourses();
    fetchUser();
  }, [id]);

  const fetchCourse = async () => {
    try {
      setLoading(true);
      const response = await api.get(`/getSingleCourse/${id}`);
      setCourse(response.data);
    } catch (error) {
      console.error('Error fetching course:', error);
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

  const fetchUser = async () => {
    try {
      const response = await api.get('/getUser');
      setUser(response.data);
    } catch (error) {
      console.error('Error fetching user:', error);
    }
  };

  const handleAddModule = async (e) => {
    e.preventDefault();
    if (!moduleTitle || !moduleVideo) {
      alert('Please fill all fields');
      return;
    }

    try {
      setAddingModule(true);
      const formData = new FormData();
      formData.append('courseId', id);
      formData.append('title', moduleTitle);
      formData.append('video', moduleVideo);

      const response = await api.post('/createModule', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      if (response.data.success) {
        alert('Module added successfully!');
        setShowAddModule(false);
        setModuleTitle('');
        setModuleVideo(null);
        fetchCourse(); // Refresh course data
      }
    } catch (error) {
      alert(error.response?.data?.message || 'Failed to add module');
    } finally {
      setAddingModule(false);
    }
  };

  const handlePurchase = async () => {
    try {
      setPurchasing(true);
      const response = await api.post('/checkout', {
        products: { _id: id },
      });

      if (response.data.success && response.data.url) {
        // Redirect to Stripe checkout
        window.location.href = response.data.url;
      }
    } catch (error) {
      alert(error.response?.data?.message || 'Failed to initiate payment');
      setPurchasing(false);
    }
  };

  const isPurchased = purchasedCourses.includes(id);

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <p className="text-center">Loading course...</p>
      </div>
    );
  }

  if (!course) {
    return (
      <div className="container mx-auto px-4 py-8">
        <p className="text-center">Course not found</p>
        <Link to="/">
          <Button className="mt-4">Back to Courses</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <img
            src={course.thumbnail || '/placeholder-course.jpg'}
            alt={course.title}
            className="w-full h-64 object-cover rounded-lg mb-6"
          />
          <h1 className="text-3xl font-bold mb-4">{course.title}</h1>
          <p className="text-muted-foreground mb-6">{course.description}</p>

          {isPurchased && (
            <div className="mb-6">
              <Link to={`/course/${id}/learn`}>
                <Button size="lg">
                  <PlayCircle className="mr-2 h-5 w-5" />
                  Start Learning
                </Button>
              </Link>
            </div>
          )}

          {isAdmin && (
            <div className="mb-6">
              <Button
                variant="outline"
                onClick={() => setShowAddModule(!showAddModule)}
              >
                <Plus className="mr-2 h-4 w-4" />
                {showAddModule ? 'Cancel' : 'Add Module'}
              </Button>
            </div>
          )}

          {isAdmin && showAddModule && (
            <Card className="mb-6">
              <CardHeader>
                <CardTitle>Add New Module</CardTitle>
                <CardDescription>Add a video module to this course</CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleAddModule} className="space-y-4">
                  <div className="space-y-2">
                    <label htmlFor="moduleTitle" className="text-sm font-medium">
                      Module Title
                    </label>
                    <Input
                      id="moduleTitle"
                      value={moduleTitle}
                      onChange={(e) => setModuleTitle(e.target.value)}
                      placeholder="e.g., Introduction to React"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="moduleVideo" className="text-sm font-medium">
                      Video File (MP4, MOV, AVI)
                    </label>
                    <Input
                      id="moduleVideo"
                      type="file"
                      accept="video/*"
                      onChange={(e) => setModuleVideo(e.target.files[0])}
                      required
                    />
                  </div>
                  <Button type="submit" disabled={addingModule}>
                    {addingModule ? 'Adding...' : 'Add Module'}
                  </Button>
                </form>
              </CardContent>
            </Card>
          )}
        </div>

        <div className="lg:col-span-1">
          <Card>
            <CardHeader>
              <CardTitle>Course Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Price</span>
                <span className="text-2xl font-bold flex items-center">
                  <IndianRupee className="h-5 w-5" />
                  {course.amount}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Modules</span>
                <span className="font-semibold">{course.modules?.length || 0}</span>
              </div>
              {!isPurchased ? (
                <Button
                  className="w-full"
                  onClick={handlePurchase}
                  disabled={purchasing}
                >
                  {purchasing ? 'Processing...' : 'Buy with Stripe'}
                </Button>
              ) : (
                <Button className="w-full" variant="outline" disabled>
                  Already Purchased
                </Button>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

