class CalendarAPI {
    constructor() {
        this.apiUrl = 'http://localhost:3005/meetings';
    }

    loadData() {
        return this._fetch('');
    }

    uploadData(data) {
        const options = {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {'Content-Type': 'application/json'}
        }
        return this._fetch('', options);
    }

    loadFilteredData(name, value) {
        return this._fetch(`?${name}_like=${value}`);
    }

    _fetch(path, options) {
        const url = this.apiUrl + path;
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