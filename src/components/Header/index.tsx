import { ModeToggle } from '../ToggleTheme'

export const Header = () => {
	return (
		<header className=' items-center hidden md:flex justify-between w-full absolute top-0 z-10 bg-transparent backdrop-blur-sm h-16 '>
			<div className='flex items-center container mx-auto py-2 px-4 justify-between w-full h-full '>
				<div className='flex items-center gap-2 justify-between w-full'>
					<h1 className='text-md font-semibold text-black'>Fernando Aquistpace</h1>
					<ul className='gap-2 hidden md:flex'>
						<li className='item-menu'>
							<a href='#about' className='text-sm text-white dark:text-black'>
								About
							</a>
						</li>
						<li className='item-menu'>
							<a href='#experience' className='text-sm text-white dark:text-black'>
								Experience
							</a>
						</li>
						<li className='item-menu'>
							<a href='#stacks' className='text-sm text-white dark:text-black'>
								Stacks
							</a>
						</li>
						<li className='item-menu'>
							<a href='#projects' className='text-sm text-white dark:text-black'>
								Projects
							</a>
						</li>
						<li className='item-menu'>
							<a href='#contact' className='text-sm text-white dark:text-black'>
								Contact
							</a>
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
