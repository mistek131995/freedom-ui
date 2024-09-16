import {createContext, ReactNode, useState} from "react";
import {Toast} from "./Toast.tsx";
import styles from "./styles.module.scss"

export interface IToastContext {
    addToast: (toast: IToast) => void,
    setToastList: (toasts: Record<number, ReactNode>[]) => void,
    toastList: Record<number, ReactNode>[]
}

export interface IToast {
    id: number,
    label: string,
    description: string,
    time?: number
}

export const ToastContext = createContext<IToastContext | undefined>(undefined)

export const ToastProvider = (props: {children: ReactNode}) => {
    const [toastList, setToastToList] = useState<Record<number, ReactNode>[]>([]);

    const addToast = (toast: IToast) => {
        const keys = Object.keys(toastList).map(Number);
        const id = (keys.length == 0 ? 0 :  Math.max(...keys) + 1);

        toast.id = id;
        const newToast = {
            [id]: <Toast {...toast} />
        };

        setToastToList([...toastList, newToast])
    };

    return (
        <ToastContext.Provider value={{
            addToast: addToast,
            setToastList: (toasts: Record<number, ReactNode>[]) => setToastToList(toasts),
            toastList: toastList
        }}>
            <div className={styles.toastContainer}>
                {toastList.map((record) =>
                    Object.keys(record).map((key) => (
                        <div key={key}>
                            {record[+key]}
                        </div>
                    ))
                )}
            </div>
            {props.children}
        </ToastContext.Provider>
    );
}