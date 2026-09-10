import React, { createContext, useContext, useState, useEffect } from "react";
import { quizData, subjects } from "@/lib/quiz-data";
import { toast } from "sonner";

export interface Question {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
  difficulty: "easy" | "medium" | "hard";
}

export interface QuizConfig {
  subjectId: string;
  chapterId: string;
  difficulty: "easy" | "medium" | "hard";
  questionCount: number;
  timed: boolean;
  timeLimit?: number;
}

export interface QuizResult {
  score: number;
  totalQuestions: number;
  correctAnswers: number;
  incorrectAnswers: number;
  accuracy: number;
  timeUsed: number;
  answers: number[];
  questions: Question[];
  subjectName: string;
  chapterName: string;
  date: string;
}

interface QuizContextType {
  currentView: string;
  setCurrentView: (view: string) => void;
  selectedSubject: string | null;
  setSelectedSubject: (subject: string | null) => void;
  quizConfig: QuizConfig | null;
  setQuizConfig: (config: QuizConfig | null) => void;
  quizResult: QuizResult | null;
  setQuizResult: (result: QuizResult | null) => void;
  darkMode: boolean;
  toggleDarkMode: () => void;
  soundEnabled: boolean;
  toggleSound: () => void;
  streak: number;
  incrementStreak: () => void;
  resetStreak: () => void;
  leaderboard: any[];
  addToLeaderboard: (entry: any) => void;
  getQuestions: (config: QuizConfig) => Question[];
  dailyQuestions: Question[];
  getDailyQuestions: () => Question[];
  playSound: (type: "correct" | "wrong" | "click" | "complete") => void;
}

const QuizContext = createContext<QuizContextType | undefined>(undefined);

export function QuizProvider({ children }: { children: React.ReactNode }) {
  const [currentView, setCurrentView] = useState("home");
  const [selectedSubject, setSelectedSubject] = useState<string | null>(null);
  const [quizConfig, setQuizConfig] = useState<QuizConfig | null>(null);
  const [quizResult, setQuizResult] = useState<QuizResult | null>(null);
  const [darkMode, setDarkMode] = useState(() => {
    const saved = localStorage.getItem("quizarena-darkmode");
    return saved ? JSON.parse(saved) : false;
  });
  const [soundEnabled, setSoundEnabled] = useState(() => {
    const saved = localStorage.getItem("quizarena-sound");
    return saved ? JSON.parse(saved) : true;
  });
  const [streak, setStreak] = useState(() => {
    const saved = localStorage.getItem("quizarena-streak");
    return saved ? JSON.parse(saved) : 0;
  });
  const [leaderboard, setLeaderboard] = useState(() => {
    const saved = localStorage.getItem("quizarena-leaderboard");
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem("quizarena-darkmode", JSON.stringify(darkMode));
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);

  useEffect(() => {
    localStorage.setItem("quizarena-sound", JSON.stringify(soundEnabled));
  }, [soundEnabled]);

  useEffect(() => {
    localStorage.setItem("quizarena-streak", JSON.stringify(streak));
  }, [streak]);

  useEffect(() => {
    localStorage.setItem("quizarena-leaderboard", JSON.stringify(leaderboard));
  }, [leaderboard]);

  const toggleDarkMode = () => setDarkMode(!darkMode);
  const toggleSound = () => setSoundEnabled(!soundEnabled);
  const incrementStreak = () => setStreak(streak + 1);
  const resetStreak = () => setStreak(0);

  const playSound = (type: "correct" | "wrong" | "click" | "complete") => {
    if (!soundEnabled) return;
    const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();
    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);
    
    switch (type) {
      case "correct":
        oscillator.frequency.setValueAtTime(523.25, audioContext.currentTime);
        oscillator.frequency.setValueAtTime(659.25, audioContext.currentTime + 0.1);
        oscillator.frequency.setValueAtTime(783.99, audioContext.currentTime + 0.2);
        gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.3);
        oscillator.start();
        oscillator.stop(audioContext.currentTime + 0.3);
        break;
      case "wrong":
        oscillator.frequency.setValueAtTime(200, audioContext.currentTime);
        oscillator.frequency.setValueAtTime(150, audioContext.currentTime + 0.1);
        gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.2);
        oscillator.start();
        oscillator.stop(audioContext.currentTime + 0.2);
        break;
      case "click":
        oscillator.frequency.setValueAtTime(800, audioContext.currentTime);
        gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.05);
        oscillator.start();
        oscillator.stop(audioContext.currentTime + 0.05);
        break;
      case "complete":
        oscillator.frequency.setValueAtTime(523.25, audioContext.currentTime);
        oscillator.frequency.setValueAtTime(659.25, audioContext.currentTime + 0.15);
        oscillator.frequency.setValueAtTime(783.99, audioContext.currentTime + 0.3);
        oscillator.frequency.setValueAtTime(1046.5, audioContext.currentTime + 0.45);
        gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.6);
        oscillator.start();
        oscillator.stop(audioContext.currentTime + 0.6);
        break;
    }
  };

  const getQuestions = (config: QuizConfig): Question[] => {
    const subject = quizData.subjects.find(s => s.id === config.subjectId);
    if (!subject) return [];
    const chapter = subject.chapters.find(c => c.id === config.chapterId);
    if (!chapter) return [];
    
    let pool = chapter.questions.filter(q => q.difficulty === config.difficulty);
    if (pool.length < config.questionCount) {
      pool = chapter.questions;
    }
    
    const shuffled = [...pool].sort(() => Math.random() - 0.5);
    return shuffled.slice(0, config.questionCount);
  };

  const getDailyQuestions = (): Question[] => {
    const today = new Date().toDateString();
    const seed = today.split("").reduce((acc, char) => acc + char.charCodeAt(0), 0);
    
    const allQuestions: Question[] = [];
    quizData.subjects.forEach(subject => {
      subject.chapters.forEach(chapter => {
        chapter.questions.forEach(q => {
          allQuestions.push({ ...q, id: `${subject.id}-${chapter.id}-${q.id}` });
        });
      });
    });
    
    const seededRandom = (index: number) => {
      const x = Math.sin(seed + index) * 10000;
      return x - Math.floor(x);
    };
    
    const shuffled = allQuestions
      .map((q, i) => ({ q, sort: seededRandom(i) }))
      .sort((a, b) => a.sort - b.sort)
      .map(item => item.q);
    
    return shuffled.slice(0, 10);
  };

  const addToLeaderboard = (entry: any) => {
    setLeaderboard(prev => {
      const newLeaderboard = [...prev, entry].sort((a, b) => b.score - a.score).slice(0, 50);
      return newLeaderboard;
    });
  };

  return (
    <QuizContext.Provider
      value={{
        currentView,
        setCurrentView,
        selectedSubject,
        setSelectedSubject,
        quizConfig,
        setQuizConfig,
        quizResult,
        setQuizResult,
        darkMode,
        toggleDarkMode,
        soundEnabled,
        toggleSound,
        streak,
        incrementStreak,
        resetStreak,
        leaderboard,
        addToLeaderboard,
        getQuestions,
        dailyQuestions: getDailyQuestions(),
        getDailyQuestions,
        playSound,
      }}
    >
      {children}
    </QuizContext.Provider>
  );
}

export function useQuiz() {
  const context = useContext(QuizContext);
  if (!context) {
    throw new Error("useQuiz must be used within QuizProvider");
  }
  return context;
}