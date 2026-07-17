import { shipState, useGameStore } from '@/store/useGameStore'
import { useTheme } from '@/theme/theme-provider'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { useEffect, useMemo, useRef, useState } from 'react'
import { isMobile } from 'react-device-detect'
import * as THREE from 'three'

/**
 * Fundo 3D fixo em tela cheia (react-three-fiber): campo de estrelas com
 * profundidade, nebulosas e sólidos wireframe que reagem ao mouse e ao scroll.
 * Dark: espaço preto com elementos brancos. Light: "papel" branco com tinta preta.
 */

type SceneProps = {
	isDark: boolean
	pointer: React.MutableRefObject<{ x: number; y: number }>
	scroll: React.MutableRefObject<number>
}

const CAMERA_Z = 1000
const DEPTH = 3200

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

const LAYERS = [
	{ count: isMobile ? 60 : 180, size: 11, opacity: 0.95, speed: 0.55, amp: 0.25 },
	{ count: isMobile ? 90 : 280, size: 6.5, opacity: 0.6, speed: 0.3, amp: 0.18 },
	{ count: isMobile ? 130 : 420, size: 3.5, opacity: 0.35, speed: 0.15, amp: 0.1 },
]

const StarLayer = ({
	isDark,
	texture,
	config,
	phase,
}: {
	isDark: boolean
	texture: THREE.Texture
	config: (typeof LAYERS)[number]
	phase: number
}) => {
	const materialRef = useRef<THREE.PointsMaterial>(null)
	const geometry = useMemo(() => {
		const positions = new Float32Array(config.count * 3)
		for (let i = 0; i < config.count; i++) {
			positions[i * 3] = THREE.MathUtils.randFloatSpread(4800)
			positions[i * 3 + 1] = THREE.MathUtils.randFloatSpread(3000)
			positions[i * 3 + 2] = THREE.MathUtils.randFloat(CAMERA_Z - DEPTH, CAMERA_Z)
		}
		const geo = new THREE.BufferGeometry()
		geo.setAttribute('position', new THREE.BufferAttribute(positions, 3))
		return geo
	}, [config.count])

	useEffect(() => () => geometry.dispose(), [geometry])

	useFrame(({ clock }) => {
		const attr = geometry.getAttribute('position') as THREE.BufferAttribute
		const arr = attr.array as Float32Array
		for (let i = 2; i < arr.length; i += 3) {
			arr[i] += config.speed
			if (arr[i] > CAMERA_Z) arr[i] -= DEPTH
		}
		attr.needsUpdate = true
		if (materialRef.current) {
			materialRef.current.opacity =
				config.opacity + Math.sin(clock.elapsedTime * 1.2 + phase) * config.amp * config.opacity
		}
	})

	return (
		<points geometry={geometry}>
			<pointsMaterial
				ref={materialRef}
				size={config.size}
				map={texture}
				color={isDark ? '#ffffff' : '#1a1a1a'}
				transparent
				opacity={config.opacity}
				depthWrite={false}
				blending={isDark ? THREE.AdditiveBlending : THREE.NormalBlending}
				sizeAttenuation
			/>
		</points>
	)
}

const Nebulas = ({ isDark, texture }: { isDark: boolean; texture: THREE.Texture }) => {
	const groupRef = useRef<THREE.Group>(null)

	useFrame(({ clock }) => {
		if (!groupRef.current) return
		groupRef.current.position.x = Math.sin(clock.elapsedTime * 0.05) * 120
		groupRef.current.position.y = Math.cos(clock.elapsedTime * 0.04) * 80
	})

	const color = isDark ? '#ffffff' : '#1a1a1a'
	const blending = isDark ? THREE.AdditiveBlending : THREE.NormalBlending

	return (
		<group ref={groupRef}>
			<sprite position={[-600, 300, -1800]} scale={[2600, 1800, 1]}>
				<spriteMaterial map={texture} color={color} transparent opacity={isDark ? 0.07 : 0.05} depthWrite={false} blending={blending} />
			</sprite>
			<sprite position={[800, -400, -2000]} scale={[2200, 2200, 1]}>
				<spriteMaterial map={texture} color={color} transparent opacity={isDark ? 0.045 : 0.035} depthWrite={false} blending={blending} />
			</sprite>
		</group>
	)
}

