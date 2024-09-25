import styles from "./styles.module.scss";
import {useContext, useState} from "react";
import {DateRangePickerContext} from "./index.tsx";
import {months} from "../../entity/months.ts";

const getDaysInMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
};

export const Calendar = () => {
    const context = useContext(DateRangePickerContext);
    const [isSelectingStartDate, setIsSelectingStartDate] = useState(true);

    const handlePrevMonth = () => {
        context!.setCurrentDate(new Date(context!.currentDate.getFullYear(), context!.currentDate.getMonth() - 1, 1));
    };

    const handleNextMonth = () => {
        context!.setCurrentDate(new Date(context!.currentDate.getFullYear(), context!.currentDate.getMonth() + 1, 1));
    };

    const handleDayClick = (day: number | null) => {
        if (day) {
            const selectedDate = new Date(context!.currentDate.getFullYear(), context!.currentDate.getMonth(), day);
            if (isSelectingStartDate) {
                context!.setStartDate(selectedDate);
                setIsSelectingStartDate(false);
            } else {
                context!.setEndDate(selectedDate);
                setIsSelectingStartDate(true);
                context!.setIsCalendarOpen(false);
                context!.onRangeSelect(context!.startDate, context!.endDate);
            }
        }
    };

    const daysInMonth = getDaysInMonth(context!.currentDate);
    const firstDayOfMonth = new Date(context!.currentDate.getFullYear(), context!.currentDate.getMonth(), 1).getDay() || 7; // Начало с понедельника

    const daysArray = [];
    for (let i = 1; i < firstDayOfMonth; i++) {
        daysArray.push(null);
    }
    for (let day = 1; day <= daysInMonth; day++) {
        daysArray.push(day);
    }

    return <div className={styles.calendar}>
        <div className={styles.header}>
            <button onClick={handlePrevMonth} className={styles.control}>{"<"}</button>
            <span className={styles.monthYear}>
                {months[context!.currentDate.getMonth()]} {context!.currentDate.getFullYear()}
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
                const date = day ? new Date(context!.currentDate.getFullYear(), context!.currentDate.getMonth(), day) : null;
                const isSelected = date && (
                    (context?.startDate && date.getTime() === context?.startDate.getTime()) ||
                    (context?.endDate && date.getTime() === context?.endDate.getTime())
                );
                const isInRange = date && context?.startDate && context?.endDate &&
                    date.getTime() > context?.startDate.getTime() && date.getTime() < context?.endDate.getTime();

                return <span key={index}
                             className={`${styles.day} ${isSelected ? styles.selectedDay : ""} ${isInRange ? styles.inRange : ""}`}
                             onClick={() => handleDayClick(day)}>
                    {day}
                </span>
            })}
        </div>
    </div>
}