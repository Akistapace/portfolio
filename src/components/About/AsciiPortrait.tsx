import { useTheme } from '@/theme/theme-provider'
import { useEffect, useRef } from 'react'

type AsciiPortraitProps = {
	src: string
	className?: string
}

// Do mais "vazio" ao mais denso; o índice é escolhido pela luminância do pixel
const RAMP = ' .:-=+*#%@'
const CELL = 6

/**
 * Renderiza a imagem como arte ASCII em um canvas: cada célula vira um
 * caractere escolhido pela luminância. Monocromático e sensível ao tema.
 */
export const AsciiPortrait = ({ src, className }: AsciiPortraitProps) => {
	const canvasRef = useRef<HTMLCanvasElement | null>(null)
	const { isDark } = useTheme()

	useEffect(() => {
		const canvas = canvasRef.current
		if (!canvas) return

		let cancelled = false
		const img = new Image()
		img.src = src

		const render = () => {
			if (cancelled || !canvas.offsetWidth || !canvas.offsetHeight) return

			const width = canvas.offsetWidth
			const height = canvas.offsetHeight
			const dpr = Math.min(window.devicePixelRatio || 1, 2)
			canvas.width = width * dpr
			canvas.height = height * dpr

			const cols = Math.floor(width / CELL)
			const rows = Math.floor(height / CELL)

			// Reamostra a imagem em cols×rows com corte "cover" centralizado,
			// espelhando o object-cover da foto por baixo
			const sample = document.createElement('canvas')
			sample.width = cols
			sample.height = rows
			const sampleCtx = sample.getContext('2d', { willReadFrequently: true })
			if (!sampleCtx) return

			const scale = Math.max(cols / img.width, rows / img.height)
			const cropWidth = cols / scale
			const cropHeight = rows / scale
			const cropX = (img.width - cropWidth) / 2
			const cropY = (img.height - cropHeight) / 2
			sampleCtx.drawImage(img, cropX, cropY, cropWidth, cropHeight, 0, 0, cols, rows)
			const pixels = sampleCtx.getImageData(0, 0, cols, rows).data

			const ctx = canvas.getContext('2d')
			if (!ctx) return
			ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
			ctx.fillStyle = isDark ? '#050505' : '#f5f5f3'
			ctx.fillRect(0, 0, width, height)
			ctx.fillStyle = isDark ? '#ffffff' : '#111111'
			ctx.font = `${CELL + 2}px monospace`
			ctx.textBaseline = 'top'

			for (let y = 0; y < rows; y++) {
				for (let x = 0; x < cols; x++) {
					const i = (y * cols + x) * 4
					const luminance = (0.2126 * pixels[i] + 0.7152 * pixels[i + 1] + 0.0722 * pixels[i + 2]) / 255
					// No tema escuro áreas claras viram caracteres densos; no claro, o inverso
					const intensity = isDark ? luminance : 1 - luminance
					const char = RAMP[Math.round(intensity * (RAMP.length - 1))]
					if (char !== ' ') {
						ctx.fillText(char, x * CELL, y * CELL)
					}
				}
			}
		}

		if (img.complete) render()
		else img.onload = render

		window.addEventListener('resize', render)
		return () => {
			cancelled = true
			window.removeEventListener('resize', render)
		}
	}, [src, isDark])

	return <canvas ref={canvasRef} aria-hidden='true' className={className} />
}
