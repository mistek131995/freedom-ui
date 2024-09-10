import styles from "./styles.module.scss"
import {HTMLAttributes} from "react";

export const Checkbox = (props: HTMLAttributes<HTMLInputElement>) => {
    const unionClassName = [styles.checkbox, props.className].filter(x => x).join(" ");

    return <input {...props} className={unionClassName} type="checkbox"/>
}