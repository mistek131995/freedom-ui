import {FC, TextareaHTMLAttributes} from "react";
import {Flex} from "../Flex";
import {Label} from "../Label";
import {Orientation} from "../../types/Orientation.ts";
import styles from "./styles.module.scss";

export interface ITextarea {
    label?: string,
    orientation?: Orientation
}

export type TextareaProps = ITextarea & TextareaHTMLAttributes<HTMLTextAreaElement>

export const Textarea : FC<TextareaProps> = ({label, orientation, className, style, ...props}) => {
    const unionClassName = [styles.textareaContainer, className].filter(x => x).join(" ")
    orientation = orientation || Orientation.vertical;

    return <Flex orientation={orientation} className={unionClassName} style={style}>
        <Label>{label}</Label>
        <textarea className={styles.textarea} {...props}/>
    </Flex>
}