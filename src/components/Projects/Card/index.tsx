import { Dialog, DialogContent, DialogTitle, DialogTrigger } from '@/components/ui'
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
	const { title, description, thumb, url, video, stacks = [] } = project

	return (
		<Dialog>
			<DialogTrigger asChild>
				<div className='flex items-center p-5 relative group cursor-pointer w-full aspect-square rounded-2xl overflow-hidden shadow-md'>
					<img
						loading='lazy'
						src={thumb}
						alt={title}
						className='floating w-full h-auto object-cover rounded-2xl transition-transform duration-300 group-hover:scale-105'
					/>

					<div className='absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center'>
						<div className='text-white text-sm sm:text-base flex items-center gap-2'>
							<Eye className='w-5 h-5' />
							<span>Ver mais</span>
						</div>
					</div>
				</div>
			</DialogTrigger>

			<DialogContent className='w-full max-w-[90vw] sm:max-w-2xl bg-stone-900 border-0 text-white rounded-xl shadow-lg p-4 sm:p-6'>
				<DialogTitle className='text-xl sm:text-3xl font-semibold mb-4 text-center'>{title}</DialogTitle>

				{video && (
					<video
						src={video}
						autoPlay
						muted
						loop
						playsInline
						controls={false}
						className='rounded-lg w-full max-h-[200px] sm:max-h-[300px] object-cover mb-4'
					/>
				)}

				{description && (
					<p className='mb-4 text-sm sm:text-base leading-relaxed text-stone-300 text-justify'>{description}</p>
				)}

				<p className='text-sm sm:text-base mb-4 text-center'>
					<a
						href={url}
						target='_blank'
						rel='noreferrer'
						className='underline text-blue-400 hover:text-blue-300 transition'
					>
						Visitar site
					</a>
				</p>

				{stacks?.length > 0 && (
					<div className='flex flex-wrap gap-2 justify-center mt-4'>
						{stacks.map(stack => (
							<span
								key={stack}
								className='bg-stone-700 text-white text-[10px] sm:text-xs px-2 sm:px-3 py-1 rounded-full uppercase tracking-wide'
							>
								{stack}
							</span>
						))}
					</div>
				)}
			</DialogContent>
		</Dialog>
	)
}
