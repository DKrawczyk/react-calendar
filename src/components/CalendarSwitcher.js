import React from "react";

class CalendarSwitcher extends React.Component {

    render() {
        // console.log(this.props);
        const {title, months} = this.props;
        return (
            <>
                <button onClick = {this.changeDate} className="button button__previous">{'<'}</button>
                <span className={title}>{this.getDate()}</span>
                <button className="button button__next">{'>'}</button>
            </>
        )
    }

    getDate() {
        const {title, months} = this.props;
        const today = new Date();
        const currentDay = `${today.getDate()} ${months[today.getMonth()]} ${today.getFullYear()}`;

        if (title === 'main__year') {
            return today.getFullYear();
        }
        else if (title === 'main__month') {
            return months[today.getMonth()];
        }
        else if (title === 'chosen__day') {
            return currentDay;
        }
    }

    changeDate = (e) => {
        const current = e.target;
        
        if(current.nextElementSibling.className.includes('main__month')) {
        }
        console.log('click');
        // counter ++;
    }

}

export default CalendarSwitcher;