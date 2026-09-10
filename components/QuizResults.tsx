import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useQuiz } from "@/lib/quiz-context";
import { quizData } from "@/lib/quiz-data";
import { Trophy, Target, CheckCircle2, XCircle, Clock, RotateCcw, Home, ChevronDown, ChevronUp, Award } from "lucide-react";
import { toast } from "sonner";

export function QuizResults() {
  const { quizResult, setCurrentView, setQuizConfig, addToLeaderboard, playSound } = useQuiz();
  const [showReview, setShowReview] = useState(false);
  const [confetti, setConfetti] = useState(false);

  useEffect(() => {
    if (quizResult && quizResult.accuracy >= 70) {
      setConfetti(true);
      const timer = setTimeout(() => setConfetti(false), 3000);
      return () => clearTimeout(timer);
    }
  }, [quizResult]);

  useEffect(() => {
    if (quizResult) {
      const subject = quizData.subjects.find(s => s.id === quizResult.subjectName);
      const chapter = subject?.chapters.find(c => c.id === quizResult.chapterName);
      const playerName = localStorage.getItem("quizarena-playername") || "Anonymous";
      
      addToLeaderboard({
        name: playerName,
        score: quizResult.score,
        accuracy: quizResult.accuracy,
        date: new Date().toISOString(),
        subject: subject?.name || "Unknown",
        chapter: chapter?.name || "Unknown",
      });
    }
  }, [quizResult]);

  if (!quizResult) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4">📊</div>
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">No Results Found</h2>
          <Button onClick={() => setCurrentView("home")}>
            <Home className="w-4 h-4 mr-2" />
            Back to Home
          </Button>
        </div>
      </div>
    );
  }

  const subject = quizData.subjects.find(s => s.id === quizResult.subjectName);
  const chapter = subject?.chapters.find(c => c.id === quizResult.chapterName);

  const performanceMessage = 
    quizResult.accuracy >= 90 ? "Outstanding! You're a quiz master! 🏆" :
    quizResult.accuracy >= 70 ? "Great job! Keep up the excellent work! 🌟" :
    quizResult.accuracy >= 50 ? "Good effort! Keep practicing to improve! 💪" :
    "Don't give up! Review the answers and try again! 📚";

  const minutes = Math.floor(quizResult.timeUsed / 60);
  const seconds = quizResult.timeUsed % 60;

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100 dark:from-slate-950 dark:to-slate-900">
      {confetti && (
        <div className="fixed inset-0 pointer-events-none z-50">
          {Array.from({ length: 50 }).map((_, i) => (
            <div
              key={i}
              className="absolute w-2 h-2 rounded-full animate-bounce"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                backgroundColor: ["#f59e0b", "#ef4444", "#3b82f6", "#10b981", "#8b5cf6"][i % 5],
                animationDelay: `${Math.random() * 2}s`,
                animationDuration: `${1 + Math.random() * 2}s`,
              }}
            />
          ))}
        </div>
      )}

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600 mb-4">
            <Trophy className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">Quiz Complete!</h1>
          <p className="text-slate-600 dark:text-slate-400">
            {subject?.name} • {chapter?.name}
          </p>
        </div>

        {/* Score Card */}
        <Card className="bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 shadow-xl mb-8">
          <CardContent className="p-8">
            <div className="text-center mb-8">
              <div className="text-6xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent mb-2">
                {quizResult.score}
              </div>
              <div className="text-slate-500 dark:text-slate-400">points</div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
              <div className="text-center p-4 rounded-xl bg-emerald-50 dark:bg-emerald-900/20">
                <CheckCircle2 className="w-6 h-6 text-emerald-600 dark:text-emerald-400 mx-auto mb-2" />
                <div className="text-2xl font-bold text-slate-900 dark:text-white">{quizResult.correctAnswers}</div>
                <div className="text-sm text-slate-500 dark:text-slate-400">Correct</div>
              </div>
              <div className="text-center p-4 rounded-xl bg-rose-50 dark:bg-rose-900/20">
                <XCircle className="w-6 h-6 text-rose-600 dark:text-rose-400 mx-auto mb-2" />
                <div className="text-2xl font-bold text-slate-900 dark:text-white">{quizResult.incorrectAnswers}</div>
                <div className="text-sm text-slate-500 dark:text-slate-400">Incorrect</div>
              </div>
              <div className="text-center p-4 rounded-xl bg-amber-50 dark:bg-amber-900/20">
                <Target className="w-6 h-6 text-amber-600 dark:text-amber-400 mx-auto mb-2" />
                <div className="text-2xl font-bold text-slate-900 dark:text-white">{quizResult.accuracy}%</div>
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

            <div className="text-center mb-8">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-100 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-300 font-medium">
                <Award className="w-5 h-5" />
                {performanceMessage}
              </div>
            </div>

            <div className="flex flex-wrap justify-center gap-4">
              <Button
                onClick={() => {
                  playSound("click");
                  setCurrentView("setup");
                }}
                className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white"
              >
                <RotateCcw className="w-4 h-4 mr-2" />
                Try Again
              </Button>
              <Button
                onClick={() => {
                  playSound("click");
                  setCurrentView("home");
                }}
                variant="outline"
              >
                <Home className="w-4 h-4 mr-2" />
                Choose Another Quiz
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Review Section */}
        <Card className="bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800">
          <CardContent className="p-6">
            <button
              onClick={() => {
                setShowReview(!showReview);
                playSound("click");
              }}
              className="w-full flex items-center justify-between text-lg font-semibold text-slate-900 dark:text-white"
            >
              Review Answers
              {showReview ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
            </button>

            {showReview && (
              <div className="mt-6 space-y-6">
                {quizResult.questions.map((q, index) => (
                  <div
                    key={index}
                    className={`p-4 rounded-xl border-2 ${
                      quizResult.answers[index] === q.correctAnswer
                        ? "border-emerald-200 dark:border-emerald-800 bg-emerald-50 dark:bg-emerald-900/20"
                        : "border-rose-200 dark:border-rose-800 bg-rose-50 dark:bg-rose-900/20"
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <div className={`mt-1 ${quizResult.answers[index] === q.correctAnswer ? "text-emerald-600 dark:text-emerald-400" : "text-rose-600 dark:text-rose-400"}`}>
                        {quizResult.answers[index] === q.correctAnswer ? (
                          <CheckCircle2 className="w-5 h-5" />
                        ) : (
                          <XCircle className="w-5 h-5" />
                        )}
                      </div>
                      <div className="flex-1">
                        <div className="font-medium text-slate-900 dark:text-white mb-2">
                          {index + 1}. {q.question}
                        </div>
                        <div className="space-y-1 text-sm">
                          {q.options.map((option, optIndex) => (
                            <div
                              key={optIndex}
                              className={`${
                                optIndex === q.correctAnswer
                                  ? "text-emerald-600 dark:text-emerald-400 font-medium"
                                  : optIndex === quizResult.answers[index]
                                  ? "text-rose-600 dark:text-rose-400"
                                  : "text-slate-500 dark:text-slate-400"
                              }`}
                            >
                              {String.fromCharCode(65 + optIndex)}. {option}
                              {optIndex === q.correctAnswer && " ✓"}
                              {optIndex === quizResult.answers[index] && optIndex !== q.correctAnswer && " ✗"}
                            </div>
                          ))}
                        </div>
                        <div className="mt-3 p-3 rounded-lg bg-white dark:bg-slate-800 text-sm text-slate-600 dark:text-slate-300">
                          <span className="font-medium text-indigo-600 dark:text-indigo-400">Explanation: </span>
                          {q.explanation}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}