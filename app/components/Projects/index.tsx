'use client'

import 'swiper/css'
import 'swiper/css/autoplay'
import projects from '../../contents/projects.json'
import { Card } from './Card'

export const Projects = ({ reverse }: { reverse?: boolean }) => {
	return (
		<div className='container flex flex-col gap-10'>
			<div className='grid grid-cols-1 md:grid-cols-4 gap-10 place-items-center'>
				{projects?.map(tech => (
					<Card
						key={tech.id}
						color={tech.mainColor}
						thumb={tech.thumb}
						title={tech.title}
						description={tech.description}
						stacks={tech.stacks}
					/>
				))}
			</div>
		</div>
	)
}
