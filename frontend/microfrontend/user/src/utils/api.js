class Api {
    constructor({ address }) {
        // стандартная реализация — объект options
        this._address = address;
    }
}

const api = new Api({
    address: 'http://localhost:8081',
});

export default api;
