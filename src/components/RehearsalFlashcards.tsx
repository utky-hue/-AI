import React, { useState, useEffect } from 'react';
import {
  Mic,
  RotateCw,
  Play,
  Pause,
  ChevronLeft,
  ChevronRight,
  CheckCircle2,
  Sparkles,
} from 'lucide-react';
import { PracticeFlashcard } from '../types/project';

interface RehearsalFlashcardsProps {
  flashcards: PracticeFlashcard[];
}

export const RehearsalFlashcards: React.FC<RehearsalFlashcardsProps> = ({
  flashcards,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [timerSeconds, setTimerSeconds] = useState(0);
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [masteredIds, setMasteredIds] = useState<string[]>([]);

  useEffect(() => {
    let interval: any = null;
    if (isTimerRunning) {
      interval = setInterval(() => {
        setTimerSeconds((prev) => prev + 1);
      }, 1000);
    } else if (!isTimerRunning && timerSeconds !== 0) {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isTimerRunning, timerSeconds]);

  if (!flashcards || flashcards.length === 0) {
    return <div className="p-8 text-center text-slate-500">No practice questions available.</div>;
  }

  const card = flashcards[currentIndex];
  const isMastered = masteredIds.includes(card.id);

  const toggleFlip = () => {
    setIsFlipped(!isFlipped);
  };

  const handleNext = () => {
    setIsFlipped(false);
    if (currentIndex < flashcards.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const handlePrev = () => {
    setIsFlipped(false);
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  const toggleMastered = (id: string) => {
    if (masteredIds.includes(id)) {
      setMasteredIds(masteredIds.filter((item) => item !== id));
    } else {
      setMasteredIds([...masteredIds, id]);
    }
  };

  const formatTimer = (totalSeconds: number) => {
    const mins = Math.floor(totalSeconds / 60);
    const secs = totalSeconds % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  return (
    <div className="space-y-6">
      {/* Rehearsal Header & Speaking Timer */}
      <div className="p-5 sm:p-6 bg-white rounded-3xl border border-slate-200 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center shrink-0">
            <Mic className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-bold text-slate-900 text-base sm:text-lg">
              Oral Presentation Q&amp;A Defense Flashcards
            </h3>
            <p className="text-xs text-slate-500">
              Practice answering tough teacher questions aloud before presentation day
            </p>
          </div>
        </div>

        {/* Practice Timer */}
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-slate-100 border border-slate-200 text-xs font-mono font-bold text-slate-800">
            <span>Speech Timer:</span>
            <span className="text-indigo-600 tabular-nums text-sm">{formatTimer(timerSeconds)}</span>
          </div>

          <button
            type="button"
            onClick={() => setIsTimerRunning(!isTimerRunning)}
            className={`p-2.5 rounded-xl border text-xs font-semibold transition-colors flex items-center gap-1 cursor-pointer ${
              isTimerRunning
                ? 'bg-amber-50 text-amber-800 border-amber-300'
                : 'bg-indigo-600 text-white border-indigo-700 hover:bg-indigo-700'
            }`}
            title={isTimerRunning ? 'Pause rehearsal timer' : 'Start rehearsal timer'}
          >
            {isTimerRunning ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
          </button>

          <button
            type="button"
            onClick={() => {
              setIsTimerRunning(false);
              setTimerSeconds(0);
            }}
            className="p-2.5 rounded-xl border border-slate-200 bg-white text-slate-600 hover:bg-slate-100 transition-colors cursor-pointer"
            title="Reset timer"
          >
            <RotateCw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Main Flashcard Stage */}
      <div className="max-w-2xl mx-auto space-y-4">
        {/* Flashcard Header Bar */}
        <div className="flex items-center justify-between text-xs text-slate-500 font-medium px-2">
          <div className="flex items-center gap-2">
            <span className="font-semibold text-slate-700">Question {currentIndex + 1} of {flashcards.length}</span>
            <span aria-hidden="true">·</span>
            <span className="text-indigo-600 font-bold bg-indigo-50 px-2 py-0.5 rounded border border-indigo-100">
              {card.difficulty}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <span className="font-mono tabular-nums text-emerald-600 font-bold">
              {masteredIds.length} / {flashcards.length} Mastered
            </span>
          </div>
        </div>

        {/* The Card with Crisp High-Contrast Styling (No eye-strain clashing!) */}
        <div
          onClick={toggleFlip}
          className={`min-h-[290px] sm:min-h-[330px] p-8 sm:p-10 rounded-3xl border-2 transition-all duration-300 cursor-pointer flex flex-col justify-between shadow-md select-none ${
            isFlipped
              ? 'bg-slate-900 border-indigo-400 text-white'
              : 'bg-white border-slate-200 hover:border-indigo-400 text-slate-900'
          }`}
        >
          {/* Card Top Label */}
          <div className="flex items-center justify-between">
            <span
              className={`text-xs font-bold uppercase tracking-wider px-2.5 py-1 rounded-md ${
                isFlipped
                  ? 'bg-amber-400/20 text-amber-300 border border-amber-400/40'
                  : 'bg-indigo-50 text-indigo-700 border border-indigo-100'
              }`}
            >
              {isFlipped ? 'Model Answer (What to say out loud)' : 'Anticipated Teacher / Judge Question'}
            </span>
            <span
              className={`text-xs flex items-center gap-1.5 font-medium ${
                isFlipped ? 'text-slate-300' : 'text-slate-400'
              }`}
            >
              <RotateCw className="w-3.5 h-3.5" /> Tap to flip card
            </span>
          </div>

          {/* Card Middle Content */}
          <div className="py-6">
            {isFlipped ? (
              <p className="text-base sm:text-xl text-white font-medium leading-relaxed">
                &ldquo;{card.modelAnswer}&rdquo;
              </p>
            ) : (
              <h3 className="text-xl sm:text-2xl font-black text-slate-900 leading-snug">
                {card.question}
              </h3>
            )}
          </div>

          {/* Card Bottom Hint */}
          <div
            className={`pt-3 border-t text-xs flex items-center justify-between ${
              isFlipped ? 'border-slate-700 text-amber-200/90 font-medium' : 'border-slate-100 text-slate-500'
            }`}
          >
            <span>
              {isFlipped
                ? '💡 Pro-Tip: Speak with natural pauses and look at your audience.'
                : '💡 Practice answering out loud before flipping to see the model answer.'}
            </span>
          </div>
        </div>

        {/* Bottom Navigation & Mastered Controls */}
        <div className="flex items-center justify-between gap-3 pt-2">
          <button
            type="button"
            onClick={handlePrev}
            disabled={currentIndex === 0}
            className="px-4 py-2.5 text-xs font-semibold rounded-xl bg-white border border-slate-300 text-slate-700 disabled:opacity-40 disabled:cursor-not-allowed hover:bg-slate-50 transition-colors flex items-center gap-1.5 cursor-pointer"
          >
            <ChevronLeft className="w-4 h-4" />
            <span>Previous</span>
          </button>

          <button
            type="button"
            onClick={() => toggleMastered(card.id)}
            className={`px-4 py-2.5 text-xs font-bold rounded-xl transition-all flex items-center gap-1.5 cursor-pointer ${
              isMastered
                ? 'bg-emerald-600 text-white shadow-xs'
                : 'bg-slate-100 hover:bg-emerald-50 text-slate-700 hover:text-emerald-700 border border-slate-200'
            }`}
          >
            <CheckCircle2 className="w-4 h-4" />
            <span>{isMastered ? 'Mastered Question!' : 'Mark as Mastered'}</span>
          </button>

          <button
            type="button"
            onClick={handleNext}
            disabled={currentIndex === flashcards.length - 1}
            className="px-4 py-2.5 text-xs font-semibold rounded-xl bg-white border border-slate-300 text-slate-700 disabled:opacity-40 disabled:cursor-not-allowed hover:bg-slate-50 transition-colors flex items-center gap-1.5 cursor-pointer"
          >
            <span>Next</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
