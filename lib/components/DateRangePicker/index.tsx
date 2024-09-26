import React, {useCallback, useEffect, useRef, useState} from "react";
import styles from "./styles.module.scss";
import {Calendar} from "./Calendar.tsx";
import {Label} from "../Label";
import {Flex} from "../Flex";
import {Orientation} from "../../types/Orientation.ts";
import {AlignmentItems} from "../../../dist/types/AlignmentItems";

export interface IDateRangePickerProps {
    label?: string,
    placeholder?: string,
    dateStartName?: string,
    defaultStartDate?: Date,
    defaultEndDate?: Date,
    dateEndName?: string,
    onRangeSelect: (startDate: Date | null, endDate: Date | null) => void,
    orientation?: Orientation,
    style?: React.CSSProperties,
    className?: string,
}

interface IDateRangePickerContext {
    currentDate: Date,
    setCurrentDate: (date: Date) => void,
    isCalendarOpen: boolean,
    setIsCalendarOpen: (value: boolean) => void,
    startDate: Date | null,
    setStartDate: (date: Date) => void,
    endDate: Date | null,
    setEndDate: (date: Date) => void
}

const labelClassMap = {
    [Orientation.vertical]: "",
    [Orientation.vertical_reverse]: "",
    [Orientation.horizontal]: "me-1",
    [Orientation.horizontal_reverse]: "ms-1"
}

const alignItemsClassMap = {
    [Orientation.vertical]: AlignmentItems.start,
    [Orientation.vertical_reverse]: AlignmentItems.start,
    [Orientation.horizontal]: AlignmentItems.center,
    [Orientation.horizontal_reverse]: AlignmentItems.center
}

export const DateRangePickerContext = React.createContext<IDateRangePickerContext | null>(null)

export const DateRangePicker: React.FC<IDateRangePickerProps> = ({   label,
                                                                    placeholder = "Выберите даты",
                                                                    dateStartName = "startDate",
                                                                    defaultStartDate = null,
                                                                    defaultEndDate = null,
                                                                    dateEndName = "endDate",
                                                                    className,
                                                                    style,
                                                                    onRangeSelect,
                                                                    orientation = Orientation.vertical
}) => {
    const [currentDate, setCurrentDate] = useState(new Date());
    const [startDate, setStartDate] = useState<Date | null>(defaultStartDate);
    const [endDate, setEndDate] = useState<Date | null>(defaultEndDate);
    const [isCalendarOpen, setIsCalendarOpen] = useState(false);

    const unionClassName = [
        className,
        styles.dateRangePicker
    ].filter(x => x).join(" ")
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

    useEffect(() => {
        if (startDate && endDate) {
            onRangeSelect(startDate, endDate);
        }
    }, [startDate, endDate, onRangeSelect]);

    return <DateRangePickerContext.Provider value={{
        currentDate: currentDate,
        setCurrentDate: setCurrentDate,
        isCalendarOpen: isCalendarOpen,
        setIsCalendarOpen: setIsCalendarOpen,
        startDate: startDate,
        setStartDate: setStartDate,
        endDate: endDate,
        setEndDate: setEndDate
    }}>
        <div>
            <input name={dateStartName} type="hidden" value={startDate?.toString() || ""}/>
            <input name={dateEndName} type="hidden" value={endDate?.toString() || ""}/>
            <Flex ref={datepickerRef}
                  orientation={orientation}
                  alignItems={alignItemsClassMap[orientation]}
                  className={unionClassName} style={style}>
                {label &&
                    <Label className={labelClassMap[orientation]}>
                        {label}
                    </Label>
                }
                <div className={inputUnionClassName} onClick={() => setIsCalendarOpen(!isCalendarOpen)}>
                    {startDate && endDate ? (
                        <span>{`${formatDate(startDate)} - ${formatDate(endDate)}`}</span>
                    ) : (
                        <span>{placeholder}</span>
                    )}

                    {isCalendarOpen &&
                        <Calendar/>
                    }
                </div>
            </Flex>
        </div>
    </DateRangePickerContext.Provider>
};
