import React, { useMemo } from 'react';
import { EnrichedAthlete } from '../types';
import { User, ChevronRight, Swords, ScrollText, Clock } from 'lucide-react';

interface AthleteListProps {
  athletes: EnrichedAthlete[];
  onSelect: (athlete: EnrichedAthlete) => void;
  onBack: () => void;
}

export const AthleteList: React.FC<AthleteListProps> = ({ athletes, onSelect, onBack }) => {
  
  // Agrupa atletas por nome
  const groupedAthletes = useMemo(() => {
    const groups: Record<string, EnrichedAthlete[]> = {};
    
    athletes.forEach(athlete => {
      if (!groups[athlete.nome]) {
        groups[athlete.nome] = [];
      }
      groups[athlete.nome].push(athlete);
    });

    return Object.entries(groups).sort((a, b) => a[0].localeCompare(b[0]));
  }, [athletes]);

  const getCategoryIcon = (type: string) => {
    if (type.toLowerCase().includes('kumite')) return <Swords className="w-4 h-4" />;
    return <ScrollText className="w-4 h-4" />;
  };

  return (
    <div className="px-4 pb-20 animate-in fade-in slide-in-from-bottom-4 duration-500">
        <button 
            onClick={onBack}
            className="text-sm text-slate-500 hover:text-slate-800 mb-4 flex items-center gap-1"
        >
            &larr; Voltar para competições
        </button>
      
      <h2 className="text-xl font-bold text-slate-900 mb-4">
        Atletas ({Object.keys(groupedAthletes).length})
      </h2>

      <div className="grid gap-4">
        {groupedAthletes.map(([name, events]) => (
          <div
            key={name}
            className="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden"
          >
            {/* Athlete Header */}
            <div className="p-4 bg-slate-50/50 border-b border-slate-100 flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-slate-200 text-slate-600 flex items-center justify-center">
                <User className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-bold text-slate-900">{name}</h3>
                <span className="text-xs font-medium text-slate-500 bg-slate-100 px-2 py-0.5 rounded-full">
                  {events.length} {events.length === 1 ? 'Categoria' : 'Categorias'}
                </span>
              </div>
            </div>

            {/* Events List */}
            <div className="divide-y divide-slate-100">
              {events.map((event, idx) => (
                <button
                  key={`${event.nome}-${event.parent_categoria}-${idx}`}
                  onClick={() => onSelect(event)}
                  className="w-full text-left p-4 hover:bg-slate-50 transition-colors flex items-center justify-between group"
                >
                  <div className="flex flex-col gap-1">
                    <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#0056b3]">
                      {getCategoryIcon(event.parent_tipo_categoria)}
                      <span>{event.parent_tipo_categoria}</span>
                      <span className="text-slate-300">•</span>
                      <span className="flex items-center text-slate-500 font-medium normal-case">
                        <Clock className="w-3 h-3 mr-1" />
                        {event.parent_horario_inicio}
                      </span>
                    </div>
                    <p className="text-sm font-medium text-slate-700 line-clamp-1">
                      {event.parent_categoria}
                    </p>
                  </div>
                  <ChevronRight className="w-4 h-4 text-slate-300 group-hover:text-[#0056b3] transition-colors" />
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};