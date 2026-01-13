import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import api from '../lib/api';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { CheckCircle2, XCircle, ArrowLeft } from 'lucide-react';

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

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <p className="text-center">Loading quiz...</p>
      </div>
    );
  }

  if (!quiz || !quiz.questions || quiz.questions.length === 0) {
    return (
      <div className="container mx-auto px-4 py-8">
        <Card>
          <CardContent className="py-12 text-center">
            <p className="text-muted-foreground">Quiz not found</p>
            <Link to="/">
              <Button className="mt-4">Back to Courses</Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <Link to="/">
        <Button variant="outline" className="mb-6">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back
        </Button>
      </Link>

      <Card>
        <CardHeader>
          <CardTitle>Quiz</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {quiz.questions.map((question, index) => {
            const userAnswer = answers[question._id];
            const isCorrect = userAnswer === question.correctOption;

            return (
              <div key={question._id} className="space-y-3">
                <h3 className="font-semibold">
                  {index + 1}. {question.content}
                </h3>
                <div className="space-y-2">
                  {question.options.map((option) => {
                    const isSelected = userAnswer === option;
                    const showCorrect = submitted && option === question.correctOption;
                    const showIncorrect = submitted && isSelected && !isCorrect;

                    return (
                      <button
                        key={option}
                        onClick={() => handleAnswerSelect(question._id, option)}
                        disabled={submitted}
                        className={`w-full text-left p-3 rounded-md border transition-colors ${
                          isSelected
                            ? 'border-primary bg-primary/10'
                            : 'border-border hover:bg-accent'
                        } ${
                          showCorrect
                            ? 'border-green-500 bg-green-500/10'
                            : ''
                        } ${
                          showIncorrect
                            ? 'border-red-500 bg-red-500/10'
                            : ''
                        }`}
                      >
                        <div className="flex items-center gap-2">
                          {showCorrect && <CheckCircle2 className="h-4 w-4 text-green-500" />}
                          {showIncorrect && <XCircle className="h-4 w-4 text-red-500" />}
                          <span>{option}</span>
                        </div>
                      </button>
                    );
                  })}
                </div>
                {submitted && (
                  <div className="p-3 bg-muted rounded-md">
                    <p className="text-sm font-semibold">Explanation:</p>
                    <p className="text-sm text-muted-foreground">
                      {question.explanation}
                    </p>
                  </div>
                )}
              </div>
            );
          })}

          {!submitted ? (
            <Button onClick={handleSubmit} className="w-full" size="lg">
              Submit Quiz
            </Button>
          ) : (
            <div className="text-center space-y-4">
              <div className="p-6 bg-primary/10 rounded-lg">
                <p className="text-2xl font-bold">
                  Score: {score} / {quiz.questions.length}
                </p>
                <p className="text-muted-foreground mt-2">
                  {((score / quiz.questions.length) * 100).toFixed(0)}% Correct
                </p>
              </div>
              <Link to="/">
                <Button>Back to Courses</Button>
              </Link>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

