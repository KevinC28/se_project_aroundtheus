import Popup from './Popup.js';
export default class PopupWithImage extends Popup {
    constructor({ popupSelector }) {
        super({ popupSelector });
        this._cardImagepopup = this._popupElement.querySelector('.modal__image');
        this._imageDescription = this._popupElement.querySelector('.preview__description');
    }

    open({ name, link }) {
        this._cardImagepopup.src = link;
        this._cardImagepopup.alt = name;
        this._imageDescription.textContent = name;
        super.open();
    }

    // setEventListeners() {
    //     this._popupElement.addEventListener("click", (evt) => {
    //         if (evt.target.classList.contains("modal_opened")) {
    //             this.close();
    //             }
    //         });
    // }
}