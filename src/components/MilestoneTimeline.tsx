import React, { useState } from 'react';
import {
  CheckCircle2,
  Circle,
  Clock,
  HelpCircle,
  Users,
  Award,
  Sparkles,
  RotateCcw,
  AlertTriangle,
  X,
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { DayMilestone, TaskItem } from '../types/project';

interface MilestoneTimelineProps {
  milestones: DayMilestone[];
  onToggleTask: (dayIndex: number, taskId: string) => void;
  onResetTasks: () => void;
  isParentMode: boolean;
  onToggleParentMode: () => void;
}

export const MilestoneTimeline: React.FC<MilestoneTimelineProps> = ({
  milestones,
  onToggleTask,
  onResetTasks,
  isParentMode,
  onToggleParentMode,
}) => {
  const [showResetConfirm, setShowResetConfirm] = useState(false);

  // Calculate completion percentage
  let totalTasks = 0;
  let completedTasks = 0;
  milestones.forEach((m) => {
    m.tasks.forEach((t) => {
      totalTasks++;
      if (t.completed) completedTasks++;
    });
  });

  const percentComplete = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;

  const handleTaskClick = (dayIndex: number, taskId: string, isCurrentlyDone: boolean) => {
    onToggleTask(dayIndex, taskId);
    if (!isCurrentlyDone) {
      // Fire confetti burst if reaching 100% or completing tasks
      if (completedTasks + 1 === totalTasks) {
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 },
        });
      }
    }
  };

  const handleConfirmReset = () => {
    onResetTasks();
    setShowResetConfirm(false);
  };

  return (
    <div className="space-y-6">
      {/* Top Banner / Progress & Mode Switcher */}
      <div className="p-5 sm:p-6 rounded-3xl bg-white border border-slate-200 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="space-y-2 flex-1">
          <div className="flex items-center justify-between text-xs sm:text-sm font-semibold text-slate-700">
            <span className="flex items-center gap-1.5 font-bold text-slate-900">
              <Award className="w-4 h-4 text-indigo-600" />
              Overall Assignment Completion
            </span>
            <span className="font-mono tabular-nums text-indigo-600 font-bold">
              {completedTasks} / {totalTasks} Tasks ({percentComplete}%)
            </span>
          </div>
          {/* Progress Bar */}
          <div className="w-full h-2.5 bg-slate-100 rounded-full overflow-hidden border border-slate-200">
            <div
              className="h-full bg-indigo-600 transition-all duration-500 rounded-full"
              style={{ width: `${percentComplete}%` }}
            />
          </div>
          {percentComplete === 100 && (
            <p className="text-xs font-bold text-emerald-600 flex items-center gap-1 pt-0.5 animate-in fade-in">
              <Sparkles className="w-3.5 h-3.5" />
              Outstanding! All project milestone tasks are completed. You are ready to present!
            </p>
          )}
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-2.5 shrink-0">
          <button
            type="button"
            onClick={onToggleParentMode}
            className={`px-3.5 py-2 text-xs font-semibold rounded-xl border transition-all flex items-center gap-1.5 cursor-pointer ${
              isParentMode
                ? 'bg-amber-500 text-white border-amber-600 shadow-xs'
                : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
            }`}
          >
            <Users className="w-3.5 h-3.5" />
            <span>{isParentMode ? 'Parent Tips Active' : 'Show Parent Tips'}</span>
          </button>

          <button
            type="button"
            onClick={() => setShowResetConfirm(true)}
            title="Reset milestone tasks"
            className="p-2 text-slate-500 hover:text-rose-700 rounded-xl hover:bg-rose-50 border border-slate-200 hover:border-rose-200 transition-colors flex items-center gap-1.5 text-xs font-medium cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Reset</span>
          </button>
        </div>
      </div>

      {/* Confirmation Modal for Resetting Tasks */}
      {showResetConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in">
          <div className="bg-white rounded-3xl p-6 max-w-md w-full shadow-2xl border border-slate-200 space-y-4">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-2xl bg-rose-50 text-rose-600 flex items-center justify-center shrink-0">
                <AlertTriangle className="w-5 h-5" />
              </div>
              <div className="space-y-1">
                <h3 className="font-bold text-slate-900 text-base">
                  Reset All Milestone Tasks?
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  This will uncheck all completed steps across every day. Your project content and slides will stay intact, but task checkboxes will return to zero.
                </p>
              </div>
            </div>

            <div className="pt-2 flex items-center justify-end gap-2.5">
              <button
                type="button"
                onClick={() => setShowResetConfirm(false)}
                className="px-4 py-2 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-xl transition-colors cursor-pointer"
              >
                Keep My Progress (Cancel)
              </button>
              <button
                type="button"
                onClick={handleConfirmReset}
                className="px-4 py-2 text-xs font-bold text-white bg-rose-600 hover:bg-rose-700 rounded-xl transition-colors cursor-pointer shadow-xs"
              >
                Yes, Reset All Checkboxes
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Daily Milestones Accordion / Sequence */}
      <div className="space-y-5">
        {milestones.map((m, dayIdx) => {
          const dayCompleted = m.tasks.every((t) => t.completed);
          const dayDoneCount = m.tasks.filter((t) => t.completed).length;

          return (
            <div
              key={m.dayNumber}
              className={`rounded-3xl border transition-all overflow-hidden ${
                dayCompleted
                  ? 'bg-emerald-50/30 border-emerald-200'
                  : 'bg-white border-slate-200 shadow-xs'
              }`}
            >
              {/* Day Header */}
              <div className="px-5 sm:px-6 py-4 border-b border-slate-100 flex flex-wrap items-center justify-between gap-3 bg-slate-50/60">
                <div className="flex items-center gap-3">
                  <span
                    className={`w-7 h-7 rounded-lg flex items-center justify-center font-bold text-xs ${
                      dayCompleted
                        ? 'bg-emerald-600 text-white'
                        : 'bg-indigo-600 text-white'
                    }`}
                  >
                    {m.dayNumber}
                  </span>
                  <div>
                    <h3 className="font-bold text-slate-900 text-sm sm:text-base flex items-center gap-2">
                      <span>{m.title}</span>
                      {dayCompleted && (
                        <span className="text-xs font-semibold text-emerald-700 flex items-center gap-1">
                          <CheckCircle2 className="w-3.5 h-3.5" /> Done
                        </span>
                      )}
                    </h3>
                    <p className="text-xs text-slate-500 font-medium">{m.focus}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3 text-xs text-slate-500 font-medium">
                  <span className="flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5 text-slate-400" />
                    ~{m.estimatedMinutes} mins
                  </span>
                  <span aria-hidden="true">·</span>
                  <span className="font-mono tabular-nums font-semibold text-slate-700">
                    {dayDoneCount}/{m.tasks.length} tasks
                  </span>
                </div>
              </div>

              {/* Day Tasks Checklist */}
              <div className="p-5 sm:p-6 space-y-3">
                <div className="space-y-2.5">
                  {m.tasks.map((task: TaskItem) => (
                    <div
                      key={task.id}
                      onClick={() => handleTaskClick(dayIdx, task.id, task.completed)}
                      className={`p-4 rounded-2xl border transition-all cursor-pointer flex items-start gap-3.5 select-none ${
                        task.completed
                          ? 'bg-slate-50/80 border-slate-200 opacity-80'
                          : 'bg-white border-slate-200 hover:border-indigo-300 hover:shadow-xs'
                      }`}
                    >
                      <button
                        type="button"
                        className="mt-0.5 text-indigo-600 hover:text-indigo-800 shrink-0 focus:outline-none cursor-pointer"
                        aria-label={task.completed ? 'Mark incomplete' : 'Mark complete'}
                      >
                        {task.completed ? (
                          <CheckCircle2 className="w-5 h-5 text-emerald-600 fill-emerald-100" />
                        ) : (
                          <Circle className="w-5 h-5 text-slate-300 hover:text-indigo-500" />
                        )}
                      </button>

                      <div className="space-y-1 flex-1">
                        <h4
                          className={`text-sm font-bold text-slate-900 ${
                            task.completed ? 'line-through text-slate-500' : ''
                          }`}
                        >
                          {task.task}
                        </h4>
                        <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                          {task.details}
                        </p>

                        {/* Optional Parent Scaffolding Callout */}
                        {isParentMode && task.parentTip && (
                          <div className="mt-2.5 p-3 rounded-xl bg-amber-50 border border-amber-200/90 text-xs text-amber-900 flex items-start gap-2">
                            <Users className="w-3.5 h-3.5 text-amber-600 shrink-0 mt-0.5" />
                            <div>
                              <span className="font-bold text-amber-950">Parent Coaching Tip: </span>
                              <span>{task.parentTip}</span>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Day Checkpoint Question */}
                {m.checkpointQuestion && (
                  <div className="mt-3 p-3.5 rounded-2xl bg-slate-50 border border-slate-200/70 text-xs sm:text-sm text-slate-700 flex items-start gap-2.5">
                    <HelpCircle className="w-4 h-4 text-indigo-600 shrink-0 mt-0.5" />
                    <div>
                      <span className="font-bold text-slate-900">Day Checkpoint Check: </span>
                      <span className="italic">{m.checkpointQuestion}</span>
                    </div>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
