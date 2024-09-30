import {HTMLAttributes} from "react";

export const TopMenuItems = ({className, ...props}: HTMLAttributes<HTMLDivElement>) => {
    const unionClassName = [
        className,

    ].filter(x => x).join(" ")

    return <div className={unionClassName} {...props}/>
}