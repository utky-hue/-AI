import React, { useState } from 'react';
import { LayoutGrid, Printer, Scissors, HelpCircle, FileText, Smartphone, Monitor } from 'lucide-react';
import { TrifoldPoster } from '../types/project';

interface TrifoldBoardViewerProps {
  trifold: TrifoldPoster;
  projectTitle: string;
}

type MobileTab = 'all' | 'left' | 'center' | 'right';

export const TrifoldBoardViewer: React.FC<TrifoldBoardViewerProps> = ({
  trifold,
  projectTitle,
}) => {
  const [selectedSection, setSelectedSection] = useState<{
    panel: string;
    heading: string;
    content: string;
    visualType: string;
  } | null>(null);

  const [showDimensionsGuide, setShowDimensionsGuide] = useState(false);
  const [mobileTab, setMobileTab] = useState<MobileTab>('center');

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="space-y-6">
      {/* Trifold Controls Bar */}
      <div className="p-4 bg-white rounded-2xl border border-slate-200 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center shrink-0">
            <LayoutGrid className="w-4 h-4" />
          </div>
          <div>
            <h3 className="font-bold text-slate-900 text-sm sm:text-base">
              Science Fair Trifold Display Board (36&quot; × 48&quot;)
            </h3>
            <p className="text-xs text-slate-500">
              Interactive layout for standard 3-panel cardboard &amp; foam presentation boards
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setShowDimensionsGuide(!showDimensionsGuide)}
            className="px-3 py-1.5 text-xs font-semibold rounded-lg border border-slate-200 bg-white text-slate-700 hover:bg-slate-50 transition-colors flex items-center gap-1.5 cursor-pointer"
          >
            <Scissors className="w-3.5 h-3.5 text-amber-600" />
            <span>{showDimensionsGuide ? 'Hide Cut Guide' : 'Cut & Sizing Guide'}</span>
          </button>

          <button
            type="button"
            onClick={handlePrint}
            className="px-3 py-1.5 text-xs font-semibold rounded-lg bg-indigo-600 text-white hover:bg-indigo-700 transition-colors flex items-center gap-1.5 cursor-pointer"
          >
            <Printer className="w-3.5 h-3.5" />
            <span>Print Layout</span>
          </button>
        </div>
      </div>

      {/* Sizing & Mounting Tip Banner */}
      {showDimensionsGuide && (
        <div className="p-4 rounded-xl bg-amber-50 border border-amber-200 text-xs text-amber-900 space-y-2 animate-in fade-in">
          <div className="font-bold text-amber-950 flex items-center gap-2">
            <HelpCircle className="w-4 h-4 text-amber-600" />
            Standard Science Fair Trifold Sizing &amp; Readability Standard
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1">
            <div className="p-2.5 bg-white rounded-lg border border-amber-200/60">
              <span className="font-bold text-slate-800 block mb-0.5">Left Panel (12&quot; × 36&quot;)</span>
              <span>Research question, hypothesis, background literature, and variable list.</span>
            </div>
            <div className="p-2.5 bg-white rounded-lg border border-amber-200/60">
              <span className="font-bold text-slate-800 block mb-0.5">Center Panel (24&quot; × 36&quot;)</span>
              <span>Huge main title (72pt+ font), primary photos/apparatus, and large high-contrast graphs.</span>
            </div>
            <div className="p-2.5 bg-white rounded-lg border border-amber-200/60">
              <span className="font-bold text-slate-800 block mb-0.5">Right Panel (12&quot; × 36&quot;)</span>
              <span>Results synthesis, real-world community impact, sources &amp; acknowledgments.</span>
            </div>
          </div>
        </div>
      )}

      {/* Mobile-Friendly Panel Switcher (Visible on mobile/tablet screens < md) */}
      <div className="md:hidden flex flex-col gap-2">
        <div className="flex items-center justify-between text-xs text-slate-500 font-semibold px-1">
          <span className="flex items-center gap-1.5">
            <Smartphone className="w-3.5 h-3.5 text-indigo-600" />
            Mobile Board View
          </span>
          <span>Tap a panel to expand full-width</span>
        </div>
        <div className="grid grid-cols-4 gap-1 p-1 bg-slate-200/70 rounded-xl">
          <button
            type="button"
            onClick={() => setMobileTab('left')}
            className={`py-2 px-1 text-xs font-bold rounded-lg transition-all text-center cursor-pointer ${
              mobileTab === 'left'
                ? 'bg-white text-indigo-700 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Left (12&quot;)
          </button>
          <button
            type="button"
            onClick={() => setMobileTab('center')}
            className={`py-2 px-1 text-xs font-bold rounded-lg transition-all text-center cursor-pointer ${
              mobileTab === 'center'
                ? 'bg-white text-indigo-700 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Center (24&quot;)
          </button>
          <button
            type="button"
            onClick={() => setMobileTab('right')}
            className={`py-2 px-1 text-xs font-bold rounded-lg transition-all text-center cursor-pointer ${
              mobileTab === 'right'
                ? 'bg-white text-indigo-700 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Right (12&quot;)
          </button>
          <button
            type="button"
            onClick={() => setMobileTab('all')}
            className={`py-2 px-1 text-xs font-bold rounded-lg transition-all text-center cursor-pointer ${
              mobileTab === 'all'
                ? 'bg-white text-indigo-700 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            All Panels
          </button>
        </div>
      </div>

      {/* Main Board Display Container */}
      <div className="p-3 sm:p-6 bg-slate-100 rounded-3xl border border-slate-300 shadow-inner">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
          
          {/* Left Wing (3 cols on desktop, responsive tab visibility on mobile) */}
          <div
            className={`bg-white rounded-2xl p-4 sm:p-5 border border-slate-300/80 shadow-xs space-y-3.5 flex flex-col justify-between ${
              mobileTab === 'left' || mobileTab === 'all' ? 'block' : 'hidden md:flex'
            } md:col-span-3`}
          >
            <div className="space-y-3">
              <div className="border-b border-slate-200 pb-2">
                <span className="text-[11px] font-bold uppercase tracking-wider text-indigo-600">Left Panel (12&quot;)</span>
                <h4 className="text-xs sm:text-sm font-bold text-slate-800">{trifold.leftPanel.title}</h4>
              </div>

              {trifold.leftPanel.sections.map((sec, idx) => (
                <div
                  key={idx}
                  onClick={() => setSelectedSection({ panel: 'Left Panel', ...sec })}
                  className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 hover:border-indigo-400 hover:bg-indigo-50/20 transition-all cursor-pointer group"
                >
                  <div className="flex items-center justify-between mb-1 gap-2">
                    <span className="text-xs sm:text-sm font-bold text-slate-900 group-hover:text-indigo-600">
                      {sec.heading}
                    </span>
                    <span className="text-[10px] text-slate-500 font-mono bg-white px-1.5 py-0.5 rounded border border-slate-200 shrink-0">
                      {sec.visualType}
                    </span>
                  </div>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    {sec.content}
                  </p>
                </div>
              ))}
            </div>
            <div className="text-[10px] text-slate-400 text-center font-mono pt-2 border-t border-slate-100">
              Left Wing · Folds Inward (12&quot; Wide)
            </div>
          </div>

          {/* Center Main Stage (6 cols on desktop, responsive tab visibility on mobile) */}
          <div
            className={`bg-white rounded-2xl p-4 sm:p-6 border-2 border-indigo-200 shadow-sm space-y-4 flex flex-col justify-between ${
              mobileTab === 'center' || mobileTab === 'all' ? 'block' : 'hidden md:flex'
            } md:col-span-6`}
          >
            <div className="space-y-4">
              {/* Massive Center Title Banner */}
              <div className="text-center p-4 sm:p-5 bg-indigo-50/70 rounded-xl border border-indigo-100 space-y-1">
                <span className="text-[10px] font-bold text-indigo-600 uppercase tracking-widest">
                  Main Center Display Banner (3-4 Inch Big Lettering)
                </span>
                <h2 className="text-lg sm:text-2xl font-black text-slate-900 tracking-tight leading-tight uppercase">
                  {trifold.centerPanel.headline || projectTitle}
                </h2>
              </div>

              {/* Center Sections Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {trifold.centerPanel.sections.map((sec, idx) => (
                  <div
                    key={idx}
                    onClick={() => setSelectedSection({ panel: 'Center Panel', ...sec })}
                    className={`p-4 rounded-xl border transition-all cursor-pointer group ${
                      idx === 0
                        ? 'sm:col-span-2 bg-gradient-to-r from-indigo-50/40 to-slate-50 border-indigo-200 hover:border-indigo-400'
                        : 'bg-slate-50 border-slate-200 hover:border-indigo-400 hover:bg-indigo-50/20'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1 gap-2">
                      <span className="text-xs sm:text-sm font-bold text-slate-900 group-hover:text-indigo-600">
                        {sec.heading}
                      </span>
                      <span className="text-[10px] text-indigo-600 font-semibold bg-white px-1.5 py-0.5 rounded border border-indigo-100 shrink-0">
                        {sec.visualType}
                      </span>
                    </div>
                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed whitespace-pre-line">
                      {sec.content}
                    </p>
                  </div>
                ))}
              </div>
            </div>
            <div className="text-[10px] text-slate-400 text-center font-mono pt-2 border-t border-slate-100">
              Center Main Stage (24&quot; Wide)
            </div>
          </div>

          {/* Right Wing (3 cols on desktop, responsive tab visibility on mobile) */}
          <div
            className={`bg-white rounded-2xl p-4 sm:p-5 border border-slate-300/80 shadow-xs space-y-3.5 flex flex-col justify-between ${
              mobileTab === 'right' || mobileTab === 'all' ? 'block' : 'hidden md:flex'
            } md:col-span-3`}
          >
            <div className="space-y-3">
              <div className="border-b border-slate-200 pb-2">
                <span className="text-[11px] font-bold uppercase tracking-wider text-indigo-600">Right Panel (12&quot;)</span>
                <h4 className="text-xs sm:text-sm font-bold text-slate-800">{trifold.rightPanel.title}</h4>
              </div>

              {trifold.rightPanel.sections.map((sec, idx) => (
                <div
                  key={idx}
                  onClick={() => setSelectedSection({ panel: 'Right Panel', ...sec })}
                  className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 hover:border-indigo-400 hover:bg-indigo-50/20 transition-all cursor-pointer group"
                >
                  <div className="flex items-center justify-between mb-1 gap-2">
                    <span className="text-xs sm:text-sm font-bold text-slate-900 group-hover:text-indigo-600">
                      {sec.heading}
                    </span>
                    <span className="text-[10px] text-slate-500 font-mono bg-white px-1.5 py-0.5 rounded border border-slate-200 shrink-0">
                      {sec.visualType}
                    </span>
                  </div>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    {sec.content}
                  </p>
                </div>
              ))}
            </div>
            <div className="text-[10px] text-slate-400 text-center font-mono pt-2 border-t border-slate-100">
              Right Wing · Folds Inward (12&quot; Wide)
            </div>
          </div>

        </div>
      </div>

      {/* Selected Section Inspection Card */}
      {selectedSection && (
        <div className="p-5 rounded-2xl bg-white border border-indigo-200 shadow-sm space-y-2 animate-in fade-in">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-indigo-600">{selectedSection.panel}</span>
              <span aria-hidden="true" className="text-slate-300">·</span>
              <h4 className="text-sm font-bold text-slate-900">{selectedSection.heading}</h4>
            </div>
            <button
              onClick={() => setSelectedSection(null)}
              className="text-xs text-slate-400 hover:text-slate-700 cursor-pointer"
            >
              Close
            </button>
          </div>
          <p className="text-sm text-slate-700 whitespace-pre-line leading-relaxed">
            {selectedSection.content}
          </p>
          <div className="pt-2 flex items-center justify-between text-xs text-slate-500 border-t border-slate-100">
            <span>Visual Format: <strong className="text-slate-700">{selectedSection.visualType}</strong></span>
            <button
              type="button"
              onClick={() => {
                navigator.clipboard.writeText(`${selectedSection.heading}\n\n${selectedSection.content}`);
              }}
              className="text-indigo-600 hover:underline flex items-center gap-1 font-medium cursor-pointer"
            >
              <FileText className="w-3.5 h-3.5" />
              Copy Text for Printing
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
