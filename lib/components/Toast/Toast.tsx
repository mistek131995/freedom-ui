import {IToast} from "./ToastProvider.tsx";
import {FC, useEffect, useState} from "react";
import {useToast} from "./useToast.tsx";
import styles from "./styles.module.scss"

export const Toast: FC<IToast> = (props) => {
    const { removeToast } = useToast();
    const [isHide, setHide] = useState<boolean>(false)

    useEffect(() => {
        const timer1 = setTimeout(() => {
            setHide(true)
        }, props.time || 5000);

        const timer2 = setTimeout(() => {
            removeToast(props.id)
        }, props.time || 5000 + 500);

        return () => {
            clearTimeout(timer1);
            clearTimeout(timer2);
        }
    }, []);

    return <div className={[styles.toast, (isHide ? styles.hide : styles.show)].join(" ")}>
            <div>{props.label}</div>
            <div>{props.description}</div>
        </div>
}