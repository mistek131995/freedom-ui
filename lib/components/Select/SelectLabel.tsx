import React, {FC, useContext} from "react";
import styles from "./styles.module.scss"
import {SelectContext} from "./index.tsx";

interface ISelectLabel {
    placeholder: string
}

type SelectLabelProps = React.HTMLAttributes<HTMLDivElement> & ISelectLabel

export const SelectLabel : FC<SelectLabelProps> = ({className, ...props}) => {
    const unionClassNames = [className || "", styles.selectLabel].filter(x => x).join(" ");
    const context = useContext(SelectContext)

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
                context?.selectedOptions.map(x => <div contentEditable={false}
                                                       className={styles.selectedOption}>{x.label}</div>)
            }
        </div>
    </>

}