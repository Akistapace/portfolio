'use client'

import { useEffect, useState } from 'react'
import StackIcon from 'tech-stack-icons'
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip'

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
	'supabase',
	'tailwindcss',
	'playwright',
	'biome',
] as const

type TechLogo = (typeof techLogos)[number]

const IconImports: Partial<Record<TechLogo, () => Promise<{ default: string }>>> = {
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
	biome: () => import('/icons/biome.svg'),
}

const techLabels: Record<TechLogo, string> = {
	typescript: 'TypeScript',
	js: 'JavaScript',
	reactjs: 'React',
	graphql: 'GraphQL',
	css3: 'CSS3',
	sass: 'Sass',
	jest: 'Jest',
	nodejs: 'Node.js',
	nextjs: 'Next.js',
	git: 'Git',
	webpack: 'Webpack',
	vitejs: 'Vite',
	reactquery: 'React Query',
	gulp: 'Gulp',
	gitlab: 'GitLab',
	github: 'GitHub',
	wordpress: 'WordPress',
	eslint: 'ESLint',
	prettier: 'Prettier',
	antd: 'Ant Design',
	markdown: 'Markdown',
	zod: 'Zod',
	html5: 'HTML5',
	liquid: 'Liquid',
	supabase: 'Supabase',
	tailwindcss: 'Tailwind CSS',
	playwright: 'Playwright',
	biome: 'Biome',
}

const Slider = ({ reverse }: { reverse?: boolean }) => {
	const [loadedImages, setLoadedImages] = useState<{ [key: string]: string }>({})

	useEffect(() => {
		const loadImages = async () => {
			const loaded: { [key: string]: string } = {}
			for (const tech of techLogos) {
				const importIcon = IconImports[tech as TechLogo]
				if (!importIcon) continue
				const icon = await importIcon()
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
				<Tooltip
					key={`${tech}-${
						// biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
						index
					}`}
				>
					<TooltipTrigger asChild>
						<div className='h-[150px] md:h-[200px] flex items-center justify-center mx-2 grow-0 shrink-0 basis-auto rounded-md bg-stone-200 dark:bg-stone-800 aspect-square p-4 grayscale hover:grayscale-0'>
							{loadedImages[tech] ? (
								<img src={loadedImages[tech]} alt={tech} className='h-[70px] md:h-[100px] object-contain w-auto' />
							) : (
								<StackIcon name={tech} className='h-[30px] md:h-[40px] object-contain w-auto' />
							)}
						</div>
					</TooltipTrigger>
					<TooltipContent>{techLabels[tech]}</TooltipContent>
				</Tooltip>
			))}
		</div>
	)
}

const SliderStacks = () => {
	return (
		<div className='w-full flex flex-col items-start justify-center gap-4 overflow-hidden '>
			<Slider />
			<Slider reverse />
		</div>
	)
}

export default SliderStacks
