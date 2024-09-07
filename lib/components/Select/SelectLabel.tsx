import React, {FC} from "react";
import styles from "./styles.module.scss"

export const SelectLabel : FC<React.HTMLAttributes<HTMLDivElement>> = ({className, ...props}) => {
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
                className={unionClassNames}
                contentEditable={true}
                suppressContentEditableWarning={true}/>
}