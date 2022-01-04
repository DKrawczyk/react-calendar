import React from "react";
import CalendarForm from "./CalendarForm";
import CalendarList from "./CalendarList";
import CalendarSwitcher from "./CalendarSwitcher";
import {v4 as uuid} from 'uuid';
class Calendar extends React.Component{

    state = {
        data:[],
        counter: 0,
        currentYear: new Date().getFullYear(),
        currentMonth: new Date().getMonth(),
        days:['Pn', 'Wt', 'Sr', 'Czw', 'Pt', 'Sb', 'Nd'],
        months:['Syczeń', 'Luty', 'Marzec', 'Kwiecień', 'Maj', 'Czerwiec', 'Lipiec', 'Sierpień', 'Wrzesień', 'Październik', 'Listopad', 'Grudzień'],
    }

    render() {
        const {currentYear, currentMonth, months} = this.state;

        return(
            <main className="main container">
                <section className="main__section">
                    <div className="div__main darker">
                        <CalendarSwitcher title="main__year" currYear={currentYear} currMonth={currentMonth} months={months} prevEvent={this.prevYear} nextEvent={this.nextYear}/>
                    </div>
                    <div className="div__main brighter">
                        <CalendarSwitcher title="main__month" currYear={currentYear} currMonth={currentMonth} months={months} prevEvent={this.prevMonth} nextEvent={this.nextMonth}/>
                    </div>
                    <div className="div__main darker div__list">
                        <ul className="list__days">
                            <li className="day">Pn</li>
                            <li className="day">Wt</li>
                            <li className="day">Sr</li>
                            <li className="day">Czw</li>
                            <li className="day">Pt</li>
                            <li className="day">Sb</li>
                            <li className="day">Nd</li>
                        </ul>
                    </div>
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
        return fetch('http://localhost:3005/meetings')
            .then(resp => {
                if(resp.ok) {
                    return resp.json();
                }
                return Promise.reject(resp);
            })
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

        return new Date(currentYear, currentMonth, 0).getDate();
    }

    prevYear = () => {

        const test = new Date()
        // console.log(test.getFullYear());
        test.setFullYear(test.getFullYear() +1)
        console.log(test.getFullYear());
        // const newTest = new Date();
        // console.log(newTest.getMonth())
        // newTest.setMonth(newTest.getMonth() +1);
        // console.log(newTest.getMonth());

        console.log()

        let {counter} = this.state;
        // const nextYear = ;
        // console.log(nextYear);
        // this.setState({
            // counter: --counter,
            // currentYear: new Date().nextYear,
        // }, () => console.log(this.state))
    }

    nextYear = () => {
        let {counter} = this.state;

        this.setState({
            counter: ++counter,
            currentYear: new Date().getFullYear() + counter,
        }, () => console.log(this.state))
    }

    prevMonth = () => {
        let {counter} = this.state;

        this.setState({
            counter: --counter,
            currentMonth: new Date().getMonth() + counter,
        }, () => console.log(this.state))
    }

    nextMonth = () => {
        let {counter} = this.state;
        
        this.setState({
            counter: ++counter,
            currentMonth: new Date().getMonth() + counter,
        }, () => console.log(this.state))
    }
}

export default Calendar;