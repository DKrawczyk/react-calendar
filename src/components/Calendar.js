import React from "react";
import CalendarForm from "./CalendarForm";
import CalendarList from "./CalendarList";
import CalendarSwitcher from "./CalendarSwitcher";
class Calendar extends React.Component{

    state = {
        data:[],
        days:['Pn', 'Wt', 'Sr', 'Czw', 'Pt', 'Sb', 'Nd'],
        months:['Syczeń', 'Luty', 'Marzec', 'Kwiecień', 'Maj', 'Czerwiec', 'Lipiec', 'Sierpień', 'Wrzesień', 'Październik', 'Listopad', 'Grudzień'],
    }

    render() {
        const {months} = this.state;
        console.log(this.state);
        
        const date = new Date(2022, 0, 1);
        let data = {};
        let days = []
        // console.log(date);
        while (date.getMonth() === 0) {
            days.push(new Date(date));
            date.setDate(date.getDate() + 1);
          }
        // console.log(days);
        // console.log(months[today.getMonth()])
        // const test2 = test.split('');
        // console.log(test2[]);
   
        // test.toDateString();
        // console.log(test);
        // console.log(typeof days);

        // console.log(date.today);
        // console.log(date.getFullYear());
        // console.log(months[date.getMonth()])
        // for (let i=0; i <10; i++) {
        //     data[date.getFullYear() +i] = {};

        //     for(let j=0; j<12; j++) {
        //         data[date.getFullYear() +i][j +1] = {};

        //     }
        // }

        // for (let i=0; i <10; i++){
            // data[date.getFullYear() +i]={}
            // for(let j=0; j <12; j++) {
                // data[date.getFullYear() +i][j + 1] = {};
                // data[months[date.getMonth() +j][j]] = {};
                // console.log(months[date.getMonth() +j])
            // }
        // }
        // console.log(data);

        // console.log(data);

        return(
            <main className="main container">
                <section className="main__section">
                    <div className="div__main darker">
                        <CalendarSwitcher title="main__year" months={months}/>
                    </div>
                    <div className="div__main brighter">
                        <CalendarSwitcher title="main__month" months={months}/>
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
                            <label className="calendar__day">1</label>
                            <label className="calendar__day">2</label>
                            <label className="calendar__day">3</label>
                            <label className="calendar__day">4</label>
                            <label className="calendar__day">5</label>
                            <label className="calendar__day">6</label>
                            <label className="calendar__day">7</label>
                        </div> 
                    </main>
                </section>
                <section className="main__section">
                    <header className="darker">
                        <CalendarSwitcher title="chosen__day" months={months}/>
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

    calendarData() {
        const {months} = this.state;

        const today = new Date();
        const currentDay = `${today.getDate()} ${months[today.getMonth()]} ${today.getFullYear()}`
        console.log(currentDay);
        
    }

}

export default Calendar;