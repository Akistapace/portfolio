import { ReactNode } from "react";
import style from './style.module.css';

interface Props {
    children: string | ReactNode;
    effect?: boolean;
}

export const Title = ({ children, ...rest }: Props) => {

    return (
        <h2 className={style.title} {...rest} >
            {children}
        </h2>
    );
};
