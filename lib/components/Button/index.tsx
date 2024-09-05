import React, {FC} from "react";
import {ButtonBackground} from "./ButtonBackground.ts";

interface IButton {
  bg?: ButtonBackground
}

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & IButton;

export const Button : FC<ButtonProps> = ({bg, className, ...props}) => {
  const unionClassName = [className || "", bg || ButtonBackground.primary]
      .filter(x => x)
      .join(" ")

  return <button className={unionClassName} {...props} />
}