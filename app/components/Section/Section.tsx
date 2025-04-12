import { ReactNode, useEffect, useState } from "react";
import style from './style.module.css';
interface Star {
	id: number;
	top: string;
	left: string;
	animationDuration: string;
	animationDelay: string;
}

interface Props {
	children: ReactNode;
	styles?: any
}

const Section = ({ children, styles }: Props) => {
	const [stars, setStars] = useState<Star[]>([]);

	useEffect(() => {
		const generateStars = (count: number) => {
			const newStars: Star[] = Array.from({ length: count }, (_, id) => ({
				id,
				top: `${Math.random() * 100}vh`,
				left: `${Math.random() * 100}vw`,
				animationDuration: `${Math.random() * 1.5 + 0.5}s`,
				animationDelay: `${Math.random() * 2}s`,
			}));
			setStars(newStars);
		};

		generateStars(100); // Número de estrelas
	}, []);

	return (
		<div className={style.starryContainer} style={{ ...styles }}>
			<div className={style.stars}>
				{stars.map((star) => (
					<div
						key={star.id}
						className={style.star}
						style={{
							top: star.top,
							left: star.left,
							animationDuration: star.animationDuration,
							animationDelay: star.animationDelay,
						}}
					/>
				))}
			</div>
			<div className="content">{children}</div>
		</div>
	);
};

export default Section
