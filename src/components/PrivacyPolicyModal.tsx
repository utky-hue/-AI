import React from 'react';
import { X, ShieldCheck, Lock, HeartHandshake, EyeOff, BookOpen, CheckCircle } from 'lucide-react';

interface PrivacyPolicyModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const PrivacyPolicyModal: React.FC<PrivacyPolicyModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div 
        className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[85vh] flex flex-col border border-slate-200 overflow-hidden"
        role="dialog"
        aria-modal="true"
        aria-labelledby="privacy-modal-title"
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-slate-100 bg-slate-50/80">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-indigo-100 text-indigo-700 flex items-center justify-center">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h2 id="privacy-modal-title" className="text-lg font-bold text-slate-900">
                Privacy Policy & Student Data Protection
              </h2>
              <p className="text-xs text-slate-500">
                Family & Student Safety Commitment · Last Updated: October 2026
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-slate-700 rounded-lg hover:bg-slate-200/60 transition-colors"
            aria-label="Close dialog"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content body */}
        <div className="p-6 overflow-y-auto space-y-6 text-sm text-slate-700 leading-relaxed">
          {/* Summary Box */}
          <div className="p-4 rounded-xl bg-indigo-50/70 border border-indigo-100 space-y-2">
            <h3 className="font-semibold text-indigo-950 flex items-center gap-2">
              <Lock className="w-4 h-4 text-indigo-600" />
              Our Core Student Privacy Pledge
            </h3>
            <p className="text-xs text-indigo-900/90 leading-relaxed">
              ProjectCraft is designed specifically for students, parents, and teachers. We believe educational tools should support curiosity without tracking or monetizing young learners. We do not require accounts, we do not collect personal identities, and we do not sell data to advertisers.
            </p>
          </div>

          {/* Section 1 */}
          <div className="space-y-2">
            <h4 className="font-bold text-slate-900 flex items-center gap-2 text-base">
              <EyeOff className="w-4 h-4 text-slate-500" />
              1. Information We Do NOT Collect
            </h4>
            <p className="text-slate-600 text-xs sm:text-sm">
              We never ask for or store student Personally Identifiable Information (PII):
            </p>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1 text-xs text-slate-600">
              <li className="flex items-center gap-2">
                <CheckCircle className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                No student names or birthdays
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                No school names or student IDs
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                No mandatory email registrations
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                No location tracking or biometric data
              </li>
            </ul>
          </div>

          {/* Section 2 */}
          <div className="space-y-2">
            <h4 className="font-bold text-slate-900 flex items-center gap-2 text-base">
              <BookOpen className="w-4 h-4 text-slate-500" />
              2. COPPA & FERPA Regulatory Alignment
            </h4>
            <p className="text-slate-600 text-xs sm:text-sm">
              We uphold strict compliance with the <strong>Children&apos;s Online Privacy Protection Act (COPPA)</strong> and the <strong>Family Educational Rights and Privacy Act (FERPA)</strong>. 
              Project prompts (such as grade level and topic keywords) are processed ephemerally on secure servers solely to return the educational assignment blueprint and are not retained to train public models or create marketing profiles.
            </p>
          </div>

          {/* Section 3 */}
          <div className="space-y-2">
            <h4 className="font-bold text-slate-900 flex items-center gap-2 text-base">
              <HeartHandshake className="w-4 h-4 text-slate-500" />
              3. Local Device Storage
            </h4>
            <p className="text-slate-600 text-xs sm:text-sm">
              Any checkboxes you mark on your project timeline or materials list are stored directly inside your own web browser&apos;s <code>localStorage</code> on your current device. You can clear this data at any time by resetting your browser cookies or clicking the &ldquo;Reset Project&rdquo; button.
            </p>
          </div>

          {/* Section 4 */}
          <div className="space-y-2">
            <h4 className="font-bold text-slate-900 flex items-center gap-2 text-base">
              <CheckCircle className="w-4 h-4 text-indigo-600" />
              4. Academic Honesty & Responsible AI
            </h4>
            <p className="text-slate-600 text-xs sm:text-sm">
              ProjectCraft acts as an educational scaffolding companion—similar to an outline planner, science fair judge handbook, or teacher rubric guide. It provides structure, experiment design ideas, time management milestones, and speech rehearsal flashcards. It does <em>not</em> write essays or falsify research data. We encourage all students to follow their school&apos;s academic honor code.
            </p>
          </div>

          {/* Contact */}
          <div className="pt-2 border-t border-slate-100 text-xs text-slate-500">
            Parents or educators with questions regarding student privacy may reach out to our team at{' '}
            <span className="font-medium text-slate-700 underline">privacy@projectcraft.school</span>.
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 bg-slate-50 border-t border-slate-100 flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2 text-xs font-semibold text-white bg-slate-900 rounded-lg hover:bg-slate-800 transition-colors"
          >
            I Understand & Accept
          </button>
        </div>
      </div>
    </div>
  );
};
