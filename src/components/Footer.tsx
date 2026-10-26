import React from 'react';
import { ShieldCheck } from 'lucide-react';

interface FooterProps {
  onOpenPrivacy: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenPrivacy }) => {
  return (
    <footer className="mt-20 border-t border-slate-200 bg-white py-10 text-xs text-slate-500">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <span className="font-bold text-slate-900">ProjectCraft</span>
          <span>·</span>
          <span>Free Homework &amp; Science Fair Scaffolding for Students &amp; Families</span>
        </div>

        <div className="flex flex-wrap items-center gap-4 sm:gap-6">
          <a
            href="mailto:utkarsh22012013@gmail.com"
            className="hover:text-indigo-600 transition-colors flex items-center gap-1.5 underline cursor-pointer"
            title="Contact by email"
          >
            <span>Email: utkarsh22012013@gmail.com</span>
          </a>
          <span>·</span>
          <a
            href="#privacy"
            onClick={(e) => {
              e.preventDefault();
              onOpenPrivacy();
            }}
            className="hover:text-slate-900 transition-colors flex items-center gap-1.5 underline cursor-pointer"
          >
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
            <span>Privacy Policy &amp; Student Safety</span>
          </a>
          <span>·</span>
          <span className="text-slate-400">© 2026 ProjectCraft. All rights reserved.</span>
        </div>
      </div>
    </footer>
  );
};
