"use client";

import { useEffect, useRef, useState } from "react";
import "swiper/css";
import "swiper/css/autoplay";
import { Autoplay } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import styles from "./style.module.css";

import { Icons } from "@/app/components/Icons";
import Image from "next/image";

const techLogos = [
    "typescript", "javascript", "react", "graphql", "css", "sass",
    "jest", "node", "nextjs", "git", "webpack", "vite", "reactQuery",
    "gulp", "gitlab", "github", "wordpress", "eslint", "prettier", "antd",
    "markdown", "zod"
];

export const Slider = ({ reverse }: { reverse?: boolean }) => {
    const swiperRef = useRef<unknown>(null);
    const [images, setImages] = useState<{ [key: string]: string }>({});

    useEffect(() => {
        // Carregar as imagens dinamicamente
        const loadImages = async () => {
            const loadedImages: { [key: string]: string } = {};
            for (const tech of techLogos) {
                const icon = await Icons[tech as keyof typeof Icons]();
                loadedImages[tech] = icon.default.src;
            }
            setImages(loadedImages);
        };

        loadImages();
    }, []);

    const logosToDisplay = reverse ? [...techLogos].reverse() : techLogos;

    return (
        <Swiper
            onSwiper={(swiper) => (swiperRef.current = swiper)}
            spaceBetween={20}
            slidesPerView={5}
            loop={true}
            autoplay={{ delay: 0, disableOnInteraction: false, pauseOnMouseEnter: true }}
            speed={2000}
            direction="horizontal"
            modules={[Autoplay]}
            dir={reverse ? 'rtl' : 'ltr'}
            className={styles.slider}
        >
            {logosToDisplay.map((tech, index) => (
                <SwiperSlide key={index} className={styles.slide} title={tech}>
                    {images[tech] ? (
                        <Image
                            src={images[tech]}
                            alt={tech}
                            width={100}
                            height={100}
                            className={styles.logos}
                        />
                    ) : (
                        <span>{tech}</span>
                    )}
                </SwiperSlide>
            ))}
        </Swiper>
    );
};