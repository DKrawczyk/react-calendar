import React from "react";

import CalendarAPI from "./CalendarAPI";
import DaysNaming from "../DaysNaming";
import CalendarLeftSection from "./CalendarLeftSection";
import CalendarRightSection from "./CalendarRightSection";

class Calendar extends React.Component{
    constructor() {
        super() 
        this.api = new CalendarAPI();
        this.language = new DaysNaming();
        this.lang = 'pl';
        this.state = {
            data:[],
            currentDay: new Date().getDate(),
            currentYear: new Date().getFullYear(),
            currentMonth: new Date().getMonth(),
            days: this.language.days(this.lang),
            months: this.language.months(this.lang),
        }
    }

    render() {
        const {currentDay, currentYear, currentMonth, months, days} = this.state;
        
        return(
            <main className="main container">
                <CalendarLeftSection currentYear={currentYear} currentMonth={currentMonth} currentDay={currentDay} months={months} days={days} changeCurrentYear={this.setStateForYear} changeCurrentMonth={this.setStateForMonths} dayChoosing={this.chooseTheDay}/>
                <CalendarRightSection currentYear={currentYear} currentMonth={currentMonth} currentDay={currentDay} months={months} changeCurrentDay={this.setStateForDays} newMeeting={this.addNewEvent} showMeetingList={this.findMeetings()}/>
            </main>
        )
    }

    componentDidMount() {
        return this.api.loadData()
            .then(data => this.setData(data))
            .catch(err => console.log(err.message))
            .finally(console.log('Data uploaded'))
    }

    setData(data) {
        this.setState({
            data: data,
        });
    }

    //     OD TĄD

    setStateForYear = (yearValue) => {
        this.setState({
            currentYear: yearValue,
        });
    }

    setStateForMonths = (yearValue, monthValue) => {
        this.setState({
            currentMonth: monthValue,
            currentYear: yearValue,
        });
    }

    setStateForDays = (dayValue) => {
        this.setState({
            currentDay: dayValue,
        })
    }

    chooseTheDay = (day) => {
        let {currentDay} = this.state;
        let clickedDay = parseInt(day.innerText)
        currentDay = clickedDay;
        this.setState({
            currentDay: currentDay,
        })
    }

    setStateForYear = (yearValue) => {
        this.setState({
            currentYear: yearValue,
        });
    }

    setStateForMonths = (yearValue, monthValue) => {
        this.setState({
            currentMonth: monthValue,
            currentYear: yearValue,
        });
    }

    addNewEvent = (newMeeting) => {
        const {data} = this.state;
        this.setState({
            data:[...data, newMeeting]
        });
    }

    findMeetings = () => {
        const {data, currentDay, currentYear, currentMonth} = this.state;
        if(data.length > 0) {
            const currentData = `${currentYear}-${currentMonth+1}-${currentDay}`;
            const todayEvents = data.filter(meeting => {
                return meeting.date === currentData;
            });
            return todayEvents;
        }
        return [];
    }

    chooseTheDay = (day) => {
        let {currentDay} = this.state;
        let clickedDay = parseInt(day.innerText)
        currentDay = clickedDay;
        this.setState({
            currentDay: currentDay,
        })
    }

//      DOTĄD
}

export default Calendar;