import styles from "./styles.module.scss";
import {Background} from "../../types/Background.ts";
import {FC, HTMLAttributes} from "react";

interface IAlert{
    background?: Background
}

export type AlertProps = HTMLAttributes<HTMLDivElement> & IAlert;

const backgroundColorClassMap = {
    [Background.success]: styles.success,
    [Background.primary]: styles.primary,
    [Background.warning]: styles.warning,
    [Background.danger]: styles.danger,
}

export const Alert : FC<AlertProps> = ({background = Background.primary, className, ...props}) => {
    const unionClassName = [
        styles.alertContainer,
        backgroundColorClassMap[background],
        className
    ].filter(x => x).join(" ")

    return <div className={unionClassName} {...props}/>
}