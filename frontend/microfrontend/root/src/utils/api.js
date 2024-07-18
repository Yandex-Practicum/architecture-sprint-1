class Api {
  constructor({address, token, groupId}) {
    this._token = token;
    this._groupId = groupId;
    this._address = address;
  }

  getAppInfo() {
    return Promise.all([this.getCardList(), this.getUserInfo()]);
  }

  getCardList() {
    return fetch(`${this._address}/${this._groupId}/cards`, {
      headers: {
        authorization: this._token,
      },
    })
        .then(res => res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`));
  }

  getUserInfo() {
    return fetch(`${this._address}/${this._groupId}/users/me`, {
      headers: {
        authorization: this._token,
      },
    })
        .then(res => res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`));
  }
}

const api = new Api({
  address: 'https://nomoreparties.co',
  groupId: `cohort0`,
  token: `80a75492-21c5-4330-a02f-308029e94b63`,
});

export default api;
