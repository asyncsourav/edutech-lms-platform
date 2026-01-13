import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import api from '../lib/api';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Textarea } from '../components/ui/textarea';
import { PlayCircle, MessageSquare, Brain, Send } from 'lucide-react';

export function CourseLearnPage() {
  const { id } = useParams();
  const [course, setCourse] = useState(null);
  const [selectedModule, setSelectedModule] = useState(null);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [loading, setLoading] = useState(true);
  const [submittingComment, setSubmittingComment] = useState(false);
  const [hasQuiz, setHasQuiz] = useState(false);
  const [quizLoading, setQuizLoading] = useState(false);

  useEffect(() => {
    fetchCourse();
  }, [id]);

  useEffect(() => {
    if (selectedModule) {
      fetchModuleDetails();
      checkQuiz();
    }
  }, [selectedModule]);

  const fetchCourse = async () => {
    try {
      setLoading(true);
      const response = await api.get(`/purchasedCourse/${id}`);
      setCourse(response.data);
      if (response.data.modules && response.data.modules.length > 0) {
        setSelectedModule(response.data.modules[0]);
      }
    } catch (error) {
      console.error('Error fetching course:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchModuleDetails = async () => {
    if (!selectedModule?._id) return;
    try {
      const response = await api.get(`/getModule/${selectedModule._id}`);
      setComments(response.data.module.comments || []);
    } catch (error) {
      console.error('Error fetching module:', error);
    }
  };

  const checkQuiz = async () => {
    if (!selectedModule?._id) return;
    try {
      setQuizLoading(true);
      const response = await api.get(`/quiz/checkQuiz/${selectedModule._id}`);
      setHasQuiz(response.data.hasQuiz);
    } catch (error) {
      console.error('Error checking quiz:', error);
    } finally {
      setQuizLoading(false);
    }
  };

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    if (!newComment.trim() || !selectedModule?._id) return;

    try {
      setSubmittingComment(true);
      await api.post(`/comment/createComment/${selectedModule._id}`, {
        comment: newComment,
      });
      setNewComment('');
      fetchModuleDetails(); // Refresh comments
    } catch (error) {
      alert(error.response?.data?.message || 'Failed to add comment');
    } finally {
      setSubmittingComment(false);
    }
  };

  const handleGenerateQuiz = async () => {
    if (!selectedModule?._id) return;

    try {
      setQuizLoading(true);

      const response = await api.post('/quiz/generateQuiz', {
        moduleId: selectedModule._id,
        content: `${selectedModule.title} - ${course.title}`,
      });

      setHasQuiz(true);

      setSelectedModule(prev => ({
        ...prev,
        quiz: response.data.quizId,
      }));

      alert('Quiz generated successfully!');
    } catch (error) {
      alert(error.response?.data?.message || 'Failed to generate quiz');
    } finally {
      setQuizLoading(false);
    }
  };


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
      <div className="mb-6">
        <Link to={`/course/${id}`}>
          <Button variant="outline">← Back to Course</Button>
        </Link>
        <h1 className="text-3xl font-bold mt-4">{course.title}</h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Module List */}
        <div className="lg:col-span-1">
          <Card>
            <CardHeader>
              <CardTitle>Modules</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              {course.modules?.map((module) => (
                <button
                  key={module._id}
                  onClick={() => setSelectedModule(module)}
                  className={`w-full text-left p-3 rounded-md transition-colors ${selectedModule?._id === module._id
                      ? 'bg-primary text-primary-foreground'
                      : 'hover:bg-accent'
                    }`}
                >
                  <div className="flex items-center gap-2">
                    <PlayCircle className="h-4 w-4" />
                    <span className="text-sm">{module.title}</span>
                  </div>
                </button>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Video Player and Content */}
        <div className="lg:col-span-3 space-y-6">
          {selectedModule ? (
            <>
              <Card>
                <CardHeader>
                  <CardTitle>{selectedModule.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="aspect-video bg-black rounded-lg mb-4">
                    <video
                      src={selectedModule.video}
                      controls
                      className="w-full h-full rounded-lg"
                    >
                      Your browser does not support the video tag.
                    </video>
                  </div>

                  <div className="flex gap-4 mb-6">
                    {!hasQuiz ? (
                      <Button onClick={handleGenerateQuiz} disabled={quizLoading}>
                        <Brain className="mr-2 h-4 w-4" />
                        {quizLoading ? 'Generating...' : 'Generate Quiz'}
                      </Button>
                    ) : (
                      <Link to={`/quiz/${selectedModule.quiz}`}>
                        <Button>
                          <Brain className="mr-2 h-4 w-4" />
                          Take Quiz
                        </Button>
                      </Link>
                    )}
                  </div>
                </CardContent>
              </Card>

              {/* Comments Section */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <MessageSquare className="h-5 w-5" />
                    Comments
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <form onSubmit={handleCommentSubmit} className="space-y-2">
                    <Textarea
                      placeholder="Add a comment..."
                      value={newComment}
                      onChange={(e) => setNewComment(e.target.value)}
                      rows={3}
                    />
                    <Button type="submit" disabled={submittingComment || !newComment.trim()}>
                      <Send className="mr-2 h-4 w-4" />
                      {submittingComment ? 'Posting...' : 'Post Comment'}
                    </Button>
                  </form>

                  <div className="space-y-4 mt-6">
                    {comments.length === 0 ? (
                      <p className="text-muted-foreground text-center py-4">
                        No comments yet. Be the first to comment!
                      </p>
                    ) : (
                      comments.map((comment) => (
                        <div key={comment._id} className="border-b pb-4 last:border-0">
                          <div className="flex items-start gap-3">
                            <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                              {comment.userId?.fullName?.[0]?.toUpperCase() || 'U'}
                            </div>
                            <div className="flex-1">
                              <p className="font-semibold text-sm">
                                {comment.userId?.fullName || 'Anonymous'}
                              </p>
                              <p className="text-sm text-muted-foreground">
                                {new Date(comment.createdAt).toLocaleDateString()}
                              </p>
                              <p className="mt-1">{comment.comment}</p>
                            </div>
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                </CardContent>
              </Card>
            </>
          ) : (
            <Card>
              <CardContent className="py-12 text-center">
                <p className="text-muted-foreground">Select a module to start learning</p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}

