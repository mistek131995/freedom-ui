import styles from "./styles.module.scss"
import {FC, InputHTMLAttributes} from "react";
import {Flex, Label} from "../../main.ts";
import { Orientation } from "../../../dist/types/Orientation";
import { AlignmentItems } from "../../../dist/types/AlignmentItems";

interface ICheckbox{
    label?: string,
    orientation?: Orientation
}

const labelClassMap = {
    [Orientation.vertical]: "",
    [Orientation.vertical_reverse]: "",
    [Orientation.horizontal]: "me-1",
    [Orientation.horizontal_reverse]: "ms-1"
}

type CheckboxProps = InputHTMLAttributes<HTMLInputElement> & ICheckbox

export const Checkbox : FC<CheckboxProps> = ({label, orientation = Orientation.horizontal, className, style, ...props}) => {
    const unionClassName = [
        styles.checkboxContainer,
        className
    ].filter(x => x).join(" ");

    return <Flex orientation={orientation} alignItems={AlignmentItems.center} className={unionClassName} style={style}>
        {label &&
            <Label htmlFor={props.name} className={labelClassMap[orientation]}>{label}</Label>
        }

        <input id={props.name} {...props} className={styles.checkbox} type="checkbox"/>
    </Flex>

}