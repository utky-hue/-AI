import React, { useState } from 'react';
import {
  Compass,
  GraduationCap,
  Layers,
  Sparkles,
  ArrowRight,
  Loader2,
  Calendar,
  Presentation,
  LayoutGrid,
  ShoppingBag,
  Award,
  CheckCircle2,
  Circle,
  Clock,
  HelpCircle,
  Copy,
  Check,
  FileText,
  Printer,
  ChevronLeft,
  ChevronRight,
  Volume2,
  Users,
  Mail,
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { ClassGrade, AcademicSubject, ProjectDesign } from '../types/academic';

interface ProjectDesignerUnifiedProps {
  onDesign: (topic: string, grade: ClassGrade, subject: AcademicSubject, projectType: string) => Promise<void>;
  isLoading: boolean;
  project: ProjectDesign | null;
  onUpdateProject: (proj: ProjectDesign) => void;
}

const CLASS_OPTIONS: ClassGrade[] = [
  'Class 1-3 (Elementary)',
  'Class 4-5 (Upper Elementary)',
  'Class 6 (Middle)',
  'Class 7 (Middle)',
  'Class 8 (Middle)',
  'Class 9 (High School)',
  'Class 10 (High School / Board)',
  'Class 11 (Senior Secondary)',
  'Class 12 (Senior Secondary / Board)',
  'College / University / Olympiad',
];

const SUBJECT_OPTIONS: AcademicSubject[] = [
  'General Science',
  'Physics',
  'Chemistry',
  'Biology',
  'Mathematics',
  'History & Civics',
  'Geography & Environment',
  'Computer Science & Coding',
  'English & Literature',
  'Economics & Commerce',
  'Other / Any Subject',
];

const PROJECT_TYPES = [
  'Working Model / Science Fair',
  'Presentation Slide Deck',
  'Poster / Diorama',
  'Research Report',
  'Interactive App/Demo',
];

const QUICK_PROJECT_IDEAS = [
  { topic: 'Hydraulic Robotic Arm using Cardboard & Syringes', grade: 'Class 8 (Middle)' as ClassGrade, subject: 'Physics' as AcademicSubject, type: 'Working Model / Science Fair' },
  { topic: 'Smart Rainwater Harvesting & Filtration Model', grade: 'Class 9 (High School)' as ClassGrade, subject: 'Geography & Environment' as AcademicSubject, type: 'Working Model / Science Fair' },
  { topic: 'The French Revolution: Causes, Guillotine & Fall of Monarchy', grade: 'Class 10 (High School / Board)' as ClassGrade, subject: 'History & Civics' as AcademicSubject, type: 'Presentation Slide Deck' },
  { topic: 'Plant Growth Under Different Colored LED Spectrums', grade: 'Class 7 (Middle)' as ClassGrade, subject: 'Biology' as AcademicSubject, type: 'Working Model / Science Fair' },
];

export const ProjectDesignerUnified: React.FC<ProjectDesignerUnifiedProps> = ({
  onDesign,
  isLoading,
  project,
  onUpdateProject,
}) => {
  const [topic, setTopic] = useState('');
  const [grade, setGrade] = useState<ClassGrade>('Class 8 (Middle)');
  const [subject, setSubject] = useState<AcademicSubject>('Physics');
  const [projectType, setProjectType] = useState<string>('Working Model / Science Fair');
  const [activeTab, setActiveTab] = useState<'plan' | 'slides' | 'poster' | 'materials' | 'rubric' | 'flashcards'>('plan');
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const [copiedPlan, setCopiedPlan] = useState(false);
  const [mobilePosterTab, setMobilePosterTab] = useState<'left' | 'center' | 'right'>('center');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!topic.trim()) return;
    onDesign(topic.trim(), grade, subject, projectType);
  };

  const handleApplyIdea = (idea: typeof QUICK_PROJECT_IDEAS[0]) => {
    setTopic(idea.topic);
    setGrade(idea.grade);
    setSubject(idea.subject);
    setProjectType(idea.type);
  };

  const handleToggleTask = (milestoneIndex: number, taskId: string) => {
    if (!project) return;
    const updatedMilestones = [...project.milestones];
    const target = updatedMilestones[milestoneIndex];
    if (!target) return;

    target.tasks = target.tasks.map((t) =>
      t.id === taskId ? { ...t, completed: !t.completed } : t
    );

    onUpdateProject({
      ...project,
      milestones: updatedMilestones,
    });

    const allDone = updatedMilestones.every((m) => m.tasks.every((t) => t.completed));
    if (allDone) {
      confetti({ particleCount: 80, spread: 60 });
    }
  };

  const handleToggleMaterial = (idx: number) => {
    if (!project) return;
    const updated = [...project.materials];
    if (updated[idx]) {
      updated[idx].checked = !updated[idx].checked;
      onUpdateProject({
        ...project,
        materials: updated,
      });
    }
  };

  const copyFullProject = () => {
    if (!project) return;
    let text = `PROJECT: ${project.title.toUpperCase()}\n`;
    text += `CLASS: ${project.classGrade} | SUBJECT: ${project.subject} | TYPE: ${project.projectType}\n\n`;
    text += `DRIVING QUESTION:\n"${project.drivingQuestion}"\n\n`;
    text += `HYPOTHESIS / CENTRAL THESIS:\n${project.coreHypothesisOrThesis}\n\n`;
    text += `OVERVIEW:\n${project.overview}\n\n`;
    text += `--------------------------------------------------\n`;
    text += `STEP-BY-STEP EXECUTION PLAN:\n`;
    project.milestones.forEach((m) => {
      text += `\n[${m.dayLabel}] ${m.title}\nDeliverable: ${m.deliverable}\n`;
      m.tasks.forEach((t) => {
        text += `  • [${t.completed ? 'DONE' : 'PENDING'}] ${t.task}: ${t.details}\n`;
      });
    });
    navigator.clipboard.writeText(text);
    setCopiedPlan(true);
    setTimeout(() => setCopiedPlan(false), 2500);
  };

  return (
    <div className="space-y-8">
      {/* Design Studio Form Card */}
      <div className="p-6 sm:p-8 bg-white rounded-3xl border border-slate-200 shadow-sm space-y-6">
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-indigo-600">
            <Compass className="w-4 h-4" />
            <span>Complete Assignment, Working Model &amp; Poster Designer</span>
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight">
            Design an outstanding school project for any topic.
          </h2>
          <p className="text-slate-600 text-sm sm:text-base leading-relaxed max-w-3xl">
            Enter your project topic. Get an instant blueprint with step-by-step building steps, 
            trifold poster layout, presentation slides with speaking notes, household materials list, and scoring rubric.
          </p>
        </div>

        {/* Input Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label htmlFor="proj-grade" className="block text-xs font-bold text-slate-700 mb-1.5 flex items-center gap-1.5">
                <GraduationCap className="w-4 h-4 text-indigo-600" />
                Class / Grade Level
              </label>
              <select
                id="proj-grade"
                value={grade}
                onChange={(e) => setGrade(e.target.value as ClassGrade)}
                className="w-full px-3.5 py-2.5 bg-slate-50 rounded-xl border border-slate-300 text-sm font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                {CLASS_OPTIONS.map((c) => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            </div>

            <div>
              <label htmlFor="proj-subject" className="block text-xs font-bold text-slate-700 mb-1.5 flex items-center gap-1.5">
                <Layers className="w-4 h-4 text-indigo-600" />
                Subject
              </label>
              <select
                id="proj-subject"
                value={subject}
                onChange={(e) => setSubject(e.target.value as AcademicSubject)}
                className="w-full px-3.5 py-2.5 bg-slate-50 rounded-xl border border-slate-300 text-sm font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                {SUBJECT_OPTIONS.map((s) => (
                  <option key={s} value={s}>{s}</option>
                ))}
              </select>
            </div>

            <div>
              <label htmlFor="proj-type" className="block text-xs font-bold text-slate-700 mb-1.5 flex items-center gap-1.5">
                <Compass className="w-4 h-4 text-indigo-600" />
                Project Format
              </label>
              <select
                id="proj-type"
                value={projectType}
                onChange={(e) => setProjectType(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-slate-50 rounded-xl border border-slate-300 text-sm font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                {PROJECT_TYPES.map((t) => (
                  <option key={t} value={t}>{t}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Project Topic Input */}
          <div>
            <label htmlFor="proj-topic-input" className="block text-xs font-bold text-slate-700 mb-1.5">
              Project Topic or Assignment Prompt
            </label>
            <input
              id="proj-topic-input"
              type="text"
              required
              placeholder="e.g. Hydraulic robotic arm using syringes, Volcano eruption chemistry, Solar water distillation..."
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              className="w-full px-4 py-3 bg-white rounded-2xl border border-slate-300 text-sm sm:text-base text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            />

            {/* Quick Sparks */}
            <div className="mt-3 flex items-center flex-wrap gap-2">
              <span className="text-xs font-semibold text-slate-500">Inspiring Ideas:</span>
              {QUICK_PROJECT_IDEAS.map((idea, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => handleApplyIdea(idea)}
                  className="text-xs px-2.5 py-1 rounded-lg bg-slate-100 hover:bg-indigo-50 hover:text-indigo-700 border border-slate-200 text-slate-700 transition-colors cursor-pointer text-left truncate max-w-[270px]"
                >
                  {idea.topic}
                </button>
              ))}
            </div>
          </div>

          <div className="pt-2">
            <button
              type="submit"
              disabled={isLoading || !topic.trim()}
              className="w-full py-3.5 px-6 rounded-xl font-bold text-sm sm:text-base text-white bg-indigo-600 hover:bg-indigo-700 active:scale-[0.99] disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  <span>Designing Project Blueprint &amp; Model Guide...</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-5 h-5" />
                  <span>Design Complete Project in 2 Minutes</span>
                  <ArrowRight className="w-5 h-5 ml-1" />
                </>
              )}
            </button>
          </div>
        </form>
      </div>

      {/* Project Viewer Stage */}
      {project && (
        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-3 duration-300">
          
          {/* Top Banner Card */}
          <div className="p-6 sm:p-8 bg-white rounded-3xl border border-slate-200 shadow-sm space-y-5">
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 pb-4">
              <div className="flex flex-wrap items-center gap-2 text-xs font-semibold text-slate-500">
                <span className="bg-indigo-50 text-indigo-700 px-2.5 py-1 rounded-md font-bold">
                  {project.classGrade}
                </span>
                <span>·</span>
                <span className="text-slate-700">{project.subject}</span>
                <span>·</span>
                <span className="text-indigo-600">{project.projectType}</span>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={copyFullProject}
                  className="px-3.5 py-1.5 text-xs font-bold rounded-lg border border-slate-200 bg-slate-50 hover:bg-slate-100 text-slate-700 transition-colors flex items-center gap-1.5 cursor-pointer"
                >
                  {copiedPlan ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedPlan ? 'Copied Full Project!' : 'Copy Plan (Docs / Word)'}</span>
                </button>

                <button
                  type="button"
                  onClick={() => window.print()}
                  className="px-3.5 py-1.5 text-xs font-bold rounded-lg border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 transition-colors flex items-center gap-1.5 cursor-pointer"
                >
                  <Printer className="w-3.5 h-3.5" />
                  <span>Print Plan</span>
                </button>

                <a
                  href={`mailto:utkarsh22012013@gmail.com?subject=${encodeURIComponent(`ProjectCraft Blueprint: ${project.title}`)}&body=${encodeURIComponent(
                    `PROJECT: ${project.title}\nGrade: ${project.classGrade} | Subject: ${project.subject}\n\nDriving Question: ${project.drivingQuestion}\nHypothesis: ${project.coreHypothesisOrThesis}\n\nOverview:\n${project.overview}`
                  )}`}
                  className="px-3.5 py-1.5 text-xs font-bold rounded-lg border border-indigo-200 bg-indigo-50 hover:bg-indigo-100 text-indigo-700 transition-colors flex items-center gap-1.5 cursor-pointer"
                  title="Email blueprint to utkarsh22012013@gmail.com"
                >
                  <Mail className="w-3.5 h-3.5" />
                  <span>Email Blueprint</span>
                </a>
              </div>
            </div>

            <div className="space-y-2">
              <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight leading-tight">
                {project.title}
              </h3>
              <p className="text-slate-600 text-sm sm:text-base leading-relaxed max-w-4xl">
                {project.overview}
              </p>
            </div>

            {/* Driving Question & Hypothesis Bento Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-1">
              <div className="p-4 sm:p-5 rounded-2xl bg-indigo-50/60 border border-indigo-100 space-y-1.5">
                <span className="text-[11px] font-bold uppercase tracking-wider text-indigo-600 block">
                  Driving Inquiry Question
                </span>
                <p className="text-sm sm:text-base font-semibold text-slate-900 leading-snug">
                  &ldquo;{project.drivingQuestion}&rdquo;
                </p>
              </div>

              <div className="p-4 sm:p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-1.5">
                <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 block">
                  Core Hypothesis / Thesis
                </span>
                <p className="text-sm sm:text-base font-medium text-slate-800 leading-snug">
                  {project.coreHypothesisOrThesis}
                </p>
              </div>
            </div>
          </div>

          {/* Sub-Tab Navigation Bar */}
          <div className="bg-white rounded-2xl p-1.5 border border-slate-200 shadow-xs flex items-center gap-1 overflow-x-auto">
            <button
              type="button"
              onClick={() => setActiveTab('plan')}
              className={`px-4 py-2.5 text-xs sm:text-sm font-bold rounded-xl transition-all whitespace-nowrap flex items-center gap-2 cursor-pointer ${
                activeTab === 'plan' ? 'bg-indigo-600 text-white shadow-xs' : 'text-slate-600 hover:bg-slate-100'
              }`}
            >
              <Calendar className="w-4 h-4" />
              <span>Step-by-Step Milestones</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('slides')}
              className={`px-4 py-2.5 text-xs sm:text-sm font-bold rounded-xl transition-all whitespace-nowrap flex items-center gap-2 cursor-pointer ${
                activeTab === 'slides' ? 'bg-indigo-600 text-white shadow-xs' : 'text-slate-600 hover:bg-slate-100'
              }`}
            >
              <Presentation className="w-4 h-4" />
              <span>Slide Deck &amp; Notes</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('poster')}
              className={`px-4 py-2.5 text-xs sm:text-sm font-bold rounded-xl transition-all whitespace-nowrap flex items-center gap-2 cursor-pointer ${
                activeTab === 'poster' ? 'bg-indigo-600 text-white shadow-xs' : 'text-slate-600 hover:bg-slate-100'
              }`}
            >
              <LayoutGrid className="w-4 h-4" />
              <span>Trifold Poster Board</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('materials')}
              className={`px-4 py-2.5 text-xs sm:text-sm font-bold rounded-xl transition-all whitespace-nowrap flex items-center gap-2 cursor-pointer ${
                activeTab === 'materials' ? 'bg-indigo-600 text-white shadow-xs' : 'text-slate-600 hover:bg-slate-100'
              }`}
            >
              <ShoppingBag className="w-4 h-4" />
              <span>Materials &amp; Substitutes</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('rubric')}
              className={`px-4 py-2.5 text-xs sm:text-sm font-bold rounded-xl transition-all whitespace-nowrap flex items-center gap-2 cursor-pointer ${
                activeTab === 'rubric' ? 'bg-indigo-600 text-white shadow-xs' : 'text-slate-600 hover:bg-slate-100'
              }`}
            >
              <Award className="w-4 h-4" />
              <span>100% Teacher Rubric</span>
            </button>
          </div>

          {/* TAB 1: STEP-BY-STEP MILESTONES */}
          {activeTab === 'plan' && (
            <div className="space-y-4">
              {project.milestones.map((m, mIdx) => (
                <div key={m.dayNumber} className="p-5 sm:p-6 bg-white rounded-3xl border border-slate-200 shadow-xs space-y-4">
                  <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-100 pb-3">
                    <div className="flex items-center gap-3">
                      <span className="w-8 h-8 rounded-xl bg-indigo-600 text-white font-bold text-sm flex items-center justify-center">
                        {m.dayNumber}
                      </span>
                      <div>
                        <h4 className="text-base font-bold text-slate-900">{m.dayLabel}: {m.title}</h4>
                        <p className="text-xs text-indigo-700 font-semibold">Deliverable: {m.deliverable}</p>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-3">
                    {m.tasks.map((task) => (
                      <div
                        key={task.id}
                        onClick={() => handleToggleTask(mIdx, task.id)}
                        className={`p-4 rounded-2xl border transition-all cursor-pointer flex items-start gap-3.5 select-none ${
                          task.completed
                            ? 'bg-slate-50 border-slate-200 opacity-80'
                            : 'bg-white border-slate-200 hover:border-indigo-300'
                        }`}
                      >
                        <button
                          type="button"
                          className="mt-0.5 text-indigo-600 shrink-0 cursor-pointer"
                        >
                          {task.completed ? (
                            <CheckCircle2 className="w-5 h-5 text-emerald-600 fill-emerald-100" />
                          ) : (
                            <Circle className="w-5 h-5 text-slate-300 hover:text-indigo-500" />
                          )}
                        </button>
                        <div className="space-y-1 flex-1">
                          <h5 className={`text-sm font-bold text-slate-900 ${task.completed ? 'line-through text-slate-500' : ''}`}>
                            {task.task}
                          </h5>
                          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                            {task.details}
                          </p>
                          {task.parentOrStudyTip && (
                            <div className="mt-2 p-2.5 rounded-xl bg-amber-50/80 border border-amber-200/60 text-xs text-amber-900 flex items-start gap-1.5">
                              <Users className="w-3.5 h-3.5 text-amber-600 shrink-0 mt-0.5" />
                              <span><strong>Pro-Tip:</strong> {task.parentOrStudyTip}</span>
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* TAB 2: SLIDES CAROUSEL */}
          {activeTab === 'slides' && project.slides.length > 0 && (
            <div className="space-y-5">
              {(() => {
                const sl = project.slides[currentSlideIndex];
                return (
                  <div className="rounded-3xl border border-slate-300 shadow-md bg-white overflow-hidden">
                    <div className="px-6 py-3.5 bg-slate-900 text-white flex items-center justify-between text-xs font-semibold">
                      <span>{project.title}</span>
                      <span className="font-mono text-slate-400">Slide {sl.slideNumber} of {project.slides.length}</span>
                    </div>

                    <div className="p-8 sm:p-12 min-h-[350px] flex flex-col justify-between bg-gradient-to-br from-white to-indigo-50/30">
                      <div className="space-y-4">
                        <span className="text-xs font-bold text-indigo-600 uppercase tracking-wider">{sl.title}</span>
                        <h3 className="text-2xl sm:text-3xl font-black text-slate-900 leading-tight">{sl.headline}</h3>
                        <ul className="space-y-2.5 pt-2">
                          {sl.bulletPoints.map((b, i) => (
                            <li key={i} className="flex items-start gap-2.5 text-slate-700 text-sm sm:text-base">
                              <span className="w-2 h-2 rounded-full bg-indigo-600 mt-2 shrink-0" />
                              <span>{b}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      {sl.visualIdea && (
                        <div className="mt-6 p-3 rounded-xl bg-white border border-slate-200 text-xs text-slate-600">
                          📸 <strong>Visual Recommendation:</strong> {sl.visualIdea}
                        </div>
                      )}
                    </div>

                    {/* Navigation */}
                    <div className="px-6 py-3.5 bg-slate-100 border-t border-slate-200 flex items-center justify-between">
                      <button
                        type="button"
                        onClick={() => setCurrentSlideIndex(Math.max(0, currentSlideIndex - 1))}
                        disabled={currentSlideIndex === 0}
                        className="px-3.5 py-1.5 text-xs font-semibold rounded-lg bg-white border border-slate-300 disabled:opacity-40 cursor-pointer"
                      >
                        Previous
                      </button>

                      <div className="flex items-center gap-1.5">
                        {project.slides.map((_, i) => (
                          <button
                            key={i}
                            type="button"
                            onClick={() => setCurrentSlideIndex(i)}
                            className={`w-7 h-7 rounded-lg text-xs font-bold ${
                              i === currentSlideIndex ? 'bg-indigo-600 text-white' : 'bg-white text-slate-600 border border-slate-200'
                            }`}
                          >
                            {i + 1}
                          </button>
                        ))}
                      </div>

                      <button
                        type="button"
                        onClick={() => setCurrentSlideIndex(Math.min(project.slides.length - 1, currentSlideIndex + 1))}
                        disabled={currentSlideIndex === project.slides.length - 1}
                        className="px-3.5 py-1.5 text-xs font-semibold rounded-lg bg-white border border-slate-300 disabled:opacity-40 cursor-pointer"
                      >
                        Next
                      </button>
                    </div>

                    {/* Speaker Notes */}
                    {sl.spokenNotes && (
                      <div className="p-6 bg-slate-900 text-white space-y-2">
                        <span className="text-xs font-bold uppercase tracking-wider text-indigo-300 flex items-center gap-1.5">
                          <Volume2 className="w-4 h-4" />
                          Speaking Script (What you say to the class)
                        </span>
                        <p className="text-sm sm:text-base italic text-slate-100 font-medium leading-relaxed">
                          &ldquo;{sl.spokenNotes}&rdquo;
                        </p>
                      </div>
                    )}
                  </div>
                );
              })()}
            </div>
          )}

          {/* TAB 3: POSTER BOARD */}
          {activeTab === 'poster' && (
            <div className="space-y-4">
              <div className="md:hidden flex gap-2">
                {(['left', 'center', 'right'] as const).map((p) => (
                  <button
                    key={p}
                    type="button"
                    onClick={() => setMobilePosterTab(p)}
                    className={`flex-1 py-2 text-xs font-bold rounded-xl capitalize cursor-pointer ${
                      mobilePosterTab === p ? 'bg-indigo-600 text-white' : 'bg-white border border-slate-200 text-slate-700'
                    }`}
                  >
                    {p} Panel
                  </button>
                ))}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {project.posterLayout.map((sec, idx) => {
                  const isVisibleOnMobile = 
                    (sec.panel.includes('Left') && mobilePosterTab === 'left') ||
                    (sec.panel.includes('Center') && mobilePosterTab === 'center') ||
                    (sec.panel.includes('Right') && mobilePosterTab === 'right');

                  return (
                    <div
                      key={idx}
                      className={`p-5 rounded-3xl bg-white border-2 border-slate-200 space-y-3 ${
                        isVisibleOnMobile ? 'block' : 'hidden md:block'
                      }`}
                    >
                      <span className="text-[11px] font-bold uppercase tracking-wider text-indigo-600 block">
                        {sec.panel}
                      </span>
                      <h4 className="text-base font-bold text-slate-900">{sec.heading}</h4>
                      <p className="text-xs sm:text-sm text-slate-700 whitespace-pre-line leading-relaxed">
                        {sec.content}
                      </p>
                      {sec.visualGraphic && (
                        <div className="pt-2 text-[11px] text-slate-500 border-t border-slate-100 font-medium">
                          🎨 {sec.visualGraphic}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* TAB 4: MATERIALS */}
          {activeTab === 'materials' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
              {project.materials.map((mat, i) => (
                <div
                  key={i}
                  onClick={() => handleToggleMaterial(i)}
                  className={`p-4 rounded-2xl border transition-all cursor-pointer flex items-start gap-3 select-none ${
                    mat.checked ? 'bg-emerald-50/50 border-emerald-300 opacity-90' : 'bg-white border-slate-200'
                  }`}
                >
                  <button type="button" className="mt-0.5 text-emerald-600 shrink-0">
                    {mat.checked ? (
                      <CheckCircle2 className="w-5 h-5 text-emerald-600 fill-emerald-100" />
                    ) : (
                      <Circle className="w-5 h-5 text-slate-300" />
                    )}
                  </button>
                  <div className="space-y-1 flex-1">
                    <div className="flex items-center justify-between">
                      <h5 className={`text-sm font-bold text-slate-900 ${mat.checked ? 'line-through text-slate-500' : ''}`}>
                        {mat.item}
                      </h5>
                      <span className="text-[11px] text-slate-500 bg-slate-100 px-2 py-0.5 rounded font-medium">
                        {mat.category}
                      </span>
                    </div>
                    {mat.substitute && (
                      <p className="text-xs text-slate-600">
                        <strong>Free Kitchen/Home Substitute:</strong> {mat.substitute}
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* TAB 5: RUBRIC */}
          {activeTab === 'rubric' && (
            <div className="space-y-4">
              {project.rubric.map((r, idx) => (
                <div key={idx} className="p-5 sm:p-6 bg-white rounded-3xl border border-slate-200 shadow-xs space-y-3">
                  <h4 className="text-base font-bold text-slate-900">{r.criterion}</h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                    <div className="p-3.5 rounded-2xl bg-emerald-50/80 border border-emerald-200 text-xs text-emerald-950">
                      <strong className="block mb-1 text-emerald-800">How to get 100% / A+ Full Marks:</strong>
                      {r.howToScoreFullMarks}
                    </div>
                    <div className="p-3.5 rounded-2xl bg-rose-50/80 border border-rose-200 text-xs text-rose-950">
                      <strong className="block mb-1 text-rose-800">Mistake that loses marks:</strong>
                      {r.avoidMistake}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

        </div>
      )}
    </div>
  );
};
