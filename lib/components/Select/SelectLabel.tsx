import React, {FC, useContext} from "react";
import styles from "./styles.module.scss"
import {SelectOptionContext} from "./index.tsx";

interface ISelectLabel {
    filterOptions: (value: string) => void
}

type SelectLabelProps = React.HTMLAttributes<HTMLDivElement> & ISelectLabel

export const SelectLabel : FC<SelectLabelProps> = ({className, ...props}) => {
    const unionClassNames = [className || "", styles.selectLabel].filter(x => x).join(" ")
    const options = useContext(SelectOptionContext)

    console.log(options?.selectedOptions)

    return <>
        <input value={options?.selectedOptions.map(x => x.value)} type="hidden"/>
        <div {...props}
             onClick={(event) => {
                 if (props.onClick) {
                     props.onClick(event);
                 }

                 event.currentTarget.textContent = ""
             }}
             onBlur={(event) => {
                 event.currentTarget.textContent = props.children!.toString()
             }}
             onInput={(event) => props.filterOptions(event.currentTarget.textContent || "")}
             className={unionClassNames}
             contentEditable={true}
             suppressContentEditableWarning={true}/>
    </>

}