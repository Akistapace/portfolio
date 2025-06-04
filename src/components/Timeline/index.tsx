import timeline from '@/contents/timeline.json'
import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'

const Timeline = () => {
	return (
		<div className='flex items-center justify-center'>
			<div className='relative mx-auto max-w-6xl w-full py-10 px-4'>
				{/* Linha branca central apenas em md+ */}
				<div className='hidden md:block absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-gray-400 dark:bg-white' />

				<div className='flex flex-col gap-20 w-full'>
					{timeline.map((event, index) => {
						const isLeft = index % 2 === 0
						const ref = useRef(null)
						const inView = useInView(ref, { once: true })

						const animation = {
							hidden: { opacity: 0, x: isLeft ? -50 : 50 },
							visible: {
								opacity: 1,
								x: 0,
								transition: { duration: 0.6, ease: 'easeOut' },
							},
						}

						return (
							<div
								key={event.title}
								className={`relative flex flex-col md:flex-row items-center w-full mt-[70px]  md:mb-0 ${isLeft ? 'md:justify-end' : 'md:justify-start'}`}
							>
								{/* Texto com animação */}
								<motion.div
									ref={ref}
									variants={animation}
									initial='hidden'
									animate={inView ? 'visible' : 'hidden'}
									className={`
										
										md:w-1/2 w-full px-4
										flex justify-center
										md:order-${isLeft ? '1' : '2'}
										${isLeft ? 'md:pr-8' : 'md:pl-8'}
										sm:m-0
									`}
								>
									<div className='md:p-6 md:mx-6 rounded-2xl w-full text-center sm:text-left shadow-md '>
										<h3 className='text-xl font-semibold text-black dark:text-white mb-4'>{event.title}</h3>
										<p className='text-black dark:text-gray-300'>{event.description}</p>
									</div>
								</motion.div>

								{/* Data centralizada */}
								<div className='z-10 w-24 h-10 rounded-full font-bold text-sm flex items-center justify-center absolute left-1/2 transform -translate-x-1/2 bg-white text-gray-800 md:top-0 -top-[60px] shadow'>
									{event.date}
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
