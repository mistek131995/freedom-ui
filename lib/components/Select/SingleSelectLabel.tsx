import React, {FC, useContext} from "react";
import styles from "./styles.module.scss";
import {X} from "../../assets/images/X.tsx";
import {ArrowDown} from "../../assets/images/ArrowDown.tsx";
import {SelectContext} from "./index.tsx";

interface ISelectLabel {
    placeholder: string
}

type SelectLabelProps = React.HTMLAttributes<HTMLDivElement> & ISelectLabel

export const SingleSelectLabel: FC<SelectLabelProps> = ({className, ...props}) => {
    const unionClassNames = [className || "", styles.selectLabelContainer].filter(x => x).join(" ");
    const context = useContext(SelectContext);

    return <>
        <div className={unionClassNames}>
            <div className={styles.labelOptionsContainer}>
                <input className={styles.selectedSingleOption}
                       placeholder={context?.selectedOptions?.[0]?.label || props.placeholder}
                       onClick={() => {
                           context?.setIsOptionVisible(true);
                       }}
                       onChange={(event) => {
                           context?.setSearchValue(event.target.value)
                       }}/>
            </div>
            <div className={styles.labelButtonContainer}>
                <div onClick={() => context?.setSelectedOptions([])}>
                    <X/>
                </div>
                {!context?.isOptionVisible &&
                    <div onClick={(event) => {
                        if (props.onClick) {
                            props.onClick(event);
                        }
                    }}>
                        <ArrowDown/>
                    </div>
                }
            </div>
        </div>
    </>
}