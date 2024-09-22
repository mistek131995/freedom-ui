import React, {InputHTMLAttributes, useCallback, useEffect, useRef, useState} from 'react';
import styles from './styles.module.scss';
import {Calendar} from "./Calendar.tsx";
import {Label} from "../Label";

export interface IDatePicker {
    label?: string,
    placeholder?: string,
    onDateChange?: (date: Date) => void,
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

export const DatePikerContext = React.createContext<IDatePickerContext | null>(null)

export const DatePicker: React.FC<DatePickerProps> = ({
                                                          label,
                                                          placeholder = "Выберите дату",
                                                          defaultValue,
                                                          className,
                                                          onDateChange,
                                                          style,
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
        <div ref={datepickerRef} className={[styles.datePicker, className].filter(x => x).join(" ")} style={style}>
            {label &&
                <Label className={styles.datePickerLabel}>{label}</Label>
            }
            <div className={[styles.datePickerInput, (isOpen ? styles.selected : "")].filter(x => x).join(" ")} onClick={toggleCalendar}>
                {selectedDate ? selectedDate.toLocaleDateString() : placeholder}
            </div>
            <input type="hidden" {...props} value={(selectedDate || defaultValue || "")?.toString()}/>
            {isOpen && <Calendar/>}
        </div>
    </DatePikerContext.Provider>

};