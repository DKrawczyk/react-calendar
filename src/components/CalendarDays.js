import React from "react";
import {v4 as uuid} from 'uuid';

function CalendarDays(props) {
    const {chooseDayEvent} = props;
    const days = [];
    const currentDay = getDay();

    for (let i=1; i<currentDay; i++) {
        days.push(<label key={uuid()} className="calendar__day empty"></label>)
    }
    for (let i=1; i<=getDaysInMonth(); i++) {
        days.push(<label onClick = {(e) => chooseDayEvent(e.target)} key={uuid()} className={markDays(i)}>{i}</label>)
    }
    return days;

    function getDay() {
        const {currYear, currMonth} = props;
        const firstDay = new Date(currYear, currMonth, 1);
        let num = firstDay.getDay();

        if(num === 0) {
            num = 7;
        }
        return num;
    }
    
    function getDaysInMonth() {
        const {currYear, currMonth} = props;
        return new Date(currYear, currMonth +1, 0).getDate();
    }

    function markDays(days) {
        const {currDay, currMonth, currYear} = props;
        const defaultMonth = new Date().getMonth();
        const defaultYear = new Date().getFullYear();
        const defaultDay = new Date().getDate();

        if(days === defaultDay && currMonth === defaultMonth && currYear === defaultYear) {
            return 'todayDay calendar__day not-empty';
        } 
        else if(days === currDay) {
            return 'chosenDay calendar__day not-empty'
        }
        return 'calendar__day not-empty';
    }
}

export default CalendarDays;