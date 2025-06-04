import type { Row } from '@tanstack/react-table'

export const isLastInGroup = (row: Row<DataRow>, allRows: Row<DataRow>[]) => {
	const sameDepth = allRows.filter(r => r.depth === row.depth)
	return sameDepth[sameDepth.length - 1].id === row.id
}

export const getFirstAndSecondName = (fullName: string): string => {
	if (!fullName) return ''
	const nameOnly = fullName?.split('-')?.[0]?.trim()
	const parts = nameOnly?.split(' ')?.filter(Boolean)

	if (parts?.length === 0) return ''
	if (parts?.length === 1) return parts?.[0]

	return `${parts?.[0]} ${parts?.[1]}` || ''
}

export const formatCurrency = (value: number | null) => {
	if (!value) return '-'

	return value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })
}

export const formatDate = (date: Date | string) => {
	if (!date) return '-'
	const dateObj = new Date(date)
	const options: Intl.DateTimeFormatOptions = {
		year: 'numeric',
		month: '2-digit',
		day: '2-digit',
	}
	return dateObj.toLocaleDateString('pt-BR', options)
}

export function getUniqueRootParentIds<TData>({
	rowsWithEmptyJustification,
	idToRowMap,
}: {
	rowsWithEmptyJustification: Row<TData>[]
	idToRowMap: Map<string, Row<TData>>
}) {
	const rootParentIds = rowsWithEmptyJustification.map(row => {
		let currentRow = row
		while (currentRow.depth > 0 && currentRow.parentId) {
			const parent = idToRowMap.get(currentRow.parentId)
			if (!parent) break
			currentRow = parent
		}
		return currentRow.id
	})

	const uniqueRootParentIds = Array.from(new Set(rootParentIds))
	return uniqueRootParentIds
}
