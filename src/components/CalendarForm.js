import React from "react";
import CalendarAPI from "./CalendarAPI";
import CalendarFormValidate from "./CalendarFormValidate";
import CalendarInputs from "./CalendarInputs";
import {getNameRegex, getEmailRegex, getDateRegex, getTimeRegex} from "../helpers/validationHelper";

class CalendarForm extends React.Component {
    constructor(){
        super()
        this.api = new CalendarAPI();
        this.fields = [
            {type:"text", name:"firstName", placeholder:"First name", className:"input__field", id:"clicked", validationRules:{isRequired: true, regex: getNameRegex()}},
            {type:"text", name:"lastName", placeholder:"Last Name", className:"input__field", id:"clicked", validationRules:{isRequired: true, regex: getNameRegex()}},
            {type:"text", name:"email", placeholder:"Email", className:"input__field", id:"clicked", validationRules:{isRequired: true, regex: getEmailRegex()}},
            {type:"date", name:"date", placeholder:"Date", className:"input__field", id:"clicked", validationRules:{isRequired: true, regex: getDateRegex()}},
            {type:"time", name:"time", placeholder:"Time", className:"input__field", id:"clicked", validationRules:{isRequired: true, regex: getTimeRegex()}},
        ]
    }
    state = {
            firstName: '',
            lastName: '',
            email: '',
            date: '',
            time: '',
            errorInformations: {},
    }

    render() {
        const {errorInformations} = this.state;
        return (
            <form onSubmit={this.dataValidation} className="form__event">
                <div onChange={this.inputChange} className="event__insert">
                    <CalendarInputs fields={this.fields} errors={errorInformations} thisEvent={this.secondTest}/>
                    <input type="submit" className="input__field"></input>
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

    dataValidation = (event) => {
        const validation = new CalendarFormValidate();
        const errors = {};
        let errorsCount = 0;

        this.fields.forEach((field) => {
          errors[field.name] = [];

        });
    
        this.fields.forEach((field) => {
            const value = this.state[field.name];

            if (field.validationRules.isRequired) {
                if (validation.isEmpty(value)) {
                    errors[field.name].push("Field cannot be empty");
                }
                else {
                    if (field.validationRules.regex) {
                        if(!validation.checkDataCorrectness(field.validationRules.regex, value)) {
                            errors[field.name].push("Incorrect format");
                        }
                    }
                }
            }
            errorsCount += errors[field.name].length;
        });
        console.log(errorsCount);
    
        
        if (errorsCount > 0) {

            event.preventDefault();
            this.setState({
                errorInformations: errors,
            });
        }

        else {
            this.setNewMeetingData();
        }
    };

    secondTest(el) {
        const {errorInformations} = this.state;

        return errorInformations[el.name].map(i => <li>{i}</li>)
    }

    setNewMeetingData() {
        const {firstName, lastName, email, date, time} = this.state;
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