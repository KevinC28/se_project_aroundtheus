import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import "./index.css"; 
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import Section from "../components/Section.js";
import UserInfo from "../components/UserInfo.js";
import PopupConfirmDelete from "../components/PopupConfirmDelete.js";
import Api from "../components/Api.js";
import {
  addNewCardButton,
  profileEditButton,
  addCardFormElement,
  editFormElement,
  profileFormElement,
  newCardTitleInput,
  newCardUrlInput,
  cardSelector,
  config,
} from "../utils/constants.js";



const sectionCards = new Section(
  {
    renderer: (cardData) => {
      const cardElement = createCard(cardData);
      cardSection.addItem(cardElement);
    },
  },
  ".cards__list"
);

const addCardModalPopup = new PopupWithForm(
  "#add-card-modal",
  handleAddCardFormSubmit
);

const profilePicturePopup = new PopupWithForm (
  "#profile-picture-modal",
  handleProfilePicSubmit
);

const profileEditModalPopup = new PopupWithForm(
  "#profile-edit-modal",
  handleProfileEditSubmit
);

addCardModalPopup.setEventListeners();
profilePicturePopup.setEventListeners();
profileEditModalPopup.setEventListeners();

const previewImagePopup = new PopupWithImage("#preview-image");

previewImagePopup.setEventListeners();

const userInformation = new UserInfo({
  nameSelector: ".profile__title",
  aboutSelector: ".profile__description",
  avatarSelector: ".profile__image",
});

const confirmDelete = new PopupConfirmDelete("delete-card-modal");

confirmDelete.setEventListeners();

const api = new Api({
  baseUrl: "https://around-api.en.tripleten-services.com/v1",
  headers: {
    authorization: "2aa48a9b-dea9-44fc-a8a9-fa17b5150cea",
    "Content-Type": "application/json",
  },
});

api.getUserInfoAndCards()
.then(({ userInfo, cards }) => {
  userInformation.setUserInfo({
  name: userInfo.name,
  about: userInfo.about,
});
userInformation.updateAvatarImage({ avatar: userInfo.avatar });
sectionCards.renderItems(cards);
})
.catch((err) => {
  console.error("User information or card failed to load:", err);
  alert("Please try again. Unable to load user information or card.")
});

const profilePictureEditButton = document.querySelector(".profile__edit-button");
profilePictureEditButton.addEventListener("click", () => {
  profilePicturePopup.open();
});

function handleProfileEditSubmit(inputData) {
  api
    .updateUserInfo({
      name: inputData.name,
      about: inputData.about,
    })
    .then(() => {
      userInformation.setUserInfo(inputData);
      profileEditModalPopup.close();
      profileEditForm.reset();
    })
    .catch((error) => {
      console.error("Error updating user profile", error);
      alert("Please try again. Unable to update user profile.");
    });
}

function createCard(item) {
  const card = new Card(
    item,
    cardSelector,
    handlePreviewImage,
    (cardId, card) => {
      deleteCard(cardId, card);
    },
    (cardId, card) => {
      handleLikeCard(cardId, card);
    }
  );
  return card.getView();
}

function handleLikeCard(card) {
  if (!card.isLiked) {
    api.addLike(card.id)
    .then(() => {
      card.updateLike(true);
    })
    .catch((error) => {
      console.error("Error adding like", error);
    });
  } else {
    api.dislikeCard(cardId)
    .then(() => {
      card.updateLike(false);
    })
    .catch((error) => console.error("Error removing like from card", err));
  }
}

const editFormValidator = new FormValidator(config, profileEditForm);
const addCardFormValidator = new FormValidator(config, addCardForm);
const avatarFormValidator = new FormValidator(config, avatarFormValidator);

editFormValidator.enableValidation();
addCardFormValidator.enableValidation();
avatarFormValidator.enableValidation();

function handlePreviewImage(cardData) {
  previewImagePopup.open(cardData);
}

function deleteCard(cardId, card) {
  deleteConfirmation.setSubmitAction(() => {
    api
    .handleDeleteCard(cardId)
    .then(() => {
      card.handleDeleteCard();
      deleteConfirmation.close();
    })
    .catch((error) => console.error("Error deleting card", err));
  });
  deleteConfirmation.open();
  }

function handleProfilePicSubmit(inputData) {
  api.updateAvatarUser({ avatar: inputData.avatar })
  .then(() => {
    userInformation.updateAvatarImage({ avatar: inputData.avatar });
    profilePicturePopup.close();
    profile
    profileFormElement.reset();
    })
    .catch((err) => {
      console.error("Error updating avatar", err);
      alert("Error updating avatar. Please try again.");
    })
}

function handleAddCardFormSubmit(inputValues) {
  api
    .addCard({
      name: inputValues.title,
      link: inputValues.url,
    })
    .then((cardData) => {
      sectionCards.addItem(createCard(cardData));
      addCardModalPopup.close();
      addCardFormElement.reset();
      addCardFormValidator.resetValidation();
    })
    .catch((error) => {
      console.error("Error adding card", error);
      alert("Please try again. Unable to add card.");
    });
}

profileEditButton.addEventListener("click", () => {
  const currentUserInfo = userInformation.getUserInfo();
  nameInput.value = currentUserInfo.title;
  aboutInput.value = currentUserInfo.description;
  profileEditModalPopup.open();
});

addNewCardButton.addEventListener("click", () => {
  addCardModalPopup.open();
});