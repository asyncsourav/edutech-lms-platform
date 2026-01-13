import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../lib/auth';
import api from '../lib/api';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { IndianRupee, BookOpen, PlayCircle, Plus, Video, Clock, Users, CheckCircle2, Sparkles, ArrowLeft } from 'lucide-react';

export function CourseDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user, isAdmin } = useAuth();
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [purchasedCourses, setPurchasedCourses] = useState([]);
  const [purchasing, setPurchasing] = useState(false);
  const [showAddModule, setShowAddModule] = useState(false);
  const [moduleTitle, setModuleTitle] = useState('');
  const [moduleVideo, setModuleVideo] = useState(null);
  const [addingModule, setAddingModule] = useState(false);

  useEffect(() => {
    fetchCourse();
    fetchPurchasedCourses();
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

      const response = await api.post('/createModule', formData);

      if (response.data.success) {
        alert('Module added successfully!');
        setShowAddModule(false);
        setModuleTitle('');
        setModuleVideo(null);
        fetchCourse();
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
        <div className="text-center py-20">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-primary mb-4"></div>
          <p className="text-muted-foreground text-lg">Loading course...</p>
        </div>
      </div>
    );
  }

  if (!course) {
    return (
      <div className="container mx-auto px-4 py-8">
        <Card className="py-16">
          <CardContent className="text-center">
            <BookOpen className="h-16 w-16 text-muted-foreground mx-auto mb-4 opacity-50" />
            <h3 className="text-xl font-semibold mb-2">Course not found</h3>
            <Link to="/">
              <Button className="mt-4">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Courses
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <Link to="/">
        <Button variant="ghost" className="mb-6">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Courses
        </Button>
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          {/* Course Thumbnail */}
          <div className="relative rounded-xl overflow-hidden shadow-lg">
            <img
              src={course.thumbnail || '/placeholder-course.jpg'}
              alt={course.title}
              className="w-full h-80 object-cover"
            />
            {isPurchased && (
              <div className="absolute top-4 right-4 bg-green-500 text-white px-4 py-2 rounded-lg font-semibold flex items-center gap-2 shadow-lg">
                <CheckCircle2 className="h-5 w-5" />
                Enrolled
              </div>
            )}
          </div>

          {/* Course Title and Description */}
          <div>
            <div className="flex items-center gap-2 mb-2">
              <h1 className="text-4xl font-bold">{course.title}</h1>
              {isAdmin && (
                <span className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm font-semibold">
                  Admin
                </span>
              )}
            </div>
            <p className="text-lg text-muted-foreground leading-relaxed">{course.description}</p>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-4">
            {isPurchased ? (
              <Link to={`/course/${id}/learn`} className="flex-1">
                <Button size="lg" className="w-full">
                  <PlayCircle className="mr-2 h-5 w-5" />
                  Start Learning
                </Button>
              </Link>
            ) : (
              <Button
                size="lg"
                className="flex-1"
                onClick={handlePurchase}
                disabled={purchasing}
              >
                {purchasing ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    Processing...
                  </>
                ) : (
                  <>
                    <Sparkles className="mr-2 h-5 w-5" />
                    Buy with Stripe
                  </>
                )}
              </Button>
            )}

            {isAdmin && (
              <Button
                variant="outline"
                size="lg"
                onClick={() => setShowAddModule(!showAddModule)}
              >
                <Plus className="mr-2 h-5 w-5" />
                {showAddModule ? 'Cancel' : 'Add Module'}
              </Button>
            )}
          </div>

          {/* Add Module Form */}
          {isAdmin && showAddModule && (
            <Card className="border-primary/20">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Video className="h-5 w-5 text-primary" />
                  Add New Module
                </CardTitle>
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
                  <Button type="submit" disabled={addingModule} className="w-full">
                    {addingModule ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                        Adding...
                      </>
                    ) : (
                      <>
                        <Plus className="mr-2 h-4 w-4" />
                        Add Module
                      </>
                    )}
                  </Button>
                </form>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Sidebar */}
        <div className="lg:col-span-1">
          <Card className="sticky top-24">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BookOpen className="h-5 w-5 text-primary" />
                Course Details
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <IndianRupee className="h-5 w-5" />
                    <span>Price</span>
                  </div>
                  <span className="text-2xl font-bold text-primary">
                    ₹{course.amount}
                  </span>
                </div>
                <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Video className="h-5 w-5" />
                    <span>Modules</span>
                  </div>
                  <span className="text-xl font-semibold">{course.modules?.length || 0}</span>
                </div>
              </div>

              {!isPurchased ? (
                <Button
                  className="w-full"
                  size="lg"
                  onClick={handlePurchase}
                  disabled={purchasing}
                >
                  {purchasing ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                      Processing...
                    </>
                  ) : (
                    <>
                      <Sparkles className="mr-2 h-4 w-4" />
                      Buy with Stripe
                    </>
                  )}
                </Button>
              ) : (
                <Button className="w-full" variant="outline" size="lg" disabled>
                  <CheckCircle2 className="mr-2 h-4 w-4" />
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
