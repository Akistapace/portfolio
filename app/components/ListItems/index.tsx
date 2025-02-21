import projects from '../../contents/projects.json'
import styles from './style.module.css'

export const Item = ({ project, index }: any) => {
	return <div className={`${styles.item} ${index % 2 == 1 ? styles.revert : ''}`} >
		<div className={styles.body}>
			<div className={styles.thumbContainer}>
				<div className={styles.thumb} style={{ background: project.mainColor }}>
					<img src={project.thumb} width={150} height={150} alt='' />
				</div>
			</div>
			<p className={styles.title}>{project.title}</p>
			<div className={styles.stacks}>
				Stacks a direita
			</div>
		</div>
	</div >
}

export const ListItems = () => {
	return <div className={styles.listItems}>
		{projects.map((project, index) => {
			return <Item key={index} index={index} project={project} />
		})}
	</div>
}
