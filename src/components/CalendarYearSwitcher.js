import CalendarSwitcher from "./CalendarSwitcher";
import {getDaysInMonth as getDays} from "../dateHelper";

function CalendarYearSwitcher(props) {

    const {setYear, setMonth, monthsArray} = props;
    return (
        <div className="div__main darker">
            <CalendarSwitcher title="main__year" year={setYear} month={setMonth} monthsArray={monthsArray} switchPrev={setPrevYear} switchNext={setNextYear}/>
        </div>
    )

    function setPrevYear() {
        let {switchEvent, setYear, setDay} = props;

        setYear--;
        switchEvent(setYear, setDay);
    }

    function setNextYear() {
        let {switchEvent, setYear, setMonth, setDay} = props;
        setYear++;

        const maxDayInMonth = getDays(setYear, setMonth);
        if(setDay > maxDayInMonth) {
            setDay = maxDayInMonth;
        }
        switchEvent(setYear, setDay);
    }
}

export default CalendarYearSwitcher;