import {createContext, ReactNode, useState} from "react";
import {Toast} from "./Toast.tsx";
import styles from "./styles.module.scss"

export interface IToastContext {
    addToast: (toast: IToast) => void,
    setToastList: (toasts: ReactNode[]) => void,
    toastList: ReactNode[]
}

export interface IToast {
    //id?: number,
    label: string,
    description: string,
    time?: number
}

export const ToastContext = createContext<IToastContext | undefined>(undefined)

export const ToastProvider = (props: {children: ReactNode}) => {
    const [toastList, setToastToList] = useState<ReactNode[]>([]);

    const addToast = (toast: IToast) => {
        //toast.id = (toastList.at(-1)?.id || 0) + 1;
        setToastToList([...toastList, <Toast {...toast}/>]);
    };

    return (
        <ToastContext.Provider value={{
            addToast: addToast,
            setToastList: (toasts: ReactNode[]) => setToastToList(toasts),
            toastList: toastList
        }}>
            <div className={styles.toastContainer}>
                {
                    toastList.map(toast => toast)
                }
            </div>
            {props.children}
        </ToastContext.Provider>
    );
}