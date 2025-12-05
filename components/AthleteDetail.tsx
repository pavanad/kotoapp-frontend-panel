import React from 'react';
import { EnrichedAthlete } from '../types';
import { ArrowLeft, Clock, Sword, FileText, Layers, Tag, Bookmark } from 'lucide-react';

interface AthleteDetailProps {
  athlete: EnrichedAthlete;
  onBack: () => void;
}

export const AthleteDetail: React.FC<AthleteDetailProps> = ({ athlete, onBack }) => {
  const isRed = athlete.cor_faixa.toLowerCase() === 'vermelho';
  const beltColorClass = isRed ? 'bg-[#d32f2f] text-white' : 'bg-[#0056b3] text-white';
  const beltLabel = isRed ? 'Aka (Vermelho)' : 'Ao (Azul)';

  return (
    <div className="animate-in fade-in zoom-in-95 duration-300">
      {/* Navigation */}
      <div className="px-4 mb-2">
        <button 
          onClick={onBack}
          className="flex items-center text-slate-500 hover:text-slate-900 transition-colors py-2"
        >
          <ArrowLeft className="w-5 h-5 mr-1" />
          <span className="font-medium">Voltar para lista</span>
        </button>
      </div>

      <div className="px-4 pb-12">
        <div className="bg-white rounded-3xl shadow-lg border border-slate-100 overflow-hidden relative">
            
            {/* Header / Name */}
            <div className="pt-8 pb-6 px-6 text-center bg-slate-50/50">
                <h1 className="text-3xl font-black text-slate-900 mb-2 tracking-tight">
                    {athlete.nome}
                </h1>
                <div className="inline-flex items-center gap-2 px-3 py-1 bg-slate-200 rounded-full text-xs font-semibold text-slate-700">
                    <Tag className="w-3 h-3" />
                    {athlete.parent_categoria}
                </div>
            </div>

            {/* Main Stats Grid */}
            <div className="p-6 grid grid-cols-2 gap-4">
                {/* KOTO */}
                <div className="bg-slate-50 rounded-2xl p-4 text-center border border-slate-100">
                    <span className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Koto</span>
                    <span className="block text-4xl font-black text-[#0056b3]">{athlete.parent_koto}</span>
                </div>

                {/* LUTA # (Or Category Number if Luta is null, using Cat# as placeholder for ID style) */}
                <div className="bg-slate-50 rounded-2xl p-4 text-center border border-slate-100">
                    <span className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">
                        {athlete.numero_luta ? 'Luta #' : 'Cat #'}
                    </span>
                    <span className="block text-4xl font-black text-slate-800">
                        {athlete.numero_luta || athlete.parent_numero_categoria}
                    </span>
                </div>

                {/* FAIXA / AKA-AO */}
                <div className="bg-slate-50 rounded-2xl p-4 text-center border border-slate-100">
                    <span className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Faixa</span>
                    <div className={`inline-flex items-center justify-center gap-2 px-3 py-1.5 rounded-full text-sm font-bold w-full ${beltColorClass}`}>
                        <div className={`w-2 h-2 rounded-full bg-white`}></div>
                        {isRed ? 'Aka' : 'Ao'}
                    </div>
                </div>

                {/* HORARIO */}
                <div className="bg-slate-50 rounded-2xl p-4 text-center border border-slate-100">
                    <span className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Horário</span>
                    <div className="flex items-center justify-center text-xl font-bold text-slate-800">
                        <Clock className="w-5 h-5 mr-1.5 text-slate-400" />
                        {athlete.parent_horario_inicio}
                    </div>
                </div>
            </div>

            <div className="px-6 pb-8 space-y-4">
                {/* Details List */}
                <div className="space-y-3">
                    <div className="flex items-center justify-between p-3 rounded-lg hover:bg-slate-50 transition-colors">
                        <div className="flex items-center text-slate-500 text-sm">
                            <Layers className="w-4 h-4 mr-3" />
                            <span>Tipo</span>
                        </div>
                        <span className="font-semibold text-slate-900 uppercase">{athlete.parent_tipo_categoria}</span>
                    </div>

                    <div className="h-px bg-slate-100"></div>

                    <div className="flex items-center justify-between p-3 rounded-lg hover:bg-slate-50 transition-colors">
                         <div className="flex items-center text-slate-500 text-sm">
                            <FileText className="w-4 h-4 mr-3" />
                            <span>Página PDF</span>
                        </div>
                        <span className="font-mono font-medium text-slate-600 bg-slate-100 px-2 py-0.5 rounded text-xs">
                            Pág. {athlete.parent_pdf_page}
                        </span>
                    </div>
                </div>

                {/* Opponent Section */}
                {athlete.adversario && (
                    <div className="mt-6 pt-6 border-t border-slate-100">
                        <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-4 flex items-center">
                            <Sword className="w-3 h-3 mr-1" />
                            Próximo Adversário
                        </h3>
                        <div className="bg-slate-50 p-4 rounded-xl flex items-center justify-between border border-slate-100">
                            <span className="font-bold text-slate-800">{athlete.adversario.split('(')[0].trim()}</span>
                             {/* Extracting Gym name if present in parenthesis */}
                            {athlete.adversario.includes('(') && (
                                <span className="text-xs font-medium text-slate-400">
                                    {athlete.adversario.match(/\(([^)]+)\)/)?.[1]}
                                </span>
                            )}
                        </div>
                    </div>
                )}
            </div>
        </div>
      </div>
    </div>
  );
};