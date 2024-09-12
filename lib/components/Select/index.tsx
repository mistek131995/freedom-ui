import {Option} from "./Option.ts";
import {createContext, FC, InputHTMLAttributes, useCallback, useEffect, useRef, useState} from "react";
import styles from "./styles.module.scss";
import {MultiSelectLabel} from "./MultiSelectLabel.tsx";
import {ListOptions} from "./ListOptions.tsx";
import {SingleSelectLabel} from "./SingleSelectLabel.tsx";

export interface ISelect {
    placeholder?: string,
    options: Option[],
    inputAttributes: InputHTMLAttributes<HTMLInputElement>,
    isMulti?: boolean
}

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

export const Select : FC<ISelect> = (props) => {
    const [selectedOptions, setSelectedOptions] = useState<Option[]>([]);
    const [searchValue, setSearchValue] = useState<string>("");
    const [options, setOptions] = useState<Option[]>(props.options)
    const [isOptionsVisible, setOptionsVisible] = useState<boolean>(false);

    const ref = useRef<HTMLDivElement>(null);
    const {className, style, ...inputAttributes} = props.inputAttributes;

    const unionClassName = [styles.select, className, (isOptionsVisible ? styles.focus : "")]
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
        if(props.isMulti){
            setOptions(props.options.filter(x =>
                x.label.toLowerCase().trim().includes(searchValue.toLowerCase().trim() || "") &&
                !selectedOptions.includes(x)))
        }
        else
        {
            setOptions(props.options.filter(x =>
                x.label.toLowerCase().trim().includes(searchValue.toLowerCase().trim() || "")))
        }
    }, [searchValue, props.options, selectedOptions, props.isMulti])

    return <SelectContext.Provider value={{
        options: options,
        setOptions: setOptions,
        searchValue: searchValue,
        setSearchValue: setSearchValue,
        selectedOptions: selectedOptions,
        setSelectedOptions: setSelectedOptions,
        isOptionVisible: isOptionsVisible,
        setIsOptionVisible: setOptionsVisible
    }}>
        <div className={unionClassName} style={style} ref={ref}>
            <input {...inputAttributes} value={selectedOptions.map(x => x.value)} type="hidden"/>
            {!props.isMulti &&
                <SingleSelectLabel onClick={() => setOptionsVisible(true)}
                                   placeholder={props.placeholder || ""}/>
            }
            {props.isMulti &&
                <MultiSelectLabel onClick={() => setOptionsVisible(true)}
                                  placeholder={props.placeholder || ""}/>
            }
            <ListOptions isMulti={props.isMulti}
                         options={props.options}/>
        </div>
    </SelectContext.Provider>
}