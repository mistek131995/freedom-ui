import {createContext, ReactNode, useState} from "react";
import {Toast} from "./Toast.tsx";
import styles from "./styles.module.scss"

export interface IToastContext {
    addToast: (toast: IToast) => void,
    setToastList: (toasts: IToast[]) => void,
    toastList: IToast[]
}

export interface IToast {
    id?: number,
    label: string,
    description: string,
    time?: number,
    isVisible?: boolean
}

export const ToastContext = createContext<IToastContext | undefined>(undefined)

export const ToastProvider = (props: {children: ReactNode}) => {
    const [toastList, setToastToList] = useState<IToast[]>([]);

    const addToast = (toast: IToast) => {
        toast.id = (toastList.at(-1)?.id || 0) + 1;
        toast.isVisible = true;
        setToastToList([...toastList, toast]);
    };

    return (
        <ToastContext.Provider value={{
            addToast: addToast,
            setToastList: (toasts: IToast[]) => setToastToList(toasts),
            toastList: toastList
        }}>
            <div className={styles.toastContainer}>
                {toastList.map(toast => (
                    toast.isVisible && <Toast key={toast.id} {...toast} />
                ))}
            </div>
            {props.children}
        </ToastContext.Provider>
    );
}