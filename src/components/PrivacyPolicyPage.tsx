import React, { useEffect } from 'react';
import { ShieldCheck, Lock, EyeOff, BookOpen, HeartHandshake, CheckCircle, ArrowLeft, Mail, Calendar, School } from 'lucide-react';

interface PrivacyPolicyPageProps {
  onBackToApp: () => void;
}

export const PrivacyPolicyPage: React.FC<PrivacyPolicyPageProps> = ({ onBackToApp }) => {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    document.title = 'Privacy Policy & Student Data Protection - ProjectCraft';
  }, []);

  return (
    <article className="min-h-screen bg-slate-50 text-slate-800 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto space-y-8">
        
        {/* Navigation Breadcrumb & Back */}
        <div className="flex items-center justify-between gap-4">
          <button
            type="button"
            onClick={onBackToApp}
            className="inline-flex items-center gap-2 px-3.5 py-2 text-xs sm:text-sm font-semibold text-slate-700 bg-white border border-slate-300 rounded-xl hover:bg-slate-100 hover:text-slate-900 transition-colors shadow-xs cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Project Solver</span>
          </button>

          <div className="flex items-center gap-1.5 text-xs text-slate-500 font-medium">
            <Calendar className="w-3.5 h-3.5" />
            <span>Effective: October 2026</span>
          </div>
        </div>

        {/* Header Hero */}
        <header className="p-8 sm:p-10 bg-white rounded-3xl border border-slate-200 shadow-sm space-y-4">
          <div className="w-12 h-12 rounded-2xl bg-indigo-50 border border-indigo-100 text-indigo-600 flex items-center justify-center">
            <ShieldCheck className="w-7 h-7" />
          </div>
          <div className="space-y-2">
            <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              Privacy Policy &amp; Student Data Protection
            </h1>
            <p className="text-slate-600 text-base sm:text-lg leading-relaxed">
              Our comprehensive pledge for students, parents, and educators under COPPA, FERPA, and Google AdSense / Publisher guidelines.
            </p>
          </div>
        </header>

        {/* Content Sections */}
        <div className="p-8 sm:p-10 bg-white rounded-3xl border border-slate-200 shadow-sm space-y-8 text-sm sm:text-base leading-relaxed text-slate-700">
          
          {/* Executive Summary */}
          <section className="space-y-3">
            <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
              <Lock className="w-5 h-5 text-indigo-600" />
              1. Executive Overview &amp; Child Privacy Commitment
            </h2>
            <p>
              ProjectCraft (accessible via this web application) provides an interactive assignment planning and scaffolding utility for K-12 students, parents, and educators. We believe children and students should learn, research, and brainstorm safely without being tracked, profiled, or targeted by invasive behavioral advertising.
            </p>
            <p className="p-4 rounded-2xl bg-indigo-50/70 border border-indigo-100 text-xs sm:text-sm text-indigo-950 font-medium">
              <strong>Core Promise:</strong> We do not require accounts, we do not collect student names, school email addresses, or phone numbers, and we never sell user data.
            </p>
          </section>

          {/* COPPA & FERPA */}
          <section className="space-y-3 border-t border-slate-100 pt-6">
            <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
              <School className="w-5 h-5 text-indigo-600" />
              2. COPPA &amp; FERPA Compliance
            </h2>
            <p>
              We comply with the <strong>Children&apos;s Online Privacy Protection Act (COPPA)</strong> and the <strong>Family Educational Rights and Privacy Act (FERPA)</strong>:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-slate-600 text-sm">
              <li>
                <strong>No Under-13 Data Harvesting:</strong> We do not knowingly solicit or collect personally identifiable information from children under the age of 13.
              </li>
              <li>
                <strong>No Student Educational Records Retention:</strong> School assignments and curriculum prompts typed into our solver are processed ephemerally on secure servers to generate outlines and are not logged or tied to student profiles.
              </li>
              <li>
                <strong>Parental &amp; Guardian Rights:</strong> Parents and legal guardians have the right to inspect, delete, and control how any curriculum or homework data is utilized on this platform.
              </li>
            </ul>
          </section>

          {/* Information Collection */}
          <section className="space-y-3 border-t border-slate-100 pt-6">
            <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
              <EyeOff className="w-5 h-5 text-indigo-600" />
              3. Information We Collect and Process
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-1">
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
                <h3 className="font-bold text-slate-900 text-sm">What You Provide</h3>
                <p className="text-xs text-slate-600">
                  Topic keywords, grade levels (e.g. &ldquo;8th Grade&rdquo;), and optional assignment constraints. These inputs are non-personal educational queries.
                </p>
              </div>
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
                <h3 className="font-bold text-slate-900 text-sm">What We Store on Your Device</h3>
                <p className="text-xs text-slate-600">
                  Checkboxes for completed tasks and gathered materials are stored in your browser&apos;s local <code>localStorage</code> only. They never leave your device.
                </p>
              </div>
            </div>
          </section>

          {/* Cookies & Google AdSense Disclosures */}
          <section className="space-y-3 border-t border-slate-100 pt-6">
            <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-indigo-600" />
              4. Cookies, Analytics &amp; Third-Party Advertising (Google AdSense)
            </h2>
            <p>
              In compliance with standard publisher guidelines, Google AdSense, and the GDPR/CCPA regulations:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-slate-600 text-sm">
              <li>
                Third-party vendors, including Google, use cookies to serve ads based on a user&apos;s prior visits to this website or other websites.
              </li>
              <li>
                Google&apos;s use of advertising cookies enables it and its partners to serve ads to users based on their visit to your sites and/or other sites on the Internet.
              </li>
              <li>
                Users may opt out of personalized advertising by visiting <a href="https://www.google.com/settings/ads" target="_blank" rel="noreferrer" className="text-indigo-600 underline font-medium">Google Ads Settings</a>. Alternatively, users can opt out of a third-party vendor&apos;s use of cookies for personalized advertising by visiting <a href="https://www.aboutads.info" target="_blank" rel="noreferrer" className="text-indigo-600 underline font-medium">www.aboutads.info</a>.
              </li>
              <li>
                We strictly enforce non-personalized, family-safe advertising categories appropriate for student learning environments.
              </li>
            </ul>
          </section>

          {/* Academic Integrity */}
          <section className="space-y-3 border-t border-slate-100 pt-6">
            <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
              <HeartHandshake className="w-5 h-5 text-indigo-600" />
              5. Academic Integrity &amp; Responsible Homework Assistance
            </h2>
            <p>
              ProjectCraft operates strictly as an educational coaching framework. It provides:
            </p>
            <ul className="list-disc pl-6 space-y-1 text-slate-600 text-sm">
              <li>Organizational milestones and time management estimates.</li>
              <li>Slide deck structural outlines and presentation speaking scripts.</li>
              <li>Science fair trifold board layouts and experiment design guidance.</li>
              <li>Oral defense practice flashcards.</li>
            </ul>
            <p className="pt-2 text-sm text-slate-600">
              Students must conduct their own investigations, write their own assignments, and cite their research in accordance with their school&apos;s academic honor codes.
            </p>
          </section>

          {/* Contact */}
          <section className="space-y-3 border-t border-slate-100 pt-6">
            <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
              <Mail className="w-5 h-5 text-indigo-600" />
              6. Contacting Our Data Privacy Team
            </h2>
            <p className="text-sm text-slate-600">
              If you have any questions, concerns, or requests regarding this Privacy Policy or your child&apos;s data, please contact us at:
            </p>
            <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 text-sm text-slate-700">
              <p><strong>ProjectCraft Education Support &amp; Administration</strong></p>
              <p>Email: <a href="mailto:utkarsh22012013@gmail.com" className="text-indigo-600 font-semibold underline">utkarsh22012013@gmail.com</a></p>
              <p className="text-xs text-slate-500 mt-1">Inquiries regarding curriculum, student privacy (COPPA/FERPA), or project blueprints are answered promptly within 24–48 hours.</p>
            </div>
          </section>

        </div>

        {/* Bottom Back Button */}
        <div className="text-center pt-4">
          <button
            type="button"
            onClick={onBackToApp}
            className="inline-flex items-center gap-2 px-6 py-3 font-bold text-sm text-white bg-indigo-600 rounded-xl hover:bg-indigo-700 transition-colors shadow-sm cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Return to Project Workspace</span>
          </button>
        </div>

      </div>
    </article>
  );
};
