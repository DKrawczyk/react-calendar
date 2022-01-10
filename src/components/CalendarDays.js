import React from "react";
import {v4 as uuid} from 'uuid';

function CalendarDays(props) {

    const days = [];
    const currentDay = getDay();

    // {test()}
    for (let i=1; i<currentDay; i++) {
        days.push(<label key={uuid()} className="calendar__day empty"></label>)
    }
    for (let i=1; i<=getDaysInMonth(); i++) {
        days.push(<label key={uuid()} className={markCurrentDay(i)}>{i}</label>)
    }
    return days;

    function getDay() {
        const {year, month} = props;
        const firstDay = new Date(year, month, 1);
        let num = firstDay.getDay();

        if(num === 0) {
            num = 7;
        }
        return num;
    }
    
    function getDaysInMonth() {
        const {year, month} = props;
        return new Date(year, month +1, 0).getDate();
    }

    function markCurrentDay(nums) {
        const currentDay = getDay()+1;

        if(nums === currentDay) {
            return 'curr calendar__day not-empty';
        }
        return 'calendar__day not-empty';
    }

    // function test() {
        // const {meetings, month} = props;
        // const currentDay = getDay();
        // console.log(currentMonth)
        // console.log(month);
        // if(meetings.length > 0) {

            // console.log(meetings);
            // meetings.map(el => {
            //     const test = year(el);
            //     const test2 = setMonthDate(el);
            //     const test3 = setDatDate(el);
            //     console.log(test2);
                // days();
                
                // console.log(test, test2, test3);
            // })
            // const test = setTest(meetings);

            // const testv2 = meetings.map((el) => {

            //     return parseInt(el.date.slice(5,7))
            // })

            // console.log(testv2);
            // const newClass = testv2.map(el => {
            //     if(el === nums) {
            //         return 'circle'
            //     }
            // })

            // return newClass

            // if(nums === testv2) {
                // console.log(nums, '|', testv2);
                // console.log('jest');
            // }
            // console.log(nums, '|', testv2);

        // return 'test'
        // }
    // }

    // function year(el) {
    //     console.log(el);

    //     return el.date.slice(0,4);
    // }

    // function setMonthDate(el) {
    //     return parseInt(el.date.slice(5,7));
    // }

    // function setDatDate(el) {
    //     console.log(el.date.length);
    //     return parseFloat(el.date.slice(7,10));
    // }

    // function setTest(array) {
    //     console.log(array);

    // }
}

export default CalendarDays;