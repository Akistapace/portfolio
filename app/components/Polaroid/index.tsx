import React, { useState } from "react";
import style  from "./style.module.css";
import Image from "next/image";
import { Modal } from "../Modal";

interface Props {
    project: {
        thumb: string;
        title: string;
        description: string;
        rotation?: number | string;
        'main-color'?: string
    }
}
export const Polaroid = ({ project }: Props)=> {
    const [isOpen, setOpen] = useState(false);
    const handleOpen = () => setOpen(!isOpen);
    return (
        <>
            <div className={style.polaroid} style={{ transform: `rotate(${project?.rotation && project.rotation}deg`}} onClick={handleOpen}>
                <div className={style.box} style={{backgroundColor: project['main-color']}}>
                    <Image className={style.image} src={project.thumb} width={250} height={250} alt={project.title}/>
                </div>
                <div className={style.body}>
                    <h3 className={style.title}>{project.title}</h3>
                </div>
            </div>
            
            <Modal isOpen={isOpen} handleClose={handleOpen}>
                <h1>{project.title}</h1>
                <p>{project.description}</p>
            </Modal>
        </>
    )
}