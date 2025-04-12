import { motion } from 'framer-motion'
import styles from './style.module.css'

const textVariants = {
	hidden: { opacity: 0 },
	visible: {
		opacity: 1,
		transition: {
			staggerChildren: 0.05, // Intervalo de animação entre as letras
			duration: 1,
		},
	},
}

const letterVariants = {
	hidden: { opacity: 0, y: 20 },
	visible: { opacity: 1, y: 0 },
}

export const About = () => {
	// Função para separar o texto em spans individuais
	const splitText = (text: string) => {
		return text.split('').map((char, index) => (
			// biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
			<motion.span key={index} variants={letterVariants} initial='hidden' animate='visible'>
				{char}
			</motion.span>
		))
	}

	return (
		<div className='container flex'>
			<div className={`${styles.box} container`}>
				<motion.img
					src='https://placehold.jp/450x450.png'
					alt='Fernando Aquistapace'
					className={styles.image}
					initial={{ opacity: 0, y: 20 }}
					whileInView={{ opacity: 1, y: 0 }}
					transition={{ duration: 1 }}
					viewport={{ amount: 0.8 }}
				/>
			</div>
			<div className={styles.box}>
				<div className='container'>
					<motion.p initial='hidden' whileInView='visible' variants={textVariants} viewport={{ amount: 0.7 }}>
						{splitText(
							"Hi! I'm Fernando Aquistapace, a Front-end Developer focused on performance and user experience. I've worked on large-scale e-commerce projects, such as the Samsung Argentina and Brazil stores, contributing with optimizations and technical improvements."
						)}
					</motion.p>
					<motion.p
						initial='hidden'
						whileInView='visible'
						variants={textVariants}
						transition={{ duration: 1, delay: 0.2 }}
						viewport={{ amount: 0.5 }} // Ativa a animação toda vez que 50% do parágrafo estiver visível
					>
						{splitText(
							"I've worked with companies like CoreBiz, Vnda Ecommerce, and Nerau CX, and also spent some time in an Argentine squad, focusing on maintaining and evolving a large online store. Throughout my journey, I’ve worked with technologies like JavaScript, Liquid, HTML, and CSS, always aiming to deliver functional and efficient interfaces."
						)}
					</motion.p>
					<motion.p
						initial='hidden'
						whileInView='visible'
						variants={textVariants}
						transition={{ duration: 1, delay: 0.4 }}
						viewport={{ amount: 0.7 }}
					>
						{splitText(
							'My degree in Systems Analysis and Development from FADERGS (2021) marked the transition from the administrative field to development — where I discovered my true passion: creating digital experiences that truly make a difference.'
						)}
					</motion.p>
				</div>
			</div>
		</div>
	)
}
