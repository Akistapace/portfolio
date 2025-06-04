import projects from '../../contents/projects.json'
import { Card } from './Card'

export const Projects = () => {
	return (
		<div className='container flex flex-col'>
			<div className='grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-10 place-items-center'>
				{projects?.map(tech => (
					<Card key={tech.id} project={tech} />
				))}
			</div>
		</div>
	)
}
