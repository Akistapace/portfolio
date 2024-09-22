import React  from "react";
import { createPortal } from 'react-dom';
import style from './style.module.css'
// import Image from "next/image";

interface Props {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    children: any 
    handleClose: () => void;
    isOpen: boolean;
}
export const Modal = ({isOpen, handleClose, children}:Props) => {
    if(!isOpen) return null
    
    return (
        createPortal(
            <div className={style.modal} style={{ display: isOpen ? 'flex' : 'none' }} onClick={handleClose}>
                <div className={style.content}>
                    {children}
                </div>
            </div>, document.body
        )
    )
}