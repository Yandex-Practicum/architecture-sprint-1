class Api {
    constructor({ address }) {
        // стандартная реализация — объект options
        this._address = address;
    }

    getAppInfo() {
        return Promise.all([this.getCardList(), this.getUserInfo()]);
      }
    }

const api = new Api({
    address: 'http://localhost:8080',
});

export default api;
