import React from "react";

import CalendarWeekDays from "./CalendarWeekDays";
import CalendarMonthsSwitcher from "./CalendarMonthsSwitcher";
import CalendarYearSwitcher from "./CalendarYearSwitcher";
import CalendarDays from "./CalendarDays";

function CalendarLeftSection(props) {

    const {currentDay, currentYear, currentMonth, months, days} = props;
    return (
        <section className="main__section">
            <CalendarYearSwitcher setYear={currentYear} setMonth={currentMonth} setDay={currentDay} monthsArray={months} switchEvent={changeYearFunction}/>
            <CalendarMonthsSwitcher setYear={currentYear} setMonth={currentMonth} setDay={currentDay} monthsArray={months} switchEvent={changeMonthFunction}/>
            <CalendarWeekDays days={days}/>
            <main className="main__calendar">
                <div className="calendar__row">
                    <CalendarDays setYear={currentYear} setMonth={currentMonth} setDay={currentDay} chooseDayEvent={chooseTheDay}/>
                </div> 
            </main>
        </section>
    )

    function changeYearFunction(year, day) {
        const {changeCurrentYear} = props;
        changeCurrentYear(year, day);
    }

    function changeMonthFunction(year, month, day) {
        const {changeCurrentMonth} = props;
        changeCurrentMonth(year, month, day);
    }

    function chooseTheDay(day) {
        const {dayChoosing} = props;
        dayChoosing(day);
    }
    
}

export default CalendarLeftSection;