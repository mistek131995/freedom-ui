import React, {FC, InputHTMLAttributes, useContext, useEffect, useRef} from "react";
import styles from "./styles.module.scss"
import {SelectContext} from "./index.tsx";
import {Option} from "./Option.ts";

interface ISelectLabel {
    placeholder: string,
    inputAttributes: InputHTMLAttributes<HTMLInputElement>
}

type SelectLabelProps = React.HTMLAttributes<HTMLDivElement> & ISelectLabel

export const SelectLabel : FC<SelectLabelProps> = ({className, inputAttributes, ...props}) => {
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
        <input {...inputAttributes} value={context?.selectedOptions.map(x => x.value)} type="hidden"/>
        <div className={unionClassNames}>
            <div className={styles.labelOptionsContainer}>
                {context?.selectedOptions &&
                    context?.selectedOptions.map(x => <div key={x.value}
                                                           contentEditable={false}
                                                           className={styles.selectedOption}>
                        <div>{x.label}</div>
                        <div onClick={() => deleteOption(x)}>
                            <img width={20} src="../../assets/images/x.svg"/>
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
                    <img width={25} src="../../assets/images/x.svg"/>
                </div>
                {!context?.isOptionVisible &&
                    <div onClick={(event) => {
                        if (props.onClick) {
                            props.onClick(event);
                        }
                    }}>
                        <img width={25} src="../../assets/images/arrow-down-short.svg"/>
                    </div>
                }
            </div>
        </div>
    </>

}