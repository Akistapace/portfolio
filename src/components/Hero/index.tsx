import { motion, type Variants } from 'framer-motion'
import { useTranslation } from 'react-i18next'

const container: Variants = {
	hidden: {},
	visible: {
		transition: { staggerChildren: 0.18, delayChildren: 0.3 },
	},
}

const item: Variants = {
	hidden: { opacity: 0, y: 24 },
	visible: { opacity: 1, y: 0, transition: { duration: 0.9, ease: [0.22, 1, 0.36, 1] } },
}

export const Hero = () => {
	const { t } = useTranslation()

	const scrollToSection = (id: string) => {
		document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
	}

	return (
		<section className='relative flex h-screen w-full flex-col items-center justify-center overflow-hidden px-4'>
			<motion.div
				className='flex flex-col items-center text-center'
				variants={container}
				initial='hidden'
				animate='visible'
			>
				<motion.span
					variants={item}
					className='mb-6 text-[11px] md:text-xs uppercase tracking-[0.4em] text-neutral-500 dark:text-neutral-400'
				>
					{t('hero.eyebrow')}
				</motion.span>

				<motion.h1
					variants={item}
					className='title text-neutral-900 dark:text-white !text-4xl md:!text-7xl lg:!text-8xl leading-tight'
				>
					Fernando Aquistapace
				</motion.h1>

				<motion.p variants={item} className='subtitle mt-4 max-w-xl text-neutral-600 dark:text-neutral-300'>
					{t('hero.tagline')}
				</motion.p>

				<motion.div variants={item} className='mt-10 flex flex-wrap items-center justify-center gap-4'>
					<button
						type='button'
						onClick={() => scrollToSection('projects')}
						className='rounded-full bg-neutral-900 px-7 py-3 text-sm font-medium text-white transition-transform hover:scale-105 dark:bg-white dark:text-black'
					>
						{t('hero.viewProjects')}
					</button>
					<button
						type='button'
						onClick={() => scrollToSection('contact')}
						className='rounded-full border border-neutral-400/60 px-7 py-3 text-sm font-medium text-neutral-800 backdrop-blur-sm transition-colors hover:border-neutral-800 dark:border-white/30 dark:text-white dark:hover:border-white'
					>
						{t('hero.contact')}
					</button>
				</motion.div>
			</motion.div>

			<motion.div
				className='absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2'
				initial={{ opacity: 0 }}
				animate={{ opacity: 1 }}
				transition={{ delay: 2, duration: 1 }}
			>
				<span className='text-[10px] uppercase tracking-[0.3em] text-neutral-500 dark:text-neutral-400'>
					{t('hero.scroll')}
				</span>
				<div className='flex h-9 w-5 items-start justify-center rounded-full border border-neutral-400 p-1.5 dark:border-neutral-500'>
					<div className='h-1.5 w-1 animate-bounce rounded-full bg-neutral-700 dark:bg-neutral-200' />
				</div>
			</motion.div>
		</section>
	)
}

export default Hero
