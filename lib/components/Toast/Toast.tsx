import {IToast} from "./ToastProvider.tsx";
import {FC, useEffect} from "react";
import {useToast} from "./useToast.tsx";

export const Toast: FC<IToast> = (props) => {
    const {setToastList, toastList} = useToast();

    useEffect(() => {
        const timer = setTimeout(() => {
            console.log("hide")
        }, props.time || 5000);

        console.log("render")

        return () => clearTimeout(timer);
    }, []);

    return (
        <div>
            <div>{props.label}</div>
            <div>{props.description}</div>
        </div>
    );
}