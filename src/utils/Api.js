class Api{
  constructor({host, headers}) {
    this._host = host;
    this._headers = headers;
  }

  _checkApiResponse(res) {
    if (res.ok) {
      return res.json();
    } else {
      return Promise.reject(`Ошибка: ${res.status}`);
    }
  }

  getInitialCards() {
    return fetch(`${this._host}/cards`, {
      method: 'GET',
      headers: this._headers
  })
    .then(res => this._checkApiResponse(res))
  }

  getUserInfo() {
    return fetch(`${this._host}/users/me`, {
      method: 'GET',
      headers: this._headers
    })
    .then(res => this._checkApiResponse(res));
  }

  sendCreatedCard({name, link}) {
    return fetch(`${this._host}/cards`, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify({
        name,
        link
    })
  })
    .then(res => this._checkApiResponse(res))
  }

  applyUserInfo({name, about}) {
    return fetch(`${this._host}/users/me`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        name,
        about
    })
  })
    .then(res => this._checkApiResponse(res))
  }

  changeLikeCardStatus(cardId, IsLiked) {
    if (IsLiked) {
      return fetch(`${this._host}/cards/${cardId}/likes`, {
        method: 'PUT',
        headers: this._headers
    })
      .then(res => this._checkApiResponse(res))
    } 
    return fetch(`${this._host}/cards/${cardId}/likes`, {
      method: 'DELETE',
      headers: this._headers
    })
      .then(res => this._checkApiResponse(res))
    
  }

  deleteCard(cardId) {
    return fetch(`${this._host}/cards/${cardId}`, {
      method: 'DELETE',
      headers: this._headers
  })
    .then(res => this._checkApiResponse(res))
  }

  updateUserAvatar(avatar) {
    return fetch(`${this._host}/users/me/avatar`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({avatar})
    })
    .then(res => this._checkApiResponse(res))
  }
}

export const api = new Api({
    host: 'https://mesto.nomoreparties.co/v1/cohort-47',
    headers: {
      authorization: 'c90390ff-d2c8-4a08-89e0-57975fd0d0b1',
      'Content-Type': 'application/json'
    }
  })