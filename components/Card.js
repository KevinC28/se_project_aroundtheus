class Card {
    constructor(cardData, cardSelector, handlePreviewImage) {
        this._name = cardData.name;
        this._link = cardData.link;
        this._cardSelector = cardSelector;
        this._handlePreviewImage = handlePreviewImage;
    }

    
    _handleLikeButton() {
        this._cardElement.querySelector('.card__like-button').classList.toggle('card__like-button_active');
    }
    
    _handleDeleteCard() {
        this._cardElement.remove();
        this._cardElement = null;
    }
    
    _handlePreviewImage() {
        previewImage.src = cardData.link;
        previewImage.alt = cardData.name;
        previewImageTitle.textContent = cardData.name;
        openModal(previewImageModal);
    }
    
    getTemplate() {
        const cardElement = document.querySelector(this._cardSelector).cloneNode(true);
        this._handleLikeButton = cardElement.querySelector(".card__like-button");
        this._handleDeleteCard = cardElement.querySelector(".card__delete-button");        
        this._cardImageEl = cardElement.querySelector(".card__image");
        this._cardTitleEl = cardElement.querySelector(".card__title");
        this._cardImageEl.src = this._link;
        this._cardImageEl.alt = this._name;        
        this._setEventListeners();
        
        return cardElement;
        
    }
    
    _setEventListeners() {
        this._cardElement.querySelector('.card__like-button').addEventListener('click', () => this._handleLikeButton());
        this._cardElement.querySelector('.card__delete-button').addEventListener( 'click', () => this._handleDeleteCard);
        this._cardElement.querySelector('.card__image').addEventListener( 'click', () => this._handlePreviewImage);
    }

    // getView () {
        //     this._cardElement = this._getTemplate();
    
//     this._cardElement.querySelector('.card__image').style.backgroundImage = `url(${this._link})`;
//     this._cardElement.querySelector('.card__title').textContent = this._name;
//     this._setEventListeners();
//     }
}

export default Card;