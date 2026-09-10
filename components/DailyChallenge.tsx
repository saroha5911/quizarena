import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useQuiz } from "@/lib/quiz-context";
import { ArrowLeft, Zap, Clock, Check, X, ChevronRight, ChevronLeft, Flag } from "lucide-react";
import { toast } from "sonner";

export function DailyChallenge() {
  const { setCurrentView, getDailyQuestions, playSound, incrementStreak, resetStreak, setQuizResult } = useQuiz();
  const [questions, setQuestions] = useState<any[]>([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [timeRemaining, setTimeRemaining] = useState(600); // 10 minutes
  const [startTime] = useState(Date.now());
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [quizComplete, setQuizComplete] = useState(false);
  const [result, setResult] = useState<any>(null);

  useEffect(() => {
    const dailyQuestions = getDailyQuestions();
    setQuestions(dailyQuestions);
    setAnswers(new Array(dailyQuestions.length).fill(-1));
  }, []);

  useEffect(() => {
    if (timeRemaining > 0 && !quizComplete) {
      const timer = setInterval(() => {
        setTimeRemaining(prev => {
          if (prev <= 1) {
            clearInterval(timer);
            handleSubmit();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [timeRemaining, quizComplete]);

  const handleSelectAnswer = (index: number) => {
    if (isSubmitting || quizComplete) return;
    setSelectedAnswer(index);
    playSound("click");
  };

  const handleNext = () => {
    if (selectedAnswer === null) {
      toast.error("Please select an answer first");
      return;
    }
    
    const newAnswers = [...answers];
    newAnswers[currentQuestion] = selectedAnswer;
    setAnswers(newAnswers);
    setSelectedAnswer(null);
    playSound("click");

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      handleSubmit(newAnswers);
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
      setSelectedAnswer(answers[currentQuestion - 1] !== -1 ? answers[currentQuestion - 1] : null);
      playSound("click");
    }
  };

  const handleClear = () => {
    setSelectedAnswer(null);
    playSound("click");
  };

  const handleSubmit = (finalAnswers?: number[]) => {
    if (isSubmitting || quizComplete) return;
    setIsSubmitting(true);
    
    const submittedAnswers = finalAnswers || answers;
    const timeUsed = Math.round((Date.now() - startTime) / 1000);
    
    let correct = 0;
    questions.forEach((q, i) => {
      if (submittedAnswers[i] === q.correctAnswer) {
        correct++;
      }
    });

    const accuracy = Math.round((correct / questions.length) * 100);
    const score = correct * 10;

    if (accuracy >= 70) {
      incrementStreak();
      playSound("complete");
    } else {
      resetStreak();
      playSound("wrong");
    }

    const dailyResult = {
      score,
      totalQuestions: questions.length,
      correctAnswers: correct,
      incorrectAnswers: questions.length - correct,
      accuracy,
      timeUsed,
      answers: submittedAnswers,
      questions,
      subjectName: "daily",
      chapterName: "Daily Challenge",
      date: new Date().toISOString(),
    };

    setResult(dailyResult);
    setQuizComplete(true);
    setQuizResult(dailyResult);
  };

  const handleRetry = () => {
    setQuestions(getDailyQuestions());
    setAnswers(new Array(questions.length).fill(-1));
    setCurrentQuestion(0);
    setSelectedAnswer(null);
    setTimeRemaining(600);
    setIsSubmitting(false);
    setQuizComplete(false);
    setResult(null);
    playSound("click");
  };

  if (questions.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4">📚</div>
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">Loading Daily Challenge...</h2>
          <Button onClick={() => setCurrentView("home")}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Home
          </Button>
        </div>
      </div>
    );
  }

  if (quizComplete && result) {
    const minutes = Math.floor(result.timeUsed / 60);
    const seconds = result.timeUsed % 60;

    return (
      <div className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100 dark:from-slate-950 dark:to-slate-900">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-gradient-to-br from-amber-500 to-orange-600 mb-4">
              <Zap className="w-10 h-10 text-white" />
            </div>
            <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">Daily Challenge Complete!</h1>
            <p className="text-slate-600 dark:text-slate-400">Here's how you did today</p>
          </div>

          <Card className="bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 shadow-xl mb-8">
            <CardContent className="p-8">
              <div className="text-center mb-8">
                <div className="text-6xl font-bold bg-gradient-to-r from-amber-500 to-orange-600 bg-clip-text text-transparent mb-2">
                  {result.score}
                </div>
                <div className="text-slate-500 dark:text-slate-400">points</div>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                <div className="text-center p-4 rounded-xl bg-emerald-50 dark:bg-emerald-900/20">
                  <Check className="w-6 h-6 text-emerald-600 dark:text-emerald-400 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-slate-900 dark:text-white">{result.correctAnswers}</div>
                  <div className="text-sm text-slate-500 dark:text-slate-400">Correct</div>
                </div>
                <div className="text-center p-4 rounded-xl bg-rose-50 dark:bg-rose-900/20">
                  <X className="w-6 h-6 text-rose-600 dark:text-rose-400 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-slate-900 dark:text-white">{result.incorrectAnswers}</div>
                  <div className="text-sm text-slate-500 dark:text-slate-400">Incorrect</div>
                </div>
                <div className="text-center p-4 rounded-xl bg-amber-50 dark:bg-amber-900/20">
                  <Flag className="w-6 h-6 text-amber-600 dark:text-amber-400 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-slate-900 dark:text-white">{result.accuracy}%</div>
                  <div className="text-sm text-slate-500 dark:text-slate-400">Accuracy</div>
                </div>
                <div className="text-center p-4 rounded-xl bg-indigo-50 dark:bg-indigo-900/20">
                  <Clock className="w-6 h-6 text-indigo-600 dark:text-indigo-400 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-slate-900 dark:text-white">
                    {minutes > 0 ? `${minutes}m ${seconds}s` : `${seconds}s`}
                  </div>
                  <div className="text-sm text-slate-500 dark:text-slate-400">Time</div>
                </div>
              </div>

              <div className="flex flex-wrap justify-center gap-4">
                <Button
                  onClick={handleRetry}
                  className="bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 text-white"
                >
                  Try Again
                </Button>
                <Button
                  onClick={() => setCurrentView("home")}
                  variant="outline"
                >
                  Back to Home
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Review */}
          <Card className="bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800">
            <CardContent className="p-6">
              <h2 className="text-lg font-semibold text-slate-900 dark:text-white mb-4">Review Answers</h2>
              <div className="space-y-4">
                {result.questions.map((q: any, index: number) => (
                  <div
                    key={index}
                    className={`p-4 rounded-xl border-2 ${
                      result.answers[index] === q.correctAnswer
                        ? "border-emerald-200 dark:border-emerald-800 bg-emerald-50 dark:bg-emerald-900/20"
                        : "border-rose-200 dark:border-rose-800 bg-rose-50 dark:bg-rose-900/20"
                    }`}
                  >
                    <div className="font-medium text-slate-900 dark:text-white mb-2">
                      {index + 1}. {q.question}
                    </div>
                    <div className="space-y-1 text-sm">
                      {q.options.map((option: string, optIndex: number) => (
                        <div
                          key={optIndex}
                          className={`${
                            optIndex === q.correctAnswer
                              ? "text-emerald-600 dark:text-emerald-400 font-medium"
                              : optIndex === result.answers[index]
                              ? "text-rose-600 dark:text-rose-400"
                              : "text-slate-500 dark:text-slate-400"
                          }`}
                        >
                          {String.fromCharCode(65 + optIndex)}. {option}
                          {optIndex === q.correctAnswer && " ✓"}
                          {optIndex === result.answers[index] && optIndex !== q.correctAnswer && " ✗"}
                        </div>
                      ))}
                    </div>
                    <div className="mt-3 p-3 rounded-lg bg-white dark:bg-slate-800 text-sm text-slate-600 dark:text-slate-300">
                      <span className="font-medium text-indigo-600 dark:text-indigo-400">Explanation: </span>
                      {q.explanation}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  const question = questions[currentQuestion];
  const progress = ((currentQuestion + 1) / questions.length) * 100;
  const minutes = Math.floor(timeRemaining / 60);
  const seconds = timeRemaining % 60;

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100 dark:from-slate-950 dark:to-slate-900">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <Button
            variant="ghost"
            onClick={() => setCurrentView("home")}
            className="text-slate-600 dark:text-slate-300"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Exit Challenge
          </Button>
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gradient-to-r from-amber-500 to-orange-600 text-white font-medium">
              <Zap className="w-5 h-5" />
              Daily Challenge
            </div>
            <div className={`flex items-center gap-2 px-4 py-2 rounded-lg font-mono text-lg ${
              timeRemaining < 60 ? "bg-rose-100 dark:bg-rose-900/30 text-rose-600 dark:text-rose-400" : "bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300"
            }`}>
              <Clock className="w-5 h-5" />
              {minutes}:{seconds.toString().padStart(2, "0")}
            </div>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-medium text-slate-600 dark:text-slate-300">
              Question {currentQuestion + 1} of {questions.length}
            </span>
            <span className="text-sm text-slate-500 dark:text-slate-400">
              {Math.round(progress)}% complete
            </span>
          </div>
          <div className="w-full h-2 bg-slate-200 dark:bg-slate-800 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-amber-500 to-orange-600 rounded-full transition-all duration-500"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {/* Question Card */}
        <Card className="bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 shadow-xl">
          <CardContent className="p-6 sm:p-8">
            <div className="mb-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-300 text-sm font-medium mb-4">
                <Flag className="w-4 h-4" />
                {question.difficulty.charAt(0).toUpperCase() + question.difficulty.slice(1)}
              </div>
              <h2 className="text-xl sm:text-2xl font-semibold text-slate-900 dark:text-white leading-relaxed">
                {question.question}
              </h2>
            </div>

            <div className="space-y-3">
              {question.options.map((option: string, index: number) => (
                <button
                  key={index}
                  onClick={() => handleSelectAnswer(index)}
                  className={`w-full p-4 rounded-xl border-2 text-left transition-all ${
                    selectedAnswer === index
                      ? "border-amber-500 bg-amber-50 dark:bg-amber-900/20"
                      : "border-slate-200 dark:border-slate-700 hover:border-amber-300 dark:hover:border-amber-700 hover:bg-slate-50 dark:hover:bg-slate-800"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span className={`w-8 h-8 rounded-lg flex items-center justify-center font-semibold ${
                      selectedAnswer === index
                        ? "bg-amber-500 text-white"
                        : "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300"
                    }`}>
                      {String.fromCharCode(65 + index)}
                    </span>
                    <span className="text-slate-800 dark:text-slate-200">{option}</span>
                    {selectedAnswer === index && (
                      <Check className="w-5 h-5 text-amber-500 ml-auto" />
                    )}
                  </div>
                </button>
              ))}
            </div>

            {/* Controls */}
            <div className="flex items-center justify-between mt-8 pt-6 border-t border-slate-200 dark:border-slate-800">
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  onClick={handlePrevious}
                  disabled={currentQuestion === 0}
                  className="text-slate-600 dark:text-slate-300"
                >
                  <ChevronLeft className="w-4 h-4 mr-2" />
                  Previous
                </Button>
                {selectedAnswer !== null && (
                  <Button
                    variant="ghost"
                    onClick={handleClear}
                    className="text-rose-600 dark:text-rose-400"
                  >
                    <X className="w-4 h-4 mr-2" />
                    Clear
                  </Button>
                )}
              </div>
              <Button
                onClick={handleNext}
                disabled={selectedAnswer === null}
                className="bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 text-white"
              >
                {currentQuestion === questions.length - 1 ? "Submit Challenge" : "Next Question"}
                <ChevronRight className="w-4 h-4 ml-2" />
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Question Navigation */}
        <div className="mt-6 flex flex-wrap gap-2">
          {questions.map((_, index) => (
            <button
              key={index}
              onClick={() => {
                setCurrentQuestion(index);
                setSelectedAnswer(answers[index] !== -1 ? answers[index] : null);
                playSound("click");
              }}
              className={`w-10 h-10 rounded-lg text-sm font-medium transition-all ${
                index === currentQuestion
                  ? "bg-amber-500 text-white"
                  : answers[index] !== -1
                  ? "bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-300"
                  : "bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700"
              }`}
            >
              {index + 1}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}