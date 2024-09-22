"use client";
import { isMobile } from 'react-device-detect';
import { Swiper, SwiperSlide} from 'swiper/react';
import { Polaroid } from "../Polaroid";

import projects from  '../../contents/projects.json'
import style from './style.module.css'

interface Project {
    thumb: string;
    title: string
    description: string
    rotation: string | number | undefined
    images?:string[] | undefined
    'main-color'?: string
}

export const PolaroidSlider =  () => {

    if(!isMobile) {
        return (
            <div className={style.grid}>
                {projects.items.map((project: Project, index: number) => (
                    <Polaroid key={index} project={project} />
                ))}
            </div>
        )
    }

    return (
        <Swiper
            spaceBetween={20}
            slidesPerView={3}
            onSlideChange={() => console.log('slide change')}
        >
            {projects.items.map((project: Project, index: number) => (
                <SwiperSlide key={index}>
                    <Polaroid project={project} />
                </SwiperSlide>
            ))}
        </Swiper>
    );
};