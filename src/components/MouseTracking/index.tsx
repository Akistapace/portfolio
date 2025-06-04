import { useEffect, useRef, useState } from 'react'
import { isMobile } from 'react-device-detect'

const MouseTracker = () => {
	const outerRef = useRef<HTMLDivElement>(null)
	const innerRef = useRef<HTMLDivElement>(null)

	const lastMoveTime = useRef(Date.now())

	const xPos = useRef(0)
	const yPos = useRef(0)
	const mouseX = useRef(0)
	const mouseY = useRef(0)
	const innerX = useRef(0)
	const innerY = useRef(0)

	const outerSize = 30
	const innerSize = 8

	const baseOuterColor = '#fff'
	const baseInnerColor = '#fff'

	const [isHoverInteractive, setIsHoverInteractive] = useState(false)

	useEffect(() => {
		if (isMobile) return
		const handleMouseMove = (e: MouseEvent) => {
			mouseX.current = e.clientX
			mouseY.current = e.clientY
			lastMoveTime.current = Date.now()

			const el = document.elementFromPoint(mouseX.current, mouseY.current)
			if (!el) return

			// Detecta elementos interativos comuns
			const tag = el.tagName.toLowerCase()
			const interactiveTags = ['button', 'a', 'input', 'textarea', 'select', 'svg']
			const isInteractive =
				interactiveTags.includes(tag) ||
				el.closest('button, a, [role="button"]') !== null ||
				el.classList.contains('icon')

			setIsHoverInteractive(isInteractive)
		}

		const animate = () => {
			const now = Date.now()
			const idleTime = now - lastMoveTime.current
			const isIdle = idleTime > 500

			innerX.current += (mouseX.current - innerX.current) / 5
			innerY.current += (mouseY.current - innerY.current) / 5

			if (xPos.current === 0 && yPos.current === 0) {
				xPos.current = innerX.current
				yPos.current = innerY.current
			}

			if (isIdle) {
				xPos.current += (innerX.current - xPos.current) / 20
				yPos.current += (innerY.current - yPos.current) / 20
			} else {
				xPos.current += (mouseX.current - xPos.current) / 10
				yPos.current += (mouseY.current - yPos.current) / 10
			}

			if (outerRef.current) {
				const scale = isHoverInteractive ? 1.5 : 1
				outerRef.current.style.transform = `translate3d(${
					xPos.current - (outerSize * scale) / 2
				}px, ${yPos.current - (outerSize * scale) / 2}px, 0) scale(${scale})`
			}
			if (innerRef.current) {
				innerRef.current.style.transform = `translate3d(${
					innerX.current - innerSize / 2
				}px, ${innerY.current - innerSize / 2}px, 0)`
			}

			requestAnimationFrame(animate)
		}

		window.addEventListener('mousemove', handleMouseMove)
		animate()

		return () => {
			window.removeEventListener('mousemove', handleMouseMove)
		}
	}, [])

	if (isMobile) {
		return null
	}

	return (
		<>
			<div
				ref={outerRef}
				style={{
					position: 'fixed',
					width: outerSize,
					height: outerSize,
					borderRadius: '50%',
					backgroundColor: baseOuterColor,
					pointerEvents: 'none',
					transform: 'translate3d(-100px, -100px, 0)',
					transition: 'transform 0.15s ease',
					mixBlendMode: 'difference',
					zIndex: 9999,
					opacity: 0.8,
				}}
			/>
			<div
				ref={innerRef}
				style={{
					position: 'fixed',
					width: innerSize,
					height: innerSize,
					borderRadius: '50%',
					backgroundColor: baseInnerColor,
					pointerEvents: 'none',
					transform: 'translate3d(-100px, -100px, 0)',
					mixBlendMode: 'difference',
					zIndex: 9999,
				}}
			/>
		</>
	)
}

export default MouseTracker
