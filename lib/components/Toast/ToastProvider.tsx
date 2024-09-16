import {createContext, ReactNode, useState} from "react";

export interface IToastContext {
    addToast: (text: string) => void;
}

export const ToastContext = createContext<IToastContext | undefined>(undefined)

export const ToastProvider = (props: {children: ReactNode}) => {
    const [isToastShow, setIsToastShow] = useState(false);

    const addToast = (text: string) => {
        console.log(text);
    }

    return <ToastContext.Provider value={{
        addToast: addToast
    }}>
        {props.children}
    </ToastContext.Provider>
}