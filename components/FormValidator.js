class FormValidator {
    constructor(config, formElement) {
        this._inputSelector = config.inputSelector;
        this._formElement = formElement;
        this._submitButtonSelector = config.submitButtonSelector;
        this._errorClass = config.errorClass;
        this._inputErrorClass = config.inputErrorClass;
        this._inactiveButtonClass = config.inactiveButtonClass;



        //     inputSelector: ".modal__input",
    // submitButtonSelector: ".modal__button",
    // inactiveButtonClass: "modal__button_disabled",
    // inputErrorClass: "modal__input_type_error",
    // errorClass: "modal__error_visible"


    //     // this._inputList = Array.from(
        //     this._formElement
        //     .querySelectorAll(thfis._config.inputSelector)
        // );
    //     this._submitButtonSelector = this._formElement
    //     .querySelector(this._config.submitButtonSelector);
    // 
}

_setEventListeners() {
    this._inputList = Array.from(this._formElement.querySelectorAll(this._inputSelector));
    this._submitButton = this._formElement.querySelector(this._submitButtonSelector);
    this._inputList.forEach((inputElement) => {
        inputElement.addEventListener('input', () => {
            this._checkInputValidity(inputElement);
            this._toggleButtonState();
        });
    });
}

_toggleButtonState() {
    if (this._hasInvalidInput()) {
        this._submitButton.classList.add(this._inactiveButtonClass);
        this._submitButton.setAtrribute = ('disabled', true);
    } else {
        this._submitButton.classList.remove(this._inactiveButtonClass);
        this._submitButton.removeAttribute('disabled');
    }
}

_hasInvalidInput() {
    return this._inputList.some((inputElement) => !inputElement.validity.valid);
}

_showInputError(inputElement, errorMessage) {
    const errorElement = this._formElement.querySelector(`#${inputElement.id}-error`);
    inputElement.classList.add(this._errorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(this._errorClass);
}

_hideInputError(inputElement) {
    const errorElement = this._formElement.querySelector(`#${inputElement.id}-error`);
            inputElement.classList.remove(this._errorClass);
        errorElement.classList.remove(this._errorClass);
        errorElement.textContent = '';
    }

_checkInputValidity(inputElement) {
    if (!inputElement.validity.valid) {
        this._showInputError(inputElement, inputElement.validationMessage);
    } else {this._hideInputError(inputElement);
        }
    }

enableValidation() {
        this._formElement.addEventListener('submit', (e) => {
            e.preventDefault();
        });
        
        this._setEventListeners();
    };
    // invoke addEventListeners



resetValidation() {
    this._inputList.forEach((inputElement) => {
        this._hideInputError(inputElement);
    });
    this._toggleButtonState();
};


}

export default FormValidator;
