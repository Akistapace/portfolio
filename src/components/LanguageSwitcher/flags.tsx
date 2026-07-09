const flagWrapperClass = 'inline-block h-6 w-9 overflow-hidden rounded-sm ring-1 ring-black/10 shrink-0'

export const FlagUS = () => (
	<svg viewBox='0 0 24 16' className={flagWrapperClass} role='img' aria-label='United States flag'>
		<rect width='24' height='16' fill='#B22234' />
		{[1, 3, 5, 7, 9, 11].map(y => (
			<rect key={y} y={y * (16 / 13)} width='24' height={16 / 13} fill='#fff' />
		))}
		<rect width='10' height={(16 / 13) * 7} fill='#3C3B6E' />
	</svg>
)

export const FlagBR = () => (
	<svg viewBox='0 0 24 16' className={flagWrapperClass} role='img' aria-label='Brazil flag'>
		<rect width='24' height='16' fill='#009739' />
		<polygon points='12,2 22,8 12,14 2,8' fill='#FEDD00' />
		<circle cx='12' cy='8' r='3.4' fill='#012169' />
	</svg>
)

export const FlagES = () => (
	<svg viewBox='0 0 24 16' className={flagWrapperClass} role='img' aria-label='Spain flag'>
		<rect width='24' height='16' fill='#AA151B' />
		<rect y='4' width='24' height='8' fill='#F1BF00' />
	</svg>
)
