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

type ShapeConfig = {
	/** x fixo, deslocamento y em torno da âncora, profundidade z */
	position: [number, number, number]
	rotationSpeed: [number, number]
	floatPhase: number
	/** Fração do scroll total da página (0 = topo, 1 = fim) onde a forma fica centralizada */
	anchor: number
	/** Quantos "mundos" a forma percorre por viewport rolado */
	travel: number
}

const SHAPES: ShapeConfig[] = [
	// Hero: só uma forma pequena e distante
	{ position: [480, 60, -600], rotationSpeed: [0.06, 0.1], floatPhase: 0, anchor: 0.04, travel: 500 },
	{ position: [-540, 0, 100], rotationSpeed: [0.1, 0.16], floatPhase: 1.4, anchor: 0.2, travel: 750 },
	{ position: [560, -40, -150], rotationSpeed: [0.14, 0.08], floatPhase: 2.6, anchor: 0.36, travel: 800 },
	{ position: [-460, 40, -350], rotationSpeed: [0.06, 0.12], floatPhase: 4.2, anchor: 0.52, travel: 650 },
	{ position: [520, 0, 0], rotationSpeed: [0.12, 0.05], floatPhase: 5.6, anchor: 0.7, travel: 850 },
	{ position: [-500, -60, -250], rotationSpeed: [0.09, 0.14], floatPhase: 7.1, anchor: 0.88, travel: 700 },
]

const FloatingShape = ({
	config,
	isDark,
	pointer,
	scroll,
	children,
}: SceneProps & { config: ShapeConfig; children: React.ReactNode }) => {
	const meshRef = useRef<THREE.Mesh>(null)
	const materialRef = useRef<THREE.MeshBasicMaterial>(null)
	const maxOpacity = isDark ? 0.22 : 0.3

	useFrame(({ clock }, delta) => {
		const mesh = meshRef.current
		if (!mesh) return
		const t = clock.elapsedTime

		// Posição relativa à âncora: -1 = um viewport antes, 0 = centrada, +1 = um depois
		const maxScroll = Math.max(1, document.documentElement.scrollHeight - window.innerHeight)
		const rel = (scroll.current - config.anchor * maxScroll) / window.innerHeight

		// Longe da âncora a forma fica invisível e nem precisa animar
		const fade = 1 - Math.min(1, Math.abs(rel) / 1.2)
		if (materialRef.current) materialRef.current.opacity = maxOpacity * fade * fade
		mesh.visible = fade > 0
		if (!mesh.visible) return

		// Rotação própria contínua + inclinação suave em direção ao ponteiro
		mesh.rotation.x += delta * config.rotationSpeed[0] + (pointer.current.y * 0.3 - mesh.rotation.x) * delta * 0.15
		mesh.rotation.y += delta * config.rotationSpeed[1] + (pointer.current.x * 0.3 - mesh.rotation.y) * delta * 0.15

		// Surge por baixo, cruza o viewport e sai por cima conforme o scroll
		mesh.position.x = config.position[0] + Math.sin(t * 0.3 + config.floatPhase) * 25
		mesh.position.y = config.position[1] + Math.cos(t * 0.25 + config.floatPhase) * 20 + rel * config.travel
	})

	return (
		<mesh ref={meshRef} position={config.position}>
			{children}
			<meshBasicMaterial
				ref={materialRef}
				wireframe
				color={isDark ? '#ffffff' : '#1a1a1a'}
				transparent
				opacity={0}
				depthWrite={false}
			/>
		</mesh>
	)
}

const FloatingShapes = (props: SceneProps) => {
	if (isMobile) return null
	return (
		<>
			<FloatingShape {...props} config={SHAPES[0]}>
				<tetrahedronGeometry args={[70, 0]} />
			</FloatingShape>
			<FloatingShape {...props} config={SHAPES[1]}>
				<icosahedronGeometry args={[95, 0]} />
			</FloatingShape>
			<FloatingShape {...props} config={SHAPES[2]}>
				<torusKnotGeometry args={[60, 18, 64, 8]} />
			</FloatingShape>
			<FloatingShape {...props} config={SHAPES[3]}>
				<octahedronGeometry args={[80, 0]} />
			</FloatingShape>
			<FloatingShape {...props} config={SHAPES[4]}>
				<dodecahedronGeometry args={[70, 0]} />
			</FloatingShape>
			<FloatingShape {...props} config={SHAPES[5]}>
				<torusGeometry args={[75, 22, 12, 24]} />
			</FloatingShape>
		</>
	)
}

const CameraRig = ({ pointer, scroll }: Pick<SceneProps, 'pointer' | 'scroll'>) => {
	const { camera, scene } = useThree()

	useFrame(() => {
		camera.position.x += (pointer.current.x * 90 - camera.position.x) * 0.03
		camera.position.y += (-pointer.current.y * 60 - camera.position.y) * 0.03
		camera.lookAt(0, 0, 0)
		scene.rotation.z = scroll.current * 0.00003
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
			<FloatingShapes isDark={isDark} pointer={pointer} scroll={scroll} />
			<CameraRig pointer={pointer} scroll={scroll} />
		</>
	)
}

const SpaceBackground: React.FC = () => {
	const { isDark } = useTheme()
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
			className='fixed inset-0 z-0 pointer-events-none bg-[#f5f5f3] dark:bg-[#050505] transition-colors duration-500'
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
