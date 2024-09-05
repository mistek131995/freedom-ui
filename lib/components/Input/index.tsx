import styles from './styles.module.scss'
import {FC, InputHTMLAttributes} from "react";

export const Input : FC<InputHTMLAttributes<HTMLInputElement>> = ({ className, ...restProps }) => {
  const unionClassName = [className, styles.input]
      .filter(x => x)
      .join(" ");

  return <input className={unionClassName} {...restProps} />
}