"use client";

import { ReactNode } from "react";
import style from './style.module.css';

interface Props {
	children: string | ReactNode;
	effect?: boolean;
}

const Title = ({ children, ...rest }: Props) => {

	return (
		<h2 className={style.title} {...rest} >
			{children}
		</h2>
	);
};

export default Title;
