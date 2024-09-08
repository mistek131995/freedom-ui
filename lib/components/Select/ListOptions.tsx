import styles from "./styles.module.scss"
import {Option} from "./Option.ts";
import {FC, useContext} from "react";
import {SelectOptionContext} from "./index.tsx";

type ListOptionsProps = {
    isOptionsVisible: boolean,
    width: number,
    options: Option[]
}

export const ListOptions : FC<ListOptionsProps> = (props) => {
    const context = useContext(SelectOptionContext)

    const selectValue = (value: string) => {
        const option = props.options.find(x => x.value === value)!;
        const newSelectedOptions = [...context!.selectedOptions, option];

        context?.setSelectedOptions(newSelectedOptions)
    }

    return <div className={styles.selectListOptions}
                style={{display: props.isOptionsVisible ? "block" : "none", width: props.width}}>
        {
            props.options.map(x => <div key={x.value}
                                        className={styles.selectOption} onClick={() => selectValue(x.value)}>
                {x.label}
            </div>)
        }
    </div>
}