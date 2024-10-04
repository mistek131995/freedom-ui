import {FC, useEffect, useState} from "react";
import {useToast} from "./useToast.tsx";
import styles from "./styles.module.scss"
import {Background} from "../../types/Background.ts";

export interface IToast {
    label: string,
    description: string,
    time?: number,
    bg: Background
}

export type ToastProps = IToast & { id: number }

const backgroundClassMap = {
    [Background.primary]: styles.primary,
    [Background.success]: styles.success,
    [Background.warning]: styles.warning,
    [Background.danger]: styles.danger,
}

export const Toast: FC<ToastProps> = (props) => {
    const { removeToast } = useToast();
    const [isHide, setHide] = useState<boolean>(false)
    const unionClassName = [
        styles.toast,
        (isHide ? styles.hide : styles.show),
        backgroundClassMap[props.bg || Background.primary]
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