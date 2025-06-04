import { Outlet } from 'react-router-dom'
import { Header } from './components/Header'
import { Cover } from './components/Skeleton'
import { useTheme } from './theme/theme-provider'

export function Layout() {
	const { theme } = useTheme()

	return (
		<div className={`w-full flex flex-col justify-between ${theme} `}>
			<Cover />
			<Header />
			<main className='w-full mx-auto flex flex-col items-center justify-center'>
				<Outlet />
			</main>
		</div>
	)
}
