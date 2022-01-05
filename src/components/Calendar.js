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
        months:['Syczeń', 'Luty', 'Marzec', 'Kwiecień', 'Maj', 'Czerwiec', 'Lipiec', 'Sierpień', 'Wrzesień', 'Październik', 'Listopad', 'Grudzień'],
    }

    render() {
        const {currentDay, currentYear, currentMonth, months, days} = this.state;
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
                        <CalendarSwitcher title="chosen__day" currYear={currentYear} currMonth={currentMonth} currDay={currentDay} months={months} prevEvent={this.getPrevDay}/>
                    </header>
                <CalendarForm />
                <CalendarList />
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
        })
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

    getPrevDay = () => {
        let {currentDay, currentMonth, currentYear} = this.state;
        
        currentDay--;
        console.log(currentDay, currentMonth)

        if(currentDay === 0) {
            console.log('test', currentMonth);
            
            if(currentMonth === 0 || currentMonth === 3 || currentMonth === 5 || currentMonth === 7 || currentMonth === 8 || currentMonth === 10) {
                currentDay = 31;
                console.log('zero')
                this.setState({
                    currentDay: currentDay,
                })
            }
            if(currentMonth === 2 || currentMonth === 4 || currentMonth === 6 || currentMonth === 9 || currentMonth === 11) {
                // currentMonth --;
                currentDay = 30;
                this.setState({
                    currentDay: currentDay,
                })
            }
            // if(currentMonth === 1 && this.leapYear(currentYear)){
            //     currentDay = 28;
            //     this.setState({
            //         currentDay: currentDay,
            //     })
            // }
            // else if (currentMonth === 1){
            //     console.log('test');
            //     currentDay = 29;
            //     this.setState({
            //         currentDay: currentDay,
            //     })
            // }
            currentMonth --;
            if(currentMonth < 0) {

                currentMonth = 11;
                currentYear--;
        
                this.setState({
                    currentMonth: currentMonth,
                    currentYear: currentYear,
                })
            }

            this.setState({
                currentMonth: currentMonth,
                currentDay: currentDay,
            })
        }
        
        else {
            console.log('luty');
        }

        this.setState({
            currentDay: currentDay,
        })
    }

    // leapYear(year) {
    //     return ((year % 4 == 0) && (year % 100 != 0)) || (year % 400 == 0);
    // }
    
}

export default Calendar;