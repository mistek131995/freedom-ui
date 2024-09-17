import {FC, useEffect, useState} from "react";
import {useToast} from "./useToast.tsx";
import styles from "./styles.module.scss"
import {ToastBackground} from "../../types/ToastBackground.ts";

export interface IToast {
    id?: number,
    label: string,
    description: string,
    time?: number,
    bg?: ToastBackground
}

const backgroundClassMap = {
    [ToastBackground.primary]: styles.primary,
    [ToastBackground.success]: styles.success,
    [ToastBackground.warning]: styles.warning,
    [ToastBackground.danger]: styles.danger,
}

export const Toast: FC<IToast> = (props) => {
    const { removeToast } = useToast();
    const [isHide, setHide] = useState<boolean>(false)
    const unionClassName = [
        styles.toast,
        (isHide ? styles.hide : styles.show),
        backgroundClassMap[props.bg || ToastBackground.primary]
    ].join(" ")

    useEffect(() => {
        const timer1 = setTimeout(() => {
            setHide(true)
        }, props.time || 5000);

        const timer2 = setTimeout(() => {
            removeToast(props.id!)
        }, props.time || 5000 + 500);

        return () => {
            clearTimeout(timer1);
            clearTimeout(timer2);
        }
    }, []);

    return <div className={unionClassName}>
            <div className={styles.toastLabel}>{props.label}</div>
            <div className={styles.toastBody}>{props.description}</div>
        </div>
}