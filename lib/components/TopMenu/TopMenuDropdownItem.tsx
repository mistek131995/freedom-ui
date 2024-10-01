import {HTMLAttributes} from "react";
import styles from "./styles.module.scss";

interface ITopMenuDropdownItem {
    title: string;
}

export const TopMenuDropdownItem = ({title, className, ...props}: HTMLAttributes<HTMLDivElement> & ITopMenuDropdownItem) => {
    const unionClassName = [
        className,
        styles.dropdown
    ].filter(x => x).join(" ")

    return <div className={unionClassName} {...props}>

        <span>{title}</span>
        <div>
            {props.children}
        </div>
    </div>
}