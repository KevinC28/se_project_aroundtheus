export default class FormValidator {
    constructor(settings, formElement) {
        this._settings = settings;
        this._formElement = formElement;

        this._inputList = Array.from(
            this._formElement
            .querySelectorAll(this._settings.inputSelector)
        );
        this._buttonElement = this._formElement
        .querySelector(this._settings.submitButtonSelector);

        this._toggleButtonState();
        this._addEventListeners();
    }

_addEventListeners() {
    this._inputList.forEach((inputElement) => {
        inputElement._addEventListener('input', () => {
            this._checkInputValidity(inputElement);
            this._toggleButtonState();
        });
    });
}

_toggleButtonState() {
    if (this._hasInvalidInput()) {
        this._buttonElement.classList.add(this._settings.inactiveButtonClass);
        this._buttonElement.setAtrribute = ('disabled', true);
    } else {
        this._buttonElement.classList.remove(this._settings.inactiveButtonClass);
        this._buttonElement.removeAttribute('disabled');
    }
}

_hasInvalidInput() {
    return this._inputList.some((inputElement) => !inputElement.validity.valid);
}

_showInputError(inputElement, errorMessage) {
    const errorElement = this._createErrorElement(errorMessage);
    inputElement.classList.add(this._settings.errorClass);
    inputElement.parentNode.appendChild(errorElement);
}

_hideInputError(inputElement) {
    const errorElement = inputElement.parentNode.querySelector(`.${this._settings.errorClass}`);
    if (errorElement) {
        inputElement.classList.remove(this._settings.errorClass);
        errorElement.remove();
        }
    }

_checkInputValidity(inputElement) {
    if (!inputElement.validity.valid) {
        this._showInputError(inputElement, inputElement.validationMessage);
    } else {this._hideInputError(inputElement);
        }
    }

enableValidation() {
    this._inputList.forEach((inputElement) => {
        this._hideInputError(inputElement);
    });
    this._toggleButtonState();
}


resetValidation() {
    this._inputList.forEach((inputElement) => {
        this._hideInputError(inputElement);
    });
    this._toggleButtonState();
};

_createErrorElement(errorMessage) {
    const errorElement = document.createElement('div');
    errorElement.className = this._settings.errorClass;
    errorElement.textContent = errorMessage;
    return errorElement;
    }
}
