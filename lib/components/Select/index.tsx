import {Option} from "./Option.ts";
import {FC, useState} from "react";
import styles from "./styles.module.scss";

export interface ISelect {
    placeholder?: string,
    options: Option[]
}

export const Select : FC<ISelect> = (props) => {
    const [isOptionsVisible, setVisible] = useState<boolean>(false)

    return <div>
        <div className={styles.selectLabel} onClick={() => setVisible(!isOptionsVisible)} contentEditable={true}>
            {props.placeholder}
        </div>
        <div className={styles.selectListOptions} style={{display: isOptionsVisible ? "block" : "none"}}>
            {
                props.options.map(x => <div className={styles.selectOption} key={x.value}>
                    {x.label}
                </div>)
            }
        </div>
    </div>
}