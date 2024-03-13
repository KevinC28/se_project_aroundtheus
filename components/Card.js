const openModal = (modal) => {
    modal.classList.add('modal_opened');
    document.addEventListener('keyup', handleEscUp);
}

// // function openModal(modal) {
//     modal.classList.add("modal_opened");
//     document.addEventListener('keydown', handleModalKeyDown);
// function handleModalKeyDown(e) {
//     if (e.key === "Escape") {
//         closeModal(openModal);
//     }
// }



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
    const activePreview = document.querySelector('.modal_opened');
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
        this._cardElement = this.getTemplate();

    }

    
    _handleLikeButtonClick = () => {
        // this._handleLikeButton.classList.toggle('card__like-button_active');
        this._cardElement.querySelector('.card__like-button').classList.toggle('card__like-button_active');
    }
    
    _handleDeleteButtonCardClick = () => {
        this._cardElement.querySelector('.card').remove();
        this._cardElement = null;
    }
    
    _handlePreviewImageClick = () => {
        previewImage.src = this._link;
        previewImage.alt = this._name;
        previewImageTitle.textContent = this._name;
        this._handlePreviewImage(this._link, this._name);
        openModal(previewImageModal);
    }
    
    _setEventListeners() {
        this._cardElement.querySelector('.card__like-button').addEventListener('click', this._handleLikeButton);
        this._cardElement.querySelector('.card__delete-button').addEventListener('click', this._handleDeleteButtonCard);
        this._cardElement.querySelector('.card__image').addEventListener( 'click', this._handlePreviewImage);

        this._handleLikeButton = this._handleLikeButton.bind(this);
        this._handleDeleteCard = this._handleDeleteCard.bind(this);
        this._setEventListeners();
        this._setEventListeners();

        // this._cardImageEl = this._cardElement.querySelector('.card__image');
        // this._cardElement.querySelector('.card__like-button').addEventListener('click', this._handleLikeButton);
        // this._cardElement.querySelector('.card__delete-button').addEventListener( 'click', this._handleDeleteCard);

    }
    
    getTemplate() {
        const cardElement = document.querySelector('#card-template').content.cloneNode(true).querySelector('.card');

        this._cardImageEl = cardElement.querySelector(".card__image");
        this._cardTitleEl = cardElement.querySelector('.card__title');
        this._cardImageEl.src = this._link;
        this._cardImageEl.alt = this._name;
        this._cardTitleEl.textContent = this._name;


        return cardElement;


        
    }
    

    // getView () {
    // this._cardElement = this.getTemplate();
    
    // this._cardElement.querySelector('.card__image').style.backgroundImage = `url(${cardData._link})`;
    // this._cardElement.querySelector('.card__title').textContent = cardData._name;
    // this._setEventListeners();
    // }
}

export default Card;