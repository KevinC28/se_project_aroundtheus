import { initialCards, config } from "../utils/constants.js"; 
import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import Section from "../components/Section.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import UserInfo from "../components/UserInfo.js";
import "./index.css"; 
import Api from "../components/Api.js";

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
const aboutInput = editFormElement.querySelector("#profile-about");
const cardTitleInput = addCardFormElement.querySelector("#card-name");
const cardUrlInput = addCardFormElement.querySelector("#card-about");
const profileTitleInput = document.querySelector("#profile-name");
const profileDescriptionInput = document.querySelector("#profile-about");
const closeButtons = document.querySelectorAll(".modal__close");
const modals = document.querySelectorAll(".modal");

const api = new Api({
  baseUrl: "https://around-api.en.tripleten-services.com/v1",
  headers: {
    authorization: "2aa48a9b-dea9-44fc-a8a9-fa17b5150cea",
    "Content-Type": "application/json"
  }
});

let mySection;
let theUserInfo;

document.addEventListener('DOMContentLoaded', () => {
  Promise.all([api.getInitialCards(), api.getUserInfo()])
    .then(([cardData, userData]) => { // Corrected the order here
      theUserInfo = new UserInfo({
          nameSelector: "#profile-title",
          aboutSelector: "#profile-description",
          avatarSelector: "#profile__image"
      });
      theUserInfo.setUserInfo(userData);
      theUserInfo.setUserAvatar(userData.avatar);
      
      mySection = new Section ({
        items: initialCards,
        renderer: (item) => {
          const card = getCardElement(item);
          mySection.addItem(card.getView());
        }
      },
      ".cards__list");
      mySection.renderItems(cardData); // Now cardData should be an array

      profileEditButton.addEventListener("click", handleProfileEditButtonClick);
      })
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
const deleteConfirmationPopup = new PopupWithForm({
  popupSelector: "#delete-button",
  handleFormSubmit: handleDeleteConfirmation
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

// function handleDeleteButtonClick(event) {
//   const cardElement = event.target.closest(".card");
//   const deleteButton = cardElement.querySelector(".card__delete-button");
//   deleteButton.addEventListener("click", () => {
//     cardToDelete = cardElement;
//     deleteConfirmationPopup.open();
//   });
// }

function handleDeleteButtonClick(event) {
  // Get the card element
  const cardElement = event.target.closest(".card");
  // Store the card to be deleted in a variable accessible to handleDeleteConfirmation
  cardToDelete = cardElement;
  // Open the delete confirmation popup
  deleteConfirmationPopup.open();
}

function handleDeleteConfirmation() {
  cardToDelete.remove();
  deleteConfirmationPopup.close();
}

enableValidation(config);

function getCardElement(cardData) {
  const card = new Card(cardData, "#card-template", handlePopupImage);
  const cardElement = card.getView();

  const deleteButton = cardElement.querySelector(".card__delete-button");
  deleteButton.addEventListener("click", handleDeleteButtonClick);

  return card;
}

function handleProfileEditSubmit(userData) {
  api.updateUserInfo(userData.name, userData.about)
    .then((updatedUserInfo) => {
      theUserInfo.setUserInfo(updatedUserInfo);
      profileEditModalPopup.close();
    })
    .catch((error) => {
      console.error(error);
    });
}

function handleAddCardFormSubmit({ title, url}) {
  api.addNewCard({ name: title, link: url })
    .then((newCard) => {
     
  const card = getCardElement(newCard);
  mySection.addItem(card.getView());
  addCardModalPopup.close();
  })
  .catch((error) => {
    console.error(error);
  });
}


function openAddCardModal() {
  addCardModalPopup.open();
}

function openEditModal() {
  profileEditModalPopup.open();
}


addNewCardButton.addEventListener("click", openAddCardModal);

function handlePopupImage(imageData) {
  thePopupWithImage.open({ name: imageData.name, link: imageData.link });
}

function handleProfileEditButtonClick() {
  const { name, about } = theUserInfo.getUserInfo();
  nameInput.value = name;
  aboutInput.value = about;
  profileEditModalPopup.open();
}
