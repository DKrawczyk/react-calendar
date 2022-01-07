import React from "react";

function CalendarSwitcher(props) {

    const {title, prevEvent, nextEvent} = props;

    return (
        <>
            {/* <button onClick={prevEvent} className="button button__previous">{'<'}</button> */}
            <i onClick={prevEvent} class="fas fa-arrow-left button button__previous"></i>
            <span className={title}>{getDate()}</span>
            <i onClick={nextEvent} class="fas fa-arrow-right button button__next"></i>
            {/* <button onClick={nextEvent} className="button button__next">{'>'}</button> */}
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