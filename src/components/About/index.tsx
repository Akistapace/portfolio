import { motion } from 'framer-motion'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'


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
	const [hovered, setHovered] = useState(false)

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
			<div
				className='container flex px-4 justify-center items-center transition-all'
				onMouseEnter={() => setHovered(true)}
				onMouseLeave={() => setHovered(false)}
			>
				<motion.img
					src={hovered ? '/portfolio/images/eu.JPG' : '/portfolio/images/eu-gray.JPG'}
					alt='Fernando Aquistapace'
					className='rounded-2xl h-[300px] md:h-[450px] aspect-square object-cover'
					initial={{ opacity: 0, y: 20 }}
					whileInView={{ opacity: 1, y: 0 }}
					transition={{ duration: 1 }}
					viewport={{ amount: 0.8 }}
				/>
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
