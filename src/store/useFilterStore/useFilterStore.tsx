import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export interface Values {
	label: string
	value: string
}
interface FiltroStore {
	centroDeCusto: Values[]
	contaContabil: Values[]
	periodo: {
		safra: string | null
		mes: string | null
	} | null
	versions: Values[]
	visionType: string
	setCentroDeCusto: (valor: Values[]) => void
	setContaContabil: (valor: Values[]) => void
	setPeriodo: (valor: { safra: string | null; mes: string | null } | null) => void
	setVersions: (versions: Values[]) => void
	setVisionType: (valor: string) => void
	resetFiltros: () => void
}

export const useFilterStore = create<FiltroStore>()(
	persist(
		set => ({
			centroDeCusto: [],
			contaContabil: [],
			periodo: null,
			versions: [],
			visionType: 'Mensal',

			setCentroDeCusto: (centroDeCusto: Values[]) => set({ centroDeCusto }),
			setContaContabil: (contaContabil: Values[]) => set({ contaContabil }),
			setPeriodo: valor => set({ periodo: valor }),
			setVersions: (versions: Values[]) => set({ versions }),
			setVisionType: valor => set({ visionType: valor }),

			resetFiltros: () =>
				set({
					centroDeCusto: [],
					contaContabil: [],
					periodo: null,
					versions: [],
					visionType: 'Mensal',
				}),
		}),
		{
			name: 'filtros-storage',
		}
	)
)
