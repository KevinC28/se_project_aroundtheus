import Popup from './Popup.js';
export default class PopupWithImage extends Popup {
    constructor({ popupSelector }) {
        super({ popupSelector });
        this.popupImage = this._popupElement.querySelector('.modal__image');
        this.popupImageTitle = this._popupElement.querySelector('.modal__image-name');
    }

    open({ name, link }) {
        super.open();
        this.popupImage.src = link;
        this.popupImageTitle.textContent = name;
        this.popupImage.alt = name;
    }
}