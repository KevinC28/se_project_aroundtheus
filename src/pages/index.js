import { initialCards, config } from "../utils/constants.js";
import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import Section from "../components/Section.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import UserInfo from "../components/UserInfo.js";
import Popup from "../components/Popup.js";
// import "../pages/index.css";

// const nameSelector = '.profile__title';
// const jobSelector = '.profile__description';
const profileForm = document.querySelector(".modal__form");
const cardTemplate =
  document.querySelector("#card-template").content.firstElementChild;
const cardListEl = document.querySelector(".cards__list");

const profileEditModal = document.querySelector("#profile-edit-modal");
const profileEditButton = document.querySelector(".profile__edit-button");
const addCardModal = document.querySelector("#add-card-modal");
const addCardFormElement = addCardModal.querySelector(".modal__form");
const cardsWrap = document.querySelector(".cards__list");
const editFormElement = profileEditModal.querySelector(".modal__form");
const popupWithImage = document.querySelector("#preview-image");
const addNewCardButton = document.querySelector(".profile__add-button");
const profileTitle = document.querySelector("#profile-title");
const profileDescription = document.querySelector("#profile-description");
const popupImage = popupWithImage.querySelector(".modal__image");
const popupImageTitle = popupWithImage.querySelector(".modal__image-name");
const nameInput = editFormElement.querySelector("#profile-name");
const jobInput = editFormElement.querySelector("#profile-about");
const cardTitleInput = addCardFormElement.querySelector("#profile-name");
const cardUrlInput = addCardFormElement.querySelector("#profile-about");
const profileTitleInput = document.querySelector("#profile-name");
const profileDescriptionInput = document.querySelector("#profile-about");
const closeButtons = document.querySelectorAll(".modal__close");
const modals = document.querySelectorAll(".modal");
const ESC_KEYCODE = 27;

const mySection = new Section(
  { items: [], renderer: () => {} },
  ".cards__list"
);
const theUserInfo = new UserInfo({
  nameSelector: "#profile__title",
  jobSelector: "#profile__description",
});
const newPopupWithImage = new PopupWithImage({
  popupSelector: "#preview-image",
});
const newPopupWithForm = new PopupWithForm({ popupSelector: ".modal__form" });

const addCardModalPopup = new Popup({ popupSelector: "#add-card-modal" });
const profileEditModalPopup = new Popup({ popupSelector: "#profile-edit-modal" });


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
  profileEditModalPopup.close();
}

function handleAddCardFormSubmit(e) {
  e.preventDefault();
  const name = cardTitleInput.value;
  const link = cardUrlInput.value;
  const cardElement = getCardElement({ name, link });
  cardsWrap.prepend(cardElement);
  addCardModalPopup.close();
  e.target.reset();
}

function openAddCardModal() {
  addCardModalPopup.open();
}

function openEditModal() {
  profileEditModalPopup.open();
}


addNewCardButton.addEventListener("click", () => openAddCardModal(Popup));
profileEditButton.addEventListener("click", () => openEditModal(Popup));


function handlepopupImage(imageData) {
  newPopupWithImage.open({ name: imageData.name, link: imageData.link });
  // popupImage.src = imageData.link;
  // popupImage.alt = imageData.name;
  // popupImageTitle.textContent = imageData.name;
  // popupWithImage.open();
}

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

editFormElement.addEventListener("submit", handleProfileEditSubmit);
addCardFormElement.addEventListener("submit", handleAddCardFormSubmit);

function handleProfileEditButtonClick() {
  const { name, job } = theUserInfo.getUserInfo();
  nameInput.value = name;
  jobInput.value = job;
  profileEditModal.open();
}



closeButtons.forEach((button) => {
  const popup = new Popup({ popupSelector: `#${button.closest(".modal").id}` });
  button.addEventListener("click", () => popup.close());
});

modals.forEach((modal) => {
  const popup = new Popup({ popupSelector: `#${modal.id}` });
  modal.addEventListener("mousedown", (e) => {
    if (e.target === modal) {
      popup.close();
    }
  });
});

initialCards.forEach((cardData) => {
  const cardElement = getCardElement(cardData);
  cardsWrap.prepend(cardElement);
});
