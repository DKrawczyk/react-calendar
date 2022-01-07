import React from 'react';
import {v4 as uuid} from 'uuid';

function CalendarWeekDays(props) {
    const {days} = props;
    return (
        <div className="div__list darker">
            <ul className="list__days">
                {days.map(day => <li key={uuid()} className="day">{day}</li>)}
            </ul>
        </div>
    )
}

export default CalendarWeekDays;