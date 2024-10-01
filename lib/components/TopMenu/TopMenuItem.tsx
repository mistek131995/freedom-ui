import {HTMLAttributes} from "react";

interface ITopMenuItem {
    title: string;
}

export const TopMenuItems = ({title, className, ...props}: HTMLAttributes<HTMLDivElement> & ITopMenuItem) => {
    const unionClassName = [
        className,

    ].filter(x => x).join(" ")

    return <div className={unionClassName} {...props}>{title}</div>
}