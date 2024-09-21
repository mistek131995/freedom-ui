import React, { useState } from "react";
import styles from "./styles.module.scss";

type DateRangePickerProps = {
    onRangeSelect: (startDate: Date | null, endDate: Date | null) => void;
};

const months = [
    "Январь", "Февраль", "Март", "Апрель", "Май", "Июнь",
    "Июль", "Август", "Сентябрь", "Октябрь", "Ноябрь", "Декабрь"
];

const getDaysInMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
};

export const DateRangePicker: React.FC<DateRangePickerProps> = ({ onRangeSelect }) => {
    const [currentDate, setCurrentDate] = useState(new Date());
    const [startDate, setStartDate] = useState<Date | null>(null);
    const [endDate, setEndDate] = useState<Date | null>(null);
    const [isSelectingStartDate, setIsSelectingStartDate] = useState(true);
    const [isCalendarOpen, setIsCalendarOpen] = useState(false); // Состояние для свернутого/развернутого календаря

    const handleDayClick = (day: number | null) => {
        if (day) {
            const selectedDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
            if (isSelectingStartDate) {
                setStartDate(selectedDate);
                setIsSelectingStartDate(false);
            } else {
                setEndDate(selectedDate);
                setIsSelectingStartDate(true);
                setIsCalendarOpen(false); // Свернуть календарь после выбора конечной даты
                onRangeSelect(startDate, selectedDate);
            }
        }
    };

    const daysInMonth = getDaysInMonth(currentDate);
    const firstDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1).getDay() || 7; // Начало с понедельника

    const daysArray = [];
    for (let i = 1; i < firstDayOfMonth; i++) {
        daysArray.push(null);
    }
    for (let day = 1; day <= daysInMonth; day++) {
        daysArray.push(day);
    }

    const handlePrevMonth = () => {
        setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
    };

    const handleNextMonth = () => {
        setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
    };

    const formatDate = (date: Date | null) => {
        return date ? `${date.getDate()} ${months[date.getMonth()]} ${date.getFullYear()}` : "";
    };

    const toggleCalendar = () => {
        setIsCalendarOpen(!isCalendarOpen);
    };

    return (
        <div className={styles.dateRangePicker}>
            {/* Свернутое состояние */}
            <div className={styles.toggleButton} onClick={toggleCalendar}>
                {startDate && endDate ? (
                    <span>{`${formatDate(startDate)} - ${formatDate(endDate)}`}</span>
                ) : (
                    <span>Выберите даты</span>
                )}
            </div>

            {isCalendarOpen && (
                <div className={styles.calendar}>
                    <div className={styles.header}>
                        <button onClick={handlePrevMonth} className={styles.control}>{"<"}</button>
                        <span className={styles.monthYear}>
              {months[currentDate.getMonth()]} {currentDate.getFullYear()}
            </span>
                        <button onClick={handleNextMonth} className={styles.control}>{">"}</button>
                    </div>
                    <div className={styles.weekDays}>
                        {["Пн", "Вт", "Ср", "Чт", "Пт", "Сб", "Вс"].map((day) => (
                            <span key={day} className={styles.weekDay}>{day}</span>
                        ))}
                    </div>
                    <div className={styles.days}>
                        {daysArray.map((day, index) => {
                            const date = day ? new Date(currentDate.getFullYear(), currentDate.getMonth(), day) : null;
                            const isSelected = date && (
                                (startDate && date.getTime() === startDate.getTime()) ||
                                (endDate && date.getTime() === endDate.getTime())
                            );
                            const isInRange = date && startDate && endDate &&
                                date.getTime() > startDate.getTime() && date.getTime() < endDate.getTime();

                            return (
                                <span
                                    key={index}
                                    className={`${styles.day} ${isSelected ? styles.selectedDay : ""} ${isInRange ? styles.inRange : ""}`}
                                    onClick={() => handleDayClick(day)}
                                >
                  {day}
                </span>
                            );
                        })}
                    </div>
                    <div className={styles.footer}>
                        <button onClick={() => setIsSelectingStartDate(true)} className={styles.selectButton}>
                            {isSelectingStartDate ? "Выбор начальной даты" : "Выбор конечной даты"}
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};
