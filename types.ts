export interface AtletaA2K {
  nome: string;
  adversario: string | null;
  numero_luta: string | null;
  cor_faixa: string; // "vermelho" | "azul"
  numero_rodada: string;
}

export interface Chave {
  koto: string;
  categoria: string;
  numero_categoria: string;
  tipo_categoria: string;
  horario_inicio: string;
  horario_termino: string | null;
  numero_atletas: string | null;
  atletas_a2k: AtletaA2K[];
  pdf_page: number;
}

export interface Campeonato {
  nome: string;
  data: string;
  ginasio: string;
  local: string;
  numero_atletas?: string;
  pdf_url?: string;
}

export interface CompetitionData {
  campeonato: Campeonato;
  chaves: Chave[];
}

// Derived type for the UI to display all info in one card
export interface EnrichedAthlete extends AtletaA2K {
  parent_koto: string;
  parent_categoria: string;
  parent_numero_categoria: string;
  parent_tipo_categoria: string;
  parent_horario_inicio: string;
  parent_pdf_page: number;
  competition_pdf_url?: string;
}