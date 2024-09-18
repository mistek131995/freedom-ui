import React, {FC, useContext} from "react";
import styles from "./styles.module.scss";
import {X} from "../../assets/images/X.tsx";
import {ArrowDown} from "../../assets/images/ArrowDown.tsx";
import {SelectContext} from "./index.tsx";

interface ISelectLabel {
    placeholder: string,
    isDisabled?: boolean
}

type SelectLabelProps = React.HTMLAttributes<HTMLDivElement> & ISelectLabel

export const SingleSelectLabel: FC<SelectLabelProps> = ({className, isDisabled, ...props}) => {
    const unionClassNames = [
        className || "",
        styles.selectLabelContainer,
        isDisabled ? styles.disabled : ""
    ].filter(x => x).join(" ");
    const context = useContext(SelectContext);
    isDisabled = isDisabled || false;

    return <>
        <div className={unionClassNames}>
            <div className={styles.labelOptionsContainer}>
                <input className={styles.selectedSingleOption}
                       placeholder={context?.selectedOptions?.[0]?.label || props.placeholder}
                       onClick={() => {
                           if(!isDisabled)
                               context?.setIsOptionVisible(true);
                       }}
                       onChange={(event) => {
                           context?.setSearchValue(event.target.value)
                       }} disabled={isDisabled}/>
            </div>
            <div className={styles.labelButtonContainer}>
                <div onClick={() => context?.setSelectedOptions([])}>
                    <X/>
                </div>
                <div onClick={() => {
                    if(!isDisabled)
                        context?.setIsOptionVisible(!context?.isOptionVisible)
                }}>
                    <ArrowDown/>
                </div>
            </div>
        </div>
    </>
}