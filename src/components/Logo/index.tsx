import { icons } from '@/assets/icons'
import { ROUTES } from '@/routes/router'
import { Link } from 'react-router-dom'

interface Props {
	className?: string
	withLink?: boolean
	color?: 'green' | 'white'
}

export const Logo = ({ className, color = 'green', withLink = true }: Props) => {
	return (
		<div className='flex shrink-0 items-center' data-testid='logo'>
			{withLink && (
				<Link to={ROUTES.index} className='flex items-center'>
					{icons.logo({ classes: className, type: color })}
				</Link>
			)}
			{!withLink && icons.logo({ classes: className, type: color })}
		</div>
	)
}