type ShipPartProps = {
	geometry: THREE.BufferGeometry
	hull: string
	line: string
	position?: [number, number, number]
	rotation?: [number, number, number]
	scale?: [number, number, number]
}

/** Peça do casco: malha sólida + arestas destacadas (estilo blueprint) */
const ShipPart = ({ geometry, hull, line, ...props }: ShipPartProps) => {
	const edges = useMemo(() => new THREE.EdgesGeometry(geometry, 12), [geometry])
	useEffect(() => () => edges.dispose(), [edges])

	return (
		<group {...props}>
			<mesh geometry={geometry}>
				<meshBasicMaterial color={hull} polygonOffset polygonOffsetFactor={2} polygonOffsetUnits={2} />
			</mesh>
			<lineSegments geometry={edges}>
				<lineBasicMaterial color={line} transparent opacity={0.9} />
			</lineSegments>
		</group>
	)
}

const Spaceship = ({ isDark, pointer, scroll, texture }: SceneProps & { texture: THREE.Texture }) => {
	const groupRef = useRef<THREE.Group>(null)
	const prev = useRef({ x: 0, y: 0, heading: Math.PI / 2 })
	const glowLeftRef = useRef<THREE.SpriteMaterial>(null)
	const glowRightRef = useRef<THREE.SpriteMaterial>(null)

	// Caça espacial procedural (aponta +y; a página é vista de cima)
	const geometries = useMemo(() => {
		const fuselage = new THREE.CylinderGeometry(5.5, 13, 62, 8)
		const nose = new THREE.ConeGeometry(5.5, 22, 8)
		const cockpit = new THREE.SphereGeometry(7.5, 8, 6)

		// Asa delta enflechada (raiz na fuselagem, ponta para trás)
		const wingShape = new THREE.Shape()
		wingShape.moveTo(0, 22)
		wingShape.lineTo(42, -14)
		wingShape.lineTo(40, -24)
		wingShape.lineTo(0, -8)
		wingShape.closePath()
		const wing = new THREE.ExtrudeGeometry(wingShape, { depth: 2.4, bevelEnabled: false })

		const engine = new THREE.CylinderGeometry(4.5, 5.5, 18, 8)
		return { fuselage, nose, cockpit, wing, engine }
	}, [])

	useEffect(
		() => () => {
			for (const geometry of Object.values(geometries)) geometry.dispose()
		},
		[geometries]
	)

	useFrame(({ clock }, delta) => {
		const group = groupRef.current
		if (!group) return
		const t = clock.elapsedTime
		const gameActive = useGameStore.getState().active

		// Brilho dos motores: forte acelerando no jogo, pulso leve em cruzeiro
		const glowTarget = gameActive && shipState.thrusting ? 0.9 : 0.18 + Math.sin(t * 2.3) * 0.06
		for (const material of [glowLeftRef.current, glowRightRef.current]) {
			if (material) material.opacity += (glowTarget - material.opacity) * Math.min(1, delta * 8)
		}

		// Modo jogo: a nave 3D vira o player, seguindo a física do AsteroidGame.
		// Converte a posição em pixels para o plano z=0 do mundo.
		if (gameActive) {
			const aspect = window.innerWidth / window.innerHeight
			const halfHeight = Math.tan((60 * Math.PI) / 360) * CAMERA_Z
			const worldX = (shipState.x / window.innerWidth - 0.5) * 2 * halfHeight * aspect
			const worldY = (0.5 - shipState.y / window.innerHeight) * 2 * halfHeight

			// Wrap de borda dá salto grande: teleporta em vez de "voar" pela tela
			if (Math.abs(worldX - group.position.x) > halfHeight || Math.abs(worldY - group.position.y) > halfHeight) {
				group.position.x = worldX
				group.position.y = worldY
			} else {
				const chase = Math.min(1, delta * 14)
				group.position.x += (worldX - group.position.x) * chase
				group.position.y += (worldY - group.position.y) * chase
			}
			group.position.z = 0

			// Ângulo 2D (y de tela para baixo) vira heading no mundo (y para cima)
			const targetHeading = -shipState.angle
			let diff = targetHeading - prev.current.heading
			while (diff > Math.PI) diff -= Math.PI * 2
			while (diff < -Math.PI) diff += Math.PI * 2
			prev.current.heading += diff * Math.min(1, delta * 12)
			group.rotation.z = prev.current.heading - Math.PI / 2
			group.rotation.y = 0
			prev.current.x = group.position.x
			prev.current.y = group.position.y
			return
		}

		// Trajetória costurada pela página: serpenteia na horizontal e ondula na
		// vertical conforme o progresso do scroll, com uma flutuação ambiente
		const maxScroll = Math.max(1, document.documentElement.scrollHeight - window.innerHeight)
		const progress = scroll.current / maxScroll
		const targetX = Math.sin(progress * Math.PI * 3 + 0.4) * 520 + pointer.current.x * 20
		const targetY = Math.cos(progress * Math.PI * 2 + 0.8) * 250 + Math.sin(t * 0.5) * 30

		const ease = Math.min(1, delta * 1.5)
		group.position.x += (targetX - group.position.x) * ease
		group.position.y += (targetY - group.position.y) * ease
		group.position.z = -180

		// Aponta o nariz para a direção do movimento (nave aponta +y)
		const vx = group.position.x - prev.current.x
		const vy = group.position.y - prev.current.y
		if (Math.abs(vx) + Math.abs(vy) > 0.05) {
			const heading = Math.atan2(vy, vx)
			let diff = heading - prev.current.heading
			while (diff > Math.PI) diff -= Math.PI * 2
			while (diff < -Math.PI) diff += Math.PI * 2
			prev.current.heading += diff * Math.min(1, delta * 3)
		}
		group.rotation.z = prev.current.heading - Math.PI / 2
		// Leve rolagem no eixo longitudinal para dar vida
		group.rotation.y = Math.sin(t * 0.7) * 0.3
		prev.current.x = group.position.x
		prev.current.y = group.position.y
	})

	const hull = isDark ? '#0d0d10' : '#efefec'
	const line = isDark ? '#ffffff' : '#161616'
	const glowColor = isDark ? '#ffffff' : '#1a1a1a'
	const scale = isMobile ? 0.55 : 0.9

	return (
		<group ref={groupRef} scale={scale}>
			{/* Fuselagem e nariz */}
			<ShipPart geometry={geometries.fuselage} hull={hull} line={line} />
			<ShipPart geometry={geometries.nose} hull={hull} line={line} position={[0, 42, 0]} />
			{/* Cockpit */}
			<ShipPart
				geometry={geometries.cockpit}
				hull={hull}
				line={line}
				position={[0, 12, 6]}
				scale={[1, 1.6, 0.7]}
			/>
			{/* Asas delta */}
			<ShipPart geometry={geometries.wing} hull={hull} line={line} position={[4, -8, -1.2]} />
			<ShipPart geometry={geometries.wing} hull={hull} line={line} position={[-4, -8, -1.2]} scale={[-1, 1, 1]} />
			{/* Canards dianteiros */}
			<ShipPart geometry={geometries.wing} hull={hull} line={line} position={[4, 20, -1]} scale={[0.4, 0.4, 0.6]} />
			<ShipPart
				geometry={geometries.wing}
				hull={hull}
				line={line}
				position={[-4, 20, -1]}
				scale={[-0.4, 0.4, 0.6]}
			/>
			{/* Naceles dos motores */}
			<ShipPart geometry={geometries.engine} hull={hull} line={line} position={[16, -28, 0]} />
			<ShipPart geometry={geometries.engine} hull={hull} line={line} position={[-16, -28, 0]} />
			{/* Escape dos motores */}
			<sprite position={[16, -44, 0]} scale={[30, 30, 1]}>
				<spriteMaterial
					ref={glowLeftRef}
					map={texture}
					color={glowColor}
					transparent
					opacity={0.18}
					depthWrite={false}
					blending={isDark ? THREE.AdditiveBlending : THREE.NormalBlending}
				/>
			</sprite>
			<sprite position={[-16, -44, 0]} scale={[30, 30, 1]}>
				<spriteMaterial
					ref={glowRightRef}
					map={texture}
					color={glowColor}
					transparent
					opacity={0.18}
					depthWrite={false}
					blending={isDark ? THREE.AdditiveBlending : THREE.NormalBlending}
				/>
			</sprite>
		</group>
	)
}

