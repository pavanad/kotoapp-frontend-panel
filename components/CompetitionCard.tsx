import React from 'react';
import { Calendar, MapPin, Users, Trophy, ChevronRight } from 'lucide-react';
import { Campeonato } from '../types';

interface CompetitionCardProps {
  data: Campeonato;
  onClick: () => void;
}

export const CompetitionCard: React.FC<CompetitionCardProps> = ({ data, onClick }) => {
  return (
    <div className="px-4 py-2">
      <h2 className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wide mb-3">
        Competições Ativas
      </h2>
      <button 
        onClick={onClick}
        className="w-full bg-white dark:bg-slate-900 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-800 overflow-hidden text-left hover:shadow-md transition-all active:scale-[0.98] group"
      >
        <div className="p-5">
          <div className="flex items-start justify-between mb-3">
            <div className="bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400 text-[10px] font-bold px-2 py-1 rounded-full uppercase tracking-wider">
              Em Andamento
            </div>
            <Trophy className="w-5 h-5 text-slate-300 dark:text-slate-600 group-hover:text-[#0056b3] dark:group-hover:text-[#3b82f6] transition-colors" />
          </div>
          
          <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-4 leading-tight">
            {data.nome}
          </h3>

          <div className="space-y-2.5">
            <div className="flex items-center text-slate-600 dark:text-slate-300 text-sm">
              <Calendar className="w-4 h-4 mr-2.5 text-slate-400 dark:text-slate-500" />
              <span>{data.data}, {data.ginasio}</span>
            </div>
            
            <div className="flex items-center text-slate-600 dark:text-slate-300 text-sm">
              <MapPin className="w-4 h-4 mr-2.5 text-slate-400 dark:text-slate-500" />
              <span>{data.local}</span>
            </div>

            <div className="flex items-center text-slate-600 dark:text-slate-300 text-sm">
              <Users className="w-4 h-4 mr-2.5 text-slate-400 dark:text-slate-500" />
              <span className="font-medium text-slate-900 dark:text-white">{data.numero_atletas || '0'} Atletas A2K</span>
            </div>
          </div>
        </div>
        
        <div className="bg-[#0056b3] dark:bg-[#2563eb] p-3 flex items-center justify-center gap-2 text-white font-semibold text-sm">
          Entrar no Evento
          <ChevronRight className="w-4 h-4" />
        </div>
      </button>
    </div>
  );
};