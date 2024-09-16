import {createContext, ReactNode, useState} from "react";
import {Toast} from "./Toast.tsx";
import styles from "./styles.module.scss"

export interface IToastContext {
    addToast: (text: IToast) => void;
}

export interface IToast {
    label: string,
    description: string,
    time?: number
}

export const ToastContext = createContext<IToastContext | undefined>(undefined)

export const ToastProvider = (props: {children: ReactNode}) => {
    const [toastList, addToastToList] = useState<IToast[]>([]);

    const addToast = (toast: IToast) => {
        addToastToList([toast, ...toastList]);

        console.log(toastList);
    }

    return <ToastContext.Provider value={{
        addToast: addToast
    }}>
        <div className={styles.toastContainer}>
            {
                toastList.map(toast => <Toast {...toast}/>)
            }
        </div>


        {props.children}
    </ToastContext.Provider>
}