import { useEffect, useState } from "react";
import { QuizProvider, useQuiz } from "@/lib/quiz-context";
import { HomePage } from "@/components/HomePage";
import { QuizSetup } from "@/components/QuizSetup";
import { QuizInterface } from "@/components/QuizInterface";
import { QuizResults } from "@/components/QuizResults";
import { Leaderboard } from "@/components/Leaderboard";
import { DailyChallenge } from "@/components/DailyChallenge";
import { Toaster } from "sonner";

function AppContent() {
  const { currentView } = useQuiz();

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 transition-colors duration-300">
      <Toaster position="top-right" />
      {currentView === "home" && <HomePage />}
      {currentView === "setup" && <QuizSetup />}
      {currentView === "quiz" && <QuizInterface />}
      {currentView === "results" && <QuizResults />}
      {currentView === "leaderboard" && <Leaderboard />}
      {currentView === "daily" && <DailyChallenge />}
    </div>
  );
}

export default function App() {
  return (
    <QuizProvider>
      <AppContent />
    </QuizProvider>
  );
}