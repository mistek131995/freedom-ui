import React, {FC} from "react";
import {ButtonBackground} from "./ButtonBackground.ts";
import styles from "./styles.module.scss"

export interface IButton {
  bg?: ButtonBackground
}

export type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & IButton;

const backgroundClassMap = {
  [ButtonBackground.primary]: styles.primary,
  [ButtonBackground.secondary]: styles.secondary,
  [ButtonBackground.success]: styles.success,
  [ButtonBackground.warning]: styles.warning,
  [ButtonBackground.danger]: styles.danger,
}

export const Button : FC<ButtonProps> = ({bg = ButtonBackground.primary, className, ...props}) => {
  const unionClassName = [className || "", backgroundClassMap[bg], styles.button]
      .filter(x => x)
      .join(" ")

  return <button className={unionClassName} {...props} />
}