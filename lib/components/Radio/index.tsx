import {FC, InputHTMLAttributes} from "react";
import {Label} from "../../main.ts";

interface IRadio{
    label?: string;
}

type RadioProps = InputHTMLAttributes<HTMLInputElement> & IRadio

export const Radio : FC<RadioProps> = ({label, ...props}) => {
    return <div>
        {label &&
            <Label>{label}</Label>
        }
        <input {...props} type="radio"/>
    </div>

}