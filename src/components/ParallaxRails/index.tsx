import { motion, useScroll, useSpring, useTransform } from 'framer-motion'

/**
 * Trilhos decorativos fixos nas laterais que reagem ao scroll:
 * glifos em parallax (velocidades e direções diferentes) à esquerda e
 * linha de progresso de leitura + rótulo vertical à direita.
 */
export const ParallaxRails = () => {
	const { scrollYProgress } = useScroll()
	const progress = useSpring(scrollYProgress, { stiffness: 100, damping: 30 })

	const driftSlow = useTransform(scrollYProgress, [0, 1], [0, -260])
	const driftFast = useTransform(scrollYProgress, [0, 1], [0, -620])
	const driftReverse = useTransform(scrollYProgress, [0, 1], [0, 380])

	return (
		<div aria-hidden='true' className='pointer-events-none fixed inset-0 z-20 hidden lg:block'>
			{/* Trilho esquerdo: glifos flutuando em parallax */}
			<div className='absolute inset-y-0 left-8'>
				<div className='absolute inset-y-0 left-1/2 w-px bg-gradient-to-b from-transparent via-neutral-400/30 to-transparent dark:via-white/15' />
				<motion.div
					style={{ y: driftSlow }}
					className='absolute top-[35%] flex flex-col items-center gap-28 text-xs text-neutral-500/80 dark:text-white/40'
				>
					<span>+</span>
					<span>·</span>
					<span>✦</span>
					<span>+</span>
					<span>·</span>
				</motion.div>
				<motion.div
					style={{ y: driftReverse }}
					className='absolute top-[15%] left-3 flex flex-col items-center gap-40 text-[10px] text-neutral-400/70 dark:text-white/25'
				>
					<span>·</span>
					<span>+</span>
					<span>·</span>
					<span>✦</span>
				</motion.div>
				<motion.div
					style={{ y: driftFast }}
					className='absolute top-[70%] -left-2 flex flex-col items-center gap-52 text-sm text-neutral-500/60 dark:text-white/30'
				>
					<span>✦</span>
					<span>+</span>
				</motion.div>
			</div>

			{/* Trilho direito: progresso de scroll + rótulo vertical */}
			<div className='absolute inset-y-0 right-8'>
				<div className='absolute inset-y-0 left-1/2 w-px bg-neutral-400/20 dark:bg-white/10' />
				<motion.div
					style={{ scaleY: progress }}
					className='absolute inset-y-0 left-1/2 w-px origin-top bg-neutral-900/50 dark:bg-white/60'
				/>
				<motion.span
					style={{ y: driftSlow }}
					className='absolute top-[55%] right-4 text-[10px] uppercase tracking-[0.5em] text-neutral-500/70 dark:text-white/30 [writing-mode:vertical-rl]'
				>
					Fernando Aquistapace · Portfólio
				</motion.span>
			</div>
		</div>
	)
}

export default ParallaxRails
