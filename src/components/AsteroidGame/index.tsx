import { shipState, useGameStore } from '@/store/useGameStore'
import { useTheme } from '@/theme/theme-provider'
import { Gamepad2, X } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'

type Bullet = { x: number; y: number; vx: number; vy: number; life: number }
type Particle = { x: number; y: number; vx: number; vy: number; life: number; max: number }
type Target = { el: HTMLElement; destroyed: boolean }

const SHIP_SIZE = 16
const THRUST = 0.18
const FRICTION = 0.99
const ROT_SPEED = 0.07
const BULLET_SPEED = 10
const BULLET_LIFE = 70
const SHOOT_COOLDOWN_MS = 180

/**
 * Mini-game estilo Asteroids sobre a própria página: a nave voa por cima do
 * site e os elementos visíveis atrás (títulos, textos, imagens, botões)
 * viram alvos destrutíveis. R restaura tudo, ESC sai (restaurando).
 */
export const AsteroidGame = () => {
	const { t } = useTranslation()
	const { isDark } = useTheme()
	const active = useGameStore(state => state.active)
	const setActive = useGameStore(state => state.setActive)
	const [score, setScore] = useState(0)
	const canvasRef = useRef<HTMLCanvasElement | null>(null)
	const overlayRef = useRef<HTMLDivElement | null>(null)

	useEffect(() => {
		if (!active) return
		const canvas = canvasRef.current
		const overlay = overlayRef.current
		if (!canvas || !overlay) return
		const ctx = canvas.getContext('2d')
		if (!ctx) return

		const color = isDark ? '#ffffff' : '#111111'
		const dpr = Math.min(window.devicePixelRatio || 1, 2)

		const resize = () => {
			canvas.width = window.innerWidth * dpr
			canvas.height = window.innerHeight * dpr
			ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
		}
		resize()
		window.addEventListener('resize', resize)

		// Congela o scroll: o campo de batalha é o viewport atual
		const previousOverflow = document.body.style.overflow
		document.body.style.overflow = 'hidden'

		// Coleta os elementos visíveis que viram alvos (só os mais externos)
		const candidates = Array.from(
			document.querySelectorAll<HTMLElement>('h1, h2, h3, p, li, img, button, a, svg')
		).filter(el => {
			if (overlay.contains(el)) return false
			const rect = el.getBoundingClientRect()
			if (rect.width < 24 || rect.height < 14) return false
			if (rect.bottom < 0 || rect.top > window.innerHeight || rect.right < 0 || rect.left > window.innerWidth)
				return false
			if (rect.width * rect.height > window.innerWidth * window.innerHeight * 0.5) return false
			return true
		})
		const candidateSet = new Set<HTMLElement>(candidates)
		const targets: Target[] = candidates
			.filter(el => {
				let parent = el.parentElement
				while (parent) {
					if (candidateSet.has(parent)) return false
					parent = parent.parentElement
				}
				return true
			})
			.map(el => ({ el, destroyed: false }))

		const restoreAll = () => {
			for (const target of targets) {
				target.el.style.visibility = ''
				target.destroyed = false
			}
		}

		const ship = {
			x: window.innerWidth / 2,
			y: window.innerHeight * 0.66,
			angle: -Math.PI / 2,
			vx: 0,
			vy: 0,
		}
		// Sincroniza a nave 3D já na largada
		shipState.x = ship.x
		shipState.y = ship.y
		shipState.angle = ship.angle
		shipState.thrusting = false

		const bullets: Bullet[] = []
		const particles: Particle[] = []
		const keys = new Set<string>()
		let lastShot = 0
		let destroyedCount = 0

		const handledKeys = new Set([
			'ArrowLeft',
			'ArrowRight',
			'ArrowUp',
			'ArrowDown',
			' ',
			'a',
			'd',
			'w',
			's',
			'r',
			'R',
		])
		const onKeyDown = (event: KeyboardEvent) => {
			if (event.key === 'Escape') {
				setActive(false)
				return
			}
			if (handledKeys.has(event.key)) {
				event.preventDefault()
				keys.add(event.key.toLowerCase())
			}
		}
		const onKeyUp = (event: KeyboardEvent) => {
			keys.delete(event.key.toLowerCase())
		}
		window.addEventListener('keydown', onKeyDown)
		window.addEventListener('keyup', onKeyUp)

		const explode = (rect: DOMRect) => {
			const count = Math.min(26, 10 + Math.floor((rect.width * rect.height) / 6000))
			for (let i = 0; i < count; i++) {
				const angle = Math.random() * Math.PI * 2
				const speed = 1 + Math.random() * 3.5
				particles.push({
					x: rect.left + Math.random() * rect.width,
					y: rect.top + Math.random() * rect.height,
					vx: Math.cos(angle) * speed,
					vy: Math.sin(angle) * speed,
					life: 0,
					max: 30 + Math.random() * 25,
				})
			}
		}

		let rafId = 0
		const loop = (time: number) => {
			rafId = requestAnimationFrame(loop)
			const width = window.innerWidth
			const height = window.innerHeight

			// Controles
			if (keys.has('arrowleft') || keys.has('a')) ship.angle -= ROT_SPEED
			if (keys.has('arrowright') || keys.has('d')) ship.angle += ROT_SPEED
			const thrusting = keys.has('arrowup') || keys.has('w')
			if (thrusting) {
				ship.vx += Math.cos(ship.angle) * THRUST
				ship.vy += Math.sin(ship.angle) * THRUST
			}
			if (keys.has('r')) {
				keys.delete('r')
				restoreAll()
				destroyedCount = 0
				setScore(0)
			}
			if (keys.has(' ') && time - lastShot > SHOOT_COOLDOWN_MS) {
				lastShot = time
				bullets.push({
					x: ship.x + Math.cos(ship.angle) * SHIP_SIZE * 2.2,
					y: ship.y + Math.sin(ship.angle) * SHIP_SIZE * 2.2,
					vx: Math.cos(ship.angle) * BULLET_SPEED + ship.vx * 0.5,
					vy: Math.sin(ship.angle) * BULLET_SPEED + ship.vy * 0.5,
					life: 0,
				})
			}

			// Física da nave com wrap nas bordas
			ship.vx *= FRICTION
			ship.vy *= FRICTION
			ship.x = (ship.x + ship.vx + width) % width
			ship.y = (ship.y + ship.vy + height) % height

			// A nave visível é a 3D do SpaceBackground: publica o estado para ela
			shipState.x = ship.x
			shipState.y = ship.y
			shipState.angle = ship.angle
			shipState.thrusting = thrusting

			// Balas + colisão com os elementos da página
			for (let i = bullets.length - 1; i >= 0; i--) {
				const bullet = bullets[i]
				bullet.x += bullet.vx
				bullet.y += bullet.vy
				bullet.life++
				if (bullet.life > BULLET_LIFE || bullet.x < 0 || bullet.x > width || bullet.y < 0 || bullet.y > height) {
					bullets.splice(i, 1)
					continue
				}
				for (const target of targets) {
					if (target.destroyed) continue
					const rect = target.el.getBoundingClientRect()
					if (bullet.x >= rect.left && bullet.x <= rect.right && bullet.y >= rect.top && bullet.y <= rect.bottom) {
						target.destroyed = true
						target.el.style.visibility = 'hidden'
						explode(rect)
						destroyedCount++
						setScore(destroyedCount)
						bullets.splice(i, 1)
						break
					}
				}
			}

			// Desenho
			ctx.clearRect(0, 0, width, height)
			ctx.strokeStyle = color
			ctx.fillStyle = color
			ctx.lineWidth = 1.5

			// Rastro do propulsor (a nave em si é a 3D do fundo)
			if (thrusting && Math.random() > 0.35) {
				particles.push({
					x: ship.x - Math.cos(ship.angle) * SHIP_SIZE * 1.4,
					y: ship.y - Math.sin(ship.angle) * SHIP_SIZE * 1.4,
					vx: -Math.cos(ship.angle) * 2 + (Math.random() - 0.5),
					vy: -Math.sin(ship.angle) * 2 + (Math.random() - 0.5),
					life: 0,
					max: 14 + Math.random() * 10,
				})
			}

			// Balas
			for (const bullet of bullets) {
				ctx.beginPath()
				ctx.arc(bullet.x, bullet.y, 2, 0, Math.PI * 2)
				ctx.fill()
			}

			// Partículas de explosão
			for (let i = particles.length - 1; i >= 0; i--) {
				const particle = particles[i]
				particle.x += particle.vx
				particle.y += particle.vy
				particle.vx *= 0.97
				particle.vy *= 0.97
				particle.life++
				if (particle.life > particle.max) {
					particles.splice(i, 1)
					continue
				}
				ctx.globalAlpha = 1 - particle.life / particle.max
				ctx.fillRect(particle.x, particle.y, 2.5, 2.5)
				ctx.globalAlpha = 1
			}
		}
		rafId = requestAnimationFrame(loop)

		return () => {
			cancelAnimationFrame(rafId)
			window.removeEventListener('resize', resize)
			window.removeEventListener('keydown', onKeyDown)
			window.removeEventListener('keyup', onKeyUp)
			document.body.style.overflow = previousOverflow
			restoreAll()
			setScore(0)
		}
	}, [active, isDark])

	return (
		<>
			{!active && (
				<button
					type='button'
					onClick={() => setActive(true)}
					className='fixed left-6 bottom-6 z-40 hidden md:flex items-center gap-2 rounded-full border border-neutral-400/60 bg-white/60 px-4 py-3 text-[11px] font-medium uppercase tracking-[0.25em] text-neutral-800 backdrop-blur-md transition-colors hover:border-neutral-800 dark:border-white/25 dark:bg-black/40 dark:text-white dark:hover:border-white'
				>
					<Gamepad2 size={15} />
					{t('game.start')}
				</button>
			)}

			{active && (
				<div ref={overlayRef} className='fixed inset-0 z-[80]'>
					<canvas ref={canvasRef} className='h-full w-full' />
					<div className='absolute top-20 left-1/2 -translate-x-1/2 flex items-center gap-6 text-xs uppercase tracking-[0.3em] text-neutral-700 dark:text-neutral-200'>
						<span>
							{t('game.score')}: {score}
						</span>
					</div>
					<p className='absolute bottom-5 left-1/2 -translate-x-1/2 text-[11px] tracking-widest text-neutral-600 dark:text-neutral-300 text-center px-4'>
						{t('game.hint')}
					</p>
					<button
						type='button'
						onClick={() => setActive(false)}
						aria-label={t('game.exit')}
						className='absolute top-20 right-6 flex items-center gap-2 rounded-full border border-neutral-400/60 bg-white/60 px-3 py-2 text-[11px] uppercase tracking-widest text-neutral-800 backdrop-blur-md hover:border-neutral-800 dark:border-white/25 dark:bg-black/40 dark:text-white dark:hover:border-white'
					>
						<X size={14} />
						{t('game.exit')}
					</button>
				</div>
			)}
		</>
	)
}

export default AsteroidGame
