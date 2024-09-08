import {Option} from "./Option.ts";
import {createContext, FC, InputHTMLAttributes, useCallback, useEffect, useRef, useState} from "react";
import styles from "./styles.module.scss";
import {SelectLabel} from "./SelectLabel.tsx";
import {ListOptions} from "./ListOptions.tsx";

export interface ISelect {
    placeholder?: string,
    options: Option[],
    inputAttributes?: InputHTMLAttributes<HTMLInputElement>
}

interface ISelectContext {
    searchValue: string,
    setSearchValue: (value: string) => void,
    selectedOptions: Option[],
    setSelectedOptions: (selectedOptions: Option[]) => void
}

export const SelectContext = createContext<ISelectContext | null>(null)

export const Select : FC<ISelect> = (props) => {
    const [selectedOptions, setSelectedOptions] = useState<Option[]>([]);
    const [searchValue, setSearchValue] = useState<string>("");

    const [isOptionsVisible, setVisible] = useState<boolean>(false);
    const ref = useRef<HTMLDivElement>(null);

    const handleClickOutside = useCallback((event: MouseEvent) => {
        if (ref.current && !ref.current.contains(event.target as Node)) {
            setVisible(false);
        }
    }, []);

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [])

    return <SelectContext.Provider value={{
        searchValue: searchValue,
        setSearchValue: setSearchValue,
        selectedOptions: selectedOptions,
        setSelectedOptions: setSelectedOptions
    }}>
        <div className={styles.select} ref={ref}>
            <SelectLabel onClick={() => setVisible(true)}
                         placeholder={props.placeholder || ""}/>
            <ListOptions isOptionsVisible={isOptionsVisible}
                         width={ref.current?.offsetWidth || 0}
                         options={props.options}/>
        </div>
    </SelectContext.Provider>
}