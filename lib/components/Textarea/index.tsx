import {FC, TextareaHTMLAttributes} from "react";
import {Flex} from "../Flex";
import {Label} from "../Label";
import {Orientation} from "../../types/Orientation.ts";
import styles from "./styles.module.scss";
import {AlignmentItems} from "../../../dist/types/AlignmentItems";

export interface ITextarea {
    label?: string,
    orientation?: Orientation
}

const alignItemsClassMap = {
    [Orientation.vertical]: AlignmentItems.start,
    [Orientation.vertical_reverse]: AlignmentItems.start,
    [Orientation.horizontal]: AlignmentItems.center,
    [Orientation.horizontal_reverse]: AlignmentItems.center
}

const labelClassMap = {
    [Orientation.vertical]: "",
    [Orientation.vertical_reverse]: "",
    [Orientation.horizontal]: "me-1",
    [Orientation.horizontal_reverse]: "ms-1"
}

export type TextareaProps = ITextarea & TextareaHTMLAttributes<HTMLTextAreaElement>

export const Textarea : FC<TextareaProps> = ({label, orientation = Orientation.vertical, className, style, ...props}) => {
    const unionClassName = [styles.textareaContainer, className].filter(x => x).join(" ")

    return <Flex orientation={orientation} className={unionClassName} style={style} alignItems={alignItemsClassMap[orientation]}>
        {label &&
            <Label className={labelClassMap[orientation]}>{label}</Label>
        }
        <textarea className={styles.textarea} {...props}/>
    </Flex>
}