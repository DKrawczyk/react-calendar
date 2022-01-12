class CalendarFormValidate {
    constructor() {
        // const regexName = /^[\w'\-,.][^0-9_!¡?÷?¿\\+=@#$%ˆ&*(){}|~<>;:[\]]{2,}$/;
        // const regexEmail = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        // const regexDate = /^\d{4}\-(0?[1-9]|1[012])\-(0?[1-9]|[12][0-9]|3[01])$/
        // const regexTime = /^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/;

        // const errors = [];
        // const fields = [
        //     {name: 'firstName', isRequired: true, regex: regexName},
        //     {name: 'lastName', isRequired: true, regex: regexName},
        //     {name: 'email', isRequired: true, regex: regexEmail},
        //     {name: 'date', isRequired: true, regex: regexDate},
        //     {name: 'time', isRequired: true, regex: regexTime},
        // ];
    }

    isEmpty(value) {
        if(!value) {
            return true;
        }
        return false;
    }

    checkDataCorrectness(regex, value) {
        if(regex.test(value)) {
            return true;
        }
        return false;
    }
}

export default CalendarFormValidate;