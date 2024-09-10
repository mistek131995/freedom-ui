import {InputHTMLAttributes} from "react";

export const Radio = (props: InputHTMLAttributes<HTMLInputElement>) => {
    return <input {...props} type="radio"/>
}