class ApiProfileService {
    getUserInfo() {
        return this._fetch(`${this._address}/${this._groupId}/users/me`);
    }

    setUserInfo({ name, about }) {
        return this._fetch(`${this._address}/${this._groupId}/users/me`, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name, about }),
        });
    }

    setUserAvatar({ avatar }) {
        return this._fetch(`${this._address}/${this._groupId}/users/me/avatar`, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ avatar }),
        });
    }
}

export default ApiProfileService;