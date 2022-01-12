import React from "react";
import CalendarAPI from "./CalendarAPI";
import CalendarFormValidate from "./CalendarFormValidate";
import CalendarFormInputs from "./CalendarFormInputs";

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
                    <CalendarFormInputs firstName={firstName} lastName={lastName} email={email} date={date} time={time}/>
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
        this.renderFilteredData(name, value);
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
            return infoArray.map((message, ind) =>{
                return ( 
                    <li key={ind} className="error">{message}</li>
                )
            })
        }
    }

    dataValidation = (event) => {
        const validation = new CalendarFormValidate();
 
        const regexName = /^[\w'\-,.][^0-9_!¡?÷?¿\\+=@#$%ˆ&*(){}|~<>;:[\]]{2,}$/;
        const regexEmail = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        const regexDate = /^\d{4}\-(0?[1-9]|1[012])\-(0?[1-9]|[12][0-9]|3[01])$/
        const regexTime = /^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/;
        
        const errors = [];
        const fields = [
            {name: 'firstName', isRequired: true, regex: regexName},
            {name: 'lastName', isRequired: true, regex: regexName},
            {name: 'email', isRequired: true, regex: regexEmail},
            {name: 'date', isRequired: true, regex: regexDate},
            {name: 'time', isRequired: true, regex: regexTime},
        ];

        fields.forEach(field => {
            const value = this.state[field.name];

            if(field.isRequired) {
                if(validation.isEmpty(value)) {
                    errors.push('Fields cannot be empty');
                }

                else {
                    if(field.regex) {
                        if(!validation.checkDataCorrectness(field.regex, value)) {
                            errors.push('Incorrect format');
                        }
                    }
                }
            }
        });

        if(errors.length > 0) {
            event.preventDefault();
            this.setState({
                infoArray: errors,
            });
        }
        else {
            this.setNewMeetingData();
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

    renderFilteredData(name, value) {
        // console.log(name, '|', value)
        return this.api.loadFilteredData(name, value)
            .then(data => console.log(data))
            .catch(err => console.log(err))
    }
}

export default CalendarForm;