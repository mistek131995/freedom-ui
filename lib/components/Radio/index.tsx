import {FC, InputHTMLAttributes, useRef} from "react";
import {AlignmentItems, Flex, Label, Orientation} from "../../main.ts";
import styles from "./styles.module.scss"

interface IRadio{
    label?: string,
    orientation?: Orientation
}

type RadioProps = InputHTMLAttributes<HTMLInputElement> & IRadio

export const Radio : FC<RadioProps> = ({label, orientation = Orientation.horizontal, className, style, ...props}) => {
    const radioRef = useRef<HTMLInputElement>(null);
    const unionCheckmarkClassName = [
        styles.radioCheckmark,
        props.disabled ? styles.disabled : ""
    ].filter(x => x).join(" ")


    return <Flex orientation={orientation} alignItems={AlignmentItems.center} className={className} style={style}>
        {label &&
            <Label htmlFor={props.value?.toString()}>{label}</Label>
        }
        <div className={styles.customRadio}>
            <input ref={radioRef} id={props.value?.toString()} {...props} type="radio"/>
            <span className={unionCheckmarkClassName}
                  onClick={() => {
                      if(radioRef.current && !props.disabled)
                        radioRef.current.checked = true
                  }}/>
        </div>
    </Flex>

}