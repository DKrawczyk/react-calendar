import React from "react";

function CalendarSwitcher(props) {

    const {title, prevEvent, nextEvent} = props;

    return (
        <>
            <i onClick={prevEvent} className="fas fa-arrow-left button button__previous"></i>
            <span className={title}>{getDate()}</span>
            <i onClick={nextEvent} className="fas fa-arrow-right button button__next"></i>
        </>
    )

    function getDate() {
        const {title, months, currYear, currMonth, currDay} = props;
        const currentDay = `${currDay} ${months[currMonth]} ${currYear}`;

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