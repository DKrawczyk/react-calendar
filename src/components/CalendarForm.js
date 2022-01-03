import React from "react";

class CalendarForm extends React.Component {
    state = {
            userName: '',
            userLastName: '',
            userEmail: '',
            date: '',
            time: '',
    }

    render() {
        const {userName, userLastName, userEmail, date, time} = this.state;
        // console.log(this.state);
        return (
            <form onSubmit = {this.formHandle} className="form__event">
                <div onChange = {this.inputChange} className="event__insert">
                    <input type="text" name="userName" value={userName} placeholder="First name" className="input__field"></input> 
                    <input type="text" name="userLastName" value={userLastName} placeholder="Last Name" className="input__field"></input>
                    <input type="text" name="userEmail" value={userEmail} placeholder="Email" className="input__field"></input>
                    <input type="text" name="date" value={date} placeholder="Date" className="input__field"></input>
                    <input type="text" name="time" value={time} placeholder="Time" className="input__field"></input>
                    <input type="submit" className="event__submit"></input>
                </div>
                <div className="div__error">
                    <ul className="error__list">
                        <li className="error"></li>
                    </ul>
                </div>
            </form>
        )
    }

    inputChange = e => {
        const {name, value} = e.target;
        this.setState( {
            [name]: value,
        });
    }

    formHandle = e => {
        e.preventDefault();
        const {userName, userLastName, userEmail, date, time} = this.state;
        const newMeeting = {
            user: userName,
            lastName: userLastName,
            email: userEmail,
            data: date,
            time: time,
        }
        this.setState({
            userName: '',
            userLastName: '',
            userEmail: '',
            date: '',
            time: '',
        });
        this.sendNewMeeting(newMeeting);
    }

    sendNewMeeting(data) {
        const options = {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {'Content-Type': 'application/json'}
        }
        return fetch('http://localhost:3005/meetings', options)
            .then(resp => {
                if (resp.ok) {
                    return resp.json();
                }
            return Promise.reject(resp);
            })
            .catch(err => console.log(err.message))
            .finally('New meeting uploaded');
    }

}

export default CalendarForm;