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
      const response = await api.post('/payment/checkout', {
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
    <div className="min-h-screen bg-white dark:bg-slate-950">

      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            {/* Course Thumbnail */}
            <div className="relative rounded-2xl overflow-hidden shadow-xl h-80 bg-gradient-to-br from-blue-50 to-slate-100 dark:from-blue-900/20 dark:to-slate-900">
              {course.thumbnail ? (
                <img
                  src={course.thumbnail}
                  alt={course.title}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <BookOpen className="h-24 w-24 text-slate-300 dark:text-slate-700" />
                </div>
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
            </div>

            {/* Course Title and Description */}
            <div className="space-y-4">
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <h1 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white leading-tight mb-2">
                    {course.title}
                  </h1>
                  {isAdmin && (
                    <span className="inline-flex items-center gap-2 px-4 py-2 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-900/50 text-blue-600 dark:text-blue-400 rounded-lg text-sm font-semibold">
                      <GraduationCap className="h-4 w-4" />
                      Admin Access
                    </span>
                  )}
                </div>
              </div>
              <p className="text-lg text-slate-600 dark:text-slate-400 leading-relaxed">
                {course.description}
              </p>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              <div className="p-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-100 dark:border-blue-900/50 rounded-xl">
                <div className="flex items-center gap-2 mb-2">
                  <Video className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                  <span className="text-sm text-slate-600 dark:text-slate-400">Modules</span>
                </div>
                <p className="text-2xl font-bold text-slate-900 dark:text-white">{course.modules?.length || 0}</p>
              </div>
              <div className="p-4 bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 rounded-xl">
                <div className="flex items-center gap-2 mb-2">
                  <IndianRupee className="h-5 w-5 text-slate-600 dark:text-slate-400" />
                  <span className="text-sm text-slate-600 dark:text-slate-400">Price</span>
                </div>
                <p className="text-2xl font-bold text-slate-900 dark:text-white">₹{course.amount}</p>
              </div>
              <div className="p-4 bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 rounded-xl">
                <div className="flex items-center gap-2 mb-2">
                  <Users className="h-5 w-5 text-slate-600 dark:text-slate-400" />
                  <span className="text-sm text-slate-600 dark:text-slate-400">Level</span>
                </div>
                <p className="text-2xl font-bold text-slate-900 dark:text-white">Beginner</p>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              {isPurchased ? (
                <Link to={`/course/${id}/learn`} className="flex-1">
                  <Button size="lg" className="w-full h-12 bg-blue-600 hover:bg-blue-700 text-white font-semibold flex items-center justify-center gap-2 rounded-lg">
                    <PlayCircle className="h-5 w-5" />
                    Start Learning Now
                  </Button>
                </Link>
              ) : (
                <Button
                  size="lg"
                  className="flex-1 h-12 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg flex items-center justify-center gap-2"
                  onClick={handlePurchase}
                  disabled={purchasing}
                >
                  {purchasing ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent"></div>
                      Processing...
                    </>
                  ) : (
                    <>
                      <Sparkles className="h-5 w-5" />
                      Enroll Now with Stripe
                    </>
                  )}
                </Button>
              )}

              {isAdmin && (
                <Button
                  variant="outline"
                  size="lg"
                  className="sm:flex-1 h-12 border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-300 font-semibold rounded-lg"
                  onClick={() => setShowAddModule(!showAddModule)}
                >
                  <Plus className="h-5 w-5" />
                  {showAddModule ? 'Cancel' : 'Add Module'}
                </Button>
              )}
            </div>

            {/* Add Module Form */}
            {isAdmin && showAddModule && (
              <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-8 shadow-lg">
                <div className="mb-6">
                  <h2 className="text-2xl font-bold text-slate-900 dark:text-white flex items-center gap-3">
                    <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
                      <Video className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                    </div>
                    Add New Module
                  </h2>
                  <p className="text-slate-600 dark:text-slate-400 mt-1">Upload a video module to this course</p>
                </div>
                <form onSubmit={handleAddModule} className="space-y-6">
                  <div className="space-y-2">
                    <label htmlFor="moduleTitle" className="text-sm font-semibold text-slate-700 dark:text-slate-300">
                      Module Title
                    </label>
                    <Input
                      id="moduleTitle"
                      value={moduleTitle}
                      onChange={(e) => setModuleTitle(e.target.value)}
                      placeholder="e.g., Introduction to React Hooks"
                      required
                      className="h-11 border-slate-200 dark:border-slate-700 focus:border-blue-500 dark:focus:border-blue-400"
                    />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="moduleVideo" className="text-sm font-semibold text-slate-700 dark:text-slate-300">
                      Video File (MP4, MOV, AVI)
                    </label>
                    <Input
                      id="moduleVideo"
                      type="file"
                      accept="video/*"
                      onChange={(e) => setModuleVideo(e.target.files[0])}
                      required
                      className="h-11 border-slate-200 dark:border-slate-700 focus:border-blue-500 dark:focus:border-blue-400"
                    />
                    <p className="text-xs text-slate-500 dark:text-slate-400">Maximum file size: 500MB</p>
                  </div>
                  <Button type="submit" disabled={addingModule} className="w-full h-11 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg flex items-center justify-center gap-2">
                    {addingModule ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent"></div>
                        Adding Module...
                      </>
                    ) : (
                      <>
                        <Plus className="h-4 w-4" />
                        Add Module
                      </>
                    )}
                  </Button>
                </form>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-32 space-y-4">
              {/* Course Info Card */}
              <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 shadow-lg">
                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-6 flex items-center gap-2">
                  <BookOpen className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                  Course Details
                </h3>

                <div className="space-y-4 mb-6">
                  <div className="p-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-100 dark:border-blue-900/50 rounded-xl">
                    <p className="text-xs text-slate-600 dark:text-slate-400 mb-1">Price</p>
                    <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">₹{course.amount}</p>
                  </div>

                  <div className="p-4 bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 rounded-xl">
                    <p className="text-xs text-slate-600 dark:text-slate-400 mb-1">Total Modules</p>
                    <div className="flex items-center gap-2">
                      <Video className="h-5 w-5 text-slate-600 dark:text-slate-400" />
                      <p className="text-2xl font-bold text-slate-900 dark:text-white">{course.modules?.length || 0}</p>
                    </div>
                  </div>
                </div>

                {!isPurchased ? (
                  <Button
                    className="w-full h-11 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg flex items-center justify-center gap-2"
                    onClick={handlePurchase}
                    disabled={purchasing}
                  >
                    {purchasing ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent"></div>
                        Processing...
                      </>
                    ) : (
                      <>
                        <Sparkles className="h-4 w-4" />
                        Enroll Now
                      </>
                    )}
                  </Button>
                ) : (
                  <div className="p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-900/50 rounded-lg text-center">
                    <div className="flex items-center justify-center gap-2 mb-1">
                      <CheckCircle2 className="h-5 w-5 text-green-600 dark:text-green-400" />
                      <p className="font-semibold text-green-600 dark:text-green-400">Already Enrolled</p>
                    </div>
                    <p className="text-xs text-green-600 dark:text-green-400">Lifetime access</p>
                  </div>
                )}
              </div>

              {/* Features Card */}
              <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 shadow-lg">
                <h3 className="font-semibold text-slate-900 dark:text-white mb-4">What You'll Learn</h3>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 text-blue-600 dark:text-blue-400 flex-shrink-0 mt-0.5" />
                    <span className="text-sm text-slate-600 dark:text-slate-400">Expert instruction from industry professionals</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 text-blue-600 dark:text-blue-400 flex-shrink-0 mt-0.5" />
                    <span className="text-sm text-slate-600 dark:text-slate-400">Comprehensive course material and resources</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 text-blue-600 dark:text-blue-400 flex-shrink-0 mt-0.5" />
                    <span className="text-sm text-slate-600 dark:text-slate-400">Learn at your own pace with lifetime access</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 text-blue-600 dark:text-blue-400 flex-shrink-0 mt-0.5" />
                    <span className="text-sm text-slate-600 dark:text-slate-400">Get certified upon completion</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

