import React, { useState } from 'react';
import {
  Sparkles,
  Compass,
  Calendar,
  Layers,
  GraduationCap,
  Lightbulb,
  ArrowRight,
  Loader2,
  Check,
} from 'lucide-react';
import { GradeLevel, ProjectSubject, ProjectTimelineOption } from '../types/project';

interface HeroSolverProps {
  onGenerate: (data: {
    gradeLevel: GradeLevel;
    topic: string;
    timeline: ProjectTimelineOption;
    subject: ProjectSubject;
    specialNeeds?: string;
  }) => void;
  isLoading: boolean;
  onSelectSample: (sampleId: string) => void;
}

const GRADE_OPTIONS: GradeLevel[] = [
  '4th Grade',
  '5th Grade',
  '6th Grade',
  '7th Grade',
  '8th Grade',
  '9th Grade',
  '10th Grade',
  '11th Grade',
  '12th Grade',
];

const SUBJECT_OPTIONS: ProjectSubject[] = [
  'Science & STEM',
  'Social Studies & History',
  'English & Literature',
  'Math & Data',
  'Art & Design',
];

const TIMELINE_OPTIONS: ProjectTimelineOption[] = [
  '3-Day Rapid Sprint',
  '5-Day Standard Week',
  '2-Week Deep Dive',
];

const QUICK_SUGGESTIONS = [
  { topic: 'Renewable Wind Turbines vs Solar Cells', grade: '8th Grade' as GradeLevel, subject: 'Science & STEM' as ProjectSubject },
  { topic: 'The Silk Road & Cultural Diffusion', grade: '7th Grade' as GradeLevel, subject: 'Social Studies & History' as ProjectSubject },
  { topic: 'Dystopian Warnings in Fahrenheit 451', grade: '10th Grade' as GradeLevel, subject: 'English & Literature' as ProjectSubject },
  { topic: 'Earthquake-Proof Skyscraper Engineering', grade: '8th Grade' as GradeLevel, subject: 'Science & STEM' as ProjectSubject },
  { topic: 'Ocean Microplastics Filtration', grade: '9th Grade' as GradeLevel, subject: 'Science & STEM' as ProjectSubject },
  { topic: 'Plant Growth Under Colored LED Lights', grade: '5th Grade' as GradeLevel, subject: 'Science & STEM' as ProjectSubject },
];

