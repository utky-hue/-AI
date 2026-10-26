import React, { useState } from 'react';
import { Award, AlertTriangle, CheckCircle, Calculator, TrendingUp } from 'lucide-react';
import { RubricCriterion } from '../types/project';

interface RubricScorerProps {
  rubric: RubricCriterion[];
}

export const RubricScorer: React.FC<RubricScorerProps> = ({ rubric }) => {
  // Store user's self assessment ratings: index -> 4 (Exemplary), 3 (Proficient), 2 (Developing)
  const [ratings, setRatings] = useState<{ [key: number]: number }>({
    0: 4,
    1: 4,
    2: 4,
    3: 4,
  });

  const [scoreAnimationTrigger, setScoreAnimationTrigger] = useState(0);

  const handleSelectScore = (criterionIndex: number, score: number) => {
    setRatings((prev) => ({
      ...prev,
      [criterionIndex]: score,
    }));
    setScoreAnimationTrigger((prev) => prev + 1);
  };

  const maxTotal = rubric.length * 4;
  const currentTotal = Object.values(ratings).reduce((acc, curr) => acc + curr, 0);
  const percentage = Math.round((currentTotal / maxTotal) * 100);

  // Determine Letter Grade and Visual Color Palette
  let gradeLetter = 'A+';
  let gradeStatus = 'Exemplary Standard';
  let badgeClasses = 'bg-emerald-50 text-emerald-800 border-emerald-300 ring-emerald-500/30';
  let barColor = 'bg-emerald-600';

  if (percentage >= 93) {
    gradeLetter = 'A+';
    gradeStatus = 'Exemplary (Exceeds Standard)';
    badgeClasses = 'bg-emerald-50 text-emerald-900 border-emerald-300 ring-2 ring-emerald-400';
    barColor = 'bg-emerald-600';
  } else if (percentage >= 85) {
    gradeLetter = 'B+';
    gradeStatus = 'Proficient (Meets Standard)';
    badgeClasses = 'bg-blue-50 text-blue-900 border-blue-300 ring-2 ring-blue-400';
    barColor = 'bg-blue-600';
  } else if (percentage >= 75) {
    gradeLetter = 'C';
    gradeStatus = 'Developing (Approaching Standard)';
    badgeClasses = 'bg-amber-50 text-amber-900 border-amber-300 ring-2 ring-amber-400';
    barColor = 'bg-amber-600';
  } else {
    gradeLetter = 'Needs Polish';
    gradeStatus = 'Action Required';
    badgeClasses = 'bg-rose-50 text-rose-900 border-rose-300 ring-2 ring-rose-400';
    barColor = 'bg-rose-600';
  }

  return (
    <div className="space-y-6">
      {/* Header & Dynamic Score Estimator Calculator */}
      <div className="p-5 sm:p-6 bg-white rounded-3xl border border-slate-200 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-5">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center shrink-0">
            <Award className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-bold text-slate-900 text-base sm:text-lg">
              Interactive Teacher Grading Rubric &amp; Live Self-Audit
            </h3>
            <p className="text-xs text-slate-500">
              Audit your project against standard teacher evaluation benchmarks before submitting
            </p>
          </div>
        </div>

        {/* Dynamic Score Pill with Pop Animation */}
        <div className="flex flex-col sm:items-end gap-1.5 shrink-0">
          <div
            key={scoreAnimationTrigger}
            className={`p-3 rounded-2xl border transition-all duration-300 flex items-center gap-3.5 shadow-sm animate-in zoom-in-95 ${badgeClasses}`}
          >
            <Calculator className="w-5 h-5 shrink-0" />
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold uppercase tracking-wider">
                  Grade {gradeLetter}
                </span>
                <span aria-hidden="true">·</span>
                <span className="font-mono font-black text-lg tabular-nums">
                  {percentage}%
                </span>
              </div>
              <span className="text-[11px] font-medium opacity-90 block">
                {currentTotal} / {maxTotal} Points · {gradeStatus}
              </span>
            </div>
          </div>

          {/* Mini Visual Meter */}
          <div className="w-full sm:w-48 h-2 bg-slate-100 rounded-full overflow-hidden border border-slate-200">
            <div
              className={`h-full ${barColor} transition-all duration-500 rounded-full`}
              style={{ width: `${percentage}%` }}
            />
          </div>
        </div>
      </div>

      {/* Rubric Criteria Matrix */}
      <div className="space-y-4">
        {rubric.map((item, idx) => {
          const selected = ratings[idx] ?? 4;

          return (
            <div
              key={item.criterion}
              className="p-5 sm:p-6 bg-white rounded-2xl border border-slate-200 shadow-xs space-y-4 transition-all"
            >
              <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-100 pb-3">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-indigo-600">Criterion {idx + 1}</span>
                  <h4 className="text-sm sm:text-base font-bold text-slate-900">{item.criterion}</h4>
                </div>
                <div className="flex items-center gap-2 text-xs">
                  <span className="font-semibold text-slate-500 bg-slate-100 px-2.5 py-0.5 rounded-md">
                    Weight: {item.weight}
                  </span>
                  <span className="font-bold text-indigo-700 bg-indigo-50 px-2.5 py-0.5 rounded-md border border-indigo-100">
                    Selected: {selected}/4
                  </span>
                </div>
              </div>

              {/* Scoring Tier Selector */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <button
                  type="button"
                  onClick={() => handleSelectScore(idx, 4)}
                  className={`p-3.5 rounded-xl border text-left transition-all cursor-pointer ${
                    selected === 4
                      ? 'bg-emerald-50/90 border-emerald-500 ring-2 ring-emerald-500/20 shadow-xs'
                      : 'bg-white border-slate-200 hover:border-slate-300'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs font-bold text-emerald-900">4 · Exemplary (A+)</span>
                    {selected === 4 && <CheckCircle className="w-4 h-4 text-emerald-600" />}
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    {item.exemplaryGuide}
                  </p>
                </button>

                <button
                  type="button"
                  onClick={() => handleSelectScore(idx, 3)}
                  className={`p-3.5 rounded-xl border text-left transition-all cursor-pointer ${
                    selected === 3
                      ? 'bg-blue-50/90 border-blue-500 ring-2 ring-blue-500/20 shadow-xs'
                      : 'bg-white border-slate-200 hover:border-slate-300'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs font-bold text-blue-900">3 · Proficient (B)</span>
                    {selected === 3 && <CheckCircle className="w-4 h-4 text-blue-600" />}
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Meets all core requirements with minor gaps in depth or visual alignment.
                  </p>
                </button>

                <button
                  type="button"
                  onClick={() => handleSelectScore(idx, 2)}
                  className={`p-3.5 rounded-xl border text-left transition-all cursor-pointer ${
                    selected === 2
                      ? 'bg-amber-50/90 border-amber-500 ring-2 ring-amber-500/20 shadow-xs'
                      : 'bg-white border-slate-200 hover:border-slate-300'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs font-bold text-amber-900">2 · Developing (C)</span>
                    {selected === 2 && <CheckCircle className="w-4 h-4 text-amber-600" />}
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Partial execution; incomplete experimental trials or missing citations.
                  </p>
                </button>
              </div>

              {/* Frequent Pitfalls */}
              {item.commonPitfalls && (
                <div className="p-3 rounded-xl bg-rose-50/70 border border-rose-200/80 text-xs text-rose-900 flex items-start gap-2">
                  <AlertTriangle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold text-rose-950">Common Pitfall to Avoid: </span>
                    <span>{item.commonPitfalls}</span>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
