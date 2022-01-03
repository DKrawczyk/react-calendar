import React from "react";
import CalendarForm from "./CalendarForm";
import CalendarList from "./CalendarList";
class Calendar extends React.Component{

    state = {
        data:[]
    }

    render() {
        console.log(this.state);
        // const date = new Date();
        // const data = {};
        // console.log(date);
        // console.log(date.getFullYear());
        // for (let i=0; i <10; i++) {
        //     data[date.getFullYear() +i] = {};
        //     for(let j=0; j<12; j++) {
        //         data[date.getFullYear() +i][j + 1] = {};
        //     }
        // }
        // console.log(data);

        return(
            <main className="main container">
                <section className="main__section">
                    <div className="div__main darker">
                        <button className="button button__previous">{'<'}</button>
                        <span className="main-year">2021</span>
                        <button className="button button__next">{'>'}</button>
                    </div>
                    <div className="div__main brighter">
                        <button className="button button__previous">{'<'}</button>
                        <span className="main__month">MAJ</span>
                        <button className="button button__next">{'>'}</button>
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
                        <button className="button button__previous">{'<'}</button>
                        <span className="chosen__month">MAJ, 2 2022</span>
                        <button className="button button__next">{'>'}</button>
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

    test() {
        const {data} = this.state;
        if(data.length > 0) {
            console.log('true')
            data.map(el =>console.log(el))
            return data.map(meeting => {
                return <li>{meeting.date}</li>
            })
        }
    }

}

export default Calendar;