export default class Api {
  constructor({ baseUrl, headers }) {
    this.baseUrl = baseUrl;
    this.headers = headers;
  }

  _handleResponse(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Error: ${res.status}`);
  }

  _request(url, options) {
    return fetch(url, options).then(this._handleResponse);
  }
  
  getUserInfo() {
    return this._request(`${this.baseUrl}/users/me`, {
      method: "GET",
      headers: this.headers
    });
  }


  getInitialCards() {
    return this._request(`${this.baseUrl}/cards`, {
      // method: "GET",
      headers: this.headers
    });
  }
  

  updateUserInfo(name, about) {
    return this._request(`${this.baseUrl}/users/me`, {
      method: "PATCH",
      headers: this.headers,
      body: JSON.stringify({name, about})
    });
  }

  updateAvatarUser(avatar) {
    return this._request(`${this.baseUrl}/users/me/avatar`, {
      method: "PATCH",
      headers: this.headers,
      body: JSON.stringify({avatar})
    });
  }

  addNewCard({name, link}) {
    return this._request(`${this.baseUrl}/cards`, {
      method: "POST",
      headers: {
        ...this.headers,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({name, link}),
    })
    .catch(err => console.log(err));
  }

  deleteCard(cardId) {
    return this._request(`${this.baseUrl}/cards/${cardId}`, {
      method: "DELETE",
      headers: this.headers,
    });
  }

  addLike(cardId) {
    return this._request(`${this.baseUrl}/cards/likes/${cardId}/likes`, {
      method: "PUT",
      headers: this.headers,
    });
  }

  removeLike(cardId) {
    return this._request(`${this.baseUrl}/cards/likes/${cardId}/likes`, {
      method: "DELETE",
      headers: this.headers,
    });
  }
}