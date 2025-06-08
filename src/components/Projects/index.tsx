import projects from '../../contents/projects.json'
import { Card } from './Card'

export const Projects = () => {
	return (
		<div className='container flex flex-col'>
			<div className='grid grid-cols-1 md:grid-cols-3 gap-2 place-items-center justify-center'>
				{projects?.map(tech => (
					<Card key={tech.id} project={tech} />
				))}
			</div>
		</div>
	)
}
