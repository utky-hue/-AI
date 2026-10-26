import React, { useState } from 'react';
import {
  Calendar,
  Presentation,
  LayoutGrid,
  ShoppingBag,
  Award,
  Mic,
  BookOpen,
  Printer,
  FileText,
  Check,
  CheckCircle2,
  X,
} from 'lucide-react';
import { ProjectBlueprint } from '../types/project';
import { MilestoneTimeline } from './MilestoneTimeline';
import { SlideDeckViewer } from './SlideDeckViewer';
import { TrifoldBoardViewer } from './TrifoldBoardViewer';
import { MaterialsChecklist } from './MaterialsChecklist';
import { RubricScorer } from './RubricScorer';
import { RehearsalFlashcards } from './RehearsalFlashcards';
import { CitationsAndParentGuide } from './CitationsAndParentGuide';

interface ProjectViewerProps {
  blueprint: ProjectBlueprint;
  onUpdateBlueprint: (updated: ProjectBlueprint) => void;
  activeTab: string;
  onSelectTab: (tabId: string) => void;
}

export const ProjectViewer: React.FC<ProjectViewerProps> = ({
  blueprint,
  onUpdateBlueprint,
  activeTab,
  onSelectTab,
}) => {
  const [isParentMode, setIsParentMode] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Toggle tasks in milestone
  const handleToggleTask = (dayIndex: number, taskId: string) => {
    const updatedMilestones = [...blueprint.milestones];
    const targetDay = updatedMilestones[dayIndex];
    if (!targetDay) return;

    targetDay.tasks = targetDay.tasks.map((t) =>
      t.id === taskId ? { ...t, completed: !t.completed } : t
    );

    onUpdateBlueprint({
      ...blueprint,
      milestones: updatedMilestones,
    });
  };

  // Reset all tasks
  const handleResetTasks = () => {
    const updatedMilestones = blueprint.milestones.map((m) => ({
      ...m,
      tasks: m.tasks.map((t) => ({ ...t, completed: false })),
    }));
    onUpdateBlueprint({
      ...blueprint,
      milestones: updatedMilestones,
    });
    showToast('All milestone checkboxes have been reset to zero.');
  };

  // Toggle material checked state
  const handleToggleMaterial = (index: number) => {
    const updatedMaterials = [...blueprint.materials];
    if (updatedMaterials[index]) {
      updatedMaterials[index].checked = !updatedMaterials[index].checked;
      onUpdateBlueprint({
        ...blueprint,
        materials: updatedMaterials,
      });
    }
  };

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage((current) => (current === msg ? null : current));
    }, 4500);
  };

  // Export full blueprint as clear readable document
  const exportFullPlan = () => {
    let text = `====================================================\n`;
    text += `${blueprint.title.toUpperCase()}\n`;
    text += `====================================================\n\n`;
    text += `Grade Level: ${blueprint.gradeLevel}\n`;
    text += `Subject: ${blueprint.subject}\n`;
    text += `Timeline: ${blueprint.timelineType}\n\n`;
    text += `CORE INQUIRY QUESTION:\n"${blueprint.drivingQuestion}"\n\n`;
    text += `HYPOTHESIS / CENTRAL THESIS:\n${blueprint.hypothesisOrThesis}\n\n`;
    text += `PROJECT OVERVIEW:\n${blueprint.summary}\n\n`;
    
    text += `----------------------------------------------------\n`;
    text += `DAY-BY-DAY MILESTONE PLAN\n`;
    text += `----------------------------------------------------\n\n`;
    blueprint.milestones.forEach((m) => {
      text += `[${m.dayLabel}] ${m.title} (~${m.estimatedMinutes} mins)\n`;
      text += `Focus: ${m.focus}\n`;
      m.tasks.forEach((t) => {
        text += `  [${t.completed ? 'COMPLETED' : 'PENDING'}] ${t.task}\n`;
        text += `    Instructions: ${t.details}\n`;
        if (t.parentTip) text += `    Parent Tip: ${t.parentTip}\n`;
      });
      if (m.checkpointQuestion) text += `  Daily Checkpoint: ${m.checkpointQuestion}\n`;
      text += `\n`;
    });

    text += `----------------------------------------------------\n`;
    text += `PRESENTATION SLIDE DECK OUTLINE (6 SLIDES)\n`;
    text += `----------------------------------------------------\n\n`;
    blueprint.presentationDeck.forEach((s) => {
      text += `SLIDE ${s.slideNumber}: ${s.title}\n`;
      text += `Headline: ${s.headline}\n`;
      s.keyBullets.forEach((b) => (text += `• ${b}\n`));
      text += `Speaker Script: "${s.speakerNotes}"\n\n`;
    });

    text += `----------------------------------------------------\n`;
    text += `MATERIALS CHECKLIST\n`;
    text += `----------------------------------------------------\n`;
    blueprint.materials.forEach((mat) => {
      text += `• ${mat.item} [${mat.category}] ${mat.isEssential ? '(Essential)' : '(Optional)'}\n`;
      if (mat.freeAlternative) text += `  Free Substitute: ${mat.freeAlternative}\n`;
    });

    navigator.clipboard.writeText(text);
    showToast('Copied full project plan to clipboard! Ready to paste into Google Docs, Word, or Notes.');
  };

  return (
    <div className="space-y-8 relative">
      {/* Toast Notification Banner */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 max-w-md p-4 rounded-2xl bg-slate-900 text-white shadow-2xl border border-slate-700 flex items-start gap-3 animate-in fade-in slide-in-from-bottom-4">
          <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
          <div className="flex-1 text-xs sm:text-sm font-medium leading-relaxed">
            {toastMessage}
          </div>
          <button
            type="button"
            onClick={() => setToastMessage(null)}
            className="text-slate-400 hover:text-white shrink-0 p-1 cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Blueprint Header Overview Card */}
      <div className="p-6 sm:p-8 bg-white rounded-3xl border border-slate-200 shadow-sm space-y-6">
        <div className="space-y-3">
          <div className="flex flex-wrap items-center gap-2 text-xs text-slate-500">
            <span className="font-semibold text-indigo-700 bg-indigo-50 px-2.5 py-1 rounded-md border border-indigo-100">
              {blueprint.gradeLevel}
            </span>
            <span aria-hidden="true">·</span>
            <span className="font-medium text-slate-700">{blueprint.subject}</span>
            <span aria-hidden="true">·</span>
            <span className="flex items-center gap-1 font-medium text-slate-600">
              <Calendar className="w-3.5 h-3.5" />
              {blueprint.timelineType}
            </span>
          </div>

          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight">
            {blueprint.title}
          </h2>

          <p className="text-slate-600 text-sm sm:text-base leading-relaxed max-w-4xl">
            {blueprint.summary}
          </p>
        </div>

        {/* Driving Question & Hypothesis Bento Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-5 rounded-2xl bg-indigo-50/60 border border-indigo-100 space-y-2">
            <span className="text-[11px] font-bold uppercase tracking-wider text-indigo-600 block">
              Core Inquiry Question
            </span>
            <p className="text-sm sm:text-base font-semibold text-slate-900 leading-snug">
              &ldquo;{blueprint.drivingQuestion}&rdquo;
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 block">
              Testable Hypothesis / Thesis
            </span>
            <p className="text-sm sm:text-base font-medium text-slate-800 leading-snug">
              {blueprint.hypothesisOrThesis}
            </p>
          </div>
        </div>

        {/* Quick Export Tools */}
        <div className="pt-2 flex flex-wrap items-center justify-between gap-3 border-t border-slate-100">
          <div className="flex flex-wrap items-center gap-2.5">
            <button
              type="button"
              onClick={exportFullPlan}
              className="px-3.5 py-2 text-xs sm:text-sm font-semibold rounded-xl bg-indigo-50 hover:bg-indigo-100 text-indigo-700 border border-indigo-200 transition-colors flex items-center gap-1.5 cursor-pointer shadow-xs"
              title="Copy the complete project outline formatted for Google Docs or Word"
            >
              <FileText className="w-4 h-4 text-indigo-600" />
              <span>Copy Full Plan (Docs / Word)</span>
            </button>

            <button
              type="button"
              onClick={() => window.print()}
              className="px-3.5 py-2 text-xs sm:text-sm font-semibold rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors flex items-center gap-1.5 cursor-pointer"
            >
              <Printer className="w-4 h-4" />
              <span>Print / Save as PDF</span>
            </button>
          </div>

          <div className="text-xs text-slate-400">
            Last updated: {new Date(blueprint.createdAt).toLocaleDateString()}
          </div>
        </div>
      </div>

      {/* Interactive Tabs Navigation */}
      <div className="bg-white rounded-2xl p-1.5 border border-slate-200 shadow-xs flex items-center gap-1 overflow-x-auto">
        <button
          type="button"
          onClick={() => onSelectTab('blueprint')}
          className={`px-4 py-2.5 text-xs sm:text-sm font-bold rounded-xl transition-all whitespace-nowrap flex items-center gap-2 cursor-pointer ${
            activeTab === 'blueprint'
              ? 'bg-indigo-600 text-white shadow-xs'
              : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
          }`}
        >
          <Calendar className="w-4 h-4" />
          <span>Milestone Plan</span>
        </button>

        <button
          type="button"
          onClick={() => onSelectTab('slides')}
          className={`px-4 py-2.5 text-xs sm:text-sm font-bold rounded-xl transition-all whitespace-nowrap flex items-center gap-2 cursor-pointer ${
            activeTab === 'slides'
              ? 'bg-indigo-600 text-white shadow-xs'
              : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
          }`}
        >
          <Presentation className="w-4 h-4" />
          <span>Slide Deck (6 Slides)</span>
        </button>

        <button
          type="button"
          onClick={() => onSelectTab('trifold')}
          className={`px-4 py-2.5 text-xs sm:text-sm font-bold rounded-xl transition-all whitespace-nowrap flex items-center gap-2 cursor-pointer ${
            activeTab === 'trifold'
              ? 'bg-indigo-600 text-white shadow-xs'
              : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
          }`}
        >
          <LayoutGrid className="w-4 h-4" />
          <span>Trifold Science Board</span>
        </button>

        <button
          type="button"
          onClick={() => onSelectTab('materials')}
          className={`px-4 py-2.5 text-xs sm:text-sm font-bold rounded-xl transition-all whitespace-nowrap flex items-center gap-2 cursor-pointer ${
            activeTab === 'materials'
              ? 'bg-indigo-600 text-white shadow-xs'
              : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
          }`}
        >
          <ShoppingBag className="w-4 h-4" />
          <span>Materials Checklist</span>
        </button>

        <button
          type="button"
          onClick={() => onSelectTab('rubric')}
          className={`px-4 py-2.5 text-xs sm:text-sm font-bold rounded-xl transition-all whitespace-nowrap flex items-center gap-2 cursor-pointer ${
            activeTab === 'rubric'
              ? 'bg-indigo-600 text-white shadow-xs'
              : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
          }`}
        >
          <Award className="w-4 h-4" />
          <span>Rubric Audit</span>
        </button>

        <button
          type="button"
          onClick={() => onSelectTab('rehearsal')}
          className={`px-4 py-2.5 text-xs sm:text-sm font-bold rounded-xl transition-all whitespace-nowrap flex items-center gap-2 cursor-pointer ${
            activeTab === 'rehearsal'
              ? 'bg-indigo-600 text-white shadow-xs'
              : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
          }`}
        >
          <Mic className="w-4 h-4" />
          <span>Oral Practice Q&amp;A</span>
        </button>

        <button
          type="button"
          onClick={() => onSelectTab('sources')}
          className={`px-4 py-2.5 text-xs sm:text-sm font-bold rounded-xl transition-all whitespace-nowrap flex items-center gap-2 cursor-pointer ${
            activeTab === 'sources'
              ? 'bg-indigo-600 text-white shadow-xs'
              : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
          }`}
        >
          <BookOpen className="w-4 h-4" />
          <span>Sources &amp; Parents</span>
        </button>
      </div>

      {/* Tab Panels */}
      <div className="pt-2">
        {activeTab === 'blueprint' && (
          <MilestoneTimeline
            milestones={blueprint.milestones}
            onToggleTask={handleToggleTask}
            onResetTasks={handleResetTasks}
            isParentMode={isParentMode}
            onToggleParentMode={() => setIsParentMode(!isParentMode)}
          />
        )}

        {activeTab === 'slides' && (
          <SlideDeckViewer
            slides={blueprint.presentationDeck}
            projectTitle={blueprint.title}
          />
        )}

        {activeTab === 'trifold' && (
          <TrifoldBoardViewer
            trifold={blueprint.trifoldPoster}
            projectTitle={blueprint.title}
          />
        )}

        {activeTab === 'materials' && (
          <MaterialsChecklist
            materials={blueprint.materials}
            onToggleMaterial={handleToggleMaterial}
          />
        )}

        {activeTab === 'rubric' && (
          <RubricScorer rubric={blueprint.rubric} />
        )}

        {activeTab === 'rehearsal' && (
          <RehearsalFlashcards flashcards={blueprint.practiceFlashcards} />
        )}

        {activeTab === 'sources' && (
          <CitationsAndParentGuide
            sources={blueprint.starterSources}
            parentGuide={blueprint.parentGuide}
          />
        )}
      </div>
    </div>
  );
};
