export default class Api {
  constructor(options) {
    this._baseUrl = options.baseUrl;
    this._headers = options.headers;
  }

  fetchApi(url, options) {
    return fetch(`${this._baseUrl}${url}`, options)
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(`Error: ${res.status}`);
      });
  }

  getInitialCards() {
    return this.fetchApi('${this.baseUrl}/cards', {
      method: "GET",
      headers: this._headers
    });
  }

  getUserInfo() {
    return this.fetchApi('${this.baseUrl}/users/me', {
      method: "GET",
      headers: this._headers
    });
  }

  updateUserInfo() {
    return this.fetchApi('${this.baseUrl}/users/me', {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({name, job})
    });
  }

  updateAvatarUser() {
    return this.fetchApi('${this.baseUrl}/users/me/avatar', {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({avatar})
    });
  }

  addNewCard() {
    return this.fetchApi('${this.baseUrl}/cards', {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify({name, link}),
    });
  }

  deleteCard() {
    return this.fetchApi('${this.baseUrl}/cards/${cardId}', {
      method: "DELETE",
      headers: this._headers,
    });
  }

  addLike() {
    return this.fetchApi('${this.baseUrl}/cards/likes/${cardId}', {
      method: "PUT",
      headers: this._headers,
    });
  }

  removeLike() {
    return this.fetchApi('${this.baseUrl}/cards/likes/${cardId}', {
      method: "DELETE",
      headers: this._headers,
    });
  }
}
