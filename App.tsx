import React, { useState, useEffect, useMemo } from 'react';
import { Header } from './components/Header';
import { CompetitionCard } from './components/CompetitionCard';
import { AthleteList } from './components/AthleteList';
import { AthleteDetail } from './components/AthleteDetail';
import { CompetitionData, EnrichedAthlete } from './types';
import { Loader2 } from 'lucide-react';

type ViewState = 'home' | 'list' | 'detail';

const App: React.FC = () => {
  const [view, setView] = useState<ViewState>('home');
  const [data, setData] = useState<CompetitionData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedAthlete, setSelectedAthlete] = useState<EnrichedAthlete | null>(null);
  
  // Dark Mode State
  const [darkMode, setDarkMode] = useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      const savedTheme = localStorage.getItem('theme');
      if (savedTheme) {
        return savedTheme === 'dark';
      }
      return window.matchMedia('(prefers-color-scheme: dark)').matches;
    }
    return false;
  });

  // Apply dark mode class to HTML element
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [darkMode]);

  const toggleTheme = () => {
    setDarkMode(prev => !prev);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        // Simulando um pequeno delay de rede para ver o loading
        await new Promise(resolve => setTimeout(resolve, 800));
        
        const response = await fetch('./data.json');
        if (!response.ok) {
          throw new Error('Falha ao carregar dados da competição');
        }
        const jsonData: CompetitionData = await response.json();
        setData(jsonData);
      } catch (err) {
        console.error(err);
        setError('Não foi possível carregar as informações do campeonato.');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Transform hierarchical data into a flat list of athletes with context
  const allAthletes: EnrichedAthlete[] = useMemo(() => {
    if (!data) return [];

    const flattened: EnrichedAthlete[] = [];
    
    data.chaves.forEach(chave => {
      chave.atletas_a2k.forEach(atleta => {
        flattened.push({
          ...atleta,
          parent_koto: chave.koto,
          parent_categoria: chave.categoria,
          parent_numero_categoria: chave.numero_categoria,
          parent_tipo_categoria: chave.tipo_categoria,
          parent_horario_inicio: chave.horario_inicio,
          parent_pdf_page: chave.pdf_page,
          competition_pdf_url: data.campeonato.pdf_url
        });
      });
    });

    return flattened;
  }, [data]);

  // Calculate unique athletes count dynamically
  const uniqueAthleteCount = useMemo(() => {
    if (!allAthletes.length) return 0;
    
    // Create a Set of unique names
    const names = new Set(allAthletes.map(athlete => athlete.nome));
    return names.size;
  }, [allAthletes]);

  const handleCompetitionClick = () => {
    setView('list');
  };

  const handleAthleteSelect = (athlete: EnrichedAthlete) => {
    setSelectedAthlete(athlete);
    setView('detail');
  };

  const handleBackToList = () => {
    setSelectedAthlete(null);
    setView('list');
  };

  const handleBackToHome = () => {
    setView('home');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#F8FAFC] dark:bg-slate-950 flex flex-col items-center justify-center font-sans transition-colors duration-300">
        <Loader2 className="w-10 h-10 text-[#0056b3] dark:text-[#3b82f6] animate-spin mb-4" />
        <p className="text-slate-500 dark:text-slate-400 font-medium animate-pulse">Carregando competição...</p>
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className="min-h-screen bg-[#F8FAFC] dark:bg-slate-950 flex flex-col items-center justify-center font-sans p-6 text-center transition-colors duration-300">
        <div className="bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 p-4 rounded-xl border border-red-100 dark:border-red-900/50 max-w-sm">
          <h2 className="font-bold mb-2">Ops!</h2>
          <p>{error || 'Dados não encontrados.'}</p>
          <button 
            onClick={() => window.location.reload()}
            className="mt-4 px-4 py-2 bg-white dark:bg-slate-800 border border-red-200 dark:border-red-800 rounded-lg text-sm font-semibold shadow-sm hover:bg-red-50 dark:hover:bg-red-900/30 transition-colors"
          >
            Tentar Novamente
          </button>
        </div>
      </div>
    );
  }

  // Inject calculated athlete count into the display data
  const competitionDisplayData = {
    ...data.campeonato,
    numero_atletas: String(uniqueAthleteCount)
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] dark:bg-slate-950 pb-10 font-sans text-slate-900 dark:text-slate-100 transition-colors duration-300">
      <Header isDark={darkMode} toggleTheme={toggleTheme} />
      
      <main className="max-w-3xl mx-auto pt-6">
        
        {view === 'home' && (
          <div className="animate-in fade-in zoom-in-95 duration-500">
            <div className="px-4 mb-6">
                <h1 className="text-2xl font-bold text-slate-800 dark:text-white">Bem-vindo, Sensei.</h1>
                <p className="text-slate-500 dark:text-slate-400 text-sm">Acompanhe seus atletas em tempo real.</p>
            </div>
            <CompetitionCard 
              data={competitionDisplayData} 
              onClick={handleCompetitionClick} 
            />
          </div>
        )}

        {view === 'list' && (
          <AthleteList 
            athletes={allAthletes} 
            onSelect={handleAthleteSelect}
            onBack={handleBackToHome}
          />
        )}

        {view === 'detail' && selectedAthlete && (
          <AthleteDetail 
            athlete={selectedAthlete}
            onBack={handleBackToList}
          />
        )}

      </main>
    </div>
  );
};

export default App;