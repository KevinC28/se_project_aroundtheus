// enabling validation by calling enableValidation()
// pass all the config on call

function showInputError(formElement, inputElement, {inputErrorClass, errorClass}) {
    const errorMessageElement = formElement.querySelector(`#${inputElement.id}-error`);
    inputElement.classList.add(inputErrorClass);
    errorMessageElement.textContent = inputElement.validationMessage;
    errorMessageElement.classList.add(errorClass);
}
function hideInputError(formElement, inputElement, {inputErrorClass, errorClass}) {
    const errorMessageElement = formElement.querySelector(`#${inputElement.id}-error`);
    inputElement.classList.remove(inputErrorClass);
    errorMessageElement.textContent = '';
    errorMessageElement.classList.remove(errorClass);
}

function checkInputValidity(formElement, inputElement, options) {
    const { inputSelector, submitButtonSelector } = options;
    const submitButton = formElement.querySelector(submitButtonSelector);

    if (!inputElement.validity.valid) {
        return showInputError(formElement, inputElement, options);
    } 
    hideInputError(formElement, inputElement, options);
}

function hasInvalidInput(inputList) {
    return !inputList.every((inputElement) => inputElement.validity.valid);
}

//enableButton
// function enableSubmitButton(submitButton, options) {
//     submitButton.classList.add(inactiveButtonClass);
//     submitButton.enabled = true;
// }

//disableButton
// function disableSubmitButton(submitButton, options) {
//     submitButton.classList.remove(inactiveButtonClass);
//     submitButton.disabled = true;

//     if (hasInvalidInput(inputElements)) {
//         disableSubmitButton();
//         return;
//     }
//     enableSubmitButton();
// }




function toggleButtonState(inputElements, submitButton, {inactiveButtonClass}) {

    if (hasInvalidInput(inputElements)) {
        submitButton.classList.add(inactiveButtonClass);
        submitButton.disabled = true;
        return;
    } 
    submitButton.classList.remove(inactiveButtonClass);
    submitButton.disabled = false;
    
}

function setEventListeners(formElement, options) {
    const {inputSelector, submitButtonSelector} = options;
    const inputElements = [...formElement.querySelectorAll(inputSelector)];
    const submitButton = formElement.querySelector(submitButtonSelector);
    inputElements.forEach((inputElement) => {
        inputElement.addEventListener("input", (e) => {
            checkInputValidity(formElement, inputElement, options);
            toggleButtonState(inputElements, submitButton, options);
        });
    });
}

function enableValidation(options) {
    const formElements = [...document.querySelectorAll(options.formSelector)];
  
    });
}

const config = {
    formSelector: ".modal__form",
    inputSelector: ".modal__input",
    submitButtonSelector: ".modal__button",
    inactiveButtonClass: "modal__button_disabled",
    inputErrorClass: "modal__input_type_error",
    errorClass: "modal__error_visible"
};

enableValidation(config);