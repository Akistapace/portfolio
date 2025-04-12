import StackIcon from "tech-stack-icons"; // You can also use any another import name
import projects from '../../contents/projects.json';
import styles from './style.module.css';

export const Item = ({ project, index, onClick }: any) => {
	const isRevert = index % 2 === 1;
	const direction = isRevert ? 'left' : 'right';

	return <div className={`${styles.item} ${isRevert ? styles.revert : ''}`} >
		<div className={styles.body}>
			<div className={styles.thumbContainer}>
				<div className={styles.thumb} style={{ background: project.mainColor }}>
					<img src={project.thumb} width={150} height={150} alt='' />
				</div>
			</div>
			<p className={styles.title}>{project.title}</p>
			<div className={`${styles.stacks} ${styles[`from-${direction}`]}`}>
				{project?.stacks?.map((name: string, i: number) => (
					<span onClick={onClick} key={i}>
						<StackIcon name={name} className={styles.icon} />
					</span>
				))}
			</div>
		</div>
	</div >
}

export const ListItems = ({ onClick }: any) => {
	return <div className={styles.listItems}>
		{projects?.map((project, index) => {
			return <Item onClick={onClick} any key={index} index={index} project={project} />
		})}
	</div>
}
