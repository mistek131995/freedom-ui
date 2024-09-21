import React, {useCallback, useEffect, useRef, useState} from 'react';
import styles from './styles.module.scss';
import {Calendar} from "./Calendar.tsx";
import {Label} from "../Label";

interface DatePickerProps {
    label?: string,
    defaultValue?: Date,
    placeholder?: string,
    onDateChange?: (date: Date) => void,
}

interface IDatePickerContext {
    currentDate: Date,
    setCurrentDate: (date: Date) => void,
    selectedDate: Date | null,
    setSelectedDate: (date: Date) => void,
    setIsOpen: (isOpen: boolean) => void,
    onDateChange?: (date: Date) => void,
}

export const DatePikerContext = React.createContext<IDatePickerContext | null>(null)

export const DatePicker: React.FC<DatePickerProps> = ({ label, placeholder = "Выберите дату", defaultValue = null, onDateChange }) => {
    const [currentDate, setCurrentDate] = useState<Date>(new Date());
    const [selectedDate, setSelectedDate] = useState<Date | null>(defaultValue);
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
        <div className={styles.datePicker}>
            {label &&
                <Label className={styles.datePickerLabel}>{label}</Label>
            }
            <div ref={datepickerRef} className={styles.datePickerInput} onClick={toggleCalendar}>
                {selectedDate ? selectedDate.toLocaleDateString() : placeholder}
            </div>
            {isOpen && <Calendar/>}
        </div>
    </DatePikerContext.Provider>

};