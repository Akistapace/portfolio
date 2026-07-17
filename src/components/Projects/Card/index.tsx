import { Eye } from 'lucide-react' // Ícone opcional

interface Props {
	project: {
		title: string
		description?: Record<string, string>
		thumb: string
		url: string
		video?: string
		stacks?: string[]
	}
}

export const Card = ({ project }: Props) => {
	const { title, thumb, url } = project

	return (
		<div className='flex items-center transition-all will-change-auto p-5 relative group cursor-pointer w-full h-full overflow-hidden shadow-md bg-neutral-200 dark:bg-transparent rounded-2xl'>
			<div className='w-full aspect-[21/10] flex items-center justify-center'>
				<img
					loading='lazy'
					src={`/portfolio/images/${thumb}`}
					alt={title}
					className='mx-auto w-full h-full object-cover rounded-2xl pointer-events-none'
					draggable={false}
				/>
			</div>

			<a
				href={url}
				title={title}
				rel='noreferrer'
				target='_blank'
				className='absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center'
			>
				<Eye className='w-7 h-7' color='white' />
			</a>
		</div>
	)
}
