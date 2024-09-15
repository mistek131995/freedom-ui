import styles from "./styles.module.scss"
import {Option} from "./Option.ts";
import {FC, useCallback, useContext} from "react";
import {SelectContext} from "./index.tsx";

type ListOptionsProps = {
    options: Option[],
    isMulti?: boolean,
}

export const ListOptions : FC<ListOptionsProps> = (props) => {
    const context = useContext(SelectContext)

    const selectValue = useCallback((value: string) => {
        const option = props.options.find(x => x.value === value)!;

        if(props.isMulti){
            const newSelectedOptions = [...context!.selectedOptions, option];
            context?.setSelectedOptions(newSelectedOptions)
        }else{
            context?.setSelectedOptions([option])
        }

        context?.setSearchValue("")
    }, [props.options, props.isMulti, context])

    return <div className={styles.selectListOptions}
                style={{display: context?.isOptionVisible ? "block" : "none"}}>
        {
            context?.options.map(x => {
                let selectedStyle = x.label === context?.selectedOptions?.[0]?.label ? styles.selectedOption : "";
                selectedStyle = props.isMulti ? "" : selectedStyle;

                return <div key={x.value}
                     className={[styles.selectOption, selectedStyle].filter(x => x).join(" ")}
                     onClick={() => selectValue(x.value)}>
                    {x.label}
                </div>
            })
        }
    </div>
}