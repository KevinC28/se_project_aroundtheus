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

//Profile
export const profileTitle = document.querySelector(".profile__title");
export const profileDescription = document.querySelector(".profile__description");
export const profileEditModal = document.querySelector("#profile-edit-modal");
export const profileImage = document.querySelector(".profile__image");
export const profilePictureUrl = document.querySelector("#profile-input-url");
export const nameInput = document.querySelector("#profile-name");
export const aboutInput = document.querySelector("#profile-about");

//Card
export const cardWrap = document.querySelector(".cards__list");
export const template = document.querySelector("#card-template").content.firstElementChild;
export const cardDelete = document.querySelector(".card__delete-button");

export const addNewCardModal = document.querySelector("#add-card-modal");
export const newCardTitleInput = document.querySelector("#card-input-title");
export const newCardUrlInput = document.querySelector("#card-input-about");

//Preview
export const openPreviewImageDescription = document.querySelector(".preview__description");
export const openPreviewImage = document.querySelector("#modal-preview-image");

//Buttons
export const profileEditButton = document.querySelector(".profile__edit-button");
export const profileEditClose = profileEditModal.querySelector("#profile-modal-close");
export const addNewCardButton = document.querySelector(".profile__add-button");
export const newCardModalClose = addNewCardModal.querySelector("#modal-card-close");
export const openPreviewClose = document.querySelector("#open-preview-close");
export const deletePictureClose = document.querySelector("#delete-picture-close");
export const editPictureClose = document.querySelector("#picture-edit-close");
export const deleteImage = document.querySelector("#delete-modal");

export const cardSelector = "#card-template";