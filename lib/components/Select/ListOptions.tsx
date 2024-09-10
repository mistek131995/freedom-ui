import styles from "./styles.module.scss"
import {Option} from "./Option.ts";
import {FC, useContext} from "react";
import {SelectContext} from "./index.tsx";

type ListOptionsProps = {
    isOptionsVisible: boolean,
    options: Option[],
}

export const ListOptions : FC<ListOptionsProps> = (props) => {
    const context = useContext(SelectContext)

    const selectValue = (value: string) => {
        const option = props.options.find(x => x.value === value)!;
        const newSelectedOptions = [...context!.selectedOptions, option];

        context?.setSelectedOptions(newSelectedOptions)
        context?.setSearchValue("")
    }

    return <div className={styles.selectListOptions}
                style={{display: props.isOptionsVisible ? "block" : "none"}}>
        {
            context?.options.map(x => <div key={x.value}
                                           className={styles.selectOption}
                                           onClick={() => selectValue(x.value)}>
                {x.label}
            </div>)
        }
    </div>
}