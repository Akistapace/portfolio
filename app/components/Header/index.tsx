'use client'
import Link from 'next/link'
import style from './style.module.css'

export const Header = () => {
	return (
		<header className='container-full bg-transparent relative hidden md:flex'>
			<div className='container flex justify-between items-center absolute top-0 left-0 z-50 p-4 gap-2'>
				<h1 className='text-xl font-bold'>Fernando Aquistpace</h1>
				<ul className='flex gap-2'>
					<li className={style.item}>
						<a href='#about'>About</a>
					</li>
					<li className={style.item}>
						<a href='#experience'>Experience</a>
					</li>
					<li className={style.item}>
						<Link href='#stacks'>Stacks</Link>
					</li>
					<li className={style.item}>
						<a href='#projects'>Projects</a>
					</li>
					<li className={style.item}>
						<a href='#contact'>Contact</a>
					</li>
				</ul>
			</div>
		</header>
	)
}
