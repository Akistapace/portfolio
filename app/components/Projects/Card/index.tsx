import { Tilt } from '@jdion/tilt-react'
import Image from 'next/image'
import styles from '../styles.module.css'

function stringToCssClass(str: string): string {
	return (
		str
			.toLowerCase()
			.normalize('NFD')
			// biome-ignore lint/suspicious/noMisleadingCharacterClass: <explanation>
			.replace(/[\u0300-\u036f]/g, '') // remove acentos
			.replace(/[^a-z0-9]/g, '')
	)
}

export const Card = ({
	thumb,
	title,
	description,
	stacks,
	color,
}: { thumb: string; title: string; color: string; description: string; stacks: string[]; className?: string }) => {
	// biome-ignore lint/suspicious/noConsole: <explanation>
	console.log('=>', stringToCssClass(title))
	return (
		<div className={`flex w-full ${styles.card}`}>
			<div className='mx-auto flex flex-col items-center'>
				<Tilt style={{ height: 220, width: 250 }} className={`${styles.image} ${styles[stringToCssClass(title)]}`}>
					<Image
						loading='lazy'
						src={`${thumb}`}
						width={250}
						height={250}
						alt={title}
						className={`${styles.logos} ${styles.floating}`}
					/>
				</Tilt>
				<h3 className='text-md text-white'>{title}</h3>
				<button
					type='button'
					className='bg-transparent border-1 border-white hover:bg-white hover:text-black text-white py-1.5 px-4 rounded-full mt-3'
				>
					Ver Projeto
				</button>
			</div>
		</div>
	)
}
