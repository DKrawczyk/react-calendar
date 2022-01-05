class CalendarAPI {
    constructor() {
        this.apiUrl = 'http://localhost:3005/meetings';
    }

    loadData() {
        return this._fetch();
    }

    uploadData(data) {
        const options = {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {'Content-Type': 'application/json'}
        }
        return this._fetch(options);
    }

    _fetch(options) {
        const url = this.apiUrl;
        return fetch(url, options)
            .then(resp => {
                if(resp.ok) {
                    return resp.json();
                }
            return Promise.reject(resp);
        })
    }
}

export default CalendarAPI;