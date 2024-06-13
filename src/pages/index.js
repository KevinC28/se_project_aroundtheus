import { initialCards, config } from "../utils/constants.js"; 
import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import Section from "../components/Section.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import UserInfo from "../components/UserInfo.js";
import "./index.css"; 
import Api from "../components/Api.js";

const profileEditModal = document.querySelector("#profile-edit-modal");
const profileEditButton = document.querySelector(".profile__edit-button");
const editFormElement = profileEditModal.querySelector(".modal__form");
const addNewCardButton = document.querySelector(".profile__add-button");
const nameInput = editFormElement.querySelector("#profile-name");
const aboutInput = editFormElement.querySelector("#profile-about");

const api = new Api({
  baseUrl: "https://around-api.en.tripleten-services.com/v1",
  headers: {
    authorization: "2aa48a9b-dea9-44fc-a8a9-fa17b5150cea",
    "Content-Type": "application/json"
  }
});

let deleteCardId = '';
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
  popupSelector: "#delete-modal",
  handleDeleteSubmit: handleDeleteConfirmation
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

function getCardElement({id, name, link }) {
  const card = new Card({id, name, link }, "#card-template", handlePopupImage, handleDeleteConfirmation, handleLikeButton);
  const cardElement = card.getView();
  cardElement.setAttribute('id', `card-${id}`); // Set the id attribute
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
     
  const card = getCardElement({name: title , link: url });
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

// Delete Card

function handleDeleteConfirmation() {
  const cardId = deleteCardId.getAttribute('id');
  api.deleteCard(cardId)
   .then(() => {
      deleteCardId.remove();
      deleteConfirmationPopup.close();
    })
   .catch((error) => {
      console.error(error);
    });
}

document.addEventListener('click', event => {
  if (event.target.matches('.card__delete-button')) {
    const cardElement = event.target.closest(".card");
    deleteCardId = cardElement;
    deleteConfirmationPopup.open();
  }
});

// Like/Dislike

function handleLikeButton(likeButton, likedStatus, cardId) {
  if (likedStatus) {
    api.removeLike(cardId)
    .then(() => {
      likeButton.classList.remove('card__like-button_active');
    })
    .catch((error) => {
      console.error("Error removing like", error);
    });
  } else {
    api.addLike(cardId)
    .then(() => {
      likeButton.classList.add('card__like-button_active');
    })
  }
}