export default class Api {
  constructor({ baseUrl, headers }) {
    this._baseUrl = baseUrl;
    this._headers = headers;
  }

  _handleResponse(res) {
    if (res.ok) {
      return res.json();
    }
    console.log(`Error: ${res.status}`);
    return Promise.reject(`Error: ${res.status}`);
  }

  _request(url, options) {
    return fetch(url, options)
      .then(this._handleResponse)
      .catch((error) => {
        console.error('Fetch error:', error);
        throw error;
      });
  }

  getUserInfo() {
    try {
      return this._request(`${this._baseUrl}/users/me`, {
        method: "GET",
        headers: this._headers,
      });
    } catch (error) {
      console.error("Error getting user info:", error);
      throw error;
    }
  }

  getInitialCards() {
    try {
      return this._request(`${this._baseUrl}/cards`, {
        method: "GET",
        headers: this._headers,
      });
    } catch (error) {
      console.error("Error getting initial cards:", error);
      throw error;
    }
  }

  updateUserInfo(name, about) {
    return this._request(`${this._baseUrl}/users/me`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({name, about}),
    });
  }

  updateAvatarUser(data) {
    return fetch(`${this._baseUrl}/users/me/avatar`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify(data)
    }).then((res) => this._checkResponse(res));
  }

  addNewCard({data}) {
    return fetch(`${this._baseUrl}/cards`, {
      method: "POST",
      headers: {
        ...this._headers,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data),
    })
    .catch(err => console.log(err));
  };

  deleteCard(cardId) {
    return this._request(`${this._baseUrl}/cards/${cardId}`, {
      method: "DELETE",
      headers: this._headers,
    })
    .catch(err => console.log(err));
  }

  likeCard(cardId) {
    return fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
      method: "PUT",
      headers: this._headers,
    }).then((res) => this._checkResponse(res));
  }

  dislikeCard(cardId) {
    return this._request(`${this._baseUrl}/cards/likes/${cardId}/likes`, {
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
}
