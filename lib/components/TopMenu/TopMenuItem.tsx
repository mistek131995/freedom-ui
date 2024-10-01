import {HTMLAttributes} from "react";
import styles from "./styles.module.scss";

interface ITopMenuItem {
    title: string;
}

export const TopMenuItem = ({title, className, ...props}: HTMLAttributes<HTMLDivElement> & ITopMenuItem) => {
    const unionClassName = [
        className,
        styles.topMenuItem
    ].filter(x => x).join(" ")

    return <div className={unionClassName} {...props}>{title}</div>
}