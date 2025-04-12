import { Tilt } from '@jdion/tilt-react'
import Image from 'next/image'
import StackIcon from 'tech-stack-icons'
import styles from '../styles.module.css'

function stringToCssClass(str: string): string {
	return (
		str
			.toLowerCase()
			.normalize('NFD') // separa letras de acentos
			// biome-ignore lint/suspicious/noMisleadingCharacterClass: <explanation>
			.replace(/[\u0300-\u036f]/g, '') // remove acentos
			.replace(/[^a-z0-9]/g, '')
	) // remove tudo que não for letra ou número
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
			<div className='flex flex-col items-center w-1/2'>
				<Tilt style={{ height: 400, width: 400 }} className={`${styles.image} ${styles[stringToCssClass(title)]}`}>
					<Image
						loading='lazy'
						src={`${thumb}`}
						width={300}
						height={300}
						alt={title}
						className={`${styles.logos} ${styles.floating}`}
					/>
				</Tilt>
			</div>
			<div className='flex flex-col items-center justify-center text-center w-1/2' style={{ padding: '0 30px' }}>
				<p className={styles.title}>{title}</p>
				<p className={styles.description}>{description}</p>
				<div className={`${styles.stacks}`}>
					<h2 className={styles.subtitle}>Stacks</h2>
					<div className='flex gap-3'>
						{stacks?.map((name: string) => (
							<span key={name}>
								<StackIcon name={name} className={styles.icon} />
							</span>
						))}
					</div>
				</div>
				<button type='button' className={styles.button}>
					Ver Projeto
				</button>
			</div>
		</div>
	)
}
