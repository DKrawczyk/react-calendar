import React from "react";
import {v4 as uuid} from 'uuid';

function CalendarList(props) {
    const {list} = props;

    if(list.length > 0 ) {
        return list.map(meeting => {
            return (  
                <li key={uuid()} className="event">
                    <div className="event__info event__data">
                        <h2>{meeting.firstName} {meeting.lastName}</h2>
                        <h2>{meeting.email}</h2>
                    </div>
                    <div className="event__info event__date">
                        <h4>{meeting.time}</h4>
                        <h4>{meeting.date}</h4>
                    </div>
                </li>    
            )
        })
    }

    return <h1>No meetings in this day</h1>
}

export default CalendarList;