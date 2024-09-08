import React, {FC, useContext} from "react";
import styles from "./styles.module.scss"
import {SelectContext} from "./index.tsx";
import {Option} from "./Option.ts";

interface ISelectLabel {
    placeholder: string
}

type SelectLabelProps = React.HTMLAttributes<HTMLDivElement> & ISelectLabel

export const SelectLabel : FC<SelectLabelProps> = ({className, ...props}) => {
    const unionClassNames = [className || "", styles.selectLabel].filter(x => x).join(" ");
    const context = useContext(SelectContext);

    const deleteOption = (option: Option) => {
        const newOptions = [...context?.selectedOptions || []].filter(x => x != option)

        context?.setSelectedOptions(newOptions)
    }

    return <>
        <input value={context?.selectedOptions.map(x => x.value)} type="hidden"/>
        <div {...props}
             className={unionClassNames}>
            <div {...props}
                className={styles.searchField}
                 onClick={(event) => {
                     if (props.onClick) {
                         props.onClick(event);
                     }
                 }}
                 onInput={(event) => context?.setSearchValue(event.currentTarget.textContent || "")}
                 contentEditable={true}
                 suppressContentEditableWarning={true}>

            </div>
            {context?.selectedOptions &&
                context?.selectedOptions.map(x => <div key={x.value}
                                                       contentEditable={false}
                                                       className={styles.selectedOption}>
                    <div>{x.label}</div>
                    <div onClick={() => deleteOption(x)}>X</div>
                </div>)
            }
        </div>
    </>

}