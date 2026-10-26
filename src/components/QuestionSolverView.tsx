import React, { useState, useEffect } from 'react';
import {
  Sparkles,
  HelpCircle,
  CheckCircle2,
  BookOpen,
  AlertTriangle,
  Lightbulb,
  ArrowRight,
  Copy,
  Check,
  Loader2,
  GraduationCap,
  Layers,
  ChevronDown,
  ChevronUp,
  Zap,
  Table,
} from 'lucide-react';
import { ClassGrade, AcademicSubject, QuestionSolution } from '../types/academic';
import { MathRenderer } from './MathRenderer';

interface QuestionSolverViewProps {
  onSolve: (question: string, grade: ClassGrade, subject: AcademicSubject) => Promise<void>;
  isLoading: boolean;
  solution: QuestionSolution | null;
  onClear: () => void;
}

const CLASS_OPTIONS: ClassGrade[] = [
  'College / University / Olympiad',
  'Class 12 (Senior Secondary / Board)',
  'Class 11 (Senior Secondary)',
  'Class 10 (High School / Board)',
  'Class 9 (High School)',
  'Class 8 (Middle)',
  'Class 7 (Middle)',
  'Class 6 (Middle)',
  'Class 4-5 (Upper Elementary)',
  'Class 1-3 (Elementary)',
];

const SUBJECT_OPTIONS: AcademicSubject[] = [
  'Mathematics',
  'Physics',
  'Chemistry',
  'Biology',
  'General Science',
  'History & Civics',
  'Geography & Environment',
  'English & Literature',
  'Computer Science & Coding',
  'Economics & Commerce',
  'Other / Any Subject',
];

const SAMPLE_QUESTIONS = [
  {
    q: 'Find all polynomials P(x) with real coefficients such that P(x²) = (P(x))² - 2P(x)',
    grade: 'College / University / Olympiad' as ClassGrade,
    subject: 'Mathematics' as AcademicSubject,
    tag: 'Olympiad Polynomials',
  },
  {
    q: 'Solve 2x² - 8x + 6 = 0 using the quadratic formula step by step.',
    grade: 'Class 10 (High School / Board)' as ClassGrade,
    subject: 'Mathematics' as AcademicSubject,
    tag: 'Quadratic Equation',
  },
  {
    q: 'What is Newton’s Second Law of Motion? Explain F = m·a with real examples.',
    grade: 'Class 9 (High School)' as ClassGrade,
    subject: 'Physics' as AcademicSubject,
    tag: 'Newton’s Law',
  },
  {
    q: 'Explain photosynthesis chemical equation and why chlorophyll is green.',
    grade: 'Class 8 (Middle)' as ClassGrade,
    subject: 'Biology' as AcademicSubject,
    tag: 'Photosynthesis',
  },
];

