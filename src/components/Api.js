class Api {
    constructor({ baseUrl, headers }) {
      this._baseUrl = baseUrl;
      this._headers = headers;
    }

getInitialCards {
    return fetch("https://around-api.en.tripleten-services.com/v1/cards", {
     headers: {
       authorization: "c56e30dc-2883-4270-a59e-b2f7bae969c6"
     }
   })
     .then(res => {
       if (res.ok) {
         return res.json();
       }
       return Promise.reject(`Error: ${res.status}`);
     });
}

api.getInitialCards()
   .then((result) => {
     // process the result
   })
   .catch((err) => {
     console.error(err); // log the error to the console
   });

const api = new Api({
  baseUrl: 'https://api.around.students.nomoreparties.site',
  headers: {
    authorization: 'd6e1c0b0-4b4b-4b6d-8b1d-6c7c7f4d6e6f',
    'content-type': 'application/json'
  }
});
