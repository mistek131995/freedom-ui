import styles from './styles.module.scss'
import {FC, InputHTMLAttributes, ReactNode} from "react";
import {AlignmentItems, Flex, Label} from "../../main.ts";

interface IInput {
  label?: string;
  iconLeft?: ReactNode,
  iconRight?: ReactNode,
}

type InputProps = InputHTMLAttributes<HTMLInputElement> & IInput

export const Input : FC<InputProps> = ({ label, iconLeft, iconRight, className, ...restProps }) => {

  return <div className={className}>
    {label &&
      <Label>{label}</Label>
    }
    <Flex alignItems={AlignmentItems.center} className={styles.inputContainer}>
      {iconLeft &&
          <span className={styles.inputIconLeft}>{iconLeft}</span>
      }
      <input className={styles.input} {...restProps} />
      {iconRight &&
          <span className={styles.inputIconRight}>{iconRight}</span>
      }
    </Flex>
  </div>

}