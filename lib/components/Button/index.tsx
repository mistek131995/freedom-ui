import styles from './styles.module.scss'
import React, {FC} from "react";

interface IButton {
  bg?: background
}

enum background {
  primary = 'primary',
  secondary = 'secondary',
  success = 'success',
  warning = 'warning',
  danger = 'danger'
}

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & IButton;

export const Button : FC<ButtonProps> = ({bg, className, ...props}) => {
  const unionClassName = [className || "", bg || background.primary, styles.button].join(" ")

  return <button className={unionClassName} {...props} />
}