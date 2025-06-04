import { useTheme } from '@/theme/theme-provider'
import { Moon, Sun } from 'lucide-react'
import { useEffect } from 'react'
import { Button } from '../ui/button'

export function ModeToggle() {
	const { isDark, setTheme } = useTheme()

	const updateFavicon = () => {
		const favicon = document.querySelector("link[rel='icon']") as HTMLLinkElement
		favicon.href = isDark ? '/logos/logo.ico' : '/logos/logo-white.ico'
	}

	const toggleTheme = () => {
		const newTheme = isDark ? 'light' : 'dark'
		setTheme(newTheme)
		updateFavicon()
	}

	useEffect(() => {
		updateFavicon()
	}, [])

	return (
		<Button
			className='cursor-pointer'
			variant='ghost'
			size={'sm'}
			onClick={toggleTheme}
			aria-label='Toggle dark mode'
			data-testid='dark-mode'
		>
			{isDark ? (
				<Moon className='h-5 w-5 dark:text-black text-white' />
			) : (
				<Sun className='h-5 w-5 dark:text-black text-white ' />
			)}
		</Button>
	)
}
