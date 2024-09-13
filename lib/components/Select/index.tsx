import {Option} from "./Option.ts";
import {createContext, FC, InputHTMLAttributes, useCallback, useEffect, useRef, useState} from "react";
import styles from "./styles.module.scss";
import {MultiSelectLabel} from "./MultiSelectLabel.tsx";
import {ListOptions} from "./ListOptions.tsx";
import {SingleSelectLabel} from "./SingleSelectLabel.tsx";
import {Label} from "../../main.ts";

export interface ISelect {
    placeholder?: string,
    options: Option[],
    isMulti?: boolean,
    label?: string,
}

export type SelectProps = InputHTMLAttributes<HTMLInputElement> & ISelect

interface ISelectContext {
    options: Option[],
    setOptions: (options: Option[]) => void,
    searchValue: string,
    setSearchValue: (value: string) => void,
    selectedOptions: Option[],
    setSelectedOptions: (selectedOptions: Option[]) => void,
    isOptionVisible?: boolean,
    setIsOptionVisible: (visible: boolean) => void,
}

export const SelectContext = createContext<ISelectContext | null>(null)

export const Select : FC<SelectProps> = ({className, style, options, isMulti, placeholder, label, ...props}) => {
    const [selectedOptions, setSelectedOptions] = useState<Option[]>([]);
    const [searchValue, setSearchValue] = useState<string>("");
    const [optionsList, setOptionList] = useState<Option[]>(options)
    const [isOptionsVisible, setOptionsVisible] = useState<boolean>(false);
    const ref = useRef<HTMLDivElement>(null);

    const unionClassName = [styles.select, (isOptionsVisible ? styles.focus : "")]
        .filter(x => x)
        .join(" ")

    const handleClickOutside = useCallback((event: MouseEvent) => {
        if (ref.current && !ref.current.contains(event.target as Node)) {
            setOptionsVisible(false);
        }
    }, []);

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [handleClickOutside])

    useEffect(() => {
        if(isMulti){
            setOptionList(options.filter(x =>
                x.label.toLowerCase().trim().includes(searchValue.toLowerCase().trim() || "") &&
                !selectedOptions.includes(x)))
        }
        else
        {
            setOptionList(options.filter(x =>
                x.label.toLowerCase().trim().includes(searchValue.toLowerCase().trim() || "")))
        }
    }, [searchValue, options, selectedOptions, isMulti])

    return <SelectContext.Provider value={{
        options: optionsList,
        setOptions: setOptionList,
        searchValue: searchValue,
        setSearchValue: setSearchValue,
        selectedOptions: selectedOptions,
        setSelectedOptions: setSelectedOptions,
        isOptionVisible: isOptionsVisible,
        setIsOptionVisible: setOptionsVisible
    }}>
        <div className={className} style={style}>
            {label &&
                <Label>{label}</Label>
            }

            <div className={unionClassName} ref={ref}>
                <input {...props} value={selectedOptions.map(x => x.value)} type="hidden"/>
                {!isMulti &&
                    <SingleSelectLabel onClick={() => setOptionsVisible(true)}
                                       placeholder={placeholder || ""}/>
                }
                {isMulti &&
                    <MultiSelectLabel onClick={() => setOptionsVisible(true)}
                                      placeholder={placeholder || ""}/>
                }
                <ListOptions isMulti={isMulti}
                             options={options}/>
            </div>
        </div>

    </SelectContext.Provider>
}