import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useQuiz } from "@/lib/quiz-context";
import { subjects } from "@/lib/quiz-data";
import { Moon, Sun, Volume2, VolumeX, Trophy, Zap, Target, Clock, ArrowRight, BookOpen, BarChart3, Users, Award } from "lucide-react";

export function HomePage() {
  const { setCurrentView, darkMode, toggleDarkMode, soundEnabled, toggleSound, streak, setSelectedSubject } = useQuiz();
  const [hoveredSubject, setHoveredSubject] = useState<string | null>(null);

  const handleSubjectSelect = (subjectId: string) => {
    setSelectedSubject(subjectId);
    setCurrentView("setup");
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100 dark:from-slate-950 dark:to-slate-900">
      {/* Header */}
      <header className="sticky top-0 z-50 backdrop-blur-lg bg-white/80 dark:bg-slate-950/80 border-b border-slate-200 dark:border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center">
                <Zap className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                QuizArena
              </span>
            </div>
            <div className="flex items-center gap-2">
              {streak > 0 && (
                <div className="hidden sm:flex items-center gap-1 px-3 py-1.5 rounded-full bg-orange-100 dark:bg-orange-900/30 text-orange-600 dark:text-orange-400 text-sm font-medium">
                  <Zap className="w-4 h-4" />
                  {streak} day streak
                </div>
              )}
              <Button
                variant="ghost"
                size="icon"
                onClick={toggleSound}
                className="text-slate-600 dark:text-slate-300"
              >
                {soundEnabled ? <Volume2 className="w-5 h-5" /> : <VolumeX className="w-5 h-5" />}
              </Button>
              <Button
                variant="ghost"
                size="icon"
                onClick={toggleDarkMode}
                className="text-slate-600 dark:text-slate-300"
              >
                {darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
              </Button>
              <Button
                onClick={() => setCurrentView("leaderboard")}
                className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white"
              >
                <Trophy className="w-4 h-4 mr-2" />
                Leaderboard
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-50 via-white to-purple-50 dark:from-slate-900 dark:via-slate-950 dark:to-slate-900" />
        <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-indigo-200 to-purple-200 dark:from-indigo-900/20 dark:to-purple-900/20 rounded-full blur-3xl opacity-50" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-gradient-to-tr from-cyan-200 to-blue-200 dark:from-cyan-900/20 dark:to-blue-900/20 rounded-full blur-3xl opacity-50" />
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-28">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-100 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-300 text-sm font-medium mb-6">
                <Award className="w-4 h-4" />
                Learn. Practice. Master.
              </div>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-slate-900 dark:text-white mb-6 leading-tight">
                Test Your Knowledge,
                <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent"> Master New Skills</span>
              </h1>
              <p className="text-lg text-slate-600 dark:text-slate-300 mb-8 max-w-lg">
                Challenge yourself with interactive quizzes across multiple subjects. Track your progress, compete on the leaderboard, and improve daily.
              </p>
              <div className="flex flex-wrap gap-4">
                <Button
                  onClick={() => setCurrentView("daily")}
                  className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white px-8 py-6 text-lg rounded-xl shadow-lg shadow-indigo-500/25"
                >
                  <Zap className="w-5 h-5 mr-2" />
                  Daily Challenge
                </Button>
                <Button
                  onClick={() => setCurrentView("setup")}
                  variant="outline"
                  className="px-8 py-6 text-lg rounded-xl border-2 border-slate-300 dark:border-slate-700 hover:border-indigo-500 dark:hover:border-indigo-400"
                >
                  Start Quiz
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </div>
            </div>
            
            {/* Stats Card */}
            <div className="hidden lg:block">
              <Card className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border-slate-200 dark:border-slate-800 shadow-2xl shadow-indigo-500/10">
                <CardContent className="p-8">
                  <div className="grid grid-cols-2 gap-6">
                    <div className="text-center">
                      <div className="w-12 h-12 mx-auto mb-3 rounded-xl bg-indigo-100 dark:bg-indigo-900/30 flex items-center justify-center">
                        <BookOpen className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />
                      </div>
                      <div className="text-3xl font-bold text-slate-900 dark:text-white">5+</div>
                      <div className="text-sm text-slate-500 dark:text-slate-400">Subjects</div>
                    </div>
                    <div className="text-center">
                      <div className="w-12 h-12 mx-auto mb-3 rounded-xl bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center">
                        <Target className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />
                      </div>
                      <div className="text-3xl font-bold text-slate-900 dark:text-white">30+</div>
                      <div className="text-sm text-slate-500 dark:text-slate-400">Questions</div>
                    </div>
                    <div className="text-center">
                      <div className="w-12 h-12 mx-auto mb-3 rounded-xl bg-amber-100 dark:bg-amber-900/30 flex items-center justify-center">
                        <BarChart3 className="w-6 h-6 text-amber-600 dark:text-amber-400" />
                      </div>
                      <div className="text-3xl font-bold text-slate-900 dark:text-white">3</div>
                      <div className="text-sm text-slate-500 dark:text-slate-400">Difficulty Levels</div>
                    </div>
                    <div className="text-center">
                      <div className="w-12 h-12 mx-auto mb-3 rounded-xl bg-rose-100 dark:bg-rose-900/30 flex items-center justify-center">
                        <Users className="w-6 h-6 text-rose-600 dark:text-rose-400" />
                      </div>
                      <div className="text-3xl font-bold text-slate-900 dark:text-white">∞</div>
                      <div className="text-sm text-slate-500 dark:text-slate-400">Practice</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Subjects Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-4">Choose Your Subject</h2>
          <p className="text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
            Select a subject to start practicing. Each subject contains multiple chapters with questions of varying difficulty.
          </p>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {subjects.map((subject) => (
            <Card
              key={subject.id}
              className={`group cursor-pointer transition-all duration-300 hover:shadow-xl hover:-translate-y-1 border-2 ${
                hoveredSubject === subject.id
                  ? "border-indigo-500 dark:border-indigo-400"
                  : "border-slate-200 dark:border-slate-800"
              }`}
              onMouseEnter={() => setHoveredSubject(subject.id)}
              onMouseLeave={() => setHoveredSubject(null)}
              onClick={() => handleSubjectSelect(subject.id)}
            >
              <CardContent className="p-6">
                <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${subject.color} flex items-center justify-center text-2xl mb-4 shadow-lg`}>
                  {subject.icon}
                </div>
                <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-2">{subject.name}</h3>
                <p className="text-sm text-slate-500 dark:text-slate-400 mb-4">
                  {subject.id === "physics" && "Explore the fundamental laws of the universe"}
                  {subject.id === "chemistry" && "Study of matter and its transformations"}
                  {subject.id === "mathematics" && "Numbers, patterns, and logical reasoning"}
                  {subject.id === "cs" && "Programming, algorithms, and technology"}
                  {subject.id === "gk" && "World facts, history, and culture"}
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-indigo-600 dark:text-indigo-400">
                    {subject.id === "physics" && "2 chapters"}
                    {subject.id === "chemistry" && "2 chapters"}
                    {subject.id === "mathematics" && "2 chapters"}
                    {subject.id === "cs" && "2 chapters"}
                    {subject.id === "gk" && "1 chapter"}
                  </span>
                  <ArrowRight className="w-5 h-5 text-slate-400 group-hover:text-indigo-500 group-hover:translate-x-1 transition-all" />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-white dark:bg-slate-900 border-y border-slate-200 dark:border-slate-800 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-4">Why Choose QuizArena?</h2>
            <p className="text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
              Everything you need to test and improve your knowledge in one place.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-indigo-100 dark:bg-indigo-900/30 flex items-center justify-center">
                <Target className="w-8 h-8 text-indigo-600 dark:text-indigo-400" />
              </div>
              <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-2">Multiple Subjects</h3>
              <p className="text-sm text-slate-500 dark:text-slate-400">
                Practice across Physics, Chemistry, Math, Computer Science, and more.
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center">
                <Clock className="w-8 h-8 text-emerald-600 dark:text-emerald-400" />
              </div>
              <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-2">Timed Challenges</h3>
              <p className="text-sm text-slate-500 dark:text-slate-400">
                Test yourself under pressure with optional timed mode.
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-amber-100 dark:bg-amber-900/30 flex items-center justify-center">
                <Trophy className="w-8 h-8 text-amber-600 dark:text-amber-400" />
              </div>
              <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-2">Track Progress</h3>
              <p className="text-sm text-slate-500 dark:text-slate-400">
                Monitor your scores, accuracy, and streaks over time.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-4">How It Works</h2>
        </div>
        <div className="grid md:grid-cols-4 gap-8">
          {[
            { step: "01", title: "Choose Subject", desc: "Pick from our range of subjects" },
            { step: "02", title: "Select Settings", desc: "Choose difficulty and question count" },
            { step: "03", title: "Answer Questions", desc: "Test your knowledge with instant feedback" },
            { step: "04", title: "See Results", desc: "Review your performance and track progress" },
          ].map((item) => (
            <div key={item.step} className="relative">
              <div className="text-5xl font-bold text-indigo-100 dark:text-indigo-900/30 mb-4">{item.step}</div>
              <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-2">{item.title}</h3>
              <p className="text-sm text-slate-500 dark:text-slate-400">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 dark:bg-slate-950 text-slate-300 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center">
                <Zap className="w-5 h-5 text-white" />
              </div>
              <span className="text-lg font-bold text-white">QuizArena</span>
            </div>
            <p className="text-sm text-slate-400">
              © 2024 QuizArena. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}