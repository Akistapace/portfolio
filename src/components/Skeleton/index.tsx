import { icons } from '@/assets/icons'
import { useTheme } from '@/theme/theme-provider'
import { useEffect, useState } from 'react'

export const Cover = () => {
	const { isDark } = useTheme()
	const [isLoading, setLoading] = useState<boolean>(true)

	useEffect(() => {
		setTimeout(() => {
			setLoading(false)
		}, 3000)
	}, [])

	return (
		<div
			data-testid='cover'
			className={`${!isLoading ? 'hidden' : ''} z-[10000] fixed bg-white dark:bg-black left-0 top-0 w-full h-screen flex items-center justify-center bg-cover bg-center bg-no-repeat overflow-hidden`}
		>
			<div className='loader flex flex-col items-center justify-center'>
				{icons.logo({ classes: 'w-[100px] h-[100px] animate-spin-slow', color: isDark ? '#fff' : '#000' })}
			</div>
		</div>
	)
}
