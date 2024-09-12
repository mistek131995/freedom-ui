import styles from "./styles.module.scss"
import {Option} from "./Option.ts";
import {FC, useContext} from "react";
import {SelectContext} from "./index.tsx";

type ListOptionsProps = {
    options: Option[],
    isMulti?: boolean,
}

export const ListOptions : FC<ListOptionsProps> = (props) => {
    const context = useContext(SelectContext)

    const selectValue = (value: string) => {
        const option = props.options.find(x => x.value === value)!;

        if(props.isMulti){
            const newSelectedOptions = [...context!.selectedOptions, option];
            context?.setSelectedOptions(newSelectedOptions)
        }else{
            context?.setSelectedOptions([option])
        }

        context?.setSearchValue("")
    }

    return <div className={styles.selectListOptions}
                style={{display: context?.isOptionVisible ? "block" : "none"}}>
        {
            context?.options.map(x => <div key={x.value}
                                           className={styles.selectOption}
                                           onClick={() => selectValue(x.value)}>
                {x.label}
            </div>)
        }
    </div>
}