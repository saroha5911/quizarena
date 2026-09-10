import { useState, useEffect, useCallback, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useQuiz } from "@/lib/quiz-context";
import { ArrowLeft, ArrowRight, Check, X, Clock, Flag, ChevronLeft, ChevronRight } from "lucide-react";
import { toast } from "sonner";

export function QuizInterface() {
  const { quizConfig, getQuestions, setCurrentView, setQuizResult, playSound, incrementStreak, resetStreak } = useQuiz();
  const [questions, setQuestions] = useState<any[]>([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [timeRemaining, setTimeRemaining] = useState<number>(0);
  const [startTime] = useState(Date.now());
  const [isSubmitting, setIsSubmitting] = useState(false);
  const timerRef = useRef<any>(null);

  useEffect(() => {
    if (quizConfig) {
      const qs = getQuestions(quizConfig);
      setQuestions(qs);
      setAnswers(new Array(qs.length).fill(-1));
      if (quizConfig.timed && quizConfig.timeLimit) {
        setTimeRemaining(quizConfig.timeLimit);
      }
    }
  }, [quizConfig]);

  useEffect(() => {
    if (quizConfig?.timed && timeRemaining > 0) {
      timerRef.current = setInterval(() => {
        setTimeRemaining(prev => {
          if (prev <= 1) {
            clearInterval(timerRef.current);
            handleSubmit();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [quizConfig?.timed, timeRemaining > 0]);

  const handleSelectAnswer = (index: number) => {
    if (isSubmitting) return;
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
    if (isSubmitting) return;
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

    const result = {
      score,
      totalQuestions: questions.length,
      correctAnswers: correct,
      incorrectAnswers: questions.length - correct,
      accuracy,
      timeUsed,
      answers: submittedAnswers,
      questions,
      subjectName: quizConfig?.subjectId || "",
      chapterName: quizConfig?.chapterId || "",
      date: new Date().toISOString(),
    };

    setQuizResult(result);
    setCurrentView("results");
  };

  if (questions.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4">📚</div>
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">Loading Quiz...</h2>
          <Button onClick={() => setCurrentView("home")}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Home
          </Button>
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
            Exit Quiz
          </Button>
          {quizConfig?.timed && (
            <div className={`flex items-center gap-2 px-4 py-2 rounded-lg font-mono text-lg ${
              timeRemaining < 30 ? "bg-rose-100 dark:bg-rose-900/30 text-rose-600 dark:text-rose-400" : "bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300"
            }`}>
              <Clock className="w-5 h-5" />
              {minutes}:{seconds.toString().padStart(2, "0")}
            </div>
          )}
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
              className="h-full bg-gradient-to-r from-indigo-500 to-purple-600 rounded-full transition-all duration-500"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {/* Question Card */}
        <Card className="bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 shadow-xl">
          <CardContent className="p-6 sm:p-8">
            <div className="mb-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-100 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-300 text-sm font-medium mb-4">
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
                      ? "border-indigo-500 bg-indigo-50 dark:bg-indigo-900/20"
                      : "border-slate-200 dark:border-slate-700 hover:border-indigo-300 dark:hover:border-indigo-700 hover:bg-slate-50 dark:hover:bg-slate-800"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span className={`w-8 h-8 rounded-lg flex items-center justify-center font-semibold ${
                      selectedAnswer === index
                        ? "bg-indigo-600 text-white"
                        : "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300"
                    }`}>
                      {String.fromCharCode(65 + index)}
                    </span>
                    <span className="text-slate-800 dark:text-slate-200">{option}</span>
                    {selectedAnswer === index && (
                      <Check className="w-5 h-5 text-indigo-600 dark:text-indigo-400 ml-auto" />
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
                className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white"
              >
                {currentQuestion === questions.length - 1 ? "Submit Quiz" : "Next Question"}
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
                  ? "bg-indigo-600 text-white"
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