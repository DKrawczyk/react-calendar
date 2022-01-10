class CalendarFormValidate {
    constructor() {
    }

    isNotEmpty(firstName, lastName, email, date, time) {
        if(firstName.length >=2 && lastName.length >=2 && email.length >=2 && date.length >=2 && time.length >=2) {
            return true;
        }
        return false;
    }

    isNameAndSurnameCorrect(firstName, lastName, regex) {
        if(regex.test(firstName) && regex.test(lastName)) {
            return true;
        }
        return false;
    }

    correctnessOfDatas(regex, value) {
        if(regex.test(value)) {
            return true;
        }
        return false;
    }
}

export default CalendarFormValidate;