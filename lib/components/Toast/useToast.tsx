import {useContext} from "react";
import {ToastContext} from "./ToastProvider.tsx";

export const useToast = () => {
    const toastContext = useContext(ToastContext);

    console.log(toastContext);

    if (!toastContext)
        throw new Error('useToast не может использоваться вне ToastProvider');

    return toastContext;
}