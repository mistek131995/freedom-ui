import React, {useCallback, useEffect, useRef, useState} from "react";
import styles from "./styles.module.scss";
import {Calendar} from "./Calendar.tsx";
import {Label} from "../Label";
import {Flex} from "../Flex";
import {Orientation} from "../../types/Orientation.ts";

type DateRangePickerProps = {
    label?: string,
    onRangeSelect: (startDate: Date | null, endDate: Date | null) => void;
};

interface IDateRangePickerContext {
    currentDate: Date,
    setCurrentDate: (date: Date) => void,
    isCalendarOpen: boolean,
    setIsCalendarOpen: (value: boolean) => void,
    startDate: Date | null,
    setStartDate: (date: Date) => void,
    endDate: Date | null,
    setEndDate: (date: Date) => void,
    onRangeSelect: (startDate: Date | null, endDate: Date | null) => void
}

export const DateRangePickerContext = React.createContext<IDateRangePickerContext | null>(null)

export const DateRangePicker: React.FC<DateRangePickerProps> = ({ label, onRangeSelect }) => {
    const [currentDate, setCurrentDate] = useState(new Date());
    const [startDate, setStartDate] = useState<Date | null>(null);
    const [endDate, setEndDate] = useState<Date | null>(null);
    const [isCalendarOpen, setIsCalendarOpen] = useState(false);

    const inputUnionClassName = [
        styles.dateRangePickerInput,
        isCalendarOpen ? styles.selected : ""
    ].filter(x => x).join(" ")

    const formatDate = (date: Date | null) => {
        return date ? `${date.getDate()} ${date.toLocaleString('default', { month: 'short' })} ${date.getFullYear()}` : "";
    };

    const datepickerRef = useRef<HTMLDivElement>(null);
    const handleClickOutside = useCallback((event: MouseEvent) => {
        if(datepickerRef.current && !datepickerRef.current.contains(event.target as Node)) {
            setIsCalendarOpen(false);
        }
    }, [])

    useEffect(() => {
        document.addEventListener("mousedown", handleClickOutside)

        return () =>
        {
            document.removeEventListener("mousedown", handleClickOutside)
        }
    }, [handleClickOutside]);

    return <DateRangePickerContext.Provider value={{
        currentDate: currentDate,
        setCurrentDate: setCurrentDate,
        isCalendarOpen: isCalendarOpen,
        setIsCalendarOpen: setIsCalendarOpen,
        startDate: startDate,
        setStartDate: setStartDate,
        endDate: endDate,
        setEndDate: setEndDate,
        onRangeSelect: onRangeSelect,
    }}>
        <div>
            <Flex ref={datepickerRef} orientation={Orientation.vertical} className={styles.dateRangePicker}>
                {label &&
                    <Label>
                        {label}
                    </Label>
                }
                <div className={inputUnionClassName} onClick={() => setIsCalendarOpen(!isCalendarOpen)}>
                    {startDate && endDate ? (
                        <span>{`${formatDate(startDate)} - ${formatDate(endDate)}`}</span>
                    ) : (
                        <span>Выберите даты</span>
                    )}

                    {isCalendarOpen &&
                        <Calendar/>
                    }
                </div>
            </Flex>
        </div>
    </DateRangePickerContext.Provider>
};