export const QuestionSolverView: React.FC<QuestionSolverViewProps> = ({
  onSolve,
  isLoading,
  solution,
  onClear,
}) => {
  const [questionText, setQuestionText] = useState(
    'Find all polynomials P(x) with real coefficients such that P(x²) = (P(x))² - 2P(x)'
  );
  const [selectedGrade, setSelectedGrade] = useState<ClassGrade>('College / University / Olympiad');
  const [selectedSubject, setSelectedSubject] = useState<AcademicSubject>('Mathematics');
  const [copiedAnswer, setCopiedAnswer] = useState(false);
  const [showPracticeSolution, setShowPracticeSolution] = useState(false);
  const [loadingStep, setLoadingStep] = useState(0);

  // Animated loading step ticker
  useEffect(() => {
    let timer: any = null;
    if (isLoading) {
      setLoadingStep(0);
      timer = setInterval(() => {
        setLoadingStep((prev) => (prev < 2 ? prev + 1 : prev));
      }, 700);
    } else {
      setLoadingStep(0);
    }
    return () => clearInterval(timer);
  }, [isLoading]);

  const loadingSteps = [
    'Analyzing functional equation & degree invariants...',
    'Solving boundary cases & polynomial transformations...',
    'Compiling phased proof and summary solution table...',
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!questionText.trim()) return;
    onSolve(questionText.trim(), selectedGrade, selectedSubject);
  };

  const handleApplySample = (sample: typeof SAMPLE_QUESTIONS[0]) => {
    setQuestionText(sample.q);
    setSelectedGrade(sample.grade);
    setSelectedSubject(sample.subject);
  };

  const copySolutionText = () => {
    if (!solution) return;
    let text = `Q. ${solution.question}\n\n`;
    text += `DIRECT ANSWER:\n${solution.directAnswer}\n\n`;
    if (solution.simpleIntuition) {
      text += `STRATEGIC INTUITION:\n${solution.simpleIntuition}\n\n`;
    }

    if (solution.phases && solution.phases.length > 0) {
      solution.phases.forEach((phase) => {
        text += `\n${phase.phaseTitle}\n`;
        text += `${phase.introText}\n`;
        if (phase.equations) {
          phase.equations.forEach((eq) => (text += `${eq}\n`));
        }
        if (phase.subStages) {
          phase.subStages.forEach((st) => {
            text += `\n${st.stageNumber}. ${st.title}\n`;
            text += `${st.derivationText}\n`;
            if (st.formulaHighlight) text += `${st.formulaHighlight}\n`;
          });
        }
        if (phase.bulletFindings) {
          text += `\n${phase.bulletFindings.join('\n')}\n`;
        }
      });
    }

    if (solution.solutionTable) {
      text += `\nFINAL SOLUTION SET:\n`;
      solution.solutionTable.rows.forEach((r) => {
        text += `${r.caseName}: ${r.foundSolutions}\n`;
      });
    }

    if (solution.finalConclusion) {
      text += `\n${solution.finalConclusion}\n`;
    }

    navigator.clipboard.writeText(text);
    setCopiedAnswer(true);
    setTimeout(() => setCopiedAnswer(false), 2500);
  };

  return (
    <div className="space-y-8">
      {/* Input Stage Card */}
      <div className="p-6 sm:p-8 bg-white rounded-3xl border border-slate-200 shadow-sm space-y-6">
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-indigo-600">
            <Zap className="w-4 h-4 text-amber-500 fill-amber-500" />
            <span>Phased Academic &amp; Olympiad Math Problem Solver</span>
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight">
            Solve any mathematical or academic problem with step-by-step rigor.
          </h2>
          <p className="text-slate-600 text-sm sm:text-base leading-relaxed max-w-3xl">
            Type any polynomial equation, calculus derivative, physics law, or problem. 
            Outputs rigorous Phase 1 / Phase 2 breakdowns, sub-stages, LaTeX equations, and comparison tables.
          </p>
        </div>

        {/* Input Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label htmlFor="grade-select-box" className="block text-xs font-bold text-slate-700 mb-1.5 flex items-center gap-1.5">
                <GraduationCap className="w-4 h-4 text-indigo-600" />
                Select Class / Level
              </label>
              <select
                id="grade-select-box"
                value={selectedGrade}
                onChange={(e) => setSelectedGrade(e.target.value as ClassGrade)}
                className="w-full px-3.5 py-2.5 bg-slate-50 rounded-xl border border-slate-300 text-sm font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500 cursor-pointer"
              >
                {CLASS_OPTIONS.map((c) => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            </div>

            <div>
              <label htmlFor="subject-select-box" className="block text-xs font-bold text-slate-700 mb-1.5 flex items-center gap-1.5">
                <Layers className="w-4 h-4 text-indigo-600" />
                Select Subject
              </label>
              <select
                id="subject-select-box"
                value={selectedSubject}
                onChange={(e) => setSelectedSubject(e.target.value as AcademicSubject)}
                className="w-full px-3.5 py-2.5 bg-slate-50 rounded-xl border border-slate-300 text-sm font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500 cursor-pointer"
              >
                {SUBJECT_OPTIONS.map((s) => (
                  <option key={s} value={s}>{s}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Question Text Area */}
          <div>
            <label htmlFor="question-input" className="block text-xs font-bold text-slate-700 mb-1.5 flex items-center justify-between">
              <span className="flex items-center gap-1.5">
                <HelpCircle className="w-4 h-4 text-indigo-600" />
                Your Question, Mathematical Equation, or Problem
              </span>
              <span className="text-[11px] text-slate-400 font-normal">Supports polynomial equations, LaTeX, formulas</span>
            </label>
            <textarea
              id="question-input"
              rows={3}
              required
              placeholder="e.g. Find all polynomials P(x) with real coefficients such that P(x²) = (P(x))² - 2P(x)..."
              value={questionText}
              onChange={(e) => setQuestionText(e.target.value)}
              className="w-full px-4 py-3 bg-white rounded-2xl border border-slate-300 text-sm sm:text-base text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 font-sans"
            />

            {/* Quick Sample Sparks */}
            <div className="mt-3 flex items-center flex-wrap gap-2">
              <span className="text-xs font-semibold text-slate-500">Quick Samples:</span>
              {SAMPLE_QUESTIONS.map((s, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => handleApplySample(s)}
                  className="text-xs px-2.5 py-1 rounded-lg bg-slate-100 hover:bg-indigo-50 hover:text-indigo-700 border border-slate-200 text-slate-700 transition-colors cursor-pointer text-left truncate max-w-[280px]"
                >
                  {s.tag || s.q}
                </button>
              ))}
            </div>
          </div>

          {/* Loading Progress State */}
          {isLoading && (
            <div className="p-3.5 bg-indigo-50/70 border border-indigo-200 rounded-2xl space-y-2 animate-in fade-in">
              <div className="flex items-center justify-between text-xs font-bold text-indigo-900">
                <span className="flex items-center gap-2">
                  <Loader2 className="w-4 h-4 animate-spin text-indigo-600" />
                  {loadingSteps[loadingStep]}
                </span>
                <span className="font-mono text-indigo-600">Fast Solver ⚡</span>
              </div>
              <div className="w-full h-1.5 bg-indigo-200 rounded-full overflow-hidden">
                <div
                  className="h-full bg-indigo-600 transition-all duration-300 rounded-full"
                  style={{ width: `${(loadingStep + 1) * 33}%` }}
                />
              </div>
            </div>
          )}

          {/* Submit Action */}
          <div className="flex items-center gap-3 pt-2">
            <button
              type="submit"
              disabled={isLoading || !questionText.trim()}
              className="flex-1 py-3 px-6 rounded-xl font-bold text-sm sm:text-base text-white bg-indigo-600 hover:bg-indigo-700 active:scale-[0.99] disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  <span>Solving Rigorously...</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-5 h-5" />
                  <span>Solve with Phased Mathematical Proof</span>
                  <ArrowRight className="w-5 h-5 ml-1" />
                </>
              )}
            </button>

            {questionText && (
              <button
                type="button"
                onClick={() => setQuestionText('')}
                className="px-4 py-3 text-xs font-semibold text-slate-500 hover:text-slate-800 rounded-xl border border-slate-200 hover:bg-slate-50 transition-colors cursor-pointer"
              >
                Clear
              </button>
            )}
          </div>
        </form>
      </div>

      {/* Solution Display Stage */}
      {solution && (
        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-3 duration-300">
          
          {/* Problem Statement & Direct Summary Banner */}
          <div className="p-6 sm:p-8 bg-white rounded-3xl border-2 border-indigo-200 shadow-sm space-y-5">
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 pb-4">
              <div className="flex items-center gap-2 text-xs font-semibold text-slate-500">
                <span className="bg-indigo-50 text-indigo-700 px-2.5 py-1 rounded-md font-bold">
                  {solution.classGrade}
                </span>
                <span>·</span>
                <span>{solution.subject}</span>
              </div>

              <button
                type="button"
                onClick={copySolutionText}
                className="px-3.5 py-1.5 text-xs font-bold rounded-lg border border-slate-200 bg-slate-50 hover:bg-slate-100 text-slate-700 transition-colors flex items-center gap-1.5 cursor-pointer"
              >
                {copiedAnswer ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedAnswer ? 'Copied Full Proof!' : 'Copy Formatted Solution'}</span>
              </button>
            </div>

            {/* Question Display */}
            <div className="space-y-1">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">
                Problem Statement
              </span>
              <h3 className="text-lg sm:text-xl font-bold text-slate-900 leading-snug">
                Q. <MathRenderer content={solution.question} />
              </h3>
            </div>

            {/* Key Intuition / Strategy */}
            {solution.simpleIntuition && (
              <div className="p-4 sm:p-5 rounded-2xl bg-amber-50/70 border border-amber-200 text-amber-950 space-y-1.5">
                <span className="text-xs font-bold uppercase tracking-wider text-amber-800 flex items-center gap-1.5">
                  <Lightbulb className="w-4 h-4 text-amber-600" />
                  Strategic Mathematical Insight
                </span>
                <p className="text-sm sm:text-base leading-relaxed text-amber-900">
                  <MathRenderer content={solution.simpleIntuition} />
                </p>
              </div>
            )}
          </div>

          {/* Phased Mathematical Derivation (Phase 1, Phase 2, etc.) */}
          {solution.phases && solution.phases.length > 0 && (
            <div className="space-y-5">
              {solution.phases.map((phase, pIdx) => (
                <div
                  key={pIdx}
                  className="p-6 sm:p-8 bg-white rounded-3xl border border-slate-200 shadow-sm space-y-5"
                >
                  <div className="border-b border-slate-100 pb-3">
                    <h3 className="text-lg sm:text-xl font-extrabold text-slate-900 flex items-center gap-2">
                      <span className="w-7 h-7 rounded-lg bg-indigo-600 text-white text-xs font-bold flex items-center justify-center shrink-0">
                        {pIdx + 1}
                      </span>
                      <MathRenderer content={phase.phaseTitle} />
                    </h3>
                  </div>

                  {/* Intro Text */}
                  {phase.introText && (
                    <p className="text-sm sm:text-base text-slate-700 leading-relaxed">
                      <MathRenderer content={phase.introText} />
                    </p>
                  )}

                  {/* Equations List */}
                  {phase.equations && phase.equations.length > 0 && (
                    <div className="p-4 sm:p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-2 text-center overflow-x-auto">
                      {phase.equations.map((eq, eIdx) => (
                        <div key={eIdx} className="py-1 text-base sm:text-lg font-mono text-slate-900">
                          <MathRenderer content={eq.startsWith('\\[') ? eq : `\\[${eq}\\]`} />
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Sub-Stages (e.g. 1. Finding Leading Coefficient, 2. Transforming, 3. Solving) */}
                  {phase.subStages && phase.subStages.length > 0 && (
                    <div className="space-y-4 pt-2">
                      {phase.subStages.map((st, sIdx) => (
                        <div
                          key={sIdx}
                          className="p-5 rounded-2xl bg-slate-50/80 border border-slate-200 space-y-2.5"
                        >
                          <h4 className="text-sm sm:text-base font-bold text-slate-900 flex items-center gap-2">
                            <span className="text-indigo-600 font-bold">{st.stageNumber}.</span>
                            <MathRenderer content={st.title} />
                          </h4>

                          <div className="text-xs sm:text-sm text-slate-700 leading-relaxed whitespace-pre-line pl-4 border-l-2 border-indigo-200">
                            <MathRenderer content={st.derivationText} />
                          </div>

                          {st.formulaHighlight && (
                            <div className="mt-3 p-3 rounded-xl bg-white border border-indigo-100 text-center font-mono text-sm sm:text-base text-indigo-900 shadow-xs">
                              <MathRenderer content={st.formulaHighlight.startsWith('\\[') ? st.formulaHighlight : `\\[${st.formulaHighlight}\\]`} />
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Bullet Findings */}
                  {phase.bulletFindings && phase.bulletFindings.length > 0 && (
                    <div className="pt-2 space-y-1.5">
                      <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block">
                        Phase Result:
                      </span>
                      <ul className="space-y-1.5 text-sm sm:text-base font-semibold text-emerald-800">
                        {phase.bulletFindings.map((finding, fIdx) => (
                          <li key={fIdx} className="p-2.5 rounded-xl bg-emerald-50/70 border border-emerald-200 flex items-center gap-2">
                            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                            <MathRenderer content={finding} />
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}

          {/* Final Solution Table (Case | Found Polynomials) */}
          {solution.solutionTable && solution.solutionTable.rows && solution.solutionTable.rows.length > 0 && (
            <div className="p-6 sm:p-8 bg-white rounded-3xl border border-slate-200 shadow-sm space-y-4">
              <div className="flex items-center gap-2 text-base sm:text-lg font-bold text-slate-900">
                <Table className="w-5 h-5 text-indigo-600" />
                <span>Final Solution Set Summary Table</span>
              </div>

              <div className="overflow-x-auto rounded-2xl border border-slate-200">
                <table className="w-full text-left text-xs sm:text-sm text-slate-700">
                  <thead className="bg-slate-100/80 text-slate-900 font-bold border-b border-slate-200 uppercase tracking-wider text-[11px]">
                    <tr>
                      {solution.solutionTable.headers.map((h, i) => (
                        <th key={i} className="px-5 py-3.5">
                          {h}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {solution.solutionTable.rows.map((row, rIdx) => (
                      <tr key={rIdx} className="hover:bg-slate-50/80 transition-colors">
                        <td className="px-5 py-3.5 font-bold text-slate-900">
                          <MathRenderer content={row.caseName} />
                        </td>
                        <td className="px-5 py-3.5 font-mono text-indigo-900 font-semibold">
                          <MathRenderer content={row.foundSolutions} />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Final Definitive Conclusion Callout */}
          {solution.finalConclusion && (
            <div className="p-6 sm:p-7 rounded-3xl bg-gradient-to-r from-indigo-900 to-slate-900 text-white shadow-md space-y-2">
              <span className="text-xs font-bold uppercase tracking-wider text-indigo-300 block">
                Conclusion Statement
              </span>
              <p className="text-base sm:text-lg font-semibold leading-relaxed text-indigo-50">
                <MathRenderer content={solution.finalConclusion} />
              </p>
            </div>
          )}

          {/* Key Rules & Pitfalls */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {solution.keyRulesOrConcepts && solution.keyRulesOrConcepts.length > 0 && (
              <div className="p-6 bg-white rounded-3xl border border-slate-200 shadow-sm space-y-3">
                <h4 className="font-bold text-slate-900 text-sm flex items-center gap-2">
                  <BookOpen className="w-4 h-4 text-indigo-600" />
                  Governing Theorems &amp; Invariants
                </h4>
                <ul className="space-y-2 text-xs sm:text-sm text-slate-700">
                  {solution.keyRulesOrConcepts.map((rule, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 mt-2 shrink-0" />
                      <MathRenderer content={rule} />
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {solution.commonMistakes && solution.commonMistakes.length > 0 && (
              <div className="p-6 bg-white rounded-3xl border border-slate-200 shadow-sm space-y-3">
                <h4 className="font-bold text-rose-900 text-sm flex items-center gap-2">
                  <AlertTriangle className="w-4 h-4 text-rose-600" />
                  Common Exam Mistakes to Avoid
                </h4>
                <ul className="space-y-2 text-xs sm:text-sm text-rose-900">
                  {solution.commonMistakes.map((mis, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-rose-500 mt-2 shrink-0" />
                      <MathRenderer content={mis} />
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {/* Practice Question */}
          {solution.practiceQuestion && (
            <div className="p-6 sm:p-8 bg-gradient-to-r from-indigo-50/70 to-slate-50 rounded-3xl border border-indigo-200 shadow-sm space-y-4">
              <span className="text-xs font-bold uppercase tracking-wider text-indigo-700 flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-indigo-600" />
                Analogous Olympiad Practice Question
              </span>

              <p className="text-sm sm:text-base font-bold text-slate-900">
                <MathRenderer content={solution.practiceQuestion.question} />
              </p>

              {solution.practiceQuestion.hint && (
                <p className="text-xs text-slate-600 italic">
                  💡 Hint: <MathRenderer content={solution.practiceQuestion.hint} />
                </p>
              )}

              <div className="pt-2">
                <button
                  type="button"
                  onClick={() => setShowPracticeSolution(!showPracticeSolution)}
                  className="px-4 py-2 text-xs font-bold rounded-xl bg-white border border-indigo-200 text-indigo-700 hover:bg-indigo-50 transition-colors flex items-center gap-1.5 cursor-pointer shadow-xs"
                >
                  {showPracticeSolution ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                  <span>{showPracticeSolution ? 'Hide Solution' : 'Reveal Practice Solution'}</span>
                </button>

                {showPracticeSolution && (
                  <div className="mt-3 p-4 rounded-2xl bg-white border border-emerald-200 text-slate-800 text-xs sm:text-sm leading-relaxed animate-in fade-in">
                    <strong className="text-emerald-800 block mb-1">Answer &amp; Proof:</strong>
                    <MathRenderer content={solution.practiceQuestion.solution} />
                  </div>
                )}
              </div>
            </div>
          )}

        </div>
      )}
    </div>
  );
};
