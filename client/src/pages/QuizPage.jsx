import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import api from '../lib/api';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { CheckCircle2, XCircle, ArrowLeft, Trophy, Zap, BookOpen } from 'lucide-react';

export function QuizPage() {
  const { id } = useParams();
  const [quiz, setQuiz] = useState(null);
  const [answers, setAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [score, setScore] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchQuiz();
  }, [id]);

  const fetchQuiz = async () => {
    try {
      setLoading(true);
      const response = await api.get(`/quiz/getQuiz/${id}`);
      setQuiz(response.data.quiz);
    } catch (error) {
      console.error('Error fetching quiz:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAnswerSelect = (questionId, option) => {
    if (submitted) return;
    setAnswers({ ...answers, [questionId]: option });
  };

  const handleSubmit = () => {
    if (!quiz) return;

    let correct = 0;
    quiz.questions.forEach((question) => {
      if (answers[question._id] === question.correctOption) {
        correct++;
      }
    });

    setScore(correct);
    setSubmitted(true);
  };

  const percentage = quiz ? Math.round((score / quiz.questions.length) * 100) : 0;
  const passed = percentage >= 70;

  if (loading) {
    return (
      <div className="min-h-screen bg-white dark:bg-slate-950 flex items-center justify-center">
        <div className="text-center">
          <div className="inline-flex items-center justify-center mb-4">
            <div className="h-12 w-12 animate-spin rounded-full border-4 border-slate-200 dark:border-slate-700 border-b-blue-600" />
          </div>
          <p className="text-slate-600 dark:text-slate-400 text-lg">Loading quiz...</p>
        </div>
      </div>
    );
  }

  if (!quiz || !quiz.questions || quiz.questions.length === 0) {
    return (
      <div className="min-h-screen bg-white dark:bg-slate-950 flex items-center justify-center p-4">
        <div className="max-w-md w-full text-center">
          <div className="mb-6">
            <BookOpen className="h-16 w-16 text-slate-300 dark:text-slate-700 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">Quiz Not Found</h2>
            <p className="text-slate-600 dark:text-slate-400">Sorry, this quiz is no longer available.</p>
          </div>
          <Link to="/dashboard">
            <Button className="bg-blue-600 hover:bg-blue-700 text-white w-full gap-2">
              <ArrowLeft className="h-4 w-4" />
              Back to Dashboard
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white dark:bg-slate-950">
      {/* Header */}
      <div className="bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 sticky top-20 z-40">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link to="/dashboard">
            <Button variant="ghost" className="gap-2 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white">
              <ArrowLeft className="h-4 w-4" />
              Back
            </Button>
          </Link>
          {!submitted && (
            <div className="text-center">
              <p className="font-semibold text-slate-900 dark:text-white">Quiz Progress</p>
              <p className="text-xs text-slate-500 dark:text-slate-400">Answer: {Object.keys(answers).length} of {quiz.questions.length}</p>
            </div>
          )}
        </div>
      </div>

      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {!submitted ? (
          // Quiz View
          <div className="space-y-8">
            {/* Quiz Header */}
            <div className="text-center space-y-3 mb-8">
              <h1 className="text-4xl font-bold text-slate-900 dark:text-white">Assessment Quiz</h1>
              <p className="text-lg text-slate-600 dark:text-slate-400">
                Test your knowledge with {quiz.questions.length} questions
              </p>
              <div className="inline-block px-4 py-2 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-900/50 rounded-lg">
                <p className="text-sm font-semibold text-blue-600 dark:text-blue-400">
                  Passing Score: 70%
                </p>
              </div>
            </div>

            {/* Questions */}
            <div className="space-y-6">
              {quiz.questions.map((question, index) => {
                const userAnswer = answers[question._id];

                return (
                  <div key={question._id} className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 shadow-lg">
                    {/* Question Header */}
                    <div className="mb-6">
                      <div className="flex items-center gap-3 mb-3">
                        <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 font-bold text-sm">
                          {index + 1}
                        </span>
                        <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                          {question.content}
                        </h3>
                      </div>
                      {userAnswer && (
                        <div className="ml-11 inline-flex items-center gap-1 px-2 py-1 bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 rounded text-xs font-medium">
                          <CheckCircle2 className="h-3 w-3" />
                          Answered
                        </div>
                      )}
                    </div>

                    {/* Options */}
                    <div className="space-y-3">
                      {question.options.map((option) => {
                        const isSelected = userAnswer === option;

                        return (
                          <button
                            key={option}
                            onClick={() => handleAnswerSelect(question._id, option)}
                            disabled={submitted}
                            className={`w-full text-left p-4 rounded-xl border-2 transition-all duration-200 ${isSelected
                                ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                                : 'border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600 bg-slate-50 dark:bg-slate-800/50 hover:bg-slate-100 dark:hover:bg-slate-800'
                              } ${!submitted && 'cursor-pointer'}`}
                          >
                            <div className="flex items-center gap-3">
                              <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 ${isSelected
                                  ? 'border-blue-500 bg-blue-500'
                                  : 'border-slate-300 dark:border-slate-600'
                                }`}>
                                {isSelected && <div className="w-2 h-2 rounded-full bg-white" />}
                              </div>
                              <span className={`text-base ${isSelected
                                  ? 'text-slate-900 dark:text-white font-medium'
                                  : 'text-slate-700 dark:text-slate-300'
                                }`}>
                                {option}
                              </span>
                            </div>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Submit Button */}
            <div className="sticky bottom-4">
              <Button
                onClick={handleSubmit}
                className="w-full h-12 bg-blue-600 hover:bg-blue-700 text-white font-bold text-lg rounded-xl flex items-center justify-center gap-2 shadow-lg"
                disabled={Object.keys(answers).length === 0}
              >
                <Zap className="h-5 w-5" />
                Submit Quiz ({Object.keys(answers).length}/{quiz.questions.length} answered)
              </Button>
            </div>
          </div>
        ) : (
          // Results View
          <div className="space-y-8">
            {/* Score Card */}
            <div className={`rounded-2xl border-2 p-12 text-center space-y-6 ${passed
                ? 'bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-900/50'
                : 'bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-900/50'
              }`}>
              <div className="flex justify-center">
                {passed ? (
                  <div className="relative">
                    <div className="absolute inset-0 bg-green-400 rounded-full blur-xl opacity-50 animate-pulse"></div>
                    <div className="relative p-4 bg-green-100 dark:bg-green-900/30 rounded-full">
                      <Trophy className="h-16 w-16 text-green-600 dark:text-green-400" />
                    </div>
                  </div>
                ) : (
                  <div className="p-4 bg-red-100 dark:bg-red-900/30 rounded-full">
                    <XCircle className="h-16 w-16 text-red-600 dark:text-red-400" />
                  </div>
                )}
              </div>

              <div>
                <h2 className={`text-4xl font-bold mb-2 ${passed
                    ? 'text-green-600 dark:text-green-400'
                    : 'text-red-600 dark:text-red-400'
                  }`}>
                  {passed ? 'Excellent!' : 'Good Try!'}
                </h2>
                <p className={`text-lg ${passed
                    ? 'text-green-700 dark:text-green-300'
                    : 'text-red-700 dark:text-red-300'
                  }`}>
                  {passed
                    ? 'You have passed the quiz!'
                    : 'You need 70% to pass. Please review and try again.'}
                </p>
              </div>

              <div className="space-y-2">
                <p className="text-5xl font-bold text-slate-900 dark:text-white">
                  {percentage}%
                </p>
                <p className="text-lg font-semibold text-slate-600 dark:text-slate-400">
                  {score} out of {quiz.questions.length} correct
                </p>
              </div>
            </div>

            {/* Detailed Results */}
            <div className="space-y-4">
              <h3 className="text-2xl font-bold text-slate-900 dark:text-white">Review Your Answers</h3>

              {quiz.questions.map((question, index) => {
                const userAnswer = answers[question._id];
                const isCorrect = userAnswer === question.correctOption;

                return (
                  <div key={question._id} className="bg-white dark:bg-slate-900 rounded-2xl border-2 p-6 overflow-hidden"
                    style={{
                      borderColor: isCorrect ? '#22c55e' : '#ef4444',
                      backgroundColor: isCorrect
                        ? '#f0fdf4'
                        : '#fef2f2'
                    }}
                  >
                    <div className="dark:bg-opacity-0">
                      <div className="flex items-start gap-3 mb-4">
                        {isCorrect ? (
                          <CheckCircle2 className="h-6 w-6 text-green-600 dark:text-green-400 flex-shrink-0 mt-1" />
                        ) : (
                          <XCircle className="h-6 w-6 text-red-600 dark:text-red-400 flex-shrink-0 mt-1" />
                        )}
                        <div className="flex-1">
                          <p className="font-semibold text-slate-900 dark:text-white text-lg">
                            Question {index + 1}
                          </p>
                          <p className="text-slate-700 dark:text-slate-300 mt-1">
                            {question.content}
                          </p>
                        </div>
                      </div>

                      <div className="ml-9 space-y-2">
                        <div className="p-3 bg-white/80 dark:bg-slate-800/50 rounded-lg border-2 border-green-500">
                          <p className="text-sm font-medium text-slate-600 dark:text-slate-400">Correct Answer:</p>
                          <p className="text-green-700 dark:text-green-300 font-semibold mt-1">
                            {question.correctOption}
                          </p>
                        </div>

                        {userAnswer && userAnswer !== question.correctOption && (
                          <div className="p-3 bg-white/80 dark:bg-slate-800/50 rounded-lg border-2 border-red-500">
                            <p className="text-sm font-medium text-slate-600 dark:text-slate-400">Your Answer:</p>
                            <p className="text-red-700 dark:text-red-300 font-semibold mt-1">
                              {userAnswer}
                            </p>
                          </div>
                        )}

                        <div className="p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-900/50">
                          <p className="text-sm font-medium text-blue-600 dark:text-blue-400 mb-1">Explanation:</p>
                          <p className="text-blue-900 dark:text-blue-300 text-sm leading-relaxed">
                            {question.explanation}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 pt-6">
              <Link to="/dashboard" className="flex-1">
                <Button className="w-full h-12 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg">
                  Back to Dashboard
                </Button>
              </Link>
              <Button
                onClick={() => {
                  setAnswers({});
                  setSubmitted(false);
                  fetchQuiz();
                }}
                variant="outline"
                className="flex-1 h-12 border-blue-300 dark:border-blue-900/50 text-slate-700 dark:text-slate-300 font-semibold rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800"
              >
                Retake Quiz
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

