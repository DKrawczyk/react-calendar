import CalendarSwitcher from "./CalendarSwitcher";

function CalendarYearSwitcher(props) {

    const {setYear, setMonth, monthsArray} = props;
    return (
        <div className="div__main darker">
            <CalendarSwitcher title="main__year" year={setYear} month={setMonth} monthsArray={monthsArray} switchPrev={setPrevYear} switchNext={setNextYear}/>
        </div>
    )

    function setPrevYear() {
        let {switchEvent, setYear} = props;
        setYear--;
        switchEvent(setYear);
    }

    function setNextYear() {
        let {switchEvent, setYear} = props;
        setYear++;
        switchEvent(setYear);
    }
}

export default CalendarYearSwitcher;