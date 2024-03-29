export const initialCards = [
  {
    name: "Yosemite Valley",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/yosemite.jpg",
  },
  {
    name: "Lake Louise",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/lake-louise.jpg",
  },
  {
    name: "Bald Mountains",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/bald-mountains.jpg",
  },
  {
    name: "Latemar",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/latemar.jpg",
  },
  {
    name: "Vanoise National Park",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/vanoise.jpg",
  },
  {
    name: "Lago di Bries",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/lago.jpg",
  },
];

export const config = {
  formSelector: ".modal__form",
  inputSelector: ".modal__input",
  submitButtonSelector: ".modal__button",
  inactiveButtonClass: "modal__button_disabled",
  inputErrorClass: "modal__input_type_error",
  errorClass: "modal__error_visible",
};

export const profileEditModal = document.querySelector("#profile-edit-modal");
export const profileEditButton = document.querySelector(".profile__edit-button");
export const addCardFormElement = addCardModal.querySelector(".modal__form");
export const cardsWrap = document.querySelector(".cards__list");
export const addCardModal = document.querySelector("#add-card-modal");
export const editFormElement = profileEditModal.querySelector(".modal__form");
export const popupImageModal = document.querySelector("#preview-image");
export const addNewCardButton = document.querySelector(".profile__add-button");
export const profileTitle = document.querySelector("#profile-title");
export const profileDescription = document.querySelector("#profile-description");
export const popupImage = popupImageModal.querySelector(".modal__image");
export const popupImageTitle = popupImageModal.querySelector(".modal__image-name");
export const nameInput = editFormElement.querySelector("#profile-name");
export const jobInput = editFormElement.querySelector("#profile-about");
export const cardTitleInput = addCardFormElement.querySelector("#profile-name");
export const cardUrlInput = addCardFormElement.querySelector("#profile-about");
export const profileTitleInput = document.querySelector("#profile-name");
export const profileDescriptionInput = document.querySelector("#profile-about");
export const closeButtons = document.querySelectorAll(".modal__close");
export const modals = document.querySelectorAll(".modal");
export const ESC_KEYCODE = 27;


