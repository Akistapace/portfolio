import { ModeToggle } from '../ToggleTheme'

export const Header = () => {
	const scrollToSection = (id: string) => {
		const el = document.getElementById(id)
		if (el) {
			el.scrollIntoView({ behavior: 'smooth' })
		}
	}

	return (
		<header className=' items-center hidden md:flex justify-between w-full absolute top-0 z-10 bg-transparent backdrop-blur-sm h-16 '>
			<div className='flex items-center container mx-auto py-2 px-4 justify-between w-full h-full '>
				<div className='flex items-center gap-2 justify-between w-full'>
					<h1 className='text-md font-semibold text-black'>Fernando Aquistpace</h1>
					<ul className='gap-2 hidden md:flex'>
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
						<li>
							<ModeToggle />
						</li>
					</ul>
				</div>
			</div>
		</header>
	)
}
