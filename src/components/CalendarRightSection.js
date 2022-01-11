import React from "react";

import CalendarForm from "./CalendarForm";
import CalendarList from "./CalendarList";
import CalendarDaysSwitcher from "./CalendarDaysSwitcher";

function CalendarRightSection(props) {

    const {currentDay, currentYear, currentMonth, months} = props;
    return (
        <section className="main__section">
            <CalendarDaysSwitcher setYear={currentYear} setMonth={currentMonth} setDay={currentDay} months={months} switchEvent={changeDayFunction}/>
            <CalendarForm addData={addDataFunction}/>
            <div className="div__informations">
                <ul className="events__list">
                    <CalendarList meetingList={meetingListFunction()} months={months}/>
                </ul>
            </div>    
        </section>
    )

    function changeDayFunction(day) {
        const {changeCurrentDay} = props;
        changeCurrentDay(day);
    }

    function addDataFunction(data) {
        const {newMeeting} = props;
        newMeeting(data);
    }
    
    function meetingListFunction() {
        const {showMeetingList} = props;
        return showMeetingList;
    }
}

export default CalendarRightSection;