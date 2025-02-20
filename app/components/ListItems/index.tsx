import styles from './style.module.css'

export const Item = () => {
	return <div className={styles.item}>
		<div className="body">
			<span style={{ padding: '10px' }}>
				<img src="" width={150} height={150} alt='' />
			</span>
			<span>
				<p>Lorem Ipsum</p>
			</span>
		</div>
		<div className="footer">
			Stacks a direita
		</div>
	</div>
}

export const ListItems = () => {
	return <div className={styles.listItems}>
		ListProjects
	</div>
}
