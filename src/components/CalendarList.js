import React from "react";

function CalendarList(props) {
    const {list} = props;
    console.log(list());
    const meetingArray = list();
    console.log(meetingArray);
    // console.log(list().length);
    if(meetingArray === 'undefined') {
        console.log('kupa');
    }
    if(meetingArray.length > 0 ) {
        console.log(meetingArray)
        return meetingArray.map(meeting => {
            return (
                <div className="div__informations">
                    <ul className="events__list"> 
                        <li className="event">
                            <div>
                                <h2>{meeting.firstName}{meeting.lastName}</h2>
                                <h2>{meeting.email}</h2>
                            </div>
                            <div>
                                <h4>{meeting.time}</h4>
                                <h4>{meeting.date}</h4>
                            </div>
                        </li>    
                    </ul>
                </div>
            )
        })
    }

    return <h1> No meetings today</h1>

}

export default CalendarList;