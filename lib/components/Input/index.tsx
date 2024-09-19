import styles from './styles.module.scss'
import {FC, InputHTMLAttributes, ReactNode} from "react";
import {Flex, Label} from "../../main.ts";
import { Orientation } from '../../../dist/types/Orientation';
import { AlignmentItems } from '../../../dist/types/AlignmentItems';

interface IInput {
  label?: string;
  iconLeft?: ReactNode,
  iconRight?: ReactNode,
  orientation?: Orientation
}

type InputProps = InputHTMLAttributes<HTMLInputElement> & IInput

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

export const Input : FC<InputProps> = ({ label, orientation = Orientation.vertical, iconLeft, iconRight, className, ...props }) => {
  const unionContainerClassName = [
    styles.inputContainer,
    props.disabled ? styles.disabled : ""
  ].filter(x => x).join(" ")

  return <Flex className={className} orientation={orientation} alignItems={alignItemsClassMap[orientation]}>
    {label &&
      <Label className={labelClassMap[orientation]} htmlFor={props.name}>{label}</Label>
    }
    <Flex alignItems={AlignmentItems.center} className={unionContainerClassName}>
      {iconLeft &&
          <span className={styles.inputIconLeft}>{iconLeft}</span>
      }
      <input className={styles.input} {...props} id={props.name}/>
      {iconRight &&
          <span className={styles.inputIconRight}>{iconRight}</span>
      }
    </Flex>
  </Flex>

}