import { create } from 'zustand'

/**
 * Posição da nave do jogo em coordenadas de tela, atualizada a cada frame
 * pelo AsteroidGame e lida pelo Spaceship 3D. Objeto mutável de propósito:
 * atualização por frame não deve re-renderizar React.
 */
export const shipState = { x: 0, y: 0, angle: 0, thrusting: false }

type GameStore = {
	active: boolean
	setActive: (active: boolean) => void
}

export const useGameStore = create<GameStore>(set => ({
	active: false,
	setActive: active => set({ active }),
}))
