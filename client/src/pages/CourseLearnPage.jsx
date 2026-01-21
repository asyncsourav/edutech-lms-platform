import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import api from '../lib/api';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Textarea } from '../components/ui/textarea';
import { PlayCircle, MessageSquare, Brain, Send, ArrowLeft, CheckCircle2, User, Clock, Users } from 'lucide-react';

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
      <div className="min-h-screen bg-white dark:bg-slate-950 flex items-center justify-center">
        <div className="text-center">
          <div className="inline-flex items-center justify-center mb-4">
            <div className="h-12 w-12 animate-spin rounded-full border-4 border-slate-200 dark:border-slate-700 border-b-blue-600" />
          </div>
          <p className="text-slate-600 dark:text-slate-400 text-lg">Loading course...</p>
        </div>
      </div>
    );
  }

  if (!course) {
    return (
      <div className="min-h-screen bg-white dark:bg-slate-950 flex items-center justify-center p-4">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">Course not found</h2>
          <Link to="/dashboard">
            <Button className="bg-blue-600 hover:bg-blue-700 text-white gap-2">
              <ArrowLeft className="h-4 w-4" />
              Back to Dashboard
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  const currentModuleIndex = course.modules?.findIndex(m => m._id === selectedModule?._id) ?? 0;
  const totalModules = course.modules?.length || 0;

  return (
    <div className="min-h-screen bg-white dark:bg-slate-950">

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Module List */}
          <div className="lg:col-span-1">
            <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-lg sticky top-32">
              <div className="p-6 border-b border-slate-200 dark:border-slate-800 bg-gradient-to-r from-blue-50 to-slate-50 dark:from-blue-900/20 dark:to-slate-900">
                <h3 className="font-bold text-slate-900 dark:text-white flex items-center gap-2">
                  <PlayCircle className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                  Course Content
                </h3>
                <p className="text-xs text-slate-600 dark:text-slate-400 mt-1">{totalModules} modules</p>
              </div>
              <div className="divide-y divide-slate-200 dark:divide-slate-800 max-h-96 overflow-y-auto">
                {course.modules?.map((module, idx) => (
                  <button
                    key={module._id}
                    onClick={() => setSelectedModule(module)}
                    className={`w-full text-left p-4 transition-all duration-200 ${selectedModule?._id === module._id
                        ? 'bg-blue-50 dark:bg-blue-900/20 border-l-4 border-blue-600'
                        : 'hover:bg-slate-50 dark:hover:bg-slate-800/50'
                      }`}
                  >
                    <div className="flex items-start gap-3">
                      <div className={`p-2 rounded-lg flex-shrink-0 ${selectedModule?._id === module._id
                          ? 'bg-blue-100 dark:bg-blue-900/30'
                          : 'bg-slate-100 dark:bg-slate-800'
                        }`}>
                        <PlayCircle className={`h-4 w-4 ${selectedModule?._id === module._id
                            ? 'text-blue-600 dark:text-blue-400'
                            : 'text-slate-600 dark:text-slate-400'
                          }`} />
                      </div>
                      <div className="min-w-0">
                        <p className={`text-sm font-medium line-clamp-2 ${selectedModule?._id === module._id
                            ? 'text-slate-900 dark:text-white'
                            : 'text-slate-700 dark:text-slate-300'
                          }`}>{module.title}</p>
                        <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">Module {idx + 1}</p>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Video Player and Content */}
          <div className="lg:col-span-3 space-y-8">
            {selectedModule ? (
              <>
                {/* Video Player Card */}
                <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-lg">
                  <div className="aspect-video bg-black rounded-t-2xl overflow-hidden">
                    <video
                      src={selectedModule.video}
                      controls
                      className="w-full h-full"
                    >
                      Your browser does not support the video tag.
                    </video>
                  </div>

                  <div className="p-6 space-y-4">
                    <div>
                      <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">
                        {selectedModule.title}
                      </h2>
                      <div className="flex items-center gap-4 text-sm text-slate-600 dark:text-slate-400">
                        <div className="flex items-center gap-1">
                          <Clock className="h-4 w-4" />
                          <span>Lesson {currentModuleIndex + 1} of {totalModules}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Users className="h-4 w-4" />
                          <span>Course: {course.title}</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-3">
                      {!hasQuiz ? (
                        <Button
                          onClick={handleGenerateQuiz}
                          disabled={quizLoading}
                          className="flex-1 h-11 bg-blue-600 hover:bg-blue-700 text-white font-semibold gap-2 rounded-lg"
                        >
                          <Brain className="h-4 w-4" />
                          {quizLoading ? 'Generating Quiz...' : 'Generate Quiz'}
                        </Button>
                      ) : (
                        <Link to={`/quiz/${selectedModule.quiz}`} className="flex-1">
                          <Button className="w-full h-11 bg-green-600 hover:bg-green-700 text-white font-semibold gap-2 rounded-lg">
                            <Brain className="h-4 w-4" />
                            Take Quiz Now
                          </Button>
                        </Link>
                      )}
                    </div>
                  </div>
                </div>

                {/* Comments Section */}
                <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-lg">
                  <div className="p-6 border-b border-slate-200 dark:border-slate-800 bg-gradient-to-r from-blue-50 to-slate-50 dark:from-blue-900/20 dark:to-slate-900">
                    <h3 className="font-bold text-slate-900 dark:text-white text-lg flex items-center gap-2">
                      <MessageSquare className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                      Comments {comments.length > 0 && `(${comments.length})`}
                    </h3>
                  </div>

                  <div className="p-6 space-y-6">
                    {/* Comment Form */}
                    <form onSubmit={handleCommentSubmit} className="space-y-3">
                      <Textarea
                        placeholder="Share your thoughts about this lesson..."
                        value={newComment}
                        onChange={(e) => setNewComment(e.target.value)}
                        rows={3}
                        className="border-slate-200 dark:border-slate-700 focus:border-blue-500 dark:focus:border-blue-400 rounded-lg"
                      />
                      <Button
                        type="submit"
                        disabled={submittingComment || !newComment.trim()}
                        className="bg-blue-600 hover:bg-blue-700 text-white font-semibold gap-2 rounded-lg"
                      >
                        <Send className="h-4 w-4" />
                        {submittingComment ? 'Posting...' : 'Post Comment'}
                      </Button>
                    </form>

                    {/* Comments List */}
                    <div className="space-y-4 border-t border-slate-200 dark:border-slate-800 pt-6">
                      {comments.length === 0 ? (
                        <div className="text-center py-8">
                          <MessageSquare className="h-12 w-12 text-slate-300 dark:text-slate-700 mx-auto mb-2" />
                          <p className="text-slate-600 dark:text-slate-400 font-medium">No comments yet</p>
                          <p className="text-sm text-slate-500 dark:text-slate-500">Be the first to share your thoughts!</p>
                        </div>
                      ) : (
                        comments.map((comment) => (
                          <div key={comment._id} className="p-4 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-200 dark:border-slate-700">
                            <div className="flex items-start gap-3">
                              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-100 to-blue-200 dark:from-blue-900/30 dark:to-blue-800/30 flex items-center justify-center flex-shrink-0">
                                <User className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                              </div>
                              <div className="flex-1 min-w-0">
                                <p className="font-semibold text-slate-900 dark:text-white">
                                  {comment.userId?.fullName || 'Anonymous User'}
                                </p>
                                <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                                  {new Date(comment.createdAt).toLocaleDateString('en-US', {
                                    year: 'numeric',
                                    month: 'short',
                                    day: 'numeric'
                                  })}
                                </p>
                                <p className="text-slate-700 dark:text-slate-300 mt-2 leading-relaxed">
                                  {comment.comment}
                                </p>
                              </div>
                            </div>
                          </div>
                        ))
                      )}
                    </div>
                  </div>
                </div>
              </>
            ) : (
              <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-12 text-center">
                <PlayCircle className="h-16 w-16 text-slate-300 dark:text-slate-700 mx-auto mb-4" />
                <p className="text-slate-600 dark:text-slate-400 font-medium">Select a module to start learning</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

