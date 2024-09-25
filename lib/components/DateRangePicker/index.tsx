import React, { useState } from "react";
import styles from "./styles.module.scss";
import {Calendar} from "./Calendar.tsx";
import {months} from "../../entity/months.ts";

type DateRangePickerProps = {
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

export const DateRangePicker: React.FC<DateRangePickerProps> = ({ onRangeSelect }) => {
    const [currentDate, setCurrentDate] = useState(new Date());
    const [startDate, setStartDate] = useState<Date | null>(null);
    const [endDate, setEndDate] = useState<Date | null>(null);
    const [isCalendarOpen, setIsCalendarOpen] = useState(false); // Состояние для свернутого/развернутого календаря

    const formatDate = (date: Date | null) => {
        return date ? `${date.getDate()} ${months[date.getMonth()]} ${date.getFullYear()}` : "";
    };

    const toggleCalendar = () => {
        setIsCalendarOpen(!isCalendarOpen);
    };

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
        <div className={styles.dateRangePicker}>
            <div className={styles.toggleButton} onClick={toggleCalendar}>
                {startDate && endDate ? (
                    <span>{`${formatDate(startDate)} - ${formatDate(endDate)}`}</span>
                ) : (
                    <span>Выберите даты</span>
                )}
            </div>
            {isCalendarOpen &&
                <Calendar/>
            }
        </div>
    </DateRangePickerContext.Provider>
};
