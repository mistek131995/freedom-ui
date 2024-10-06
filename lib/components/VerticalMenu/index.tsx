import styles from "./styles.module.scss";
import {HTMLAttributes} from "react";



export const VerticalMenu = (props: HTMLAttributes<HTMLDivElement>) => {
    const {className, ...divProps} = props;
    const unionClassName = [
        styles.verticalMenuContainer,
        className,
    ].filter(x => x).join(" ")

    return <div className={unionClassName} {...divProps}/>
}