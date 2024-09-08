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

interface ISelectOptions {
    selectedOptions: Option[],
    setSelectedOptions: (selectedOptions: Option[]) => void
}

export const SelectOptionContext = createContext<ISelectOptions | null>(null)

export const Select : FC<ISelect> = (props) => {
    const [isOptionsVisible, setVisible] = useState<boolean>(false);
    const [options, setOptions] = useState<Option[]>(props.options)
    const [selectedOptions, setSelectedOptions] = useState<Option[]>([])
    const ref = useRef<HTMLDivElement>(null);

    const handleClickOutside = useCallback((event: MouseEvent) => {
        if (ref.current && !ref.current.contains(event.target as Node)) {
            setVisible(false);
            setOptions(props.options);
        }
    }, []);

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [])

    const filterOptions = (value: string) => {
        if(value)
            setOptions(props.options.filter(x => x.label.toLowerCase().trim().includes(value.toLowerCase().trim())))
        else
            setOptions(props.options)
    }

    return <SelectOptionContext.Provider value={{selectedOptions: selectedOptions, setSelectedOptions: setSelectedOptions}}>
        <div className={styles.select} ref={ref}>
            <SelectLabel onClick={() => setVisible(!isOptionsVisible)} filterOptions={filterOptions}>
                {props.placeholder}
            </SelectLabel>
            <ListOptions isOptionsVisible={isOptionsVisible}
                         width={ref.current?.offsetWidth || 0}
                         options={options}/>
        </div>
    </SelectOptionContext.Provider>
}