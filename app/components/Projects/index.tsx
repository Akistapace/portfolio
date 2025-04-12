'use client'

import { useRef } from 'react'
import 'swiper/css'
import 'swiper/css/autoplay'
import { Autoplay, Navigation } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'
import projects from '../../contents/projects.json'
import { Card } from './Card'
import styles from './styles.module.css'

export const Projects = ({ reverse }: { reverse?: boolean }) => {
	const swiperRef = useRef<unknown>(null)

	const onSwiper = (swiper: unknown) => {
		swiperRef.current = swiper
	}

	return (
		<div className='container flex flex-col gap-10'>
			<Swiper
				onSwiper={onSwiper}
				spaceBetween={20}
				slidesPerView={1}
				loop={true}
				autoplay={{ disableOnInteraction: false, pauseOnMouseEnter: true }}
				speed={4000}
				direction='horizontal'
				modules={[Autoplay, Navigation]}
				navigation
				className={styles.swiper}
				wrapperClass='w-full'
			>
				{projects?.map(tech => (
					<SwiperSlide key={tech.id} className={'w-full'} title={tech.title}>
						<Card
							key={tech.id}
							color={tech.mainColor}
							thumb={tech.thumb}
							title={tech.title}
							description={tech.description}
							stacks={tech.stacks}
						/>
					</SwiperSlide>
				))}
			</Swiper>
		</div>
	)

	// return (
	// 	<Swiper
	// 		onSwiper={onSwiper}
	// 		spaceBetween={20}
	// 		slidesPerView={5}
	// 		loop={true}
	// 		autoplay={{ delay: 0, disableOnInteraction: false, pauseOnMouseEnter: true }}
	// 		speed={2000}
	// 		direction='horizontal'
	// 		modules={[Autoplay]}
	// 		dir={reverse ? 'rtl' : 'ltr'}
	// 		breakpoints={{
	// 			0: {
	// 				/* when window >=0px - webflow mobile landscape/portriat */
	// 				slidesPerView: 2,
	// 			},
	// 			480: {
	// 				/* when window >=0px - webflow mobile landscape/portriat */
	// 				slidesPerView: 2,
	// 			},
	// 			767: {
	// 				/* when window >= 767px - webflow tablet */
	// 				spaceBetween: 3,
	// 			},
	// 			992: {
	// 				/* when window >= 988px - webflow desktop */
	// 				spaceBetween: 5,
	// 			},
	// 		}}
	// 		className={styles.slider}
	// 		wrapperClass={styles.wrapper}
	// 	>
	// 		{projects?.map(tech => (
	// 			<SwiperSlide key={tech.id} className={'w-full'} title={tech.title}>
	// 				<Card thumb={tech.thumb} title={tech.title} description={tech.description} stacks={tech.stacks} />
	// 			</SwiperSlide>
	// 		))}
	// 	</Swiper>
	// )
}