const CameraRig = ({ pointer, scroll }: Pick<SceneProps, 'pointer' | 'scroll'>) => {
	const { camera, scene } = useThree()

	useFrame(() => {
		// No jogo a câmera centraliza e a cena desgira, para o mapeamento
		// tela→mundo da nave ficar exato
		const gameActive = useGameStore.getState().active
		const targetX = gameActive ? 0 : pointer.current.x * 90
		const targetY = gameActive ? 0 : -pointer.current.y * 60
		camera.position.x += (targetX - camera.position.x) * 0.03
		camera.position.y += (targetY - camera.position.y) * 0.03
		camera.lookAt(0, 0, 0)
		const targetRotation = gameActive ? 0 : scroll.current * 0.00003
		scene.rotation.z += (targetRotation - scene.rotation.z) * 0.05
	})

	return null
}

const Scene = ({ isDark, pointer, scroll }: SceneProps) => {
	const texture = useMemo(makeGlowTexture, [])
	useEffect(() => () => texture.dispose(), [texture])

	return (
		<>
			{LAYERS.map((config, i) => (
				<StarLayer
					key={`${config.size}-${isDark}`}
					isDark={isDark}
					texture={texture}
					config={config}
					phase={i * 2.1}
				/>
			))}
			<Nebulas isDark={isDark} texture={texture} />
			<Spaceship isDark={isDark} pointer={pointer} scroll={scroll} texture={texture} />
			<CameraRig pointer={pointer} scroll={scroll} />
		</>
	)
}

