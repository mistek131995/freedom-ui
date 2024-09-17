import React, {createContext, ReactNode, useState} from "react";
import {IToast, Toast} from "./Toast.tsx";
import styles from "./styles.module.scss"
import {HorizontalPosition} from "../../types/HorizontalPosition.ts";

export interface IToastContainer{
    children: ReactNode,
    position?: HorizontalPosition
}

export interface IToastContext {
    addToast: (toast: IToast) => void,
    removeToast: (id: number) => void,
}

export const ToastContext = createContext<IToastContext | undefined>(undefined)

const positionClassMap = {
    [HorizontalPosition.left]: styles.left,
    [HorizontalPosition.center]: styles.center,
    [HorizontalPosition.right]: styles.right,
};

export const ToastProvider = (props: IToastContainer) => {
    const [toastList, setToastToList] = useState<Record<number, ReactNode>>({});
    const unionClassName = [styles.toastContainer, positionClassMap[props.position || HorizontalPosition.right]].join(" ");

    const addToast = (toast: IToast) => {
        const keys = Object.keys(toastList).map(x => Number(x))
        const maxId = keys.length == 0 ? 0 : Math.max(...keys) + 1

        toast.id = maxId;
        setToastToList({[maxId]: <Toast {...toast}/>, ...toastList});
    };

    const removeToast = (id: number) => {
        setToastToList(prevToastList => {
            return Object.keys(prevToastList)
                .filter(key => Number(key) !== id)
                .reduce((acc, key) => {
                    acc[Number(key)] = prevToastList[Number(key)];
                    return acc;
                }, {} as Record<number, ReactNode>);
        });
    }

    return (
        <ToastContext.Provider value={{
            addToast: addToast,
            removeToast: removeToast
        }}>
            <div className={unionClassName}>
                {
                    Object.keys(toastList).map(x => <React.Fragment key={x}>{toastList[Number(x)]}</React.Fragment>)
                }
            </div>
            {props.children}
        </ToastContext.Provider>
    );
}