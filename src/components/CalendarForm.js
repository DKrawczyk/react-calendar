import React from "react";
import CalendarAPI from "./CalendarAPI";
import {v4 as uuid} from 'uuid';


class CalendarForm extends React.Component {
    constructor(){
        super()
        this.api = new CalendarAPI();
    }
    state = {
            firstName: '',
            lastName: '',
            email: '',
            date: '',
            time: '',
            infoArray: [],
    }

    render() {
        const {firstName, lastName, email, date, time} = this.state;
        return (
            <form onSubmit={this.dataValidation} className="form__event">
                <div onChange={this.inputChange} className="event__insert">
                    <input type="text" name="firstName" value={firstName} placeholder="First name" className="input__field" id="clicked"></input> 
                    <input type="text" name="lastName" value={lastName} placeholder="Last Name" className="input__field" id="clicked"></input>
                    <input type="text" name="email" value={email} placeholder="Email" className="input__field" id="clicked"></input>
                    <input type="date" name="date" value={date} placeholder="Date" className="input__field" id="clicked"></input>
                    <input type="time" name="time" value={time} placeholder="Time" className="input__field" id="clicked"></input>
                    <input type="submit" className="event__submit"></input>
                </div>
                <div className="div__error">
                    <ul className="error__list">
                        {this.renderInformation()}
                    </ul>
                </div>
            </form>
        )
    }

    inputChange = e => {
        const {name, value} = e.target;
        this.test(name, value);
        this.setState( {
            [name]: value,
        });
    }

    renderInformation() {
        const {infoArray} = this.state;

        if(infoArray.length === 0) {
            return(
                <h1>Please, insert your meeting</h1>
            )
        }
        else{
            return infoArray.map(message =>{
                return ( 
                    <li key={uuid()} className="error">{message}</li>
                )
            })
        }
    }
//refactoring
    dataValidation = (event) => {
        const {firstName, lastName, email, date, time, infoArray} = this.state;

        const regexNameAndLastName = /^[\w'\-,.][^0-9_!¡?÷?¿\\+=@#$%ˆ&*(){}|~<>;:[\]]{2,}$/;
        const regexEmail = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        const regexDate = /^\d{4}\-(0?[1-9]|1[012])\-(0?[1-9]|[12][0-9]|3[01])$/
        const regexHour = /^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/;

        if(firstName.length >=2 && lastName.length >=2 && email.length >=2 && date.length >=2 && time.length >=2) {
            if(regexNameAndLastName.test(firstName) && regexNameAndLastName.test(lastName)) {
                if(regexEmail.test(email)) {
                    if(regexDate.test(date)) {
                        if(regexHour.test(time)) {
                            event.preventDefault();
                            this.setNewMeetingData(event);
                        }
                        else {
                            event.preventDefault();
                            this.setState({
                                infoArray:[...infoArray, 'Time is incorrect'],
                            })
                        }
                    }
                    else {
                        event.preventDefault();
                        this.setState({
                            infoArray:[...infoArray, 'Date is incorrect'],
                        })
                    }
                }
                else {
                    event.preventDefault();
                    this.setState({
                        infoArray:[...infoArray, 'Email is incorrect'],
                    })
                }
            }
            else {
                event.preventDefault();
                this.setState({
                    infoArray:[...infoArray, 'Name or surname is incorrect'],
                })
            }
        }
        else {
            event.preventDefault();
            this.setState({
                infoArray:[...infoArray, 'Fields cannot be empty'],
            });
        }
    }

    setNewMeetingData() {
        const {firstName, lastName, email, date, time, infoArray} = this.state;
        const newMeeting = {
            firstName: firstName,
            lastName: lastName,
            email: email,
            date: this.setCorrectDate(date),
            time: time,
        }

        this.setState({
            firstName: '',
            lastName: '',
            email: '',
            date: '',
            time: '',
            infoArray: ['New meeting added!'],
        });

        this.sendNewMeeting(newMeeting);
    }

    setCorrectDate(date) {
        let newDate = this.setCorrectMonth(date)
        newDate = this.setCorrectDay(newDate)
        return newDate;
    }

    setCorrectMonth(date){
        if(date.charAt(5) === '0') {
            return date.slice(0,5) + date.slice(6, date.length);
        }
        return date;
    }

    setCorrectDay(date) {
        if(date.charAt(7) === '0') {
            return date.slice(0,7) + date.slice(8, date.length);
        }
        else if(!(date.charAt(7) === '1' || date.charAt(7) === '2' || date.charAt(7) === '3') && date.charAt(8) === '0') {
            return date.slice(0,8) + date.slice(9, date.length);
        }

        return date;
    }

    sendNewMeeting(data) {
        const {addData} = this.props;
        return this.api.uploadData(data) 
            .then(resp => addData(resp))
            .catch(err => console.log(err.message))
            .finally('New meeting uploaded');
    }

    test(name, value) {
        console.log(name, '|', value)
        return this.api.loadFilteredData(name, value)
            .then(data => console.log(data))
            .catch(err => console.log(err))
    }
}

export default CalendarForm;