import React from "react"
import style from './style.module.css'
import Image from "next/image"
export const Hero = ()=> {
    return (
        <div className={style.hero}>
            <Image src="/images/hero.jpg" alt="hero" width={500} height={500} />
        </div>
    )
}