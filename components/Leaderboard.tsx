import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useQuiz } from "@/lib/quiz-context";
import { ArrowLeft, Trophy, Medal, Crown, Award } from "lucide-react";

export function Leaderboard() {
  const { setCurrentView, leaderboard, playSound } = useQuiz();
  const [filter, setFilter] = useState<"all" | "physics" | "chemistry" | "mathematics" | "cs" | "gk">("all");

  const filteredLeaderboard = filter === "all" 
    ? leaderboard 
    : leaderboard.filter(entry => entry.subject.toLowerCase().includes(filter));

  const getMedalColor = (index: number) => {
    if (index === 0) return "text-amber-500";
    if (index === 1) return "text-slate-400";
    if (index === 2) return "text-orange-500";
    return "text-slate-300 dark:text-slate-600";
  };

  const getMedalIcon = (index: number) => {
    if (index === 0) return <Crown className="w-6 h-6" />;
    if (index === 1) return <Medal className="w-6 h-6" />;
    if (index === 2) return <Medal className="w-6 h-6" />;
    return <Award className="w-6 h-6" />;
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100 dark:from-slate-950 dark:to-slate-900">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Button
          variant="ghost"
          onClick={() => {
            playSound("click");
            setCurrentView("home");
          }}
          className="mb-6 text-slate-600 dark:text-slate-300"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Home
        </Button>

        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-gradient-to-br from-amber-500 to-orange-600 mb-4">
            <Trophy className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">Leaderboard</h1>
          <p className="text-slate-600 dark:text-slate-400">
            Top performers in QuizArena
          </p>
        </div>

        {/* Filter */}
        <div className="flex flex-wrap justify-center gap-2 mb-8">
          {[
            { value: "all", label: "All" },
            { value: "physics", label: "Physics" },
            { value: "chemistry", label: "Chemistry" },
            { value: "mathematics", label: "Math" },
            { value: "cs", label: "CS" },
            { value: "gk", label: "GK" },
          ].map((f) => (
            <button
              key={f.value}
              onClick={() => {
                setFilter(f.value as any);
                playSound("click");
              }}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                filter === f.value
                  ? "bg-indigo-600 text-white"
                  : "bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700 hover:border-indigo-300"
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>

        {filteredLeaderboard.length === 0 ? (
          <Card className="bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800">
            <CardContent className="p-12 text-center">
              <div className="text-6xl mb-4">🏆</div>
              <h2 className="text-xl font-semibold text-slate-900 dark:text-white mb-2">No Scores Yet</h2>
              <p className="text-slate-500 dark:text-slate-400 mb-6">
                Be the first to make it to the leaderboard!
              </p>
              <Button
                onClick={() => {
                  playSound("click");
                  setCurrentView("setup");
                }}
                className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white"
              >
                Start a Quiz
              </Button>
            </CardContent>
          </Card>
        ) : (
          <Card className="bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 shadow-xl">
            <CardContent className="p-6">
              <div className="space-y-4">
                {filteredLeaderboard.map((entry, index) => (
                  <div
                    key={index}
                    className={`flex items-center gap-4 p-4 rounded-xl transition-all ${
                      index === 0
                        ? "bg-gradient-to-r from-amber-50 to-orange-50 dark:from-amber-900/20 dark:to-orange-900/20 border-2 border-amber-200 dark:border-amber-800"
                        : "bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700"
                    }`}
                  >
                    <div className={`w-10 h-10 flex items-center justify-center ${getMedalColor(index)}`}>
                      {getMedalIcon(index)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="font-semibold text-slate-900 dark:text-white truncate">
                          {entry.name}
                        </span>
                        {index === 0 && (
                          <span className="px-2 py-0.5 text-xs font-medium bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-300 rounded-full">
                            #1
                          </span>
                        )}
                      </div>
                      <div className="text-sm text-slate-500 dark:text-slate-400">
                        {entry.subject} • {entry.chapter}
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-xl font-bold text-slate-900 dark:text-white">
                        {entry.score}
                      </div>
                      <div className="text-sm text-slate-500 dark:text-slate-400">
                        {entry.accuracy}% accuracy
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}