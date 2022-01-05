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
        counter: {
            year:0,
            month:0,
            day:0,
        },
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
                        <CalendarSwitcher title="main__year" currYear={currentYear} currMonth={currentMonth} months={months} prevEvent={this.setPrevYear} nextEvent={this.setNextYear}/>
                    </div>
                    <div className="div__main brighter">
                        <CalendarSwitcher title="main__month" currYear={currentYear} currMonth={currentMonth} months={months} prevEvent={this.setPrevMonth} nextEvent={this.setNextMonth}/>
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
                        <CalendarSwitcher title="chosen__day" currYear={currentYear} currMonth={currentMonth} months={months}/>
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

    //refactoring

    setPrevYear = () => {
        let {year} = this.state.counter;
        console.log('set?')
        year -= 1;
        // debugger;
        this.setState({
            counter: {...this.state.counter, year},
            currentYear: new Date().getFullYear() +year,
        }, () => console.log(this.state))
    }
    



    setNextYear = () => {
        let {year} = this.state.counter;

        year += 1;

        this.setState({
            counter: {...this.state.counter, year},
            currentYear: new Date().getFullYear() +year,
        }, () => console.log(this.state))
    }

    setPrevMonth = () => {
        let month = this.setMonthValue('prev');
        console.log(month);

        this.setState({
            counter: {...this.state.counter, month},
            currentMonth: new Date().getMonth() +month,
        }, () => console.log(this.state))
    }

    setNextMonth = () => {
        let month = this.setMonthValue('next');
        console.log(month);
        this.setState({
            counter: {...this.state.counter, month},
            currentMonth: new Date().getMonth() +month,
        }, () => console.log(this.state))
    }


    setMonthValue(value) {
        let {month, year} = this.state.counter;
        // debugger;
        if(value === 'prev') {
            month = month - 1;

            
            if(month < 0) {
                month = 11;
                this.setPrevYear();
                // this.setState({
                    // counter: {...this.state.counter, month},
                    // currentMonth: new Date().getMonth() + month,
                // }, () => console.log(this.state))
            }


            return month;
        }



        else if(value === 'next') {
            month += 1;
            if(month >= 12) {
                month = 0;
                year += 1;
                // this.setNextYear();
                // this.setState({
                //     counter: {...this.state.counter, year},
                //     currentYear: new Date().getFullYear() +year,
                // }, () => console.log(this.state))
            }
            return month;
        }
    }
}

export default Calendar;