import CalendarSwitcher from "./CalendarSwitcher";

function CalendarMonthsSwitcher(props) {
    
    const {setMonth, setYear, monthsArray} = props;
    return (
        <div className="div__year brighter">
            <CalendarSwitcher title="main__month" year={setYear} month={setMonth} monthsArray={monthsArray} switchPrev={setPrevMonth} switchNext={setNextMonth}/>    
        </div>
    )

    function setNextMonth() {
        let {switchEvent, setMonth, setYear} = props;
        setMonth++;

        if(setMonth > 11) {
            setMonth = 0;
            setYear++;
        }

        switchEvent(setYear, setMonth);
    }

    function setPrevMonth() {
        let {switchEvent, setMonth, setYear} = props;
        setMonth--;

        if(setMonth < 0) {
            setMonth = 11;
            setYear--;
        }
        switchEvent(setYear, setMonth);
    }

}

export default CalendarMonthsSwitcher;