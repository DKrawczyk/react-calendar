import React from "react";

function CalendarSwitcher(props) {

    const {title, switchPrev, switchNext} = props;

    return (
        <>
            <i onClick={switchPrev} className="fas fa-arrow-left button button__previous"></i>
            <span className={title}>{setDate()}</span>
            <i onClick={switchNext} className="fas fa-arrow-right button button__next"></i>
        </>
    )

    function setDate() {
        const {title, monthsArray, year, month, day} = props;
        const currentDay = `${day} ${monthsArray[month]} ${year}`;

        if (title === 'main__year') {
            return year;
        }
        else if (title === 'main__month') {
            return monthsArray[month];
        }
        else if (title === 'chosen__day') {
            return currentDay;
        }
        return false;
    }
}


export default CalendarSwitcher;