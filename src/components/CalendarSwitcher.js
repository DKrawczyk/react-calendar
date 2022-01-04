import React from "react";

function CalendarSwitcher(props) {

    const {title, months, prevEvent, nextEvent} = props;

    return (
        <>
            <button onClick={prevEvent} className="button button__previous">{'<'}</button>
            <span className={title}>{getDate()}</span>
            <button onClick={nextEvent} className="button button__next">{'>'}</button>
        </>
    )

    function getDate() {
        const {title, months, currYear, currMonth} = props;
        const today = new Date(); 
        const currentDay = `${today.getDate()} ${months[currMonth]} ${currYear}`;

        if (title === 'main__year') {
            return currYear;
        }
        else if (title === 'main__month') {
            return months[currMonth];
        }
        else if (title === 'chosen__day') {
            return currentDay;
        }
    }

}


export default CalendarSwitcher;