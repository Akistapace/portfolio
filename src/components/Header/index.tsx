import { useTranslation } from 'react-i18next'

import { DownloadResumeButton } from '@/components/Resume'
import { LanguageSwitcher } from '../LanguageSwitcher'
import { ModeToggle } from '../ToggleTheme'

const sections = ['about', 'experience', 'stacks', 'projects', 'contact'] as const

export const Header = () => {
	const { t } = useTranslation()

	const scrollToSection = (id: string) => {
		const el = document.getElementById(id)
		if (el) {
			el.scrollIntoView({ behavior: 'smooth' })
		}
	}

	return (
		<>
			<header className='items-center hidden md:flex justify-between w-full fixed top-0 z-50 h-16 bg-white/60 dark:bg-black/40 backdrop-blur-md border-b border-black/5 dark:border-white/10'>
			<div className='flex items-center container mx-auto py-2 px-4 justify-between w-full h-full'>
				<div className='flex items-center gap-2 justify-between w-full'>
					<h1 className='text-md font-semibold text-neutral-900 dark:text-white'>Fernando Aquistapace</h1>
					<ul className='gap-2 hidden md:flex items-center'>
						{sections.map(section => (
							<li className='item-menu text-neutral-900 dark:text-white' key={section}>
								<button type='button' onClick={() => scrollToSection(section)} className='text-sm'>
									{t(`header.${section}`)}
								</button>
							</li>
						))}
						<li className='item-menu'>
							<DownloadResumeButton
								size='sm'
								className='shadow-md border-0 bg-neutral-900 text-white dark:bg-white dark:text-black'
								variant={'outline'}
							/>
						</li>
						<li>
							<LanguageSwitcher />
						</li>
						<li>
							<ModeToggle />
						</li>
					</ul>
				</div>
			</div>
			</header>

			<div className='md:hidden fixed bottom-6 right-6 z-50'>
				<DownloadResumeButton size='lg' className='rounded-full shadow-lg' />
			</div>
		</>
	)
}
