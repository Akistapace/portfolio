"use client";
import { useRef } from "react";
import "swiper/css";
import "swiper/css/autoplay";
import { Autoplay } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import styles from "./style.module.css";

const techLogos = [
    "typescript", "javascript", "react", "graphql", "css", "sass",
    "jest", "node", "liquid", "styled-components", "nextjs"
];

export const Slider = ({ reverse }: { reverse?: boolean }) => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const swiperRef = useRef<any>(null);

    return (
        <Swiper
            onSwiper={(swiper) => (swiperRef.current = swiper)}
            spaceBetween={20}
            slidesPerView={5}
            loop={true}
            autoplay={{ delay: 0, disableOnInteraction: false }}
            speed={2000}
            direction="horizontal"
            modules={[Autoplay]}
            dir={reverse ? 'rtl' : 'l/tr'}
            className={styles.slider}
        // onMouseEnter={() => swiperRef.current?.autoplay.stop()}
        // onMouseLeave={() => swiperRef.current?.autoplay.start()}
        >
            {techLogos.map((tech, index) => (
                <SwiperSlide key={index} className={styles.slide}>
                    {/* <Image
                        src={`/logos/${tech}.png`}
                        alt={tech}
                        width={50}
                        height={50}
                    /> */}
                    {tech}
                </SwiperSlide>
            ))}
        </Swiper>
    );
};


