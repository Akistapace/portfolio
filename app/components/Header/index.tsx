'use client'
import Link from 'next/link'
import style from './style.module.css'

export const Header = () => {
	return (
		<header className={`container-full ${style.header}`}>
			<h1 className={style.brand}>Fernando Aquistpace</h1>
			<ul className={style.list}>
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
		</header>
	)
}
