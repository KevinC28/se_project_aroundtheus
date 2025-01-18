import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import "./index.css"; 
import * as constants from "../utils/constants"
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import Section from "../components/Section.js";
import UserInfo from "../components/UserInfo.js";
import PopupConfirmDelete from "../components/PopupConfirmDelete.js";
import Api from "../components/Api.js";

// const profileEditModal = document.querySelector("#profile-edit-modal");
// const profileEditButton = document.querySelector(".profile__edit-button");
// const editFormElement = profileEditModal.querySelector(".modal__form");
// const addNewCardButton = document.querySelector(".profile__add-button");
// const nameInput = editFormElement.querySelector("#profile-name");
// const aboutInput = editFormElement.querySelector("#profile-about");
// const deleteCardButton = document.querySelector(".modal__form");

const profileEditForm = document.querySelector("#profile-modal-form");
const addCardForm = document.querySelector("#card-modal-form");
const avatarImgUpdate = document.querySelector("#profile-picture-modal");
const profileNameUpdate = document.querySelector("#profile-edit-modal");

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
  handleProfileEditFormSubmit
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

function handleAddCardFormSubmit(inputValues) {
  api
    .addCard({
      name: inputValues.card__title,
      link: inputValues.card__url,
    })
    .then((card) => {
      sectionCards.addItem(createCard(cardData));
      addCardModalPopup.close();
      addCardForm.reset();
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
})





// const api = new Api({
//   baseUrl: "https://around-api.en.tripleten-services.com/v1",
//   headers: {
//     authorization: "2aa48a9b-dea9-44fc-a8a9-fa17b5150cea",
//     "Content-Type": "application/json"
//   }
// });

// const userInfo = new UserInfo({
//   nameSelector: ".profile__title",
//   aboutSelector: ".profile__description",
// });



// const popupImage = new PopupWithImage({ popupSelector: "#preview-image" });
// popupImage.setEventListeners();




// const profileEditModalPopup = new PopupWithForm({ 
//   popupSelector: "#profile-edit-modal",
//   // editPictureClose
// });
// profileEditModalPopup.setEventListeners();

// //Popup Confirmation
// const deleteConfirmationPopup = new PopupConfirmDelete("#delete-modal");
// document.addEventListener("DOMContentLoaded", () => {
//     deleteConfirmationPopup.setEventListeners();
// });

// api.getInitialCards()
// .then((cards) => {
//   // console.log(cards); 
//   sectionCards.renderItems(cards);
// }).catch((err) => {
//   console.error(err);
// });

// function createCard(cards) {
//   const card = new Card(
//     cards,
//     "#card-template",
//     handlePopupImage,
//     handleDeleteConfirmation,
//     handleLikeButton
//   );
//   return card.generateCard();
// }

// function renderCard(cardData) {
//   const cardElement = createCard(cardData);
//   sectionCards.addItem(cardElement);
// }

// function getCardElement({id, name, link }) {
//   const card = new Card({id, name, link }, "#card-template", handlePopupImage, handleDeleteConfirmation, handleLikeButton);
//   const cardElement = card.getView();
//   cardElement.setAttribute('id', `card-${id}`);
//   return card;
// }

// //Left off here!!!!!!!
// function handleProfileEditSubmit(userData) {


// function handleAddCardFormSubmit({ title, url}) {
//   addCardModalPopup.setLoading(true);
//   api.addNewCard({ name: title, link: url })
//   .then((newCard) => {
//     renderCard(newCard);
//     // addCardFormValidator.disableSubmitButton();
//     addCardModalPopup.close();
//     addCardForm.reset();
//   })
//   .catch((error) => {
//     console.error(error);
//   });
// }

// function openAddCardModal() {
//   addCardModalPopup.open();
// }


// function handlePopupImage(imageData) {
//   thePopupWithImage.open({ name: imageData.name, link: imageData.link });
// }

// function handleProfileEditButtonClick() {
//   const { name, about } = theUserInfo.getUserInfo();
//   nameInput.value = name;
//   aboutInput.value = about;
//   profileEditModalPopup.open();
// }

// // Delete Card

// function handleDeleteConfirmation(card) {
//   deleteConfirmationPopup.open();
//   deleteConfirmationPopup.setSubmitAction(() =>{
//     api.deleteCard(cardId)
//     .then(() => {
//       // deleteCardId.remove();
//       deleteCardId.parentNode.removeChild(deleteCardId);
//       deleteConfirmationPopup.close();
//     })
//     .catch((error) => {
//       console.error(error);
//     });
    
//   })
// }

// function opendeleteConfirmation(cardElement) {
//   deleteCardId = cardElement;
//   deleteConfirmationPopup.open();
// }

// // Like/Dislike

// function handleLikeButton(likeButton, likedStatus, cardId) {
//   if (likedStatus) {
//     api.removeLike(cardId)
//     .then(() => {
//       likeButton.classList.remove('card__like-button_active');
//     })
//     .catch((error) => {
//       console.error("Error removing like", error);
//     });
//   } else {
//     api.addLike(cardId)
//     .then(() => {
//       likeButton.classList.add('card__like-button_active');
//     })
//   }
// }
// const formValidators = {};

// const enableValidation = (config) => {
//   const formList = Array.from(document.querySelectorAll(config.formSelector));
//   formList.forEach((formElement) => {
//     const validator = new FormValidator(config, formElement);
//     const formName = formElement.getAttribute("name");
//     formValidators[formName] = validator;
//     validator.enableValidation();
//   });
// };

// constants.profileEditButton.addEventListener("click", () => {
//   const { name, link } = userInfo.getUserInfo();
//   constants.nameInput.value = name;
//   constants.aboutInput.value = link;
//   profileEditModalPopup.open();
// });

// constants.addNewCardButton.addEventListener("click", () => {
//   addCardModalPopup.open();
// });

// constants.profileImage.addEventListener("click", () => {

// })

// // enableValidation(config);