class DaysNaming {
    constructor(){
    }

    days(lang) {
        if(lang === 'pl') {
            return ['Pn', 'Wt', 'Śr', 'Czw', 'Pt', 'Sb', 'Nd']
        }
        if(lang === 'eng') {
            return ['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su']
        }
        return alert('Language must be set!')
    }

    months(lang) {
        if(lang === 'pl') {
            return ['Styczeń', 'Luty', 'Marzec', 'Kwiecień', 'Maj', 'Czerwiec', 'Lipiec', 'Sierpień', 'Wrzesień', 'Październik', 'Listopad', 'Grudzień'];
        }
        if(lang === 'eng') {
            return ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December' ] ;
        }
    }


}

export default DaysNaming;