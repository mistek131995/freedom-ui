import {Option} from "./Option.ts";
import {FC, useState} from "react";

export interface ISelect {
    placeholder?: string,
    options: Option[]
}

export const Select : FC<ISelect> = (props) => {
    const [isOptionsVisible, setVisible] = useState<boolean>(false)

    return <div>
        <div onClick={() => setVisible(!isOptionsVisible)}>{props.placeholder}</div>
        <div style={{display: isOptionsVisible ? "block" : "none"}}>
            {
                props.options.map(x => <div>{x.label}</div>)
            }
        </div>
    </div>
}