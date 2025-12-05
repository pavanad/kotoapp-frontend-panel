import React from 'react';

export const Header: React.FC = () => {
  return (
    <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-slate-200 shadow-sm">
      <div className="max-w-3xl mx-auto px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          {/* Logo representation based on description: Puzzle piece style or just colored text */}
          <div className="flex items-center text-2xl font-black tracking-tighter select-none">
            <span className="text-[#0056b3]">KOTO</span>
            <span className="text-[#d32f2f]">APP</span>
          </div>
        </div>
        <div className="text-xs font-medium text-slate-500 bg-slate-100 px-2 py-1 rounded-full">
          Sensei
        </div>
      </div>
    </header>
  );
};