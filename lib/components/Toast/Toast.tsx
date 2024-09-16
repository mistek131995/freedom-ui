import {IToast} from "./ToastProvider.tsx";
import {FC} from "react";

export const Toast: FC<IToast> = (props) => {
    return <div>
        <div>{props.label}</div>
        <div>{props.description}</div>
    </div>
}