import React, { useState } from 'react';
import styles from './styles.module.scss';

interface DatePickerProps {
    label?: string;
    onDateChange?: (date: Date) => void;
}

const DatePicker: React.FC<DatePickerProps> = ({ label = "Select Date", onDateChange }) => {
    const [currentDate, setCurrentDate] = useState<Date>(new Date());
    const [selectedDate, setSelectedDate] = useState<Date | null>(null);
    const [isOpen, setIsOpen] = useState<boolean>(false);

    const daysInMonth = (date: Date) => {
        return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
    };

    const startDayOfMonth = (date: Date) => {
        const day = new Date(date.getFullYear(), date.getMonth(), 1).getDay();
        return day === 0 ? 6 : day - 1; // Сдвиг на понедельник
    };

    const handlePrevMonth = () => {
        setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
    };

    const handleNextMonth = () => {
        setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
    };

    const handleDayClick = (day: number) => {
        const newDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
        setSelectedDate(newDate);
        setIsOpen(false);
        if (onDateChange) {
            onDateChange(newDate);
        }
    };

    const toggleCalendar = () => {
        setIsOpen(!isOpen);
    };

    const renderCalendar = () => {
        const daysInCurrentMonth = daysInMonth(currentDate);
        const firstDayOffset = startDayOfMonth(currentDate);
        const daysArray = Array.from({ length: daysInCurrentMonth }, (_, i) => i + 1);

        return (
            <div className={styles.calendar}>
                <div className={styles.calendarHeader}>
                    <button onClick={handlePrevMonth}>‹</button>
                    <span>{currentDate.toLocaleString('default', { month: 'long' })} {currentDate.getFullYear()}</span>
                    <button onClick={handleNextMonth}>›</button>
                </div>
                <div className={styles.calendarGrid}>
                    {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day) => (
                        <div key={day} className={styles.calendarGridHeader}>
                            {day}
                        </div>
                    ))}
                    {Array.from({ length: firstDayOffset }).map((_, i) => (
                        <div key={i} className={styles.calendarEmptyCell}></div>
                    ))}
                    {daysArray.map((day) => (
                        <div
                            key={day}
                            className={`${styles.calendarDay} ${selectedDate?.getDate() === day && selectedDate?.getMonth() === currentDate.getMonth() && selectedDate?.getFullYear() === currentDate.getFullYear() ? styles.selected : ''}`}
                            onClick={() => handleDayClick(day)}
                        >
                            {day}
                        </div>
                    ))}
                </div>
            </div>
        );
    };

    return (
        <div className={styles.datePicker}>
            {label && <label className={styles.datePickerLabel}>{label}</label>}
            <div className={styles.datePickerInput} onClick={toggleCalendar}>
                {selectedDate ? selectedDate.toLocaleDateString() : 'Select Date'}
            </div>
            {isOpen && renderCalendar()}
        </div>
    );
};

export default DatePicker;