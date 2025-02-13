'use client'
import style from './style.module.css';

export const Header = () => {
    return (
        <header className={`container-full ${style.header}`}>
            <h1 className={style.brand}>Fernando Aquistpace</h1>
            <ul className={style.list}>
                <li className={style.item}>Menu</li>
                <li className={style.item}>Menu1</li>
                <li className={style.item}>Menu2</li>
            </ul>
        </header>
    )
};
