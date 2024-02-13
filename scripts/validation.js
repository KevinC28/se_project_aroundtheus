// enabling validation by calling enableValidation()
// pass all the settings on call

function showInputError(formElement, inputElement, {inputErrorClass, errorClass}) {
    const errorMessageElement = formElement.querySelector(`#${inputElement.id}-error`);
    inputElement.classList.add(inputErrorClass);
    errorMessageElement.textContent = inputElement.validaitonMessage;
    errorMessageElement.classList.add(errorClass);
}
function hideInputError(formElement, inputElement, {inputErrorClass, errorClass}) {
    const errorMessageElement = formElement.querySelector(`#${inputElement.id}-error`);
    inputElement.classList.remove(inputErrorClass);
    errorMessageElement.textContent = '';
    errorMessageElement.classList.remove(errorClass);
}

function checkInputValidity(formElement, inputElement, options) {
    if(!inputElement.validity.valid) {
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
    let foundInvalid = false;


    if (hasInvalidInput(inputElements)) {
        submitButton.classList.add(inactiveButtonClass);
        submitButton.disabled = true;
        return;
    } 
        submitButton.classList.remove(inactiveButtonClass);
        submitButton.disabled = false;
    
}

function setEventListeners(formElement, options) {
    const {inputSelector} = options
    const inputElements = [...formElement.querySelectorAll(inputSelector)];
    const submitButton = formElement.querySelector('.modal__button');
    inputElements.forEach((inputElement) => {
        inputElement.addEventListener("input", (e) => {
        checkInputValidity(formElement, inputElement, options);
        toggleButtonState(inputElements, submitButton, options);
        });
    });
}

function enableValidation(options) {
    const formElements = [...document.querySelectorAll(options.formSelector)];
    formElements.forEach((formElement) => {
        formElement.addEventListener('submit', (e) => {
            e.preventDefault();
        });
        
        setEventListeners(formElement, options);
        // look for all inputs inside of form
        // loop through all the inputs to see if all are valid
            // if input is not valid
            // get validation message
            // add error class to input
            // display error message
            // disable button
            // if all inputs are valid
            // enable button
            // reset error messages
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