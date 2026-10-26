import React, { useState } from 'react';
import {
  ShoppingBag,
  CheckCircle2,
  Circle,
  DollarSign,
  Printer,
} from 'lucide-react';
import { MaterialItem } from '../types/project';

interface MaterialsChecklistProps {
  materials: MaterialItem[];
  onToggleMaterial: (itemIndex: number) => void;
}

export const MaterialsChecklist: React.FC<MaterialsChecklistProps> = ({
  materials,
  onToggleMaterial,
}) => {
  const [filterCategory, setFilterCategory] = useState<string>('All');

  const categories = ['All', 'Household', 'Craft / Hardware', 'Digital / Printable', 'Reference'];

  // Map original indices so toggling always affects the right element in the parent state
  const itemsWithOriginalIndex = materials.map((item, originalIndex) => ({
    ...item,
    originalIndex,
  }));

  const filtered = itemsWithOriginalIndex.filter((m) => {
    if (filterCategory === 'All') return true;
    return m.category === filterCategory;
  });

  const overallGathered = materials.filter((m) => m.checked).length;
  const overallTotal = materials.length;

  const filteredGathered = filtered.filter((m) => m.checked).length;
  const filteredTotal = filtered.length;

  return (
    <div className="space-y-6">
      {/* Top Banner with Dynamic Filter-Aware Counters */}
      <div className="p-5 sm:p-6 bg-white rounded-3xl border border-slate-200 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
            <ShoppingBag className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-bold text-slate-900 text-base sm:text-lg">
              Materials Checklist &amp; Household Substitutes
            </h3>
            <p className="text-xs text-slate-500">
              Gather items from around the home or school lab before spending money
            </p>
          </div>
        </div>

        {/* Dynamic Counter Badges */}
        <div className="flex items-center gap-3">
          <div className="text-xs font-semibold text-slate-700 bg-slate-50 px-3.5 py-2 rounded-xl border border-slate-200 flex flex-col sm:items-end">
            <div className="flex items-center gap-1.5">
              <span>{filterCategory === 'All' ? 'Total Gathered:' : `${filterCategory}:`}</span>
              <span className="text-emerald-700 font-mono font-bold tabular-nums text-sm">
                {filteredGathered} / {filteredTotal}
              </span>
            </div>
            {filterCategory !== 'All' && (
              <span className="text-[10px] text-slate-400 font-normal">
                Overall: {overallGathered} / {overallTotal} gathered
              </span>
            )}
          </div>

          <button
            type="button"
            onClick={() => window.print()}
            className="p-2.5 text-slate-500 hover:text-slate-800 rounded-xl hover:bg-slate-100 border border-slate-200 transition-colors cursor-pointer"
            title="Print Shopping & Household List"
          >
            <Printer className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Category Filter Tabs */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-1">
        {categories.map((cat) => {
          const countInCat = cat === 'All' 
            ? materials.length 
            : materials.filter((m) => m.category === cat).length;

          return (
            <button
              key={cat}
              type="button"
              onClick={() => setFilterCategory(cat)}
              className={`px-3.5 py-2 text-xs font-bold rounded-xl transition-colors whitespace-nowrap cursor-pointer flex items-center gap-1.5 ${
                filterCategory === cat
                  ? 'bg-slate-900 text-white shadow-xs'
                  : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
              }`}
            >
              <span>{cat}</span>
              <span
                className={`text-[10px] px-1.5 py-0.2 rounded-full font-mono ${
                  filterCategory === cat ? 'bg-slate-800 text-slate-300' : 'bg-slate-100 text-slate-500'
                }`}
              >
                {countInCat}
              </span>
            </button>
          );
        })}
      </div>

      {/* Materials List */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
        {filtered.map((mat) => (
          <div
            key={mat.item + mat.originalIndex}
            onClick={() => onToggleMaterial(mat.originalIndex)}
            className={`p-4 rounded-2xl border transition-all cursor-pointer flex items-start gap-3.5 select-none ${
              mat.checked
                ? 'bg-emerald-50/50 border-emerald-300 opacity-90'
                : 'bg-white border-slate-200 hover:border-indigo-300 hover:shadow-xs'
            }`}
          >
            <button
              type="button"
              className="mt-0.5 text-emerald-600 shrink-0 focus:outline-none"
              aria-label={mat.checked ? 'Mark ungathered' : 'Mark gathered'}
            >
              {mat.checked ? (
                <CheckCircle2 className="w-5 h-5 text-emerald-600 fill-emerald-100" />
              ) : (
                <Circle className="w-5 h-5 text-slate-300 hover:text-emerald-500" />
              )}
            </button>

            <div className="space-y-1.5 flex-1">
              <div className="flex items-center justify-between gap-2">
                <h4
                  className={`text-sm font-bold text-slate-900 ${
                    mat.checked ? 'line-through text-slate-500' : ''
                  }`}
                >
                  {mat.item}
                </h4>
                <div className="flex items-center gap-1.5 shrink-0 text-[11px]">
                  <span className="text-slate-500 bg-slate-100 px-2 py-0.5 rounded font-medium">
                    {mat.category}
                  </span>
                  {mat.isEssential ? (
                    <span className="font-bold text-rose-600">· Essential</span>
                  ) : (
                    <span className="text-slate-400">· Optional</span>
                  )}
                </div>
              </div>

              {/* Free Alternative Tip */}
              {mat.freeAlternative && (
                <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-100 text-xs text-slate-600 flex items-start gap-1.5">
                  <DollarSign className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold text-slate-800">Free Household Substitute: </span>
                    <span>{mat.freeAlternative}</span>
                  </div>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
