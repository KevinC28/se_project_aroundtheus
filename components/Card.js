export default class Card {
    constructor({name, link}, cardSelector, handleImageClick) {
        this._name = name;
        this._link = link;
        this._cardSelector = cardSelector;
        this.handleImageClick = handleImageClick;
    }

_setEventListeners() {
    // card like button
    this._cardElement
    .querySelector('.card__like-button')
    .addEventListener('click', () => {
        this._handleLikeButton();
    })
    

    // card deletebutton
    this._cardElement
    .querySelector('.card__delete-button')
    .addEventListener( 'click', () => { 
        this.handleDeleteCard();
    })

    this._cardImageEl.addEventListener( 'click', ()=> {
        this._handleImageClick(this);
    });
}

_handleLikeButton() {
    this._cardElement
    .querySelector('.card__like-button')
    .classList.toggle('card__like-button_active');
}

_handleDeleteCard() {
    this._cardElement.remove();
    this._cardElement = null;
}

_handleImageClick() {
    this._cardElement
    .querySelector('#preview-image')
    .addEventListener( 'click', () => {

    })
}

generateCard() {
    this._cardElement = document
    .querySelector(this._cardSelector)
    .content.querySelector('.card')
    .cloneNode(true);

    this._handleLikeButton = this._cardElement.querySelector(".card__like-button");
    this._handleDeleteCard = this._cardElement.querySelector(".card__delete-button").onclick;

    this._cardImageEl = this._cardElement.querySelector(".card__image");
    this._cardTitleEl = this._cardElement.querySelector(".card__title");
    this._cardImageEl.src = this._link;
    this._cardImageEl.alt = this._name;
    this.cardTitle.textContent = this._name; 

    this._setEventListeners();

    return this._cardElement;

    }
}