import React, { useState } from 'react';
import {
  Users,
  BookMarked,
  Check,
  Copy,
  Heart,
  CheckCircle,
  XCircle,
  ExternalLink,
} from 'lucide-react';
import { StarterSource, ParentCoachingGuide } from '../types/project';

interface CitationsAndParentGuideProps {
  sources: StarterSource[];
  parentGuide: ParentCoachingGuide;
}

export const CitationsAndParentGuide: React.FC<CitationsAndParentGuideProps> = ({
  sources,
  parentGuide,
}) => {
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  const copyCitation = (citation: string, index: number) => {
    navigator.clipboard.writeText(citation);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  return (
    <div className="space-y-8">
      {/* Parent Coaching Section */}
      <div className="p-6 bg-white rounded-2xl border border-slate-200 shadow-xs space-y-6">
        <div className="flex items-center gap-3 border-b border-slate-100 pb-4">
          <div className="w-9 h-9 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center">
            <Users className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-bold text-slate-900 text-base sm:text-lg">
              Parent &amp; Guardian Coaching Playbook
            </h3>
            <p className="text-xs text-slate-500">
              How to provide supportive scaffolding without doing the student&apos;s homework for them
            </p>
          </div>
        </div>

        {/* Big Encouragement Banner */}
        {parentGuide.encouragementPrompt && (
          <div className="p-4 rounded-xl bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-200 text-amber-950 flex items-start gap-3">
            <Heart className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-amber-800 block mb-0.5">
                Praise &amp; Motivation Script (Say this to your child)
              </span>
              <p className="text-sm sm:text-base font-semibold italic">
                &ldquo;{parentGuide.encouragementPrompt}&rdquo;
              </p>
            </div>
          </div>
        )}

        {/* Dos and Don'ts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Supportive Actions */}
          <div className="p-4 rounded-xl bg-emerald-50/50 border border-emerald-200 space-y-3">
            <h4 className="font-bold text-emerald-950 text-xs uppercase tracking-wider flex items-center gap-1.5">
              <CheckCircle className="w-4 h-4 text-emerald-600" />
              How Parents Should Support
            </h4>
            <ul className="space-y-2 text-xs sm:text-sm text-emerald-900 leading-relaxed">
              {parentGuide.howToSupport.map((tip, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-2 shrink-0" />
                  <span>{tip}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* What to Avoid */}
          <div className="p-4 rounded-xl bg-rose-50/50 border border-rose-200 space-y-3">
            <h4 className="font-bold text-rose-950 text-xs uppercase tracking-wider flex items-center gap-1.5">
              <XCircle className="w-4 h-4 text-rose-600" />
              What to Avoid (Protecting Student Ownership)
            </h4>
            <ul className="space-y-2 text-xs sm:text-sm text-rose-900 leading-relaxed">
              {parentGuide.whatToAvoid.map((tip, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-rose-500 mt-2 shrink-0" />
                  <span>{tip}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Bibliography & Citations Starter */}
      <div className="p-6 bg-white rounded-2xl border border-slate-200 shadow-xs space-y-4">
        <div className="flex items-center justify-between border-b border-slate-100 pb-4">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-indigo-50 text-indigo-700 flex items-center justify-center">
              <BookMarked className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-slate-900 text-base sm:text-lg">
                Verified Research Bibliography &amp; Citations
              </h3>
              <p className="text-xs text-slate-500">
                Formatted MLA citations to jumpstart the student&apos;s reference list
              </p>
            </div>
          </div>
        </div>

        <div className="space-y-3">
          {sources.map((src, idx) => (
            <div
              key={idx}
              className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2"
            >
              <div className="flex flex-wrap items-center justify-between gap-2">
                <span className="text-xs font-bold text-indigo-700">{src.authorOrOrg}</span>
                <span className="text-[11px] font-medium text-slate-500 bg-white px-2 py-0.5 rounded border border-slate-200">
                  {src.type}
                </span>
              </div>

              {/* Citation Line */}
              <div className="p-2.5 rounded-lg bg-white border border-slate-200 font-mono text-xs text-slate-800 break-all select-all flex items-center justify-between gap-2">
                <span>{src.mlaCitation}</span>
                <button
                  type="button"
                  onClick={() => copyCitation(src.mlaCitation, idx)}
                  className="p-1 text-slate-500 hover:text-indigo-600 transition-colors shrink-0"
                  title="Copy citation"
                >
                  {copiedIndex === idx ? (
                    <Check className="w-4 h-4 text-emerald-600" />
                  ) : (
                    <Copy className="w-4 h-4" />
                  )}
                </button>
              </div>

              <p className="text-xs text-slate-600 italic">
                Annotation: {src.annotation}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
