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
const cardTemplate = document.querySelector("#card-template").content.firstElementChild;
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
const cardTitleInput = addCardFormElement.querySelector("#card-name");
const cardUrlInput = addCardFormElement.querySelector("#card-about");
const profileTitleInput = document.querySelector("#profile-name");
const profileDescriptionInput = document.querySelector("#profile-about");
const closeButtons = document.querySelectorAll(".modal__close");
const modals = document.querySelectorAll(".modal");
const ESC_KEYCODE = 27;

const mySection = new Section(
 { items: initialCards, 
  renderer: (cardData) => {
    const card = getCardElement(cardData);
    mySection.addItem(card.getView());
  }}, ".cards__list"
);

const theUserInfo = new UserInfo({
  nameSelector: "#profile__title",
  jobSelector: "#profile__description",
});
const thePopupWithImage = new PopupWithImage({
  popupSelector: "#preview-image",
});

const addCardModalPopup = new PopupWithForm({ 
  popupSelector: "#add-card-modal",
  handleFormSubmit: handleAddCardFormSubmit
});
const profileEditModalPopup = new PopupWithForm({ 
  popupSelector: "#profile-edit-modal",
  handleFormSubmit: handleProfileEditSubmit
});


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
  // return new Card(cardData, "#card-template", handlePopupImage).getView();
  const card = new Card(cardData, "#card-template", handlePopupImage);
  
  return card;
}

function handleProfileEditSubmit(userData) {
  theUserInfo.setUserInfo(userData);
  profileEditModalPopup.close();
}

function handleAddCardFormSubmit({ title, url}) {
  const card = getCardElement({ name: title, link: url });
  mySection.addItem(card.getView());
  addCardModalPopup.close();
}

function openAddCardModal() {
  addCardModalPopup.open();
}

function openEditModal() {
  profileEditModalPopup.open();
}


addNewCardButton.addEventListener("click", openAddCardModal);
profileEditButton.addEventListener("click", handleProfileEditButtonClick);

function handlePopupImage(imageData) {
  thePopupWithImage.open({ name: imageData.name, link: imageData.link });
}

function handleProfileEditButtonClick() {
  const { name, job } = theUserInfo.getUserInfo();
  nameInput.value = name;
  jobInput.value = job;
  profileEditModalPopup.open();
}

mySection.renderItems();