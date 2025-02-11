"use client";
import React from 'react';
import 'swiper/css'; // Importar o CSS do Swiper
import { Swiper, SwiperSlide } from 'swiper/react';
import style from './style.module.css';

interface Props {
    children: React.ReactNode;
}

export const MainSlider: React.FC<Props> = ({ children }) => {
    return (
        <Swiper
            className={style.mainSlider}
            mousewheel={true}
            keyboard={true}
            cssMode={true}
            direction='vertical'
            slidesPerView={1}
        >
            {React.Children.map(children, (child, index) => (
                <SwiperSlide key={index}>
                    {child}
                </SwiperSlide>
            ))}
        </Swiper>
    );
};
