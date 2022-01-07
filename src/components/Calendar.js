import React from "react";
import {v4 as uuid} from 'uuid';

import CalendarAPI from "./CalendarAPI";
import CalendarForm from "./CalendarForm";
import CalendarList from "./CalendarList";
import CalendarWeekDays from "./CalendarWeekDays";
import CalendarSwitcher from "./CalendarSwitcher";

class Calendar extends React.Component{
    constructor() {
        super() 
        this.api = new CalendarAPI();
    }

    state = {
        data:[],
        currentDay: new Date().getDate(),
        currentYear: new Date().getFullYear(),
        currentMonth: new Date().getMonth(),
        days:['Pn', 'Wt', 'Sr', 'Czw', 'Pt', 'Sb', 'Nd'],
        months:['Styczeń', 'Luty', 'Marzec', 'Kwiecień', 'Maj', 'Czerwiec', 'Lipiec', 'Sierpień', 'Wrzesień', 'Październik', 'Listopad', 'Grudzień'],
    }

    render() {
        const {data, currentDay, currentYear, currentMonth, months, days} = this.state;
        console.log(currentYear, currentMonth, currentDay);
        return(
            <main className="main container">
                <section className="main__section">
                    <div className="div__main darker">
                        <CalendarSwitcher title="main__year" currYear={currentYear} currMonth={currentMonth} months={months} prevEvent={this.getPrevYear} nextEvent={this.getNextYear}/>
                    </div>
                    <div className="div__main brighter">
                        <CalendarSwitcher title="main__month" currYear={currentYear} currMonth={currentMonth} months={months} prevEvent={this.getPrevMonth} nextEvent={this.getNextMonth}/>
                    </div>
                    <CalendarWeekDays days={days}/>
                    <main className="main__calendar">
                        <div className="calendar__row">
                            {this.renderDays()}
                        </div> 
                    </main>
                </section>
                <section className="main__section">
                    <header className="darker">
                        <CalendarSwitcher title="chosen__day" currYear={currentYear} currMonth={currentMonth} currDay={currentDay} months={months} prevEvent={this.getPrevDay} nextEvent={this.getNextDay}/>
                    </header>
                <CalendarForm addData={this.addNewEvent}/>
                <div className="div__informations">
                    <ul className="events__list">
                        <CalendarList list={this.findMeetings()} months={months}/>
                    </ul>
                </div>    
                </section>
            </main>

        )
    }

    componentDidMount() {
        return this.api.loadData()
            .then(data => this.getData(data))
            .catch(err => console.log(err.message))
            .finally(console.log('Data uploaded'))
    }

    getData(data) {
        this.setState({
            data: data,
        });
    }

    getDay() {
        const {currentYear, currentMonth} = this.state;
        const firstDay = new Date(currentYear, currentMonth, 1);
        let num = firstDay.getDay();

        if(num === 0) {
            num = 7;
        }
        return num;
    }

    renderDays() {
        const days = [];
        const currentDay = this.getDay();

        for (let i=1; i<currentDay; i++) {
            days.push(<label key={uuid()} className="calendar__day"></label>)
        }
        for (let i=1; i<=this.getDaysInMonth(); i++) {
            days.push(<label key={uuid()} className="calendar__day">{i}</label>)
        }
        return days;
    }

    getDaysInMonth() {
        const {currentYear, currentMonth} = this.state;
        return new Date(currentYear, currentMonth +1, 0).getDate();
    }

    getPrevYear = () => {
        let {currentYear} = this.state;
        currentYear--;

        this.setState({
            currentYear: currentYear,
        })
    }
    
    getNextYear = () => {
        let {currentYear} = this.state;
        currentYear++;

        this.setState({
            currentYear: currentYear,
        })
    }

    getPrevMonth = () => {
        let {currentMonth, currentYear} = this.state;
        currentMonth--;

        if(currentMonth < 0) {
            currentMonth = 11;
            currentYear--;
        }

        this.setState({
            currentMonth: currentMonth,
            currentYear: currentYear,
        })
    }

    getNextMonth = () => {
        let {currentMonth, currentYear} = this.state;
        currentMonth++;

        if(currentMonth > 11) {
            currentMonth = 0;
            currentYear++;
        }

        this.setState({
            currentMonth: currentMonth,
            currentYear: currentYear,
        })
    }

    addNewEvent = (newMeeting) => {
        const {data} = this.state;
        this.setState({
            data:[...data, newMeeting]
        })
    }

    findMeetings = () => {
        const {data, currentDay, currentYear, currentMonth} = this.state;
        
        if(data.length > 0) {
            const currentData = `${currentYear}-${currentMonth+1}-${currentDay}`;
            const todayEvents = data.filter(meeting => {
                return meeting.date === currentData;
            });
            // console.log(todayEvents);
            return todayEvents;
        }
        return [];
    }














    getPrevDay = () => {
        let {currentDay, currentMonth, currentYear} = this.state;
        console.log(currentMonth);
        currentDay --;
        if(currentDay === 0) {

            if(currentMonth === 0 || currentMonth === 2 || currentMonth === 4 || currentMonth === 6 || currentMonth === 7 || currentMonth === 9 || currentMonth === 11) {
                currentDay = 31;
            }

            else if(currentMonth === 3 || currentMonth === 5 || currentMonth === 8 || currentMonth === 10) {
                currentDay = 30;
            }
            else if (currentMonth === 1) {
                if ((0 == currentYear % 4) && (0 != currentYear % 100) || (0 == currentYear % 400)) {
                    currentDay=29;
                } else {
                    currentDay=28;
                }
            }

        }
        this.setState({
            currentDay: currentDay,
        })

    }

    getNextDay = () => {
        let {currentDay, currentMonth, currentYear} = this.state;
        console.log(currentMonth);

        currentDay++;
        if(currentDay === 32 && (currentMonth === 0 || currentMonth === 2 || currentMonth === 4 || currentMonth === 6 || currentMonth === 7 || currentMonth === 9 || currentMonth === 11)) {
            currentDay = 1;
        }

        else if(currentDay === 31 && (currentMonth === 3 || currentMonth === 5 || currentMonth === 8 || currentMonth === 10)) {
            currentDay = 1;
        }

        else if(currentMonth === 1) {
            console.log('luty')
            if (currentDay===30 && ((0 == currentYear % 4) && (0 != currentYear % 100) || (0 == currentYear % 400))) {
                console.log('test')
                currentDay=1;
            } 
            else if(currentDay===29 && !((0 == currentYear % 4) && (0 != currentYear % 100) || (0 == currentYear % 400))){
                console.log('yhym')
                currentDay=1;
            }
        }
        
        this.setState({
            currentDay: currentDay,
        })
    }

    // leapYear(year) {
    //     return ((year % 4 == 0) && (year % 100 != 0)) || (year % 400 == 0);
    // }
    
    // console.log(data);
    
    // // console.log(currentYear, currentMonth, currentDay)
    // // console.log(`${currentYear}-${currentMonth}-${currentDay}`);
    // // const test = data.filter(item => item.date === `${currentYear}-${currentMonth}-${currentDay}`);
    // // console.log(test);
    
    // // data.filter(item => item.data === `${}`)
    // const string = 'abcdefg';
    // console.log(string);
    // const changed = string.slice(3,5);
    // console.log(changed);
    // const testChange = data.map((el) => {
    //     
    //     // if(el.date.charAt(5) === '0') {

    //     // }
    //     if(el.date.charAt(8) === '0') {
    //         return el.date.replace(8, '');
    //     }
    //     console.log(el.date)
    //     return el;
    // })
    // console.log(testChange);
}

export default Calendar;