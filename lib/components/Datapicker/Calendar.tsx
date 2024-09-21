import {useContext} from "react";
import {DatePikerContext} from "./index.tsx";
import styles from './styles.module.scss';

export const Calendar = () => {
    const context = useContext(DatePikerContext)


    const daysInMonth = (date: Date) => {
        return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
    };

    const startDayOfMonth = (date: Date) => {
        const day = new Date(date.getFullYear(), date.getMonth(), 1).getDay();
        return day === 0 ? 6 : day - 1; // Сдвиг на понедельник
    };

    const handlePrevMonth = () => {
        context?.setCurrentDate(new Date(context?.currentDate.getFullYear(), context?.currentDate.getMonth() - 1, 1));
    };

    const handleNextMonth = () => {
        context?.setCurrentDate(new Date(context?.currentDate.getFullYear(), context?.currentDate.getMonth() + 1, 1));
    };

    const handleDayClick = (day: number) => {
        const newDate = new Date(context!.currentDate.getFullYear(), context!.currentDate.getMonth(), day);
        context?.setSelectedDate(newDate);
        context?.setIsOpen(false);
        if (context?.onDateChange) {
            context?.onDateChange(newDate);
        }
    };

    const daysInCurrentMonth = daysInMonth(context!.currentDate);
    const firstDayOffset = startDayOfMonth(context!.currentDate);
    const daysArray = Array.from({ length: daysInCurrentMonth }, (_, i) => i + 1);

    return <div className={styles.calendar}>
            <div className={styles.calendarHeader}>
                <button type="button" onClick={handlePrevMonth}>‹</button>
                    <span>
                        {context!.currentDate.toLocaleString('default', { month: 'long' })} {context!.currentDate.getFullYear()}
                    </span>
                <button type="button" onClick={handleNextMonth}>›</button>
            </div>
            <div className={styles.calendarGrid}>
                {['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'].map((day) => <div key={day}
                                                                              className={styles.calendarGridHeader}>
                                                                            {day}
                                                                        </div>
                )}
                {Array.from({ length: firstDayOffset }).map((_, i) => (
                    <div key={i} className={styles.calendarEmptyCell}></div>
                ))}
                {daysArray.map((day) => {
                    const selected = context?.selectedDate?.getDate() === day && context?.selectedDate?.getMonth() === context!.currentDate.getMonth() && context?.selectedDate?.getFullYear() === context!.currentDate.getFullYear() ? styles.selected : ''

                    return <div key={day}
                         className={[styles.calendarGridDay, selected].filter(x => x).join(" ")}
                         onClick={() => handleDayClick(day)}>
                        {day}
                    </div>
                })}
        </div>
    </div>
};