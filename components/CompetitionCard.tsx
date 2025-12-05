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
      <h2 className="text-xs font-bold text-slate-500 uppercase tracking-wide mb-3">
        Competições Ativas
      </h2>
      <button 
        onClick={onClick}
        className="w-full bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden text-left hover:shadow-md transition-all active:scale-[0.98] group"
      >
        <div className="p-5">
          <div className="flex items-start justify-between mb-3">
            <div className="bg-emerald-100 text-emerald-700 text-[10px] font-bold px-2 py-1 rounded-full uppercase tracking-wider">
              Em Andamento
            </div>
            <Trophy className="w-5 h-5 text-slate-300 group-hover:text-[#0056b3] transition-colors" />
          </div>
          
          <h3 className="text-lg font-bold text-slate-900 mb-4 leading-tight">
            {data.nome}
          </h3>

          <div className="space-y-2.5">
            <div className="flex items-center text-slate-600 text-sm">
              <Calendar className="w-4 h-4 mr-2.5 text-slate-400" />
              <span>{data.data}, {data.ginasio}</span>
            </div>
            
            <div className="flex items-center text-slate-600 text-sm">
              <MapPin className="w-4 h-4 mr-2.5 text-slate-400" />
              <span>{data.local}</span>
            </div>

            <div className="flex items-center text-slate-600 text-sm">
              <Users className="w-4 h-4 mr-2.5 text-slate-400" />
              <span className="font-medium text-slate-900">{data.numero_atletas} Atletas A2K</span>
            </div>
          </div>
        </div>
        
        <div className="bg-[#0056b3] p-3 flex items-center justify-center gap-2 text-white font-semibold text-sm">
          Entrar no Evento
          <ChevronRight className="w-4 h-4" />
        </div>
      </button>
    </div>
  );
};