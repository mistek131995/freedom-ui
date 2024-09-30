import styles from "./styles.module.scss"
import {HTMLAttributes} from "react";
import {HorizontalOrientation} from "../../types/HorizontalOrientation.ts";

export interface ITopMenu{
    orientation?: HorizontalOrientation
}

const topMenuOrientationClassMap = {
    [HorizontalOrientation.horizontal]: "",
    [HorizontalOrientation.horizontalReverse]: styles.horizontalReverse
}

export const TopMenu = ({
                            orientation = HorizontalOrientation.horizontal,
                            className,
                            ...props}: HTMLAttributes<HTMLDivElement> & ITopMenu) => {
    const unionClassName = [
        className,
        styles.topMenuContainer,
        topMenuOrientationClassMap[orientation]
    ].filter(x => x).join(" ")

    return <div className={unionClassName} {...props}/>
}