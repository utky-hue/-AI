import React, { useState } from 'react';
import {
  ChevronLeft,
  ChevronRight,
  Presentation,
  Volume2,
  Copy,
  Check,
  Eye,
  EyeOff,
  Image as ImageIcon,
} from 'lucide-react';
import { SlideItem } from '../types/project';

interface SlideDeckViewerProps {
  slides: SlideItem[];
  projectTitle: string;
}

export const SlideDeckViewer: React.FC<SlideDeckViewerProps> = ({
  slides,
  projectTitle,
}) => {
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const [showNotes, setShowNotes] = useState(true);
  const [copied, setCopied] = useState(false);

  if (!slides || slides.length === 0) {
    return <div className="p-8 text-center text-slate-500">No slides generated yet.</div>;
  }

  const slide = slides[currentSlideIndex];

  const handleNext = () => {
    if (currentSlideIndex < slides.length - 1) {
      setCurrentSlideIndex(currentSlideIndex + 1);
    }
  };

  const handlePrev = () => {
    if (currentSlideIndex > 0) {
      setCurrentSlideIndex(currentSlideIndex - 1);
    }
  };

  const copySlideText = () => {
    const text = `SLIDE ${slide.slideNumber}: ${slide.title}\nHEADLINE: ${slide.headline}\n\nKEY POINTS:\n${slide.keyBullets.map((b) => `• ${b}`).join('\n')}\n\nSPEAKER NOTES:\n${slide.speakerNotes}\n\nVISUAL RECOMMENDATION:\n${slide.visualSuggestion}`;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-6">
      {/* Deck Header & Tools */}
      <div className="p-4 bg-white rounded-2xl border border-slate-200 shadow-xs flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center">
            <Presentation className="w-4 h-4" />
          </div>
          <div>
            <h3 className="font-bold text-slate-900 text-sm sm:text-base">
              6-Slide Presentation Outline &amp; Speaker Script
            </h3>
            <p className="text-xs text-slate-500">
              Formatted for Google Slides, PowerPoint, or classroom screen projection
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setShowNotes(!showNotes)}
            className={`px-3 py-1.5 text-xs font-semibold rounded-lg border transition-colors flex items-center gap-1.5 ${
              showNotes
                ? 'bg-indigo-50 text-indigo-700 border-indigo-200'
                : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'
            }`}
          >
            {showNotes ? <Eye className="w-3.5 h-3.5" /> : <EyeOff className="w-3.5 h-3.5" />}
            <span>{showNotes ? 'Speaker Notes Visible' : 'Rehearsal Mode (Hide Notes)'}</span>
          </button>

          <button
            type="button"
            onClick={copySlideText}
            className="px-3 py-1.5 text-xs font-semibold rounded-lg border border-slate-200 bg-white text-slate-700 hover:bg-slate-50 transition-colors flex items-center gap-1.5"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copied ? 'Copied!' : 'Copy Slide'}</span>
          </button>
        </div>
      </div>

      {/* Main Slide Stage (16:9 Aspect Presentation Frame) */}
      <div className="relative rounded-2xl overflow-hidden border border-slate-300 shadow-md bg-white">
        {/* Slide Canvas Top Bar */}
        <div className="px-6 py-3 bg-slate-900 text-white flex items-center justify-between text-xs font-medium">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-indigo-400" />
            <span className="font-semibold text-slate-200">{projectTitle}</span>
          </div>
          <div className="font-mono tabular-nums text-slate-400">
            Slide {slide.slideNumber} of {slides.length}
          </div>
        </div>

        {/* Slide Body */}
        <div className="p-8 sm:p-12 min-h-[380px] flex flex-col justify-between bg-gradient-to-br from-white via-slate-50/50 to-indigo-50/20">
          <div className="space-y-5">
            <div className="space-y-2">
              <span className="text-xs font-bold text-indigo-600 uppercase tracking-wider">
                {slide.title}
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight leading-snug">
                {slide.headline}
              </h2>
            </div>

            {/* Bullets Grid */}
            <ul className="space-y-3 pt-2">
              {slide.keyBullets.map((bullet, idx) => (
                <li key={idx} className="flex items-start gap-3 text-slate-700 text-sm sm:text-base">
                  <span className="w-2 h-2 rounded-full bg-indigo-500 mt-2 shrink-0" />
                  <span className="leading-relaxed">{bullet}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Visual Recommendation Card */}
          {slide.visualSuggestion && (
            <div className="mt-8 p-3.5 rounded-xl bg-white border border-slate-200/90 text-xs text-slate-600 flex items-start gap-3 shadow-xs">
              <ImageIcon className="w-4 h-4 text-indigo-600 shrink-0 mt-0.5" />
              <div>
                <span className="font-bold text-slate-800">Recommended Slide Graphic: </span>
                <span>{slide.visualSuggestion}</span>
              </div>
            </div>
          )}
        </div>

        {/* Navigation Arrows & Thumbnail Bar */}
        <div className="px-6 py-4 bg-slate-100 border-t border-slate-200 flex items-center justify-between">
          <button
            type="button"
            onClick={handlePrev}
            disabled={currentSlideIndex === 0}
            className="px-3 py-1.5 text-xs font-semibold rounded-lg bg-white border border-slate-300 text-slate-700 disabled:opacity-40 disabled:cursor-not-allowed hover:bg-slate-50 transition-colors flex items-center gap-1"
          >
            <ChevronLeft className="w-4 h-4" />
            <span>Previous</span>
          </button>

          {/* Thumbnail Dot Selectors */}
          <div className="flex items-center gap-1.5">
            {slides.map((s, idx) => (
              <button
                key={s.slideNumber}
                type="button"
                onClick={() => setCurrentSlideIndex(idx)}
                className={`w-7 h-7 rounded-lg text-xs font-bold transition-all ${
                  idx === currentSlideIndex
                    ? 'bg-indigo-600 text-white shadow-xs'
                    : 'bg-white text-slate-600 hover:bg-slate-200 border border-slate-200'
                }`}
              >
                {s.slideNumber}
              </button>
            ))}
          </div>

          <button
            type="button"
            onClick={handleNext}
            disabled={currentSlideIndex === slides.length - 1}
            className="px-3 py-1.5 text-xs font-semibold rounded-lg bg-white border border-slate-300 text-slate-700 disabled:opacity-40 disabled:cursor-not-allowed hover:bg-slate-50 transition-colors flex items-center gap-1"
          >
            <span>Next</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Speaker Notes Drawer */}
      {showNotes && (
        <div className="p-6 rounded-2xl bg-indigo-950 text-white shadow-sm space-y-3 animate-in fade-in">
          <div className="flex items-center justify-between text-xs text-indigo-300">
            <span className="font-bold uppercase tracking-wider flex items-center gap-1.5">
              <Volume2 className="w-4 h-4 text-indigo-400" />
              Presenter Speaking Script (What to say out loud)
            </span>
            <span className="font-mono text-indigo-400">Slide {slide.slideNumber} Script</span>
          </div>
          <p className="text-base sm:text-lg text-indigo-50 font-normal leading-relaxed italic">
            &ldquo;{slide.speakerNotes}&rdquo;
          </p>
          <div className="pt-1 text-xs text-indigo-300/80">
            💡 <strong>Pro-Tip for Students:</strong> Don&apos;t look at the slides behind you! Look at 3 friendly faces in your audience (left, middle, right) while speaking this.
          </div>
        </div>
      )}
    </div>
  );
};
