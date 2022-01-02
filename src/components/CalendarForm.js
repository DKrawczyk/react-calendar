import React from "react";

class CalendarForm extends React.Component {
    render() {
        return (
            <form className="form__event">
                <div className="event__insert">
                    <input type="text" placeholder="First name" className="input__field"></input> 
                    <input type="text" placeholder="Last Name" className="input__field"></input>
                    <input type="email" placeholder="Email" className="input__field"></input>
                    <input type="date" placeholder="Date" className="input__field"></input>
                    <input type="time" placeholder="Time" className="input__field"></input>
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
}

export default CalendarForm;