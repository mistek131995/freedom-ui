import styles from "./styles.module.scss"
import {FC, InputHTMLAttributes} from "react";
import {AlignmentItems, Flex, Label, Orientation} from "../../main.ts";

interface ICheckbox{
    label?: string,
    orientation?: Orientation
}

type CheckboxProps = InputHTMLAttributes<HTMLInputElement> & ICheckbox

export const Checkbox : FC<CheckboxProps> = ({label, orientation, ...props}) => {
    const unionClassName = [styles.checkboxContainer, props.className].filter(x => x).join(" ");
    orientation = orientation || Orientation.horizontal

    return <Flex orientation={orientation} alignItems={AlignmentItems.center} className={unionClassName}>
        {label &&
            <Label htmlFor={props.name}>{label}</Label>
        }

        <input id={props.name} {...props} className={styles.checkbox} type="checkbox"/>
    </Flex>

}