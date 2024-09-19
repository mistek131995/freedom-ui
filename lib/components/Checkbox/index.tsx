import styles from "./styles.module.scss"
import {FC, InputHTMLAttributes} from "react";
import {AlignmentItems, Flex, Label, Orientation} from "../../main.ts";

interface ICheckbox{
    label?: string,
    orientation?: Orientation
}

type CheckboxProps = InputHTMLAttributes<HTMLInputElement> & ICheckbox

export const Checkbox : FC<CheckboxProps> = ({label, orientation = Orientation.horizontal, className, style, ...props}) => {
    const unionClassName = [
        styles.checkboxContainer,
        className
    ].filter(x => x).join(" ");

    return <Flex orientation={orientation} alignItems={AlignmentItems.center} className={unionClassName} style={style}>
        {label &&
            <Label htmlFor={props.name} className={styles.checkboxLabel}>{label}</Label>
        }

        <input id={props.name} {...props} className={styles.checkbox} type="checkbox"/>
    </Flex>

}