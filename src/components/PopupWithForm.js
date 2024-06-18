import Popup from "./Popup.js";
export default class PopupWithForm extends Popup {
    constructor({ popupSelector, handleFormSubmit }) {
        super({ popupSelector });
        this._popupForm = this._popupElement.querySelector(".modal__form");
        this._inputList = this._popupElement.querySelectorAll(".modal__input");
        this._handleFormSubmit = handleFormSubmit;
        this._handleSubmit = this._handleSubmit.bind(this);
        this._handleDeleteSubmit = this._handleDeleteSubmit.bind(this);
    }

    _getInputValues() {
        this._formValues = {};
        this._inputList.forEach((input) => {
            this._formValues[input.name] = input.value;
        });
        return this._formValues;
    }

    _handleSubmit(e) {
        e.preventDefault();
        this._handleFormSubmit(this._getInputValues());
    }

    _handleDeleteSubmit(e) {
        e.preventDefault();
    }

    setEventListeners() {
        super.setEventListeners();
        this._popupForm.addEventListener("submit", this._handleSubmit);
    }

    open() {
        super.open();
        this._popupForm.addEventListener("submit", this._handleSubmit);
    }

    close() {
        super.close();
        this._popupForm.removeEventListener("submit", this._handleSubmit);
    }
}