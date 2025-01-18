export default class Api {
  constructor({ baseUrl, headers }) {
    this._baseUrl = baseUrl;
    this._headers = headers;
  }

  getInitialCards() {
    return fetch(`${this._baseUrl}/cards`, {
      method: "GET",
      headers: this._headers,
    }).then((res) => this._checkResponse(res));
  }

  getUserInfo() {
    return this._request(`${this.baseUrl}/users/me`, {
      method: "GET",
      headers: this._headers
    }).then((res) => this._checkResponse(res));
  }

  updateUserInfo(data) {
    return fetch(`${this.baseUrl}/users/me`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify(data)
  }).then((res) => this._checkResponse(res));
  }

  updateAvatarUser(data) {
    return fetch(`${this.baseUrl}/users/me/avatar`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify(data)
    }).then((res) => this._checkResponse(res));
  }
      
  updateAvatarUser(data) {
    return fetch(`${this.baseUrl}/users/me/avatar`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify(data)
    }).then((res) => this._checkResponse(res));
  }

  addNewCard({data}) {
    return fetch(`${this.baseUrl}/cards`, {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify(data),
    }).then((res) => this._checkResponse(res));
  }

  handleDeleteCard(cardId) {
    return fetch(`${this.baseUrl}/cards/${cardId}`, {
      method: "DELETE",
      headers: this._headers,
    }).then((res) => this._checkResponse(res));
  }
  likeCard(cardId) {
    return fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
      method: "PUT",
      headers: this._headers,
      }).then((res) => this._checkResponse(res));
    }

  dislikeCard(cardId) {
    return this._request(`${this.baseUrl}/cards/likes/${cardId}/likes`, {
      method: "DELETE",
      headers: this._headers,
      }).then((res) => this._checkResponse(res));
    }

    getUserInfoAndCard() {
      return Promise.all([this.getUserInfo(), this.getInitialCards()]).then(
        ([userInfo, cards]) => ({ userInfo, cards })
      );
    }

    _checkResponse(res) {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Error: ${res.status}`);
    }

    // return this._request(`${this.baseUrl}/cards/likes/${cardId}/likes`, {
    //   method: "PUT",
    //   headers: this._headers,
    // });

}