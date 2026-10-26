import React, { useState } from 'react';
import { Sparkles, ShieldCheck, Menu, X, HelpCircle, Compass, Mail } from 'lucide-react';

interface HeaderProps {
  onOpenPrivacy: () => void;
  activeMode: 'solver' | 'project';
  onSelectMode: (mode: 'solver' | 'project') => void;
  onNewAction: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  onOpenPrivacy,
  activeMode,
  onSelectMode,
  onNewAction,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleModeSwitch = (mode: 'solver' | 'project') => {
    onSelectMode(mode);
    setMobileMenuOpen(false);
  };

  const handlePrivacyClick = () => {
    onOpenPrivacy();
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-4 px-4 sm:px-6 py-3.5">
        {/* Brand wordmark */}
        <a
          href="#"
          onClick={(e) => {
            e.preventDefault();
            handleModeSwitch('solver');
          }}
          className="text-xl font-black tracking-tight text-slate-900 whitespace-nowrap shrink-0 flex items-center gap-2"
        >
          <span className="w-8 h-8 rounded-xl bg-indigo-600 text-white flex items-center justify-center font-black text-base shadow-xs">
            E
          </span>
          <span>EduGenius</span>
        </a>

        {/* Desktop Mode Navigation Links */}
        <nav className="hidden md:flex items-center gap-1.5 p-1 bg-slate-100 rounded-2xl border border-slate-200/80">
          <button
            onClick={() => handleModeSwitch('solver')}
            className={`px-4 py-1.5 text-xs sm:text-sm font-bold rounded-xl transition-all cursor-pointer flex items-center gap-2 ${
              activeMode === 'solver'
                ? 'bg-white text-indigo-700 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <HelpCircle className="w-4 h-4 text-indigo-600" />
            <span>Any Question Solver</span>
          </button>

          <button
            onClick={() => handleModeSwitch('project')}
            className={`px-4 py-1.5 text-xs sm:text-sm font-bold rounded-xl transition-all cursor-pointer flex items-center gap-2 ${
              activeMode === 'project'
                ? 'bg-white text-indigo-700 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Compass className="w-4 h-4 text-indigo-600" />
            <span>Project &amp; Model Designer</span>
          </button>
        </nav>

        {/* Right Tools */}
        <div className="flex items-center gap-3 shrink-0">
          <a
            href="mailto:utkarsh22012013@gmail.com"
            className="hidden lg:flex items-center gap-1.5 px-2.5 py-1 text-xs font-semibold text-slate-600 hover:text-indigo-600 rounded-lg hover:bg-slate-100 transition-colors cursor-pointer"
            title="Email utkarsh22012013@gmail.com"
          >
            <Mail className="w-3.5 h-3.5 text-indigo-600" />
            <span>utkarsh22012013@gmail.com</span>
          </a>

          <button
            onClick={handlePrivacyClick}
            className="hidden sm:flex items-center gap-1.5 text-xs font-semibold text-slate-600 hover:text-slate-900 transition-colors cursor-pointer"
          >
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span>Privacy Policy</span>
          </button>

          <button
            onClick={onNewAction}
            className="inline-flex items-center gap-1.5 px-3.5 sm:px-4 py-2 text-xs font-bold text-white bg-indigo-600 rounded-xl hover:bg-indigo-700 transition-colors shadow-xs whitespace-nowrap shrink-0 cursor-pointer"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>{activeMode === 'solver' ? '+ Ask Question' : '+ Design Project'}</span>
          </button>

          {/* Mobile Toggle */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-slate-600 hover:text-slate-900 rounded-lg hover:bg-slate-100 transition-colors cursor-pointer"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-slate-200 bg-white p-4 space-y-2 shadow-xl animate-in slide-in-from-top-2">
          <button
            onClick={() => handleModeSwitch('solver')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold text-left cursor-pointer ${
              activeMode === 'solver' ? 'bg-indigo-50 text-indigo-700' : 'text-slate-700 hover:bg-slate-50'
            }`}
          >
            <HelpCircle className="w-4 h-4 text-indigo-600" />
            <span>⚡ Any Question &amp; Homework Solver</span>
          </button>

          <button
            onClick={() => handleModeSwitch('project')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold text-left cursor-pointer ${
              activeMode === 'project' ? 'bg-indigo-50 text-indigo-700' : 'text-slate-700 hover:bg-slate-50'
            }`}
          >
            <Compass className="w-4 h-4 text-indigo-600" />
            <span>🚀 Complete Project &amp; Model Designer</span>
          </button>

          <div className="pt-2 border-t border-slate-100 space-y-1">
            <a
              href="mailto:utkarsh22012013@gmail.com"
              className="w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-xs font-semibold text-slate-600 hover:bg-slate-50 cursor-pointer"
            >
              <Mail className="w-4 h-4 text-indigo-600" />
              <span>Contact: utkarsh22012013@gmail.com</span>
            </a>

            <button
              onClick={handlePrivacyClick}
              className="w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-xs font-semibold text-slate-600 hover:bg-slate-50 cursor-pointer"
            >
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <span>Privacy Policy &amp; Student Protection</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
