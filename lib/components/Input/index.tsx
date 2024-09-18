import styles from './styles.module.scss'
import {FC, InputHTMLAttributes, ReactNode} from "react";
import {AlignmentItems, Flex, Label} from "../../main.ts";

interface IInput {
  label?: string;
  iconLeft?: ReactNode,
  iconRight?: ReactNode,
}

type InputProps = InputHTMLAttributes<HTMLInputElement> & IInput

export const Input : FC<InputProps> = ({ label, iconLeft, iconRight, className, ...props }) => {
  const unionContainerClassName = [
    styles.inputContainer,
    props.disabled ? styles.disabled : ""
  ].filter(x => x).join(" ")

  return <div className={className}>
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
  </div>

}