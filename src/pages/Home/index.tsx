import { About } from '@/components/About'
import { Projects } from '@/components/Projects'
import SliderStacks from '@/components/SliderStacks'
import StarField from '@/components/StarField'
import Timeline from '@/components/Timeline'
import { Suspense, lazy, useEffect, useRef, useState } from 'react'

const LazyHollowGlobe = lazy(() => import('@/components/Globe/HollowGlobe'))

export default function HomePage() {
	const globeTriggerRef = useRef<HTMLDivElement | null>(null)
	const [shouldLoadGlobe, setShouldLoadGlobe] = useState(false)

	useEffect(() => {
		if (!globeTriggerRef.current) return

		const observer = new IntersectionObserver(
			entries => {
				for (const entry of entries) {
					if (entry.isIntersecting) {
						setShouldLoadGlobe(true)
						observer.disconnect()
					}
				}
			},
			{
				rootMargin: '200px',
			}
		)

		observer.observe(globeTriggerRef.current)

		return () => observer.disconnect()
	}, [])

	return (
		<div className='mx-auto w-full relative flex flex-col items-center justify-center  overflow-hidden'>
			<section className='h-screen w-full'>
				<StarField />
			</section>

			<div className='w-full bg-stone-300 dark:bg-black relative' id='about'>
				<div className='stars' />
				<div className='container mx-auto flex flex-col items-center justify-center pt-[100px] md:pt-[150px] pb-[50px] md:pb-[100px]'>
					<h2 className='title text-black dark:text-white text-center' title='about'>
						About Me
					</h2>
					<p className='text-black dark:text-white text-center mt-4 mb-20'>Let me introduce myself</p>
					<About />
				</div>
			</div>
			<div className='w-full bg-stone-300 dark:bg-black relative' id='experience'>
				<div className='stars' />
				<div className='container mx-auto flex flex-col items-center justify-center pt-[100px] md:pt-[150px] pb-[50px] md:pb-[120px]'>
					<h2 className='title text-black dark:text-white text-center' title='about'>
						Experience
					</h2>
					<p className='text-black dark:text-white text-center mt-4'>
						Here you can find my experience as a Front-end developer
					</p>
					<Timeline />
				</div>
			</div>
			<div className='w-full bg-stone-300 dark:bg-black relative' id='stacks'>
				<div className='stars' />
				<div className='flex flex-col items-center justify-center pt-[100px] md:pt-[150px] pb-[50px] md:pb-[80px]'>
					<h2 className='container mx-auto title text-black dark:text-white text-center' title='about'>
						Stacks
					</h2>
					<p className='container mx-auto text-black dark:text-white text-center mt-4 mb-20'>
						Here you can find my main stacks as a Front-end developer
					</p>
					<SliderStacks />
				</div>

				<div ref={globeTriggerRef} />
			</div>
			<div className='w-full bg-stone-300 dark:bg-black relative' id='projects'>
				<div className='stars' />
				<div className='container mx-auto flex flex-col items-center justify-center pt-[100px] md:pt-[150px] pb-[50px] md:pb-[100px] px-4'>
					<h2 className='title text-black dark:text-white text-center ' title='about'>
						Projects
					</h2>
					<p className='text-black dark:text-white text-center mt-4 mb-20'>
						Here you can find some of my projects as a Front-end developer
					</p>
					<Projects />
				</div>
			</div>

			<section className='w-full overflow-hidden bg-stone-300 dark:bg-black ' id='contact'>
				<div className='stars' />
				<div className='flex flex-col items-center justify-center overflow-hidden'>
					<div className='container mx-auto pt-[100px] flex flex-col items-center justify-center'>
						<h2 className='title text-center text-black dark:text-white' title='contact'>
							Let&apos;s change the world
						</h2>
						<p className='text-center mt-4 text-black dark:text-white'>
							Reach out to me today and let&apos;s discuss how I can help you achieve your goals.
						</p>

						<div className='flex gap-4 mt-10'>
							<a
								href='https://br.linkedin.com/in/fernando-aquistaoace-33a414165/pt'
								target='_blank'
								rel='noreferrer'
								className='invert dark:invert-0'
							>
								<svg xmlns='http://www.w3.org/2000/svg' width='48' height='48' viewBox='0 0 48 48' fill='none'>
									<title>LinkedIn Icon</title>
									<g clipPath='url(#clip0_17_68)'>
										<path
											d='M44.4469 0H3.54375C1.58437 0 0 1.54688 0 3.45938V44.5312C0 46.4437 1.58437 48 3.54375 48H44.4469C46.4062 48 48 46.4438 48 44.5406V3.45938C48 1.54688 46.4062 0 44.4469 0ZM14.2406 40.9031H7.11563V17.9906H14.2406V40.9031ZM10.6781 14.8688C8.39062 14.8688 6.54375 13.0219 6.54375 10.7437C6.54375 8.46562 8.39062 6.61875 10.6781 6.61875C12.9563 6.61875 14.8031 8.46562 14.8031 10.7437C14.8031 13.0125 12.9563 14.8688 10.6781 14.8688ZM40.9031 40.9031H33.7875V29.7656C33.7875 27.1125 33.7406 23.6906 30.0844 23.6906C26.3812 23.6906 25.8187 26.5875 25.8187 29.5781V40.9031H18.7125V17.9906H25.5375V21.1219H25.6312C26.5781 19.3219 28.9031 17.4188 32.3625 17.4188C39.5719 17.4188 40.9031 22.1625 40.9031 28.3313V40.9031Z'
											fill='white'
										/>
									</g>
									<defs>
										<clipPath id='clip0_17_68'>
											<rect width='48' height='48' fill='white' />
										</clipPath>
									</defs>
								</svg>
							</a>

							<a href='https://github.com/Akistapace' target='_blank' rel='noreferrer' className='invert dark:invert-0'>
								<svg xmlns='http://www.w3.org/2000/svg' width='48' height='48' viewBox='0 0 48 48' fill='none'>
									<title>LinkedIn Icon</title>
									<g clipPath='url(#clip0_910_44)'>
										<path
											fillRule='evenodd'
											clipRule='evenodd'
											d='M24.0199 0C10.7375 0 0 10.8167 0 24.1983C0 34.895 6.87988 43.9495 16.4241 47.1542C17.6174 47.3951 18.0545 46.6335 18.0545 45.9929C18.0545 45.4319 18.0151 43.509 18.0151 41.5055C11.3334 42.948 9.94198 38.6209 9.94198 38.6209C8.86818 35.8164 7.27715 35.0956 7.27715 35.0956C5.09022 33.6132 7.43645 33.6132 7.43645 33.6132C9.86233 33.7735 11.1353 36.0971 11.1353 36.0971C13.2824 39.7827 16.7422 38.7413 18.1341 38.1002C18.3328 36.5377 18.9695 35.456 19.6455 34.8552C14.3163 34.2942 8.70937 32.211 8.70937 22.9161C8.70937 20.2719 9.66321 18.1086 11.1746 16.4261C10.9361 15.8253 10.1008 13.3409 11.4135 10.0157C11.4135 10.0157 13.4417 9.3746 18.0146 12.4996C19.9725 11.9699 21.9916 11.7005 24.0199 11.6982C26.048 11.6982 28.1154 11.979 30.0246 12.4996C34.5981 9.3746 36.6262 10.0157 36.6262 10.0157C37.9389 13.3409 37.1031 15.8253 36.8646 16.4261C38.4158 18.1086 39.3303 20.2719 39.3303 22.9161C39.3303 32.211 33.7234 34.2539 28.3544 34.8552C29.2296 35.6163 29.9848 37.0584 29.9848 39.3421C29.9848 42.5871 29.9454 45.1915 29.9454 45.9924C29.9454 46.6335 30.383 47.3951 31.5758 47.1547C41.12 43.949 47.9999 34.895 47.9999 24.1983C48.0392 10.8167 37.2624 0 24.0199 0Z'
											fill='white'
										/>
									</g>
									<defs>
										<clipPath id='clip0_910_44'>
											<rect width='48' height='48' fill='white' />
										</clipPath>
									</defs>
								</svg>
							</a>
						</div>
					</div>

					{shouldLoadGlobe && (
						<Suspense fallback={<></>}>
							<LazyHollowGlobe />
						</Suspense>
					)}
				</div>
			</section>
		</div>
	)
}
