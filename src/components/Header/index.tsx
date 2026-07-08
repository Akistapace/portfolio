import { useEffect, useRef, useState } from 'react'

import { DownloadResumeButton } from '@/components/Resume'
import { ModeToggle } from '../ToggleTheme'

export const Header = () => {
	const headerRef = useRef<HTMLElement | null>(null)
	const [isHeaderVisible, setIsHeaderVisible] = useState(true)

	const scrollToSection = (id: string) => {
		const el = document.getElementById(id)
		if (el) {
			el.scrollIntoView({ behavior: 'smooth' })
		}
	}

	useEffect(() => {
		const header = headerRef.current
		if (!header) return

		const observer = new IntersectionObserver(([entry]) => setIsHeaderVisible(entry.isIntersecting), {
			threshold: 0,
		})

		observer.observe(header)

		return () => observer.disconnect()
	}, [])

	return (
		<>
			<header
				ref={headerRef}
				className=' items-center hidden md:flex justify-between w-full absolute top-0 z-10 bg-transparent backdrop-blur-sm h-16 '
			>
				<div className='flex items-center container mx-auto py-2 px-4 justify-between w-full h-full '>
					<div className='flex items-center gap-2 justify-between w-full'>
						<h1 className='text-md font-semibold text-black'>Fernando Aquistpace</h1>
						<ul className='gap-2 hidden md:flex items-center'>
							<li className='item-menu'>
								<button
									type='button'
									onClick={() => scrollToSection('about')}
									className='text-sm text-white dark:text-black'
								>
									About
								</button>
							</li>
							<li className='item-menu'>
								<button
									type='button'
									onClick={() => scrollToSection('experience')}
									className='text-sm text-white dark:text-black'
								>
									Experience
								</button>
							</li>
							<li className='item-menu'>
								<button
									type='button'
									onClick={() => scrollToSection('stacks')}
									className='text-sm text-white dark:text-black'
								>
									Stacks
								</button>
							</li>
							<li className='item-menu'>
								<button
									type='button'
									onClick={() => scrollToSection('projects')}
									className='text-sm text-white dark:text-black'
								>
									Projects
								</button>
							</li>
							<li className='item-menu'>
								<button
									type='button'
									onClick={() => scrollToSection('contact')}
									className='text-sm text-white dark:text-black'
								>
									Contact
								</button>
							</li>
							<li className='item-menu'>
								<DownloadResumeButton size='sm' className='shadow-md' />
							</li>
							<li>
								<ModeToggle />
							</li>
						</ul>
					</div>
				</div>
			</header>

			<div
				className={`fixed bottom-6 right-6 z-50 transition-all duration-300 ${
					isHeaderVisible ? 'opacity-0 translate-y-4 pointer-events-none' : 'opacity-100 translate-y-0'
				}`}
			>
				<DownloadResumeButton size='lg' className='rounded-full shadow-lg' />
			</div>
		</>
	)
}
