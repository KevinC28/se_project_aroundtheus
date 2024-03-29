import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import Section from "../components/Section.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import UserInfo from "../components/UserInfo.js";
// import "../pages/index.css";
import * as constants from "../utils/constants.js";

const profileForm = document.querySelector(".modal__form");
const cardTemplate = document.querySelector("#card-template").content.firstElementChild;
const cardListEl = document.querySelector(".cards__list");


addNewCardButton.addEventListener("click", () => openModal(addCardModal));

const formValidators = {};

const enableValidation = (config) => {
  const formList = Array.from(document.querySelectorAll(config.formSelector));
  formList.forEach((formElement) => {
    const validator = new FormValidator(config, formElement);
    const formName = formElement.getAttribute("name");
    formValidators[formName] = validator;
    validator.enableValidation();
  });
};

enableValidation(config);


function getCardElement(cardData) {
  return new Card(cardData, "#card-template", handlepopupImage).getView();
}

function handleProfileEditSubmit(e) {
  e.preventDefault();
  profileTitle.textContent = profileTitleInput.value;
  profileDescription.textContent = profileDescriptionInput.value;
  closeModal(profileEditModal);
}

function handleAddCardFormSubmit(e) {
  e.preventDefault();
  const name = cardTitleInput.value;
  const link = cardUrlInput.value;
  const cardElement = getCardElement({ name, link });
  cardsWrap.prepend(cardElement);
  closeModal(addCardModal);
  e.target.reset();
}

function openModal(modal) {
  modal.classList.add("modal_opened");
  document.addEventListener("keyup", handleEscUp);
}

const closeModal = (modal) => {
  modal.classList.remove("modal_opened");
  document.removeEventListener("keyup", handleEscUp);
};

const handleEscUp = (e) => {
  e.preventDefault();
  isEscEvent(e, closeModal);
};

const isEscEvent = (e, action) => {
  if (e.which === ESC_KEYCODE) {
    const activePreview = document.querySelector(".modal_opened");
    action(activePreview);
  }
};


function handlepopupImage(imageData) {
  openModal(popupImageModal);
  popupImage.src = imageData.link;
  popupImage.alt = imageData.name;
  popupImageTitle.textContent = imageData.name;
}

editFormElement.addEventListener("submit", handleProfileEditSubmit);
addCardFormElement.addEventListener("submit", handleAddCardFormSubmit);

profileEditButton.addEventListener("click", () => {
  nameInput.value = profileTitle.textContent;
  jobInput.value = profileDescription.textContent;
  openModal(profileEditModal);
});

closeButtons.forEach((button) => {
  const popupImage = button.closest(".modal");
  button.addEventListener("click", () => closeModal(popupImage));
});


modals.forEach((modal) => {
  modal.addEventListener("mousedown", (e) => {
    if (e.target === modal) {
      closeModal(modal);
    }
  });
});

initialCards.forEach((cardData) => {
  const cardElement = getCardElement(cardData);
  cardsWrap.prepend(cardElement);
});