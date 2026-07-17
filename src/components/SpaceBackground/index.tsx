import { useTheme } from '@/theme/theme-provider'
import { useEffect, useRef } from 'react'
import { isMobile } from 'react-device-detect'
import * as THREE from 'three'

/**
 * Fundo 3D fixo em tela cheia: campo de estrelas monocromático com
 * profundidade real (three.js), parallax suave de mouse e leve reação ao scroll.
 * Dark: espaço preto com estrelas brancas. Light: "papel" branco com estrelas pretas.
 */
const SpaceBackground: React.FC = () => {
	const { isDark } = useTheme()
	const containerRef = useRef<HTMLDivElement | null>(null)

	useEffect(() => {
		const container = containerRef.current
		if (!container || typeof window === 'undefined') return

		const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

		const scene = new THREE.Scene()
		const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 1, 5000)
		camera.position.z = 1000

		const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: false, powerPreference: 'low-power' })
		renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
		renderer.setSize(window.innerWidth, window.innerHeight)
		renderer.setClearColor(0x000000, 0)
		container.appendChild(renderer.domElement)

		// Sprite circular com halo suave, tingido pela cor do material
		const makeGlowTexture = () => {
			const size = 64
			const canvas = document.createElement('canvas')
			canvas.width = size
			canvas.height = size
			const ctx = canvas.getContext('2d') as CanvasRenderingContext2D
			const gradient = ctx.createRadialGradient(size / 2, size / 2, 0, size / 2, size / 2, size / 2)
			gradient.addColorStop(0, 'rgba(255,255,255,1)')
			gradient.addColorStop(0.25, 'rgba(255,255,255,0.8)')
			gradient.addColorStop(0.6, 'rgba(255,255,255,0.15)')
			gradient.addColorStop(1, 'rgba(255,255,255,0)')
			ctx.fillStyle = gradient
			ctx.fillRect(0, 0, size, size)
			return new THREE.CanvasTexture(canvas)
		}

		const glowTexture = makeGlowTexture()
		const starColor = new THREE.Color(isDark ? 0xffffff : 0x1a1a1a)
		const blending = isDark ? THREE.AdditiveBlending : THREE.NormalBlending

		// Três camadas de profundidade: perto (rápida/grande) → longe (lenta/pequena)
		const layerConfigs = [
			{ count: isMobile ? 60 : 180, size: 11, opacity: 0.95, speed: 0.55, amp: 0.25 },
			{ count: isMobile ? 90 : 280, size: 6.5, opacity: 0.6, speed: 0.3, amp: 0.18 },
			{ count: isMobile ? 130 : 420, size: 3.5, opacity: 0.35, speed: 0.15, amp: 0.1 },
		]

		const SPREAD_X = 2400
		const SPREAD_Y = 1500
		const DEPTH = 3200 // z entre -2200 e +1000 (câmera)

		const layers = layerConfigs.map((config, i) => {
			const positions = new Float32Array(config.count * 3)
			for (let j = 0; j < config.count; j++) {
				positions[j * 3] = THREE.MathUtils.randFloatSpread(SPREAD_X * 2)
				positions[j * 3 + 1] = THREE.MathUtils.randFloatSpread(SPREAD_Y * 2)
				positions[j * 3 + 2] = THREE.MathUtils.randFloat(camera.position.z - DEPTH, camera.position.z)
			}
			const geometry = new THREE.BufferGeometry()
			geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3))

			const material = new THREE.PointsMaterial({
				size: config.size,
				map: glowTexture,
				color: starColor,
				transparent: true,
				opacity: config.opacity,
				depthWrite: false,
				blending,
				sizeAttenuation: true,
			})

			const points = new THREE.Points(geometry, material)
			scene.add(points)
			return { points, geometry, material, config, phase: i * 2.1 }
		})

		// Névoa/nebulosa monocromática bem sutil ao fundo
		const nebulaMaterial = new THREE.SpriteMaterial({
			map: glowTexture,
			color: starColor,
			transparent: true,
			opacity: isDark ? 0.07 : 0.05,
			depthWrite: false,
			blending,
		})
		const nebulaA = new THREE.Sprite(nebulaMaterial)
		nebulaA.scale.set(2600, 1800, 1)
		nebulaA.position.set(-600, 300, -1800)
		const nebulaB = new THREE.Sprite(nebulaMaterial.clone())
		nebulaB.material.opacity = isDark ? 0.045 : 0.035
		nebulaB.scale.set(2200, 2200, 1)
		nebulaB.position.set(800, -400, -2000)
		scene.add(nebulaA, nebulaB)

		// Interações leves: parallax de mouse + rotação sutil no scroll
		let targetX = 0
		let targetY = 0
		let scrollRotation = 0

		const onPointerMove = (event: PointerEvent) => {
			targetX = (event.clientX / window.innerWidth - 0.5) * 2
			targetY = (event.clientY / window.innerHeight - 0.5) * 2
		}
		const onScroll = () => {
			scrollRotation = window.scrollY * 0.00003
		}
		const onResize = () => {
			camera.aspect = window.innerWidth / window.innerHeight
			camera.updateProjectionMatrix()
			renderer.setSize(window.innerWidth, window.innerHeight)
			if (prefersReducedMotion) renderer.render(scene, camera)
		}

		window.addEventListener('resize', onResize)

		let rafId = 0
		let running = false

		const animate = (time: number) => {
			rafId = requestAnimationFrame(animate)

			// Deriva contínua em direção à câmera, com wrap de profundidade
			for (const layer of layers) {
				const positionAttr = layer.geometry.getAttribute('position') as THREE.BufferAttribute
				const arr = positionAttr.array as Float32Array
				for (let j = 2; j < arr.length; j += 3) {
					arr[j] += layer.config.speed
					if (arr[j] > camera.position.z) arr[j] -= DEPTH
				}
				positionAttr.needsUpdate = true

				// Cintilar por camada
				layer.material.opacity =
					layer.config.opacity + Math.sin(time * 0.0012 + layer.phase) * layer.config.amp * layer.config.opacity
			}

			// Parallax suavizado
			camera.position.x += (targetX * 90 - camera.position.x) * 0.03
			camera.position.y += (-targetY * 60 - camera.position.y) * 0.03
			camera.lookAt(0, 0, 0)
			scene.rotation.z = scrollRotation

			nebulaA.position.x += Math.sin(time * 0.00008) * 0.15
			nebulaB.position.y += Math.cos(time * 0.00006) * 0.1

			renderer.render(scene, camera)
		}

		const start = () => {
			if (running || prefersReducedMotion) return
			running = true
			rafId = requestAnimationFrame(animate)
		}
		const stop = () => {
			running = false
			cancelAnimationFrame(rafId)
		}
		const onVisibilityChange = () => {
			if (document.hidden) stop()
			else start()
		}

		if (prefersReducedMotion) {
			renderer.render(scene, camera)
		} else {
			window.addEventListener('pointermove', onPointerMove, { passive: true })
			window.addEventListener('scroll', onScroll, { passive: true })
			document.addEventListener('visibilitychange', onVisibilityChange)
			start()
		}

		return () => {
			stop()
			window.removeEventListener('resize', onResize)
			window.removeEventListener('pointermove', onPointerMove)
			window.removeEventListener('scroll', onScroll)
			document.removeEventListener('visibilitychange', onVisibilityChange)
			for (const layer of layers) {
				layer.geometry.dispose()
				layer.material.dispose()
			}
			nebulaA.material.dispose()
			nebulaB.material.dispose()
			glowTexture.dispose()
			renderer.dispose()
			container.removeChild(renderer.domElement)
		}
	}, [isDark])

	return (
		<div
			ref={containerRef}
			aria-hidden='true'
			className='fixed inset-0 z-0 pointer-events-none bg-[#f5f5f3] dark:bg-[#050505] transition-colors duration-500'
		/>
	)
}

export default SpaceBackground
