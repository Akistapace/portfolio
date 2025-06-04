// src/types/global.d.ts

export { }; // Garante que é tratado como um módulo

declare global {

  enum Theme {
    light = 'light',
    dark = 'dark',
    system = 'system',
  }
  
  type ThemeType = 'light' | 'dark' | 'system'


  interface MonthlyData {
    month: string
    orcamento: number
    pdcaAtual: number
    vrR: number
    vrPercent: number
  }
  
  export interface DataRow {
    id: string
    indicador?: string | null
    centroCusto: string | null
    contaContabil: string
    orcamento: number
    pdcaAtual: number
    variation: number
    variationPercent: number
    comentarioMes?: {
      planoAcao: string | null
      descricao: string | null
    } | null
    comentarioAno?: {
      planoAcao: string | null
      descricao: string | null
    } | null
    children?: DataRow[]
  }

  interface SelectedProps {
    row: Row<DataRow> | null
    type: 'ano' | 'mes' | null
  }
  
  
}
