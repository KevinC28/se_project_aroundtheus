import Popup from "./Popup.js";
export default class PopupWithForm extends Popup {
    constructor({ popupSelector, handleFormSubmit }) {
        super({ popupSelector });
        this._popupForm = this._popupElement.querySelector(".modal__form");
        this._handleFormSubmit = handleFormSubmit;
        this._button = this._popupForm.querySelector(".modal__button");
    }

    _getInputValues() {
        const inputList = Array.from(  
            this._popupForm.querySelectorAll(".modal__input")
        );
        const inputValues = {};
        inputList.forEach((input) => {
            inputValues[input.name] = input.value;
        });
        return inputValues;
    }

    // _handleSubmit(e) {
    //     e.preventDefault();
    //     this._handleFormSubmit(this._getInputValues());
    // }

    // _handleDeleteSubmit(e) {
    //     e.preventDefault();
    // }

    setEventListeners() {
        super.setEventListeners();
        this._popupForm.addEventListener("submit", (evt) => {
            evt.preventDefault();
            this._handleFormSubmit(this._getInputValues(), this._button);
        });
    }

    // open() {
    //     super.open();
    //     this._popupForm.addEventListener("submit", this._handleSubmit);
    // }

    // close() {
    //     super.close();
    //     this._popupForm.removeEventListener("submit", this._handleSubmit);
    // }
}