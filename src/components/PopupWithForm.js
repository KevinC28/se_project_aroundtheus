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
    
        setEventListeners() {
            super.setEventListeners();
            this._popupForm.addEventListener("submit", (evt) => {
                evt.preventDefault();
                this._handleFormSubmit(this._getInputValues(), this._button);
            });
        }
}