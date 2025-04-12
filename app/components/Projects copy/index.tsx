import { useState } from "react"
import { ListItems } from "../ListItems"
import styles from './styles.module.css'

export const Projects = () => {
	const [selectedItem, setSelectedItem] = useState()

	const handleOnClick = (item: any) => {
		setSelectedItem(item)
	}
	console.log('selectedItem', selectedItem)
	return (
		<div className="container flex">
			<div className={styles.box}>
				<ListItems onClick={handleOnClick} />
			</div>

			<div className={styles.box}>selectedItem.details</div>
		</div>
	)
}
