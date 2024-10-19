"use client";
import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css'; // Importar o CSS do Swiper
import style from './style.module.css';

interface Props {
    children: React.ReactNode; // Permite receber elementos como children
}

export const MainSlider: React.FC<Props> = ({ children }) => {
    return (
        <Swiper
            className={style.mainSlider}
            // spaceBetween={20}
            mousewheel={true}
            keyboard={true}
            cssMode={true}

            direction='vertical'
            slidesPerView={1}
        >
            {/* Mapeia os children passados e os renderiza em SwiperSlide */}
            {React.Children.map(children, (child, index) => (
                <SwiperSlide key={index}>
                    {child}
                </SwiperSlide>
            ))}
        </Swiper>
    );
};
