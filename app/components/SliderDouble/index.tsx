'use client'

import { Icons } from '@/app/components/Icons'
import { useEffect, useRef, useState } from 'react'
import 'swiper/css'
import 'swiper/css/autoplay'
import { Autoplay } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'
import StackIcon from 'tech-stack-icons'
import styles from './style.module.css'

const techLogos = [
	'typescript',
	'js',
	'reactjs',
	'graphql',
	'css3',
	'sass',
	'jest',
	'nodejs',
	'nextjs',
	'git',
	'webpack',
	'vitejs',
	'reactquery',
	'gulp',
	'gitlab',
	'github',
	'wordpress',
	'eslint',
	'prettier',
	'antd',
	'markdown',
	'zod',
]

const Slider = ({ reverse }: { reverse?: boolean }) => {
	const swiperRef = useRef<unknown>(null)
	const [images, setImages] = useState<{ [key: string]: string }>({})

	useEffect(() => {
		// Carregar as imagens dinamicamente
		const loadImages = async () => {
			const loadedImages: { [key: string]: string } = {}
			for (const tech of techLogos) {
				const icon = await Icons[tech as keyof typeof Icons]()
				loadedImages[tech] = icon.default.src
			}
			setImages(loadedImages)
		}

		loadImages()
	}, [])

	const logosToDisplay = reverse ? [...techLogos].reverse() : techLogos

	return (
		<Swiper
			// biome-ignore lint/suspicious/noAssignInExpressions: <explanation>
			onSwiper={swiper => (swiperRef.current = swiper)}
			spaceBetween={20}
			slidesPerView={5}
			loop={true}
			autoplay={{ delay: 0, disableOnInteraction: false, pauseOnMouseEnter: true }}
			speed={2000}
			direction='horizontal'
			modules={[Autoplay]}
			dir={reverse ? 'rtl' : 'ltr'}
			breakpoints={{
				0: {
					/* when window >=0px - webflow mobile landscape/portriat */
					slidesPerView: 2,
				},
				480: {
					/* when window >=0px - webflow mobile landscape/portriat */
					slidesPerView: 2,
				},
				767: {
					/* when window >= 767px - webflow tablet */
					spaceBetween: 3,
				},
				992: {
					/* when window >= 988px - webflow desktop */
					spaceBetween: 5,
				},
			}}
			className={styles.slider}
			wrapperClass={styles.wrapper}
		>
			{logosToDisplay.map((tech, index) => (
				<SwiperSlide key={tech} className={styles.slide} title={tech}>
					<div className={styles.card}>
						<StackIcon name={tech} className={styles.logos} />
					</div>
				</SwiperSlide>
			))}
		</Swiper>
	)
}

export default Slider
