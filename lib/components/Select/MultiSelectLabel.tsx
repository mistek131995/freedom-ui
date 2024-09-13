import React, {FC, useContext, useEffect, useRef} from "react";
import styles from "./styles.module.scss"
import {SelectContext} from "./index.tsx";
import {Option} from "./Option.ts";
import {X} from "../../assets/images/X.tsx";
import {ArrowDown} from "../../assets/images/ArrowDown.tsx";

interface ISelectLabel {
    placeholder: string
}

type SelectLabelProps = React.HTMLAttributes<HTMLDivElement> & ISelectLabel

export const MultiSelectLabel : FC<SelectLabelProps> = ({className, ...props}) => {
    const unionClassNames = [className || "", styles.selectLabelContainer].filter(x => x).join(" ");
    const context = useContext(SelectContext);
    const searchFieldRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        if(context?.isOptionVisible && context?.selectedOptions.length > 0)
            searchFieldRef.current!.innerText = context?.searchValue || ""
    }, [context?.isOptionVisible, context?.selectedOptions.length])

    const deleteOption = (option: Option) => {
        const newOptions = [...context?.selectedOptions || []].filter(x => x != option)

        context?.setSelectedOptions(newOptions)
    }

    return <>
        <div className={unionClassNames}>
            <div className={styles.labelOptionsContainer}>
                {context?.selectedOptions &&
                    context?.selectedOptions.map(x => <div key={x.value}
                                                           contentEditable={false}
                                                           className={styles.selectedMultiOption}>
                        <div>{x.label}</div>
                        <div onClick={() => deleteOption(x)}>
                            <X color="white"/>
                        </div>
                    </div>)
                }

                <div {...props}
                     ref={searchFieldRef}
                     className={styles.searchField}
                     onClick={(event) => {
                         if (props.onClick) {
                             props.onClick(event);
                         }
                     }}
                     onInput={(event) => context?.setSearchValue(event.currentTarget.textContent || "")}
                     contentEditable={true}
                     suppressContentEditableWarning={true}>
                    {!context?.isOptionVisible && context?.selectedOptions.length == 0 &&
                        props.placeholder
                    }
                </div>
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