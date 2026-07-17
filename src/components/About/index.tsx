import { motion } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import { AsciiPortrait } from './AsciiPortrait'


const textVariants = {
	hidden: { opacity: 0 },
	visible: {
		opacity: 1,
		transition: {
			staggerChildren: 0.05,
			duration: 1,
		},
	},
}

const letterVariants = {
	hidden: { opacity: 0, y: 20 },
	visible: { opacity: 1, y: 0 },
}

export const About = () => {
	const { t } = useTranslation()

	const splitText = (text: string) => {
		return text.split('').map((char, index) => (
			// biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
			<motion.span key={index} variants={letterVariants} initial='hidden' animate='visible'>
				{char}
			</motion.span>
		))
	}

	return (
		<div className='container flex flex-col md:flex-row gap-10 px-4'>
			<div className='container flex px-4 justify-center items-center'>
				<motion.div
					className='group relative h-[300px] md:h-[550px] aspect-square overflow-hidden rounded-2xl'
					initial={{ opacity: 0, y: 20 }}
					whileInView={{ opacity: 1, y: 0 }}
					transition={{ duration: 1 }}
					viewport={{ amount: 0.8 }}
				>
					<img src='/portfolio/images/eu-gray.png' alt='Fernando Aquistapace' className='h-full w-full object-cover' />
					<AsciiPortrait
						src='/portfolio/images/eu.JPG'
						className='pointer-events-none absolute inset-0 h-full w-full opacity-0 transition-opacity duration-500 group-hover:opacity-100'
					/>
				</motion.div>

			</div>
			<div className='flex flex-col justify-center items-start gap-5 w-full text-md'>
				<div className='container text-black dark:text-white flex flex-col-reverse md:flex-col gap-5 text-center w-full max-w-2xl'>
					<motion.p initial='hidden' whileInView='visible' variants={textVariants} viewport={{ amount: 0.7 }}>
						{splitText(t('about.p1'))}
					</motion.p>
					<motion.p
						initial='hidden'
						whileInView='visible'
						variants={textVariants}
						transition={{ duration: 1, delay: 0.2 }}
						viewport={{ amount: 0.5 }}
					>
						{splitText(t('about.p2'))}
					</motion.p>
					<motion.p
						initial='hidden'
						whileInView='visible'
						variants={textVariants}
						transition={{ duration: 1, delay: 0.4 }}
						viewport={{ amount: 0.7 }}
					>
						{splitText(t('about.p3'))}
					</motion.p>
				</div>
			</div>
		</div>
	)
}
