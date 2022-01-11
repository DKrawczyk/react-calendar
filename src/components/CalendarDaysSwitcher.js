import CalendarSwitcher from "./CalendarSwitcher";
import {getDaysInMonth} from "../dateHelper";

function CalendarDaysSwitcher(props) {
    const {setYear, setMonth, setDay, months} = props;

    return (
        <header className="darker main__calendar-page">
            <CalendarSwitcher title="chosen__day" year={setYear} month={setMonth} day={setDay} monthsArray={months} switchPrev={setPrevDay} switchNext={setNextDay}/>
        </header>
    )

    function setNextDay() {
        let {switchEvent, setDay, setMonth, setYear} = props;
        setDay++;

        const maxDayInMonth = getDaysInMonth(setYear, setMonth);
        if(setDay > maxDayInMonth) {
            setDay = 1;
        }
        switchEvent(setDay);
    }

    function setPrevDay() {
        let {switchEvent, setDay, setMonth, setYear} = props;
        setDay--;

        if(setDay === 0) {
            setDay = getDaysInMonth(setYear, setMonth);
        }
        switchEvent(setDay);
    }
}

export default CalendarDaysSwitcher;