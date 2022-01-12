import CalendarSwitcher from "./CalendarSwitcher";
import {getDaysInMonth as getDays} from "../dateHelper";

function CalendarMonthsSwitcher(props) {
    
    const {setMonth, setYear, monthsArray} = props;
    return (
        <div className="div__year brighter">
            <CalendarSwitcher title="main__month" year={setYear} month={setMonth} monthsArray={monthsArray} switchPrev={setPrevMonth} switchNext={setNextMonth}/>    
        </div>
    )

    function setNextMonth() {
        let {switchEvent, setMonth, setYear, setDay} = props;
        setMonth++;

        const maxDayInMonth = getDays(setYear, setMonth);
        if(setDay > maxDayInMonth) {
            setDay = maxDayInMonth;
        }
        
        if(setMonth > 11) {
            setMonth = 0;
            setYear++;
        }

        switchEvent(setYear, setMonth, setDay);
    }

    function setPrevMonth() {
        let {switchEvent, setMonth, setYear, setDay} = props;
        setMonth--;

        if(setMonth < 0) {
            setMonth = 11;
            setYear--;
        }
        switchEvent(setYear, setMonth, setDay);
    }

}

export default CalendarMonthsSwitcher;