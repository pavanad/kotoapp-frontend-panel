import React from 'react';
import { Moon, Sun } from 'lucide-react';

interface HeaderProps {
  isDark: boolean;
  toggleTheme: () => void;
}

export const Header: React.FC<HeaderProps> = ({ isDark, toggleTheme }) => {
  return (
    <header className="sticky top-0 z-50 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 shadow-sm transition-colors duration-300">
      <div className="max-w-3xl mx-auto px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          {/* Logo representation */}
          <div className="flex items-center text-2xl font-black tracking-tighter select-none">
            <span className="text-[#0056b3] dark:text-[#3b82f6]">KOTO</span>
            <span className="text-[#d32f2f] dark:text-[#ef4444]">APP</span>
          </div>
        </div>
        
        <div className="flex items-center gap-3">
          <div className="hidden sm:block text-xs font-medium text-slate-500 dark:text-slate-400 bg-slate-100 dark:bg-slate-800 px-2 py-1 rounded-full">
            Sensei
          </div>
          
          <button 
            onClick={toggleTheme}
            className="p-2 rounded-full text-slate-500 hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-800 transition-colors"
            aria-label="Alternar tema"
          >
            {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
          </button>
        </div>
      </div>
    </header>
  );
};