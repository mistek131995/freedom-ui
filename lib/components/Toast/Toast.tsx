import {IToast} from "./ToastProvider.tsx";
import {FC, useEffect} from "react";
import {useToast} from "./useToast.tsx";

export const Toast: FC<IToast> = (props) => {
    const {setToastList, toastList} = useToast();

    useEffect(() => {
        const timer = setTimeout(() => {
            setToastList(
                toastList.map(x =>
                    x.id === props.id ? {...x, isVisible: false} : x
                )
            );
        }, props.time || 5000);

        return () => clearTimeout(timer);
    }, [props.id, props.time, setToastList, toastList]);

    if (!props.isVisible) return null;

    return (
        <div>
            <div>{props.label}</div>
            <div>{props.description}</div>
        </div>
    );
}