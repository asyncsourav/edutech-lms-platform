

import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../lib/api';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Textarea } from '../components/ui/textarea';
import { Plus, BookOpen, Users, DollarSign, TrendingUp, Calendar } from 'lucide-react';
import { useNavigate } from 'react-router-dom';



export function AdminDashboardPage() {

  const navigate = useNavigate();
  const [analytics, setAnalytics] = useState(null);
  const [dailyData, setDailyData] = useState([]);
  const [showCreateCourse, setShowCreateCourse] = useState(false);
  const [loading, setLoading] = useState(true);

  // Course creation form state
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState('');
  const [thumbnail, setThumbnail] = useState(null);
  const [creating, setCreating] = useState(false);

  useEffect(() => {
    fetchAnalytics();
    fetchDailyData();
  }, []);


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
        navigate('/');
      }
    } catch (error) {
      alert(error.response?.data?.message || 'Failed to create course');
    } finally {
      setCreating(false);
    }
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

