import {Option} from "./Option.ts";
import {FC, useState} from "react";
import styles from "./styles.module.scss";
import {SelectLabel} from "./SelectLabel.tsx";

export interface ISelect {
    placeholder?: string,
    options: Option[]
}

export const Select : FC<ISelect> = (props) => {
    const [isOptionsVisible, setVisible] = useState<boolean>(false);

    return <div className={styles.select}>
        <SelectLabel onClick={() => setVisible(!isOptionsVisible)}>
            {props.placeholder}
        </SelectLabel>
        <div className={styles.selectListOptions} style={{display: isOptionsVisible ? "block" : "none"}}>
            {
                props.options.map(x => <div className={styles.selectOption} key={x.value}>
                    {x.label}
                </div>)
            }
        </div>
    </div>
}