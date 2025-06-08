import { Eye } from 'lucide-react' // Ícone opcional

interface Props {
	project: {
		title: string
		description?: string
		thumb: string
		url: string
		video?: string
		stacks?: string[]
	}
}

export const Card = ({ project }: Props) => {
	const { title, thumb, url } = project

	return (
		<div className='flex items-center grayscale hover:grayscale-0 transition-all will-change-auto p-5 relative group cursor-pointer w-full overflow-hidden shadow-md bg-neutral-200 dark:bg-transparent'>
			<div className='floating w-full h-full p-4 flex items-center justify-center transition-transform duration-300 group-hover:scale-105'>
				<img
					loading='lazy'
					src={`/portfolio/images/${thumb}`}
					alt={title}
					className='mx-auto w-full  h-auto object-cover rounded-2xl'
				/>
			</div>

			<div className='absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center'>
				<a
					href={url}
					title={title}
					className='text-white text-sm sm:text-base flex flex-col items-center gap-2'
					target='_blank'
					rel='noreferrer'
				>
					<Eye className='w-7 h-7' />
				</a>
			</div>
		</div>
	)
}
