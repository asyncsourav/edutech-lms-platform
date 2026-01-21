

import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../lib/api';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Textarea } from '../components/ui/textarea';
import { Plus, BookOpen, Users, DollarSign, TrendingUp, Calendar, Edit, Trash2, Eye, EyeOff } from 'lucide-react';
import { useNavigate } from 'react-router-dom';



export function AdminDashboardPage() {

  const navigate = useNavigate();
  const [analytics, setAnalytics] = useState(null);
  const [dailyData, setDailyData] = useState([]);
  const [showCreateCourse, setShowCreateCourse] = useState(false);
  const [loading, setLoading] = useState(true);
  const [courses, setCourses] = useState([]);
  const [courseLoading, setCourseLoading] = useState(false);

  // Course creation form state
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState('');
  const [thumbnail, setThumbnail] = useState(null);
  const [creating, setCreating] = useState(false);

  // Course editing state
  const [editingCourseId, setEditingCourseId] = useState(null);
  const [editTitle, setEditTitle] = useState('');
  const [editDescription, setEditDescription] = useState('');
  const [editAmount, setEditAmount] = useState('');
  const [editThumbnail, setEditThumbnail] = useState(null);
  const [editingLoading, setEditingLoading] = useState(false);

  useEffect(() => {
    fetchAnalytics();
    fetchDailyData();
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    try {
      setCourseLoading(true);
      // Use new getAllCourses endpoint for admin - shows ALL courses including hidden
      const response = await api.get('/getAllCourses');
      console.log('Courses response:', response.data);
      const coursesArray = Array.isArray(response.data.courses)
        ? response.data.courses
        : (Array.isArray(response.data) ? response.data : []);
      setCourses(coursesArray);
    } catch (error) {
      console.error('Error fetching courses:', error);
      setCourses([]);
    } finally {
      setCourseLoading(false);
    }
  };

  const fetchAnalytics = async () => {
    try {
      const response = await api.get('/analytic/getAnalytic');
      setAnalytics(response.data);
    } catch (error) {
      console.error('Error fetching analytics:', error);
    } finally {
      setLoading(false);
    }
  };


  const fetchDailyData = async () => {
    try {
      const endDate = new Date();
      const startDate = new Date();
      startDate.setDate(startDate.getDate() - 30); // Last 30 days

      const response = await api.get('/analytic/getDailyData', {
        params: {
          startDate: startDate.toISOString().split('T')[0],
          endDate: endDate.toISOString().split('T')[0],
        },
      });
      setDailyData(response.data);
    } catch (error) {
      console.error('Error fetching daily data:', error);
    }
  };


  const handleCreateCourse = async (e) => {
    e.preventDefault();
    if (!title || !description || !amount || !thumbnail) {
      alert('Please fill all fields');
      return;
    }

    try {
      setCreating(true);
      const formData = new FormData();
      formData.append('title', title);
      formData.append('description', description);
      formData.append('amount', amount);
      formData.append('thumbnail', thumbnail);

      const response = await api.post('/createCourse', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      if (response.data.success) {
        alert('Course created successfully!');
        setShowCreateCourse(false);
        setTitle('');
        setDescription('');
        setAmount('');
        setThumbnail(null);
        fetchCourses();
      }
    } catch (error) {
      alert(error.response?.data?.message || 'Failed to create course');
    } finally {
      setCreating(false);
    }
  };

  const handleEditCourse = async (e, courseId) => {
    e.preventDefault();
    if (!editTitle || !editDescription || !editAmount) {
      alert('Please fill all fields');
      return;
    }

    try {
      setEditingLoading(true);
      const formData = new FormData();
      formData.append('title', editTitle);
      formData.append('description', editDescription);
      formData.append('amount', editAmount);
      if (editThumbnail) {
        formData.append('thumbnail', editThumbnail);
      }

      const response = await api.put(`/editCourse/${courseId}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      if (response.data.success) {
        alert('Course updated successfully!');
        setEditingCourseId(null);
        setEditTitle('');
        setEditDescription('');
        setEditAmount('');
        setEditThumbnail(null);
        fetchCourses();
      }
    } catch (error) {
      alert(error.response?.data?.message || 'Failed to update course');
    } finally {
      setEditingLoading(false);
    }
  };

  const handleDeleteCourse = async (courseId) => {
    if (window.confirm('Are you sure you want to delete this course? This action cannot be undone.')) {
      try {
        const response = await api.delete(`/deleteCourse/${courseId}`);
        if (response.data.success) {
          alert('Course deleted successfully!');
          fetchCourses();
        }
      } catch (error) {
        alert(error.response?.data?.message || 'Failed to delete course');
      }
    }
  };

  const handleHideCourse = async (courseId) => {
    try {
      const response = await api.patch(`/hideCourse/${courseId}`);
      if (response.data.success) {
        alert(response.data.message);
        fetchCourses();
      }
    } catch (error) {
      alert(error.response?.data?.message || 'Failed to update course visibility');
    }
  };

  const startEditCourse = (course) => {
    setEditingCourseId(course._id);
    setEditTitle(course.title);
    setEditDescription(course.description);
    setEditAmount(course.amount.toString());
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <p className="text-center">Loading...</p>
      </div>
    );
  }


  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Admin Dashboard</h1>
        <Button onClick={() => setShowCreateCourse(!showCreateCourse)}>
          <Plus className="mr-2 h-4 w-4" />
          Create Course
        </Button>
      </div>

      {showCreateCourse && (
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Create New Course</CardTitle>
            <CardDescription>Fill in the details to create a new course</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleCreateCourse} className="space-y-4">
              <div className="space-y-2">
                <label htmlFor="title" className="text-sm font-medium">
                  Course Title
                </label>
                <Input
                  id="title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="description" className="text-sm font-medium">
                  Description
                </label>
                <Textarea
                  id="description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  required
                  rows={4}
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="amount" className="text-sm font-medium">
                  Price (INR)
                </label>
                <Input
                  id="amount"
                  type="number"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  required
                  min="0"
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="thumbnail" className="text-sm font-medium">
                  Thumbnail Image
                </label>
                <Input
                  id="thumbnail"
                  type="file"
                  accept="image/*"
                  onChange={(e) => setThumbnail(e.target.files[0])}
                  required
                />
              </div>
              <div className="flex gap-2">
                <Button type="submit" disabled={creating}>
                  {creating ? 'Creating...' : 'Create Course'}
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setShowCreateCourse(false)}
                >
                  Cancel
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      )}

      {/* Analytics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Users</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{analytics?.users || 0}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Courses</CardTitle>
            <BookOpen className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{analytics?.courses || 0}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Enrollments</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{analytics?.totalEnrollments || 0}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              ₹{analytics?.totalRevenue?.toFixed(2) || '0.00'}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Manage Courses Section */}
      <Card className="mb-8 border-slate-200 dark:border-slate-800">
        <CardHeader className="bg-slate-50 dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800">
          <CardTitle className="flex items-center gap-2 text-slate-900 dark:text-slate-50">
            <BookOpen className="h-5 w-5 text-blue-600 dark:text-blue-400" />
            Manage Your Courses
          </CardTitle>
          <CardDescription>Edit, delete, or hide your courses</CardDescription>
        </CardHeader>
        <CardContent className="pt-6">
          {courseLoading ? (
            <div className="flex items-center justify-center py-12">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
              <p className="ml-3 text-muted-foreground">Loading courses...</p>
            </div>
          ) : courses.length === 0 ? (
            <div className="text-center py-12 bg-slate-50 dark:bg-slate-900 rounded-lg">
              <BookOpen className="h-12 w-12 text-slate-300 dark:text-slate-700 mx-auto mb-3" />
              <p className="text-muted-foreground font-medium">No courses yet. Create your first course!</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-6">
              {courses.map((course) => (
                <div key={course._id} className="border border-slate-200 dark:border-slate-800 rounded-xl p-6 hover:border-blue-300 dark:hover:border-blue-700 transition-colors duration-200 bg-white dark:bg-slate-950 space-y-4">
                  {editingCourseId === course._id ? (
                    <form onSubmit={(e) => handleEditCourse(e, course._id)} className="space-y-4">
                      <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-50">Edit Course Details</h3>
                      <div className="space-y-2">
                        <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Course Title</label>
                        <Input
                          value={editTitle}
                          onChange={(e) => setEditTitle(e.target.value)}
                          className="border-slate-200 dark:border-slate-700 focus:border-blue-500 dark:focus:border-blue-400"
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Description</label>
                        <Textarea
                          value={editDescription}
                          onChange={(e) => setEditDescription(e.target.value)}
                          className="border-slate-200 dark:border-slate-700 focus:border-blue-500 dark:focus:border-blue-400"
                          required
                          rows={3}
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Price (INR)</label>
                        <Input
                          type="number"
                          value={editAmount}
                          onChange={(e) => setEditAmount(e.target.value)}
                          className="border-slate-200 dark:border-slate-700 focus:border-blue-500 dark:focus:border-blue-400"
                          required
                          min="0"
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Thumbnail Image (optional)</label>
                        <Input
                          type="file"
                          accept="image/*"
                          className="border-slate-200 dark:border-slate-700"
                          onChange={(e) => setEditThumbnail(e.target.files[0])}
                        />
                      </div>
                      <div className="flex gap-2 pt-2">
                        <Button type="submit" disabled={editingLoading} className="bg-blue-600 hover:bg-blue-700 text-white">
                          {editingLoading ? 'Saving...' : 'Save Changes'}
                        </Button>
                        <Button
                          type="button"
                          variant="outline"
                          className="border-slate-300 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-900"
                          onClick={() => setEditingCourseId(null)}
                        >
                          Cancel
                        </Button>
                      </div>
                    </form>
                  ) : (
                    <>
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex-1">
                          <h3 className="font-semibold text-lg text-slate-900 dark:text-slate-50">{course.title}</h3>
                          <p className="text-sm text-slate-600 dark:text-slate-400 line-clamp-2 mt-1">{course.description}</p>
                          <div className="flex flex-wrap gap-4 mt-3 text-sm">
                            <span className="font-semibold text-blue-600 dark:text-blue-400">₹{course.amount}</span>
                            <span className="text-slate-600 dark:text-slate-400 flex items-center gap-1">
                              <BookOpen className="h-4 w-4" />
                              {course.modules?.length || 0} modules
                            </span>
                            {course.isHidden && <span className="px-2 py-1 bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300 rounded-full text-xs font-medium">Hidden</span>}
                          </div>
                        </div>
                        {course.thumbnail && (
                          <img
                            src={course.thumbnail}
                            alt={course.title}
                            className="w-28 h-28 object-cover rounded-lg flex-shrink-0 border border-slate-200 dark:border-slate-700 shadow-sm"
                          />
                        )}
                      </div>
                      <div className="flex flex-wrap gap-2 pt-2">
                        <Button
                          size="sm"
                          className="bg-blue-600 hover:bg-blue-700 text-white"
                          onClick={() => startEditCourse(course)}
                        >
                          <Edit className="mr-2 h-4 w-4" />
                          Edit
                        </Button>
                        <Button
                          size="sm"
                          className="bg-slate-500 hover:bg-slate-600 text-white"
                          onClick={() => handleHideCourse(course._id)}
                        >
                          {course.isHidden ? (
                            <>
                              <Eye className="mr-2 h-4 w-4" />
                              Unhide
                            </>
                          ) : (
                            <>
                              <EyeOff className="mr-2 h-4 w-4" />
                              Hide
                            </>
                          )}
                        </Button>
                        <Button
                          size="sm"
                          className="bg-red-600 hover:bg-red-700 text-white"
                          onClick={() => handleDeleteCourse(course._id)}
                        >
                          <Trash2 className="mr-2 h-4 w-4" />
                          Delete
                        </Button>
                      </div>
                    </>
                  )}
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Daily Data Chart */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="h-5 w-5" />
            Daily Analytics (Last 30 Days)
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {dailyData.length === 0 ? (
              <p className="text-muted-foreground text-center py-4">No data available</p>
            ) : (
              dailyData.map((day) => (
                <div
                  key={day.date}
                  className="flex items-center justify-between p-3 border rounded-md"
                >
                  <span className="font-medium">{day.date}</span>
                  <div className="flex gap-4">
                    <span className="text-sm text-muted-foreground">
                      Enrollments: {day.enrollments}
                    </span>
                    <span className="text-sm text-muted-foreground">
                      Revenue: ₹{day.revenue.toFixed(2)}
                    </span>
                  </div>
                </div>
              ))
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

