import React, {useState} from "react";
import styles from "./styles.module.scss";
import {Calendar} from "./Calendar.tsx";
import {months} from "../../entity/months.ts";
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
    const [isCalendarOpen, setIsCalendarOpen] = useState(false); // Состояние для свернутого/развернутого календаря

    const formatDate = (date: Date | null) => {
        return date ? `${date.getDate()} ${months[date.getMonth()]} ${date.getFullYear()}` : "";
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
        <div>
            <Flex orientation={Orientation.vertical} className={styles.dateRangePicker}>
                {label &&
                    <Label>
                        {label}
                    </Label>
                }
                <div className={styles.dateRangePickerInput} onClick={() => setIsCalendarOpen(!isCalendarOpen)}>
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
