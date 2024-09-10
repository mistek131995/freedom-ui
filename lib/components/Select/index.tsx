import {Option} from "./Option.ts";
import {createContext, FC, InputHTMLAttributes, useCallback, useEffect, useRef, useState} from "react";
import styles from "./styles.module.scss";
import {SelectLabel} from "./SelectLabel.tsx";
import {ListOptions} from "./ListOptions.tsx";

export interface ISelect {
    placeholder?: string,
    options: Option[],
    inputAttributes: InputHTMLAttributes<HTMLInputElement>
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
        setOptions(props.options.filter(x =>
            x.label.toLowerCase().trim().includes(searchValue.toLowerCase().trim() || "") &&
            !selectedOptions.includes(x)))
    }, [searchValue, props.options, selectedOptions])

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
        <div className={styles.select + " " + className} style={style} ref={ref}>
            <SelectLabel onClick={() => setOptionsVisible(true)}
                         placeholder={props.placeholder || ""}
                         inputAttributes={inputAttributes}/>
            <ListOptions isOptionsVisible={isOptionsVisible}
                         options={props.options}/>
        </div>
    </SelectContext.Provider>
}