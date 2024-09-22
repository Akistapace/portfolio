import React from "react";

interface Props {
    children: React.ReactElement | string;
}

export const Subtitle = ({children}:Props)=> {
    return <h2>{children}</h2>
}