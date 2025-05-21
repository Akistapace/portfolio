import emitter from '@/app/utils/events'
import { useEffect, useState } from 'react'
import style from './style.module.css'

export const Cover = () => {
	const [loading, setLoading] = useState(true)
	const [fadeOut, setFadeOut] = useState(false)

	useEffect(() => {
		let timeout: NodeJS.Timeout

		const handleStart = () => {
			timeout = setTimeout(() => {
				setFadeOut(true)
				setTimeout(() => setLoading(false), 300)
			}, 3000) // espera 3 segundos após o start
		}

		emitter.once('starfield-started', handleStart)

		return () => clearTimeout(timeout)
	}, [])

	if (!loading) return null

	return (
		<div className={`${style.cover} ${fadeOut ? style.fadeOut : ''}`}>
			<span className='loader' />
		</div>
	)
}
