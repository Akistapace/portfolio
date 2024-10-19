'use client'
import React, { useState, useEffect } from "react";
import style from './style.module.css';
import Image from "next/image";
import { Title } from "../Title";

export const Hero = () => {
    const [text, setText] = useState('');
    const fullText = "Software Developer | Web Performance";
    const typingSpeed = 100; // Velocidade de digitação em milissegundos

    useEffect(() => {
        let currentIndex = 0;
        const typingInterval = setInterval(() => {
            if (currentIndex <= fullText.length) {
                setText(fullText.slice(0, currentIndex));
                currentIndex++;
            } else {
                clearInterval(typingInterval);
            }
        }, typingSpeed);

        return () => clearInterval(typingInterval);
    }, []);

    return (
        <div className={style.hero}>
            <Image src="/images/hero2.png" alt="hero" width={500} height={500} />
            <div className={style.box}>
                <Title>Hello, I&apos;m Fernando</Title>
                <p className={style.subtitle}>{text}</p>
            </div>
        </div>
    );
};
