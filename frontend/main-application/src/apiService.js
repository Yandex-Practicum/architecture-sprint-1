const API_ADDRESS = 'https://nomoreparties.co';
const API_TOKEN = `80a75492-21c5-4330-a02f-308029e94b63`;
const GROUP_ID = `cohort0`;
const AUTH_URL = 'https://auth.nomoreparties.co';

class ApiService {
  constructor({ address, token, groupId }) {
    // стандартная реализация -- объект options
    this._token = token;
    this._groupId = groupId;
    this._address = address;

    // Запросы в примере работы выполняются к старому Api, в новом URL изменены.
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

  addCard({ name, link }) {
    return fetch(`${this._address}/${this._groupId}/cards`, {
      method: 'POST',
      headers: {
        authorization: this._token,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name,
        link,
      }),
    })
      .then(res => res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`));
  }

  removeCard(cardID) {
    return fetch(`${this._address}/${this._groupId}/cards/${cardID}`, {
      method: 'DELETE',
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

  setUserInfo({ name, about }) {
    return fetch(`${this._address}/${this._groupId}/users/me`, {
      method: 'PATCH',
      headers: {
        authorization: this._token,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name,
        about,
      }),
    })
      .then(res => res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`));
  }

  setUserAvatar({ avatar }) {
    return fetch(`${this._address}/${this._groupId}/users/me/avatar`, {
      method: 'PATCH',
      headers: {
        authorization: this._token,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        avatar,
      }),
    })
      .then(res => res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`));
  }

  changeLikeCardStatus(cardID, like) {
    // Обычная реализация: 2 разных метода для удаления и постановки лайка.
    return fetch(`${this._address}/${this._groupId}/cards/like/${cardID}`, {
      method: like ? 'PUT' : 'DELETE',
      headers: {
        authorization: this._token,
        'Content-Type': 'application/json',
      },
    })
      .then(res => res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`));
  }
}

class Api {
  constructor() {
    this.authServicePromise = import('auth_microfrontend/AuthService')
        .then((module) => {
          const AuthService = module.default;
          this.authService = new AuthService('https://auth.nomoreparties.co');
          return this.authService;
        })
        .catch((error) => {
          console.error('Fail to import AuthService:', error);
          throw error;
        });
  }

  async debug() {
    const authService = await this.authServicePromise;
    authService.debug()
  }
}


const api = new Api();

const apiService = new ApiService({
  address: 'https://nomoreparties.co',
  groupId: `cohort0`,
  token: `80a75492-21c5-4330-a02f-308029e94b63`,
});

export { api, apiService };
