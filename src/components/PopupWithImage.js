import Popup from './Popup.js';
export default class PopupWithImage extends Popup {
    constructor({ popupSelector }) {
        super({ popupSelector });
        this._popupImage = this._popupElement.querySelector('.modal__image');
        this._popupImageTitle = this._popupElement.querySelector('.modal__image-name');
    }

    open({ name, link }) {
        this._popupImage.src = link;
        this._popupImage.alt = name;
        this._popupImageTitle.textContent = name;
        super.open();
    }
}