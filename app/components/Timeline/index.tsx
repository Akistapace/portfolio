import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import style from './style.module.css'

interface TimelineEvent {
	title: string
	description: string
	date?: string
}

interface Props {
	events: TimelineEvent[]
}

const Timeline = ({ events }: Props) => {
	return (
		<div className={style.container}>
			<div className='relative mx-auto max-w-6xl w-full py-10 px-4'>
				<div className='absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-gray-50' />

				<div className='flex flex-col gap-16 w-full'>
					{events.map((event, index) => {
						const isLeft = index % 2 === 0
						const ref = useRef(null)
						const inView = useInView(ref, { once: false })

						const animation = {
							hidden: {
								opacity: 0,
								x: isLeft ? -50 : 50,
							},
							visible: {
								opacity: 1,
								x: 0,
								transition: {
									duration: 0.6,
									ease: 'easeOut',
								},
							},
						}

						return (
							<div
								key={event.title}
								className={`w-full ml-4 relative flex flex-col md:flex-row items-center ${isLeft ? 'md:justify-end' : 'md:justify-start'}`}
							>
								<motion.div
									ref={ref}
									variants={animation}
									initial='hidden'
									animate={inView ? 'visible' : 'hidden'}
									className={`
                    w-full md:w-md px-4
                    flex justify-center md:justify-
                    md:order-${isLeft ? '1' : '2'}
										 ${isLeft ? 'md:mr-8' : 'md:ml-8'}
                  `}
									style={{ marginRight: isLeft ? 0 : '5%', marginLeft: isLeft ? '5%' : 0 }}
								>
									<div className='p-6 rounded-2xl w-full text-center'>
										<h3 className='text-xl font-semibold text-gray-800 dark:text-white mb-6'>{event.title}</h3>
										<p className='mt-2 text-gray-600 dark:text-gray-300'>{event.description}</p>
									</div>
								</motion.div>

								{/* Dot */}
								<div className='z-10 w-25 h-10 rounded-full font-bold flex items-center justify-center  absolute left-1/2 transform -translate-x-1/2 bg-gray-50'>
									{event?.date}
								</div>
							</div>
						)
					})}
				</div>
			</div>
		</div>
	)
}

export default Timeline
