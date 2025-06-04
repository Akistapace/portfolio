export type IGetPeriods = {
  origin: string | null
  version: string | null
  IdCentro?: string | null
  IdCentroAgrupamento?: number | null
  IdConta?: number | null
  IdIndicador?: string | null
}

export type IGetTable = {
  origin: string
  version: string
  IdCentro?: string | null
  IdCentroAgrupamento?: number | null
  IdConta?: number | null
  IdIndicador?: string | null
}