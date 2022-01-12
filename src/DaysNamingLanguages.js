class DaysNamingLanguages {
    constructor(){
    }

    days(lang) {
        const langList = {
            'pl': ['Pn', 'Wt', 'Śr', 'Czw', 'Pt', 'Sb', 'Nd'],
            'eng': ['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su']
        }
        return langList[lang];
    }

    months(lang) {
        const langList = {
            'pl': ['Styczeń', 'Luty', 'Marzec', 'Kwiecień', 'Maj', 'Czerwiec', 'Lipiec', 'Sierpień', 'Wrzesień', 'Październik', 'Listopad', 'Grudzień'],
            'eng': ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December' ],
        }
        return langList[lang];
    }
}

export default DaysNamingLanguages;