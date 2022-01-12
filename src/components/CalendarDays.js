import React from "react";
import {getDaysInMonth as getDays} from "../dateHelper";

function CalendarDays(props) {
    const {chooseDayEvent} = props;
    const days = [];
    const currentDay = getDay();

    for (let i=1; i<currentDay; i++) {
        days.push(<label key={`empty${i}`} className="calendar__day empty"></label>)
    }
    for (let i=1; i<=getClassNameForDay(); i++) {
        days.push(<label onClick = {(e) => chooseDayEvent(e.target)} key={i} className={markDays(i)}>{i}</label>)
    }
    return days;

    function getDay() {
        const {setYear, setMonth} = props;
        const firstDay = new Date(setYear, setMonth, 1);
        let num = firstDay.getDay();

        if(num === 0) {
            num = 7;
        }
        return num;
    }
    
    function getClassNameForDay() {
        const {setYear, setMonth} = props;
        return getDays(setYear, setMonth);
    }

    function markDays(days) {
        const {setDay, setMonth, setYear} = props;
        const defaultMonth = new Date().getMonth();
        const defaultYear = new Date().getFullYear();
        const defaultDay = new Date().getDate();

        if(days === defaultDay && setMonth === defaultMonth && setYear === defaultYear) {
            return 'todayDay calendar__day not-empty';
        } 
        else if(days === setDay) {
            return 'chosenDay calendar__day not-empty'
        }
        return 'calendar__day not-empty';
    }
}

export default CalendarDays;