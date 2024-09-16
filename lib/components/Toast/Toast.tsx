import {IToast} from "./ToastProvider.tsx";
import {FC, useEffect, useState} from "react";
import {useToast} from "./useToast.tsx";
import styles from "./styles.module.scss"

export const Toast: FC<IToast> = (props) => {
    const {setToastList, toastList} = useToast();
    const [isHide, setHide] = useState<boolean>(false)

    useEffect(() => {
        const timer = setTimeout(() => {
            setHide(true)
        }, props.time || 5000);

        toastList.forEach(x => {
            Object.keys(x).forEach(x => {

            })
        })

        return () => clearTimeout(timer);
    }, [props.time]);

    return <div className={[styles.toast, (isHide ? styles.hide : styles.show)].join(" ")}>
            <div>{props.label}</div>
            <div>{props.description}</div>
        </div>
}