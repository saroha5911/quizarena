import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useQuiz } from "@/lib/quiz-context";
import { quizData } from "@/lib/quiz-data";
import { ArrowLeft, Play, Clock, BookOpen, ChevronRight } from "lucide-react";

export function QuizSetup() {
  const { setCurrentView, selectedSubject, setQuizConfig, playSound } = useQuiz();
  const [selectedChapter, setSelectedChapter] = useState<string>("");
  const [difficulty, setDifficulty] = useState<"easy" | "medium" | "hard">("medium");
  const [questionCount, setQuestionCount] = useState<number>(10);
  const [timed, setTimed] = useState<boolean>(false);
  const [playerName, setPlayerName] = useState<string>(() => {
    return localStorage.getItem("quizarena-playername") || "";
  });

  const subject = quizData.subjects.find(s => s.id === selectedSubject);

  if (!subject) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Button onClick={() => setCurrentView("home")}>
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Home
        </Button>
      </div>
    );
  }

  const handleStartQuiz = () => {
    if (!selectedChapter) {
      playSound("wrong");
      return;
    }
    if (!playerName.trim()) {
      playSound("wrong");
      return;
    }
    localStorage.setItem("quizarena-playername", playerName);
    playSound("click");
    setQuizConfig({
      subjectId: subject.id,
      chapterId: selectedChapter,
      difficulty,
      questionCount,
      timed,
      timeLimit: timed ? questionCount * 60 : undefined,
    });
    setCurrentView("quiz");
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100 dark:from-slate-950 dark:to-slate-900">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Button
          variant="ghost"
          onClick={() => setCurrentView("home")}
          className="mb-6 text-slate-600 dark:text-slate-300"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Home
        </Button>

        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${subject.color} flex items-center justify-center text-2xl`}>
              {subject.icon}
            </div>
            <div>
              <h1 className="text-2xl font-bold text-slate-900 dark:text-white">{subject.name}</h1>
              <p className="text-sm text-slate-500 dark:text-slate-400">{subject.description}</p>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          {/* Chapter Selection */}
          <Card className="bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800">
            <CardContent className="p-6">
              <h2 className="text-lg font-semibold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
                <BookOpen className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
                Select Chapter
              </h2>
              <div className="grid sm:grid-cols-2 gap-4">
                {subject.chapters.map((chapter) => (
                  <button
                    key={chapter.id}
                    onClick={() => {
                      setSelectedChapter(chapter.id);
                      playSound("click");
                    }}
                    className={`p-4 rounded-xl border-2 text-left transition-all ${
                      selectedChapter === chapter.id
                        ? "border-indigo-500 bg-indigo-50 dark:bg-indigo-900/20"
                        : "border-slate-200 dark:border-slate-700 hover:border-indigo-300 dark:hover:border-indigo-700"
                    }`}
                  >
                    <div className="font-medium text-slate-900 dark:text-white mb-1">{chapter.name}</div>
                    <div className="text-sm text-slate-500 dark:text-slate-400">{chapter.description}</div>
                    <div className="text-xs text-slate-400 mt-2">{chapter.questions.length} questions</div>
                  </button>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Difficulty Selection */}
          <Card className="bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800">
            <CardContent className="p-6">
              <h2 className="text-lg font-semibold text-slate-900 dark:text-white mb-4">Difficulty Level</h2>
              <RadioGroup value={difficulty} onValueChange={(value: any) => setDifficulty(value)}>
                <div className="grid sm:grid-cols-3 gap-4">
                  {[
                    { value: "easy", label: "Easy", desc: "Basic concepts", color: "text-emerald-600 dark:text-emerald-400" },
                    { value: "medium", label: "Medium", desc: "Intermediate", color: "text-amber-600 dark:text-amber-400" },
                    { value: "hard", label: "Hard", desc: "Advanced", color: "text-rose-600 dark:text-rose-400" },
                  ].map((level) => (
                    <label
                      key={level.value}
                      className={`p-4 rounded-xl border-2 cursor-pointer transition-all ${
                        difficulty === level.value
                          ? "border-indigo-500 bg-indigo-50 dark:bg-indigo-900/20"
                          : "border-slate-200 dark:border-slate-700 hover:border-indigo-300 dark:hover:border-indigo-700"
                      }`}
                    >
                      <RadioGroupItem value={level.value} className="sr-only" />
                      <div className={`font-medium ${level.color}`}>{level.label}</div>
                      <div className="text-sm text-slate-500 dark:text-slate-400">{level.desc}</div>
                    </label>
                  ))}
                </div>
              </RadioGroup>
            </CardContent>
          </Card>

          {/* Question Count */}
          <Card className="bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800">
            <CardContent className="p-6">
              <h2 className="text-lg font-semibold text-slate-900 dark:text-white mb-4">Number of Questions</h2>
              <div className="flex gap-4">
                {[5, 10, 20].map((count) => (
                  <button
                    key={count}
                    onClick={() => {
                      setQuestionCount(count);
                      playSound("click");
                    }}
                    className={`flex-1 p-4 rounded-xl border-2 text-center transition-all ${
                      questionCount === count
                        ? "border-indigo-500 bg-indigo-50 dark:bg-indigo-900/20"
                        : "border-slate-200 dark:border-slate-700 hover:border-indigo-300 dark:hover:border-indigo-700"
                    }`}
                  >
                    <div className="text-2xl font-bold text-slate-900 dark:text-white">{count}</div>
                    <div className="text-sm text-slate-500 dark:text-slate-400">Questions</div>
                  </button>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Timed Mode */}
          <Card className="bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-lg font-semibold text-slate-900 dark:text-white flex items-center gap-2">
                    <Clock className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
                    Timed Mode
                  </h2>
                  <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
                    {timed ? `${questionCount * 60} seconds total` : "No time limit"}
                  </p>
                </div>
                <button
                  onClick={() => {
                    setTimed(!timed);
                    playSound("click");
                  }}
                  className={`relative w-14 h-8 rounded-full transition-colors ${
                    timed ? "bg-indigo-600" : "bg-slate-300 dark:bg-slate-700"
                  }`}
                >
                  <div
                    className={`absolute top-1 w-6 h-6 rounded-full bg-white transition-transform ${
                      timed ? "translate-x-7" : "translate-x-1"
                    }`}
                  />
                </button>
              </div>
            </CardContent>
          </Card>

          {/* Player Name */}
          <Card className="bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800">
            <CardContent className="p-6">
              <Label htmlFor="playerName" className="text-lg font-semibold text-slate-900 dark:text-white mb-4 block">
                Your Name
              </Label>
              <Input
                id="playerName"
                value={playerName}
                onChange={(e) => setPlayerName(e.target.value)}
                placeholder="Enter your name for the leaderboard"
                className="max-w-md"
              />
            </CardContent>
          </Card>

          {/* Start Button */}
          <div className="flex justify-end">
            <Button
              onClick={handleStartQuiz}
              disabled={!selectedChapter || !playerName.trim()}
              className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white px-8 py-6 text-lg rounded-xl shadow-lg shadow-indigo-500/25"
            >
              <Play className="w-5 h-5 mr-2" />
              Start Quiz
              <ChevronRight className="w-5 h-5 ml-2" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}