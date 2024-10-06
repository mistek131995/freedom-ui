import styles from "./styles.module.scss"
import {HTMLAttributes} from "react";

export const VerticalMenuItem = (props: HTMLAttributes<HTMLDivElement>) => {
    const {className, ...divProps} = props;
    const unionClassName = [
        styles.verticalMenuItem,
        className
    ].filter(x => x).join(" ")

    return <div className={unionClassName} {...divProps}>

    </div>
}