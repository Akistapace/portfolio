import { useFilterStore } from './useFilterStore'

describe('useFilterStore', () => {
	beforeEach(() => {
		// Resetar a store antes de cada teste
		useFilterStore.getState().resetFiltros()
	})

	it('deve definir centroDeCusto corretamente', () => {
		const mock = [{ label: 'Financeiro', value: '1' }]
		useFilterStore.getState().setCentroDeCusto(mock)
		expect(useFilterStore.getState().centroDeCusto).toEqual(mock)
	})

	it('deve definir contaContabil corretamente', () => {
		const mock = [{ label: 'Conta A', value: '101' }]
		useFilterStore.getState().setContaContabil(mock)
		expect(useFilterStore.getState().contaContabil).toEqual(mock)
	})

	it('deve definir periodo corretamente', () => {
		const periodo = { safra: '2023', mes: 'Janeiro' }
		useFilterStore.getState().setPeriodo(periodo)
		expect(useFilterStore.getState().periodo).toEqual(periodo)
	})

	it('deve definir versions corretamente', () => {
		const versions = [{ label: 'v1', value: '001' }]
		useFilterStore.getState().setVersions(versions)
		expect(useFilterStore.getState().versions).toEqual(versions)
	})

	it('deve definir visionType corretamente', () => {
		useFilterStore.getState().setVisionType('Anual')
		expect(useFilterStore.getState().visionType).toBe('Anual')
	})

	it('deve resetar todos os filtros', () => {
		// Setar valores antes
		useFilterStore.getState().setCentroDeCusto([{ label: 'A', value: '1' }])
		useFilterStore.getState().setContaContabil([{ label: 'B', value: '2' }])
		useFilterStore.getState().setPeriodo({ safra: '2024', mes: 'Março' })
		useFilterStore.getState().setVersions([{ label: 'v2', value: '002' }])
		useFilterStore.getState().setVisionType('Anual')

		// Resetar
		useFilterStore.getState().resetFiltros()

		// Verificar estado inicial
		expect(useFilterStore.getState()).toMatchObject({
			centroDeCusto: [],
			contaContabil: [],
			periodo: null,
			versions: [],
			visionType: 'Mensal',
		})
	})
})
