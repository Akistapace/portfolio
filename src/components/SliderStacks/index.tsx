'use client'

import { useEffect, useState } from 'react'
import StackIcon from 'tech-stack-icons'

const techLogos = [
	'typescript',
	'js',
	'reactjs',
	'graphql',
	'css3',
	'sass',
	'jest',
	'nodejs',
	'nextjs',
	'git',
	'webpack',
	'vitejs',
	'reactquery',
	'gulp',
	'gitlab',
	'github',
	'wordpress',
	'eslint',
	'prettier',
	'antd',
	'markdown',
	'zod',
	'html5',
	'liquid',
] as const

type TechLogo = (typeof techLogos)[number]

const IconImports: Record<TechLogo, () => Promise<{ default: string }>> = {
	js: () => import('/icons/js.png'),
	css3: () => import('/icons/css3.png'),
	html5: () => import('/icons/html5.png'),
	reactjs: () => import('/icons/reactjs.png'),
	typescript: () => import('/icons/typescript.png'),
	graphql: () => import('/icons/graphql.png'),
	jest: () => import('/icons/jest.png'),
	nextjs: () => import('/icons/nextjs.png'),
	git: () => import('/icons/git.png'),
	webpack: () => import('/icons/webpack.png'),
	vitejs: () => import('/icons/vitejs.png'),
	reactquery: () => import('/icons/reactquery.png'),
	nodejs: () => import('/icons/nodejs.png'),
	gulp: () => import('/icons/gulp.png'),
	gitlab: () => import('/icons/gitlab.png'),
	github: () => import('/icons/github.png'),
	wordpress: () => import('/icons/wordpress.png'),
	sass: () => import('/icons/sass.png'),
	eslint: () => import('/icons/eslint.png'),
	prettier: () => import('/icons/prettier.png'),
	antd: () => import('/icons/antd.png'),
	markdown: () => import('/icons/markdown.png'),
	zod: () => import('/icons/zod.png'),
	liquid: () => import('/icons/liquid.png'),
}

const Slider = ({ reverse }: { reverse?: boolean }) => {
	const [loadedImages, setLoadedImages] = useState<{ [key: string]: string }>({})

	useEffect(() => {
		const loadImages = async () => {
			const loaded: { [key: string]: string } = {}
			for (const tech of techLogos) {
				const icon = await IconImports[tech as TechLogo]()
				loaded[tech] = icon.default
			}
			setLoadedImages(loaded)
		}
		loadImages()
	}, [])

	const logosToDisplay = [...techLogos, ...techLogos] // duplicado para efeito infinito

	return (
		<div className={`sliderTrack ${reverse ? 'reverse' : 'forward'}`}>
			{logosToDisplay.map((tech, index) => (
				<div
					className='h-[150px] md:h-[200px] flex items-center justify-center mx-2 grow-0 shrink-0 basis-auto rounded-md bg-stone-200 dark:bg-stone-800 aspect-square p-4 grayscale hover:grayscale-0'
					key={`${tech}-${
						// biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
						index
					}`}
					title={tech}
				>
					{loadedImages[tech] ? (
						<img src={loadedImages[tech]} alt={tech} className='h-[70px] md:h-[100px] object-contain w-auto' />
					) : (
						<StackIcon name={tech} className='h-[30px] md:h-[40px] object-contain w-auto' />
					)}
				</div>
			))}
		</div>
	)
}

const SliderStacks = () => {
	return (
		<div className='w-full flex flex-col items-center justify-center gap-4 overflow-hidden '>
			<Slider />
			<Slider reverse />
		</div>
	)
}

export default SliderStacks
