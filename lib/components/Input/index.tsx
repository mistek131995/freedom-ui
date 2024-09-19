import styles from './styles.module.scss'
import {FC, InputHTMLAttributes, ReactNode} from "react";
import {AlignmentItems, Flex, Label, Orientation} from "../../main.ts";

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

export const Input : FC<InputProps> = ({ label, orientation = Orientation.vertical, iconLeft, iconRight, className, ...props }) => {
  const unionContainerClassName = [
    styles.inputContainer,
    props.disabled ? styles.disabled : ""
  ].filter(x => x).join(" ")

  return <Flex className={className} orientation={orientation} alignItems={alignItemsClassMap[orientation]}>
    {label &&
      <Label htmlFor={props.name}>{label}</Label>
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