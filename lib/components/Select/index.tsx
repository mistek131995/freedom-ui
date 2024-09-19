import {Option} from "./Option.ts";
import {createContext, FC, InputHTMLAttributes, useCallback, useEffect, useMemo, useRef, useState} from "react";
import styles from "./styles.module.scss";
import {MultiSelectLabel} from "./MultiSelectLabel.tsx";
import {ListOptions} from "./ListOptions.tsx";
import {SingleSelectLabel} from "./SingleSelectLabel.tsx";
import {Flex, Label} from "../../main.ts";
import { AlignmentItems } from "../../../dist/types/AlignmentItems";
import { Orientation } from "../../../dist/types/Orientation";

export interface ISelect {
    placeholder?: string,
    options: Option[],
    isMulti?: boolean,
    label?: string,
    orientation?: Orientation
}

export type SelectProps = InputHTMLAttributes<HTMLInputElement> & ISelect

interface ISelectContext {
    options: Option[],
    searchValue: string,
    setSearchValue: (value: string) => void,
    selectedOptions: Option[],
    setSelectedOptions: (selectedOptions: Option[]) => void,
    isOptionVisible?: boolean,
    setIsOptionVisible: (visible: boolean) => void,
}

export const SelectContext = createContext<ISelectContext | null>(null)

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

export const Select : FC<SelectProps> = ({className, style, options, isMulti, orientation = Orientation.vertical, placeholder, label, ...props}) => {
    const [selectedOptions, setSelectedOptions] = useState<Option[]>([]);
    const [searchValue, setSearchValue] = useState<string>("");
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

    const filteredOptions = useMemo(() => {
        if(isMulti){
            return options.filter(x =>
                x.label.toLowerCase().trim().includes(searchValue.toLowerCase().trim() || "") &&
                !selectedOptions.includes(x))
        }
        else
        {
            return options.filter(x =>
                x.label.toLowerCase().trim().includes(searchValue.toLowerCase().trim() || ""))
        }
    }, [options, searchValue, selectedOptions, isMulti])

    return <SelectContext.Provider value={{
        options: filteredOptions,
        searchValue: searchValue,
        setSearchValue: setSearchValue,
        selectedOptions: selectedOptions,
        setSelectedOptions: setSelectedOptions,
        isOptionVisible: isOptionsVisible,
        setIsOptionVisible: setOptionsVisible
    }}>
        <Flex orientation={orientation} className={className} style={style} alignItems={alignItemsClassMap[orientation]}>
            {label &&
                <Label className={labelClassMap[orientation]}>{label}</Label>
            }

            <div className={unionClassName} ref={ref}>
                <input {...props} value={selectedOptions.map(x => x.value)} type="hidden"/>
                {!isMulti &&
                    <SingleSelectLabel placeholder={placeholder || ""} isDisabled={props.disabled}/>
                }
                {isMulti &&
                    <MultiSelectLabel placeholder={placeholder || ""} isDisabled={props.disabled}/>
                }
                <ListOptions isMulti={isMulti}
                             options={options}/>
            </div>
        </Flex>
    </SelectContext.Provider>
}