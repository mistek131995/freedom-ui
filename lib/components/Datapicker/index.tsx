import React, {InputHTMLAttributes, useCallback, useEffect, useRef, useState} from 'react';
import styles from './styles.module.scss';
import {Calendar} from "./Calendar.tsx";
import {Label} from "../Label";
import {Flex} from "../Flex";
import {Orientation} from "../../../dist/types/Orientation";
import {AlignmentItems} from "../../../dist/types/AlignmentItems";

export interface IDatePicker {
    label?: string,
    placeholder?: string,
    onDateChange?: (date: Date) => void,
    orientation?: Orientation
}

export type DatePickerProps = InputHTMLAttributes<HTMLInputElement> & IDatePicker;

interface IDatePickerContext {
    currentDate: Date,
    setCurrentDate: (date: Date) => void,
    selectedDate: Date | null,
    setSelectedDate: (date: Date) => void,
    setIsOpen: (isOpen: boolean) => void,
    onDateChange?: (date: Date) => void
}

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

export const DatePikerContext = React.createContext<IDatePickerContext | null>(null)

export const DatePicker: React.FC<DatePickerProps> = ({
                                                          label,
                                                          placeholder = "Выберите дату",
                                                          defaultValue,
                                                          className,
                                                          onDateChange,
                                                          style,
                                                          orientation = Orientation.vertical,
                                                          ...props }) => {
    const [currentDate, setCurrentDate] = useState<Date>(new Date());
    const [selectedDate, setSelectedDate] = useState<Date | null>(defaultValue == null ? null : new Date(defaultValue as string));
    const [isOpen, setIsOpen] = useState<boolean>(false);

    const datepickerRef = useRef<HTMLDivElement>(null);
    const handleClickOutside = useCallback((event: MouseEvent) => {

        if(datepickerRef.current && !datepickerRef.current.contains(event.target as Node)) {
            setIsOpen(false);
        }
    }, [])

    useEffect(() => {
        document.addEventListener("mousedown", handleClickOutside)

        return () =>
        {
            document.removeEventListener("mousedown", handleClickOutside)
        }
    }, [handleClickOutside]);

    const toggleCalendar = () => {
        setIsOpen(!isOpen);
    };

    return <DatePikerContext.Provider value={{
        currentDate: currentDate,
        setCurrentDate: setCurrentDate,
        selectedDate: selectedDate,
        setSelectedDate: setSelectedDate,
        setIsOpen: setIsOpen,
        onDateChange: onDateChange
    }}>
        <Flex alignItems={alignItemsClassMap[orientation]} orientation={Orientation.horizontal} ref={datepickerRef} className={[styles.datePicker, className].filter(x => x).join(" ")} style={style}>
            {label &&
                <Label className={[styles.datePickerLabel, labelClassMap[orientation]].filter(x => x).join(" ")}>{label}</Label>
            }
            <div className={[styles.datePickerInput, (isOpen ? styles.selected : "")].filter(x => x).join(" ")} onClick={toggleCalendar}>
                {selectedDate ? selectedDate.toLocaleDateString() : placeholder}
            </div>
            <input type="hidden" {...props} value={(selectedDate || defaultValue || "")?.toString()}/>
            {isOpen && <Calendar/>}
        </Flex>
    </DatePikerContext.Provider>

};