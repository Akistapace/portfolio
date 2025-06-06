import { useTheme } from '@/theme/theme-provider'
import p5 from 'p5'
import { useEffect, useRef, useState } from 'react'
import { isMobile } from 'react-device-detect'

const StarField: React.FC = () => {
	const { isDark } = useTheme()
	const canvasRef = useRef<HTMLDivElement | null>(null)
	const scrollIconRef = useRef<HTMLDivElement | null>(null)
	const [isVisible, setIsVisible] = useState(false)
	const p5InstanceRef = useRef<p5 | null>(null)

	useEffect(() => {
		if (typeof window !== 'undefined') {
			const observer = new IntersectionObserver(
				([entry]) => {
					setIsVisible(entry.isIntersecting)
				},
				{ threshold: 0.1 }
			)

			if (canvasRef.current) {
				observer.observe(canvasRef.current)
			}

			return () => observer.disconnect()
		}
	}, [])

	useEffect(() => {
		if (typeof window === 'undefined' || !canvasRef.current) return

		// Remove instância anterior ao recriar (ex: troca de tema)
		if (p5InstanceRef.current) {
			p5InstanceRef.current.remove()
			p5InstanceRef.current = null
		}

		const numStars = isMobile ? 50 : 100
		const frameRate = isMobile ? 30 : 60

		const sketch = (p: p5) => {
			const stars: Star[] = []
			const maxStars = numStars
			let initialized = false

			p.setup = () => {
				p.createCanvas(p.windowWidth, p.windowHeight)
				p.frameRate(frameRate)
				p.stroke(0)
				p.strokeWeight(2)

				for (let i = 0; i < numStars; i++) {
					stars.push(new Star(p.random(p.width), p.random(p.height), p))
				}
			}

			p.draw = () => {
				const bgColor = !isDark ? p.color(0, 50) : p.color(255, 50)
				p.background(bgColor)

				if (!initialized) {
					if (stars.length < maxStars) {
						stars.push(new Star(p.random(p.width), p.random(p.height), p))
					} else {
						initialized = true
						setTimeout(() => {
							const body = document.querySelector('body')
							if (body) {
								body.style.overflowY = 'auto'
							}
							if (scrollIconRef.current) {
								scrollIconRef.current.style.opacity = '1'
							}
						}, 5000)
					}
				}

				for (const star of stars) {
					star.draw()
					if (initialized) {
						star.update()
						if (!star.isActive()) {
							star.reset()
						}
					}
				}
			}

			p.windowResized = () => {
				p.resizeCanvas(p.windowWidth, p.windowHeight)
			}

			class Star {
				pos: p5.Vector
				prevPos: p5.Vector
				vel: p5.Vector
				ang: number

				constructor(x: number, y: number, p: p5) {
					this.pos = p.createVector(x, y)
					this.prevPos = this.pos.copy()
					this.vel = p.createVector(0, 0)
					this.ang = p.atan2(y - p.height / 2, x - p.width / 2)
				}

				isActive() {
					return this.onScreen(this.prevPos.x, this.prevPos.y, p)
				}

				update() {
					const center = p.createVector(p.width / 2, p.height / 2)
					const distance = this.pos.dist(center)
					const maxDistance = p.dist(0, 0, p.width / 2, p.height / 2)
					const acc = p.map(distance, 0, maxDistance, 0.01, 0.3)

					this.vel.x += p.cos(this.ang) * acc
					this.vel.y += p.sin(this.ang) * acc

					this.prevPos.set(this.pos)
					this.pos.add(this.vel)
				}

				draw() {
					const alpha = p.map(this.vel.mag(), 0, 3, 0, 255)
					const starColor = !isDark ? p.color(255, alpha) : p.color(0, alpha) // branco no dark, preto no light
					p.stroke(starColor)
					p.line(this.pos.x, this.pos.y, this.prevPos.x, this.prevPos.y)
				}

				reset() {
					this.pos = p.createVector(p.random(p.width), p.random(p.height))
					this.prevPos = this.pos.copy()
					this.vel = p.createVector(0, 0)
					this.ang = p.atan2(this.pos.y - p.height / 2, this.pos.x - p.width / 2)
				}

				private onScreen(x: number, y: number, p: p5) {
					return x >= 0 && x <= p.width && y >= 0 && y <= p.height
				}
			}
		}

		p5InstanceRef.current = new p5(sketch, canvasRef.current as HTMLElement)

		return () => {
			p5InstanceRef.current?.remove()
			p5InstanceRef.current = null
		}
	}, [isDark])

	useEffect(() => {
		if (typeof window !== 'undefined') {
			if (p5InstanceRef.current) {
				if (isVisible) {
					p5InstanceRef.current.loop()
				} else {
					p5InstanceRef.current.noLoop()
				}
			}
		}
	}, [isVisible])

	return (
		<div className='canvas relative flex flex-col items-center justify-center w-full h-screen overflow-hidden'>
			<div ref={canvasRef} className='h-screen w-full' />
			<div className='flex flex-col items-center justify-center absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center h-full w-full'>
				<h1 className='title text-white dark:text-gray-950 '>Fernando Aquistapace</h1>
				<p className='subtitle text-white dark:text-gray-950'>Frontend Developer | Performance Developer</p>
			</div>

			<div
				className='absolute bottom-4 left-1/2 transform -translate-x-1/2 opacity-0 transition-opacity'
				ref={scrollIconRef}
			>
				<div className='mouse animate-bounce' />
			</div>
		</div>
	)
}

export default StarField
