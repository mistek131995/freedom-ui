import {FC, InputHTMLAttributes, useRef} from "react";
import {Flex, Label} from "../../main.ts";
import styles from "./styles.module.scss"
import { Orientation } from "../../../dist/types/Orientation";
import { AlignmentItems } from "../../../dist/types/AlignmentItems";

interface IRadio{
    label?: string,
    orientation?: Orientation
}

const labelClassMap = {
    [Orientation.vertical]: "",
    [Orientation.vertical_reverse]: "",
    [Orientation.horizontal]: "me-1",
    [Orientation.horizontal_reverse]: "ms-1"
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
            <Label className={labelClassMap[orientation]} htmlFor={props.value?.toString()}>{label}</Label>
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