const SpaceBackground: React.FC = () => {
	const { isDark } = useTheme()
	const gameActive = useGameStore(state => state.active)
	const pointer = useRef({ x: 0, y: 0 })
	const scroll = useRef(0)
	const [frameloop, setFrameloop] = useState<'always' | 'never'>('always')

	useEffect(() => {
		const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
		if (prefersReducedMotion) {
			setFrameloop('never')
			return
		}

		const onPointerMove = (event: PointerEvent) => {
			pointer.current.x = (event.clientX / window.innerWidth - 0.5) * 2
			pointer.current.y = (event.clientY / window.innerHeight - 0.5) * 2
		}
		const onScroll = () => {
			scroll.current = window.scrollY
		}
		const onVisibilityChange = () => {
			setFrameloop(document.hidden ? 'never' : 'always')
		}

		window.addEventListener('pointermove', onPointerMove, { passive: true })
		window.addEventListener('scroll', onScroll, { passive: true })
		document.addEventListener('visibilitychange', onVisibilityChange)
		return () => {
			window.removeEventListener('pointermove', onPointerMove)
			window.removeEventListener('scroll', onScroll)
			document.removeEventListener('visibilitychange', onVisibilityChange)
		}
	}, [])

	return (
		<div
			aria-hidden='true'
			className={`fixed inset-0 pointer-events-none bg-[#f5f5f3] dark:bg-[#050505] transition-colors duration-500 ${
				gameActive ? 'z-[75] !bg-transparent' : 'z-0'
			}`}
		>
			<Canvas
				frameloop={frameloop}
				dpr={[1, 2]}
				camera={{ fov: 60, near: 1, far: 5000, position: [0, 0, CAMERA_Z] }}
				gl={{ alpha: true, antialias: false, powerPreference: 'low-power' }}
			>
				<Scene isDark={isDark} pointer={pointer} scroll={scroll} />
			</Canvas>
		</div>
	)
}

export default SpaceBackground
