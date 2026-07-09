import { ChevronLeft, ChevronRight } from 'lucide-react'
import { useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { EffectCoverflow, Navigation, Pagination } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'
import type { Swiper as SwiperType } from 'swiper/types'
import projects from '../../contents/projects.json'
import { Card } from './Card'

import 'swiper/css'
import 'swiper/css/effect-coverflow'
import 'swiper/css/navigation'
import 'swiper/css/pagination'

export const Projects = () => {
	const { t, i18n } = useTranslation()
	const [active, setActive] = useState(0)
	const swiperRef = useRef<SwiperType | null>(null)
	const activeProject = projects[active]
	const lang = i18n.language as keyof typeof activeProject.description
	const description = activeProject.description[lang] ?? activeProject.description.en

	return (
		<div className='w-full flex flex-col items-center gap-6'>
			<div className='w-full relative projectsSwiper'>
				<Swiper
					modules={[EffectCoverflow, Navigation, Pagination]}
					onSwiper={swiper => {
						swiperRef.current = swiper
					}}
					onSlideChange={swiper => setActive(swiper.realIndex)}
					effect='coverflow'
					grabCursor
					centeredSlides
					loop
					slidesPerView='auto'
					coverflowEffect={{
						rotate: 0,
						stretch: 0,
						depth: 300,
						modifier: 2.8,
						slideShadows: false,
					}}
					pagination={{ clickable: true }}
					className='!py-12'
				>
					{projects.map(project => (
						<SwiperSlide key={project.id} className='!w-[320px] md:!w-[600px] lg:!w-[820px]'>
							<Card project={project} />
						</SwiperSlide>
					))}
				</Swiper>

				<button
					type='button'
					aria-label={t('projects.prev')}
					onClick={() => swiperRef.current?.slidePrev()}
					className='absolute left-0 md:left-4 top-1/2 -translate-y-1/2 z-10 p-2 rounded-full bg-neutral-200/80 dark:bg-neutral-800/80 text-black dark:text-white hover:scale-110 transition-transform cursor-pointer'
				>
					<ChevronLeft className='w-6 h-6' />
				</button>
				<button
					type='button'
					aria-label={t('projects.next')}
					onClick={() => swiperRef.current?.slideNext()}
					className='absolute right-0 md:right-4 top-1/2 -translate-y-1/2 z-10 p-2 rounded-full bg-neutral-200/80 dark:bg-neutral-800/80 text-black dark:text-white hover:scale-110 transition-transform cursor-pointer'
				>
					<ChevronRight className='w-6 h-6' />
				</button>
			</div>

			<div className='text-center max-w-2xl px-4 min-h-[90px]'>
				<h3 className='text-xl font-bold text-black dark:text-white'>{activeProject.title}</h3>
				<p className='text-sm text-neutral-600 dark:text-neutral-400 mt-2'>{description}</p>
			</div>
		</div>
	)
}
