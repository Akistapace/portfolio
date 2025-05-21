import StackIcon from 'tech-stack-icons' // You can also use any another import name
import projects from '../../contents/projects.json'
import styles from './style.module.css'

interface Project {
	mainColor: string
	thumb: string
	title: string
	stacks: string[]
}

export const Item = ({
	project,
	index,
	onClick,
}: {
	project: Project
	index: number
	onClick: (event: React.MouseEvent<HTMLButtonElement> | React.KeyboardEvent<HTMLButtonElement>) => void
}) => {
	const isRevert = index % 2 === 1
	const direction = isRevert ? 'left' : 'right'

	return (
		<div className={`${styles.item} ${isRevert ? styles.revert : ''}`}>
			<div className={styles.body}>
				<div className={styles.thumbContainer}>
					<div className={styles.thumb} style={{ background: project.mainColor }}>
						<img src={project.thumb} width={150} height={150} alt='' />
					</div>
				</div>
				<p className={styles.title}>{project.title}</p>
				<div className={`${styles.stacks} ${styles[`from-${direction}`]}`}>
					{project?.stacks?.map((name: string, i: number) => (
						<button
							type='button'
							onClick={onClick}
							onKeyUp={e => e.key === 'Enter' && onClick(e)}
							tabIndex={0}
							key={name}
						>
							<StackIcon name={name} className={styles.icon} />
						</button>
					))}
				</div>
			</div>
		</div>
	)
}

export const ListItems = ({
	onClick,
}: { onClick: (event: React.MouseEvent<HTMLButtonElement> | React.KeyboardEvent<HTMLButtonElement>) => void }) => {
	return (
		<div className={styles.listItems}>
			{projects?.map((project, index) => {
				return <Item onClick={onClick} key={project.title} index={index} project={project} />
			})}
		</div>
	)
}
