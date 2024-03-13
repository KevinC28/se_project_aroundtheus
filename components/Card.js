const previewImageModal = document.querySelector('#preview-image');
const previewImage = previewImageModal.querySelector('.modal__image');
const previewImageTitle = previewImageModal.querySelector('.modal__image-name')
const ESC_KEYCODE = 27;

const closeModalWindow = ()  => {
    previewImageModal.classList.remove('modal_opened');
    document.removeEventListener('keyup', handleEscUp);
}

const handleEscUp = (e)  => {
    e.preventDefault();
    isEscEvent(e, closeModalWindow);
}

const isEscEvent = (e, action)  => {
    const activePreview = document.querySelector('modal_opened');
    if (e.which === ESC_KEYCODE) {
        action(activePreview);
    }
};




class Card {
    constructor(cardData, cardSelector, handlePreviewImage) {
        this._name = cardData.name;
        this._link = cardData.link;
        this._cardSelector = cardSelector;
        this._handlePreviewImage = handlePreviewImage;

        // this._setEventListeners();

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
        const cardElement = document.querySelector('#card-template').content.cloneNode(true);
        this._handleLikeButton = cardElement.querySelector(".card__like-button");
        this._handleDeleteCard = cardElement.querySelector(".card__delete-button");        
        this._cardImageEl = cardElement.querySelector(".card__image");
        this._cardTitleEl = cardElement.querySelector(".card__title");
        this._cardImageEl.src = this._link;
        this._cardImageEl.alt = this._name;        
        
        return cardElement;
        
    }
    
    _setEventListeners() {
        this._cardElement.querySelector('.card__like-button').addEventListener('click', this._handleLikeButton);
        this._cardElement.querySelector('.card__delete-button').addEventListener( 'click', this._handleDeleteCard);
        this._cardElement.querySelector('.card__image').addEventListener( 'click', this._handlePreviewImage);

    }

    getView () {
    this._cardElement = this.getTemplate();
    
    this._cardElement.querySelector('.card__image').style.backgroundImage = `url(${this._link})`;
    this._cardElement.querySelector('.card__title').textContent = this._name;
    this._setEventListeners();
    }
}

export default Card;