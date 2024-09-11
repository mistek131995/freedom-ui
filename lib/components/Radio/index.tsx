import {FC, InputHTMLAttributes, useRef} from "react";
import {AlignmentItems, Flex, Label, Orientation} from "../../main.ts";
import styles from "./styles.module.scss"

interface IRadio{
    label?: string,
    orientation?: Orientation
}

type RadioProps = InputHTMLAttributes<HTMLInputElement> & IRadio

export const Radio : FC<RadioProps> = ({label, orientation, className, style, ...props}) => {
    const radioRef = useRef<HTMLInputElement>(null);
    orientation = orientation || Orientation.horizontal;


    return <Flex orientation={orientation} alignItems={AlignmentItems.center} className={className} style={style}>
        {label &&
            <Label htmlFor={props.value?.toString()}>{label}</Label>
        }
        <div className={styles.customRadio}>
            <input ref={radioRef} id={props.value?.toString()} {...props} type="radio"/>
            <span className={styles.radioCheckmark}
                  onClick={() => {
                      if(radioRef.current)
                        radioRef.current.checked = true
                  }}/>
        </div>
    </Flex>

}