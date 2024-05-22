export default class Api {
  constructor(options) {
    this.baseUrl = options.baseUrl;
    this.headers = options.headers;
  }

  fetchApi(url, options) {
    return fetch(`${this.baseUrl}${url}`, options)
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(`Error: ${res.status}`);
      });
  }

  getInitialCards() {
    return this.fetchApi(`/cards`, {
      method: "GET",
      headers: this.headers
    });
  }

  getUserInfo() {
    return this.fetchApi(`/users/me`, {
      method: "GET",
      headers: this.headers
    });
  }

  updateUserInfo(name, job) {
    return this.fetchApi(`/users/me`, {
      method: "PATCH",
      headers: this.headers,
      body: JSON.stringify({name, job})
    });
  }

  updateAvatarUser(avatar) {
    return this.fetchApi(`/users/me/avatar`, {
      method: "PATCH",
      headers: this.headers,
      body: JSON.stringify({avatar})
    });
  }

  addNewCard(name, link) {
    return this.fetchApi(`/cards`, {
      method: "POST",
      headers: this.headers,
      body: JSON.stringify({name, link}),
    });
  }

  deleteCard(cardId) {
    return this.fetchApi(`/cards/${cardId}`, {
      method: "DELETE",
      headers: this.headers,
    });
  }

  addLike(cardId) {
    return this.fetchApi(`/cards/likes/${cardId}`, {
      method: "PUT",
      headers: this.headers,
    });
  }

  removeLike(cardId) {
    return this.fetchApi(`/cards/likes/${cardId}`, {
      method: "DELETE",
      headers: this.headers,
    });
  }
}