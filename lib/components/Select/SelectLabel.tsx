import React, {FC, useContext} from "react";
import styles from "./styles.module.scss"
import {SelectContext} from "./index.tsx";

type SelectLabelProps = React.HTMLAttributes<HTMLDivElement>

export const SelectLabel : FC<SelectLabelProps> = ({className, ...props}) => {
    const unionClassNames = [className || "", styles.selectLabel].filter(x => x).join(" ");
    const context = useContext(SelectContext)

    return <>
        <input value={context?.selectedOptions.map(x => x.value)} type="hidden"/>
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
             onInput={(event) => context?.setSearchValue(event.currentTarget.textContent || "")}
             className={unionClassNames}
             contentEditable={true}
             suppressContentEditableWarning={true}>

            {context?.selectedOptions &&
                context?.selectedOptions.map(x => <div>{x.label}</div>)
            }

        </div>
    </>

}