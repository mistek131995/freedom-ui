import styles from './styles.module.scss'
import {FC, InputHTMLAttributes, ReactNode, useState} from "react";
import {Flex, Label} from "../../main.ts";
import {Orientation} from '../../../dist/types/Orientation';
import {AlignmentItems} from '../../../dist/types/AlignmentItems';
import {Eye} from "../../assets/images/Eye.tsx";

interface IInput {
  label?: string;
  iconLeft?: ReactNode,
  iconRight?: ReactNode,
  orientation?: Orientation,
  showVisibleSwitcher?: boolean,
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

export const Input : FC<InputProps> = ({ label, orientation = Orientation.vertical, iconLeft, iconRight, className, style, showVisibleSwitcher = true, type, ...props }) => {
  const [inputType, setInputType] = useState(type || "text")

  const unionContainerClassName = [
    styles.inputContainer,
    props.disabled ? styles.disabled : ""
  ].filter(x => x).join(" ")

  return <Flex className={className} style={style} orientation={orientation} alignItems={alignItemsClassMap[orientation]}>
    {label &&
      <Label className={labelClassMap[orientation]} htmlFor={props.name}>{label}</Label>
    }
    <Flex noWrap={true} alignItems={AlignmentItems.center} className={unionContainerClassName}>
      {iconLeft &&
          <span className={styles.inputIconLeft}>{iconLeft}</span>
      }
      <input className={styles.input} type={inputType} {...props} id={props.name}/>
      {iconRight && type !== "password" &&
          <span className={styles.inputIconRight}>{iconRight}</span>
      }

      {type === "password" && showVisibleSwitcher &&
        <span className={styles.inputIconRight} onClick={() => setInputType(inputType == "password" ? "text" : "password")}>
          {iconRight &&
              iconRight
          }
          {!iconRight &&
              <Eye/>
          }
        </span>
      }
    </Flex>
  </Flex>

}