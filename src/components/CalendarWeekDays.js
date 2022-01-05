import React from 'react';

function CalendarWeekDays(props) {
    const {days} = props;
    return (
        <div className="div__main darker div__list">
            <ul className="list__days">
                {days.map(day => <li className="day">{day}</li>)}
            </ul>
        </div>
    )
}

export default CalendarWeekDays;