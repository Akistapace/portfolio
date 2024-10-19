import React, {  ReactNode, useEffect, useRef, useState } from "react";
import style from './style.module.css';

interface Props {
    children: string | ReactNode;
    effect?: boolean;
}

export const Title = ({ children, effect = true }: Props) => {
    const titleRef = useRef<HTMLHeadingElement | null>(null);
    const [isNearVisible, setIsNearVisible] = useState(false);

    useEffect(() => {
        const title = titleRef.current
        const observer = new IntersectionObserver(
            ([entry]) => {
                setIsNearVisible(entry.isIntersecting);
            },
            {
                root: null, 
                rootMargin: "0px 0px -300px 0px", 
                threshold: 1, 
            }
        );

        if (title) observer.observe(title)

        return () => {
            if (title) observer.unobserve(title);
        };
    }, []);

    return (
        <h2
            ref={titleRef}
            className={`${style.title} ${ effect && isNearVisible ? style.action : ''}`}
        >
            {children}
        </h2>
    );
};
