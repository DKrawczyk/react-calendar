import React from "react";
import {v4 as uuid} from 'uuid';

function CalendarList(props) {
    const {list} = props;

    if(list.length > 0 ) {
        return list.map(meeting => {
            return (  
                <li key={uuid()} className="event">
                    <div>
                        <h2>{meeting.user} {meeting.lastName}</h2>
                        <h2>{meeting.email}</h2>
                    </div>
                    <div>
                        <h4>{meeting.time}</h4>
                        <h4>{meeting.date}</h4>
                    </div>
                </li>    
            )
        })
    }

    return <h1> No meetings today</h1>
}

export default CalendarList;