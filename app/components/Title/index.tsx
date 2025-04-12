'use client'

import type { ReactNode } from 'react'
import style from './style.module.css'

interface Props {
	children: string | ReactNode
	effect?: boolean
	title?: string
}

const Title = ({ children, title, ...rest }: Props) => {
	return (
		<h2 id={`#${title}`} className={style.title} {...rest}>
			{children}
		</h2>
	)
}

export default Title