export const HeroSolver: React.FC<HeroSolverProps> = ({
  onGenerate,
  isLoading,
  onSelectSample,
}) => {
  const [gradeLevel, setGradeLevel] = useState<GradeLevel>('8th Grade');
  const [subject, setSubject] = useState<ProjectSubject>('Science & STEM');
  const [timeline, setTimeline] = useState<ProjectTimelineOption>('5-Day Standard Week');
  const [topic, setTopic] = useState('');
  const [specialNeeds, setSpecialNeeds] = useState('');
  const [showAdvanced, setShowAdvanced] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!topic.trim()) return;
    onGenerate({
      gradeLevel,
      topic: topic.trim(),
      timeline,
      subject,
      specialNeeds: specialNeeds.trim() || undefined,
    });
  };

  const handleApplySuggestion = (sug: typeof QUICK_SUGGESTIONS[0]) => {
    setTopic(sug.topic);
    setGradeLevel(sug.grade);
    setSubject(sug.subject);
  };

  return (
    <section className="relative overflow-hidden bg-white border-b border-slate-200 py-10 lg:py-14">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          
          {/* Left Column: Input Solver */}
          <div className="lg:col-span-7 space-y-6">
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-xs font-semibold text-indigo-700 tracking-wide uppercase">
                <Compass className="w-4 h-4" />
                <span>Instant Homework &amp; Science Fair Scaffolding</span>
              </div>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight text-balance leading-tight">
                Turn any school assignment into a step-by-step masterplan.
              </h1>
              <p className="text-slate-600 text-base sm:text-lg leading-relaxed max-w-2xl">
                Enter your grade level and topic. Get an instant day-by-day milestone blueprint, 
                6-slide presentation deck, trifold poster layout, and oral defense flashcards.
              </p>
            </div>

            {/* Quick Demo Pre-seed Switcher */}
            <div className="flex flex-wrap items-center gap-2 pt-1 text-xs text-slate-500">
              <span className="font-semibold text-slate-700">Try Instant Sample:</span>
              <button
                type="button"
                onClick={() => onSelectSample('sample-8th-wind-energy')}
                className="px-2.5 py-1 rounded-md bg-slate-100 hover:bg-indigo-50 hover:text-indigo-700 text-slate-700 font-medium transition-colors"
              >
                ⚡ 8th Grade Wind Turbine
              </button>
              <button
                type="button"
                onClick={() => onSelectSample('sample-7th-silk-road')}
                className="px-2.5 py-1 rounded-md bg-slate-100 hover:bg-indigo-50 hover:text-indigo-700 text-slate-700 font-medium transition-colors"
              >
                📜 7th Grade Silk Road
              </button>
            </div>

            {/* Solver Form Card */}
            <form onSubmit={handleSubmit} className="p-6 bg-slate-50/80 rounded-2xl border border-slate-200/90 shadow-sm space-y-5">
              {/* Row 1: Grade Level & Subject */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="grade-select" className="block text-xs font-bold text-slate-700 mb-1.5 flex items-center gap-1.5">
                    <GraduationCap className="w-3.5 h-3.5 text-indigo-600" />
                    Student Grade Level
                  </label>
                  <select
                    id="grade-select"
                    value={gradeLevel}
                    onChange={(e) => setGradeLevel(e.target.value as GradeLevel)}
                    className="w-full px-3 py-2 bg-white rounded-lg border border-slate-300 text-sm font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  >
                    {GRADE_OPTIONS.map((g) => (
                      <option key={g} value={g}>{g}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label htmlFor="subject-select" className="block text-xs font-bold text-slate-700 mb-1.5 flex items-center gap-1.5">
                    <Layers className="w-3.5 h-3.5 text-indigo-600" />
                    Subject Category
                  </label>
                  <select
                    id="subject-select"
                    value={subject}
                    onChange={(e) => setSubject(e.target.value as ProjectSubject)}
                    className="w-full px-3 py-2 bg-white rounded-lg border border-slate-300 text-sm font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  >
                    {SUBJECT_OPTIONS.map((s) => (
                      <option key={s} value={s}>{s}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Row 2: Topic Input with Auto Suggestions */}
              <div>
                <label htmlFor="topic-input" className="block text-xs font-bold text-slate-700 mb-1.5 flex items-center justify-between">
                  <span className="flex items-center gap-1.5">
                    <Lightbulb className="w-3.5 h-3.5 text-amber-500" />
                    Project Assignment Topic or Prompt
                  </span>
                  <span className="text-[11px] text-slate-400 font-normal">e.g. Plate tectonics, Romeo and Juliet</span>
                </label>
                <input
                  id="topic-input"
                  type="text"
                  required
                  placeholder="e.g. How does acid rain impact limestone monuments?"
                  value={topic}
                  onChange={(e) => setTopic(e.target.value)}
                  className="w-full px-4 py-2.5 bg-white rounded-lg border border-slate-300 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                />

                {/* Popular Clickable Topic Sparks */}
                <div className="mt-2.5 flex items-center flex-wrap gap-1.5">
                  <span className="text-[11px] text-slate-500 font-medium mr-1">Quick Ideas:</span>
                  {QUICK_SUGGESTIONS.slice(0, 4).map((sug) => (
                    <button
                      key={sug.topic}
                      type="button"
                      onClick={() => handleApplySuggestion(sug)}
                      className="text-[11px] px-2 py-0.5 rounded-md bg-white border border-slate-200 text-slate-600 hover:text-indigo-600 hover:border-indigo-300 transition-colors cursor-pointer text-left truncate max-w-[220px]"
                    >
                      {sug.topic}
                    </button>
                  ))}
                </div>
              </div>

              {/* Row 3: Timeline & Advanced Toggle */}
              <div className="pt-1 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="flex items-center gap-2">
                  <Calendar className="w-3.5 h-3.5 text-slate-400" />
                  <span className="text-xs font-medium text-slate-600">Timeline:</span>
                  <div className="flex items-center gap-1 p-0.5 bg-slate-200/60 rounded-lg">
                    {TIMELINE_OPTIONS.map((t) => (
                      <button
                        key={t}
                        type="button"
                        onClick={() => setTimeline(t)}
                        className={`px-2.5 py-1 text-xs font-medium rounded-md transition-all ${
                          timeline === t
                            ? 'bg-white text-indigo-700 shadow-xs'
                            : 'text-slate-600 hover:text-slate-900'
                        }`}
                      >
                        {t.split(' ')[0]}
                      </button>
                    ))}
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => setShowAdvanced(!showAdvanced)}
                  className="text-xs text-indigo-600 hover:text-indigo-800 font-medium underline text-left"
                >
                  {showAdvanced ? 'Hide Constraints' : '+ Budget / Constraints'}
                </button>
              </div>

              {/* Advanced Constraints (Optional) */}
              {showAdvanced && (
                <div className="p-3 bg-white rounded-lg border border-slate-200 space-y-1.5 animate-in fade-in">
                  <label htmlFor="constraints-input" className="block text-xs font-medium text-slate-600">
                    Specific Limitations or Teacher Instructions (Optional)
                  </label>
                  <input
                    id="constraints-input"
                    type="text"
                    value={specialNeeds}
                    onChange={(e) => setSpecialNeeds(e.target.value)}
                    placeholder="e.g. Budget under $10, No dangerous chemicals, Group project of 3 students..."
                    className="w-full px-3 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-md text-slate-800 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                  />
                </div>
              )}

              {/* Submit CTA */}
              <div className="pt-2">
                <button
                  type="submit"
                  disabled={isLoading || !topic.trim()}
                  className="w-full py-3 px-6 rounded-xl font-bold text-sm text-white bg-indigo-600 hover:bg-indigo-700 active:scale-[0.99] disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer"
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>Designing {gradeLevel} Project Blueprint &amp; Slides...</span>
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-4 h-4" />
                      <span>Build Project Blueprint &amp; Presentation Outline</span>
                      <ArrowRight className="w-4 h-4 ml-1" />
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>

          {/* Right Column: Visual Showcase & Benefits */}
          <div className="lg:col-span-5 space-y-4">
            <div className="relative rounded-2xl overflow-hidden border border-slate-200 shadow-lg bg-slate-900 group">
              <img
                src="/src/assets/images/hero_school_project_lab_1793014294127.jpg"
                alt="Student science project display with blueprints and models"
                className="w-full h-72 sm:h-80 object-cover opacity-95 group-hover:scale-102 transition-transform duration-500"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/30 to-transparent flex flex-col justify-end p-5">
                <span className="text-xs font-semibold text-indigo-300">Classroom &amp; Science Fair Ready</span>
                <h3 className="text-lg font-bold text-white leading-snug">
                  Everything a student needs from Monday research to Friday presentation.
                </h3>
              </div>
            </div>

            {/* Feature Highlights Grid */}
            <div className="grid grid-cols-2 gap-3 text-xs">
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200/80 space-y-1">
                <div className="font-bold text-slate-800 flex items-center gap-1.5">
                  <Check className="w-3.5 h-3.5 text-emerald-600" />
                  Day-by-Day Tracker
                </div>
                <p className="text-slate-500 text-[11px] leading-relaxed">
                  Interactive checklist with bite-sized tasks and time estimates.
                </p>
              </div>

              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200/80 space-y-1">
                <div className="font-bold text-slate-800 flex items-center gap-1.5">
                  <Check className="w-3.5 h-3.5 text-emerald-600" />
                  Trifold Board Layout
                </div>
                <p className="text-slate-500 text-[11px] leading-relaxed">
                  Exact left, center, and right panel posters for science fairs.
                </p>
              </div>

              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200/80 space-y-1">
                <div className="font-bold text-slate-800 flex items-center gap-1.5">
                  <Check className="w-3.5 h-3.5 text-emerald-600" />
                  6-Slide Deck &amp; Notes
                </div>
                <p className="text-slate-500 text-[11px] leading-relaxed">
                  Full talking points and presenter scripts for confident speaking.
                </p>
              </div>

              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200/80 space-y-1">
                <div className="font-bold text-slate-800 flex items-center gap-1.5">
                  <Check className="w-3.5 h-3.5 text-emerald-600" />
                  Parent Coaching Guide
                </div>
                <p className="text-slate-500 text-[11px] leading-relaxed">
                  How parents can support inquiry without doing the project.
                </p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
