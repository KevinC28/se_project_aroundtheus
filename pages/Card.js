export default class Card {
    constructor({name, link}, cardSelector, handleImageClick) {
        this._name = name;
        this._link = link;
        this._cardSelector = cardSelector;
        this.handleImageClick = handleImageClick;
    }

_setEventListeners() {
    // .card__like-button
    this._cardElement
    .querySelector('.card__like-button')
    .addEventListener('click', () => {
        this._handleLikeIcon();
    })
    

    // .card__delete-button
    this._cardElement
    .querySelector('.card__delete-button')
    .addEventListener( 'click', () => { 
        this.handleDeleteCard();
    })

    this._cardImageEl.addEventListener( 'click', ()=> {
        this._handleImageClick(this);
    });
}

_handleLikeIcon() {
    this._cardElement
    .querySelector('.card__like-button')
    .classList.toggle('card__like-button_active');
}

_handleDeleteCard() {
    this._cardElement.remove();
}

_handleImageClick() {
    this._cardElement
    .querySelector('#preview-image')
    .addEventListener( 'click', () => {

    })
}

getView() {
    this._cardElement = document
    .querySelector(this._cardSelector)
    .content.querySelector('.card')
    .cloneNode(true);

    this._cardImageEl = this._cardElement.querySelector(".card__image");
    this._cardImageEl.src = this._link;
    this._cardImageEl.alt = this._name;

    this._setEventListeners();

    return this._cardElement;

    }
}