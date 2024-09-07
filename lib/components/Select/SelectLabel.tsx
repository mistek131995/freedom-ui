import React, {FC} from "react";
import styles from "./styles.module.scss"

interface ISelectLabel {
    filterOptions: (value: string) => void
}

type SelectLabelProps = React.HTMLAttributes<HTMLDivElement> & ISelectLabel

export const SelectLabel : FC<SelectLabelProps> = ({className, ...props}) => {
    const unionClassNames = [className || "", styles.selectLabel].filter(x => x).join(" ")

    return <div {...props}
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
}