import Card from "./Card.js";

const initialCards = [
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

const cardData =  {
    name: "Yosemite Valley",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/yosemite.jpg",
}

const card = new Card(cardData, "#card-template");
card.getView();


const cardTemplate = document.querySelector('#card-template').content.firstElementChild;

// Wrappers
const cardsWrap = document.querySelector('.cards__list');
const profileEditModal = document.querySelector('#profile-edit-modal');
const addCardModal = document.querySelector('#add-card-modal');
const profileFormElement = profileEditModal.querySelector('.modal__form');
const addCardFormElement = addCardModal.querySelector('.modal__form');
const previewImageModal = document.querySelector('#preview-image');

// Buttons
const profileEditButton = document.querySelector('.profile__edit-button');
const profileModalCloseButton = profileEditModal.querySelector('.modal__close');
const addNewCardModalCloseButton = addCardModal.querySelector('.modal__close');
const addNewCardButton = document.querySelector('.profile__add-button');
const previewImageCloseButton = previewImageModal.querySelector('.modal__close');

// title and description
const profileTitle = document.querySelector('#profile-title');
const profileDescription = document.querySelector('#profile-description');
const previewImage = previewImageModal.querySelector('.modal__image');
const previewImageTitle = previewImageModal.querySelector('.modal__image-name');


//Form data
const nameInput = profileFormElement.querySelector('#profile-name');
const jobInput = profileFormElement.querySelector('#profile-about');
const cardTitleInput = addCardFormElement.querySelector('#profile-name');
const cardUrlInput = addCardFormElement.querySelector('#profile-about');

function openModal(modal) {
    modal.classList.add("modal_opened");
    document.addEventListener('keydown', handleModalKeyDown);
}

function closeModal() {
    document.querySelector('.modal_opened').classList.remove('modal_opened');
    document.removeEventListener('keydown', handleModalKeyDown);
}


function renderCard(cardData) {
    const cardElement = getCardElement(cardData);
    cardsWrap.prepend(cardElement);
}

const profileTitleInput = document.querySelector('#profile-name');
const profileDescriptionInput = document.querySelector('#profile-about'); 





// Functions

function getCardElement(cardData) {
    const cardElement = cardTemplate.cloneNode(true);
    const cardImageEl = cardElement.querySelector('.card__image');
    const cardTitleEl = cardElement.querySelector('.card__title');
    const likeButton = cardElement.querySelector('.card__like-button');
    // const deleteButton = cardElement.querySelector('.card__delete-button');

    likeButton.addEventListener('click', () => {
        likeButton.classList.toggle('card__like-button_active');
    });
    // deleteButton.addEventListener('click', () => {
    //     cardsWrap.removeChild(cardElement);
    //     cardElement.remove();
    // });


    cardImageEl.addEventListener('click', () => {
        openModal(previewImageModal);
        previewImage.src = cardData.link;
        previewImage.alt = cardData.name;
        previewImageTitle.textContent = cardData.name;

    });

    cardTitleEl.textContent = cardData.name;
    cardImageEl.setAttribute('src', cardData.link);
    cardImageEl.setAttribute('alt', cardData.name);

    
    return cardElement;
}

function handleProfileEditSubmit(e) {
    e.preventDefault();
    profileTitle.textContent = profileTitleInput.value;
    profileDescription.textContent = profileDescriptionInput.value;
    closeModal(profileEditModal);
    e.target.reset();
}

function handleAddCardFormSubmit(e) {
    e.preventDefault();
    const name = cardTitleInput.value;
    const link = cardUrlInput.value;
    renderCard({name, link}, cardsWrap);
    closeModal(addCardModal);
    e.target.reset();
}

// Form Listeners
profileFormElement.addEventListener('submit', handleProfileEditSubmit);
addCardFormElement.addEventListener('submit', handleAddCardFormSubmit);

profileEditButton.addEventListener('click', () => {
    nameInput.value = profileTitle.textContent;
    jobInput.value = profileDescription.textContent;
    openModal(profileEditModal);
});

profileModalCloseButton.addEventListener('click', () => closeModal(profileEditModal));
previewImageCloseButton.addEventListener('click', () => closeModal(previewImageModal));
addNewCardButton.addEventListener('click', () => openModal(addCardModal));
addNewCardModalCloseButton.addEventListener('click', () => closeModal(addCardModal));

// for loop that inserts a card
initialCards.forEach((cardData) => renderCard(cardData));


// Overlay
const modals = document.querySelectorAll('.modal');

// Close modal by pressing escape key
function handleModalKeyDown(e) {
    if (e.key === "Escape") {
        closeModal(openModal);
    }
}


// Close modal by clicking on overlay
modals.forEach((modal) => {
    modal.addEventListener('mousedown', (e) => {
        if (e.target === modal) {
            closeModal(modal);
        }
    });
});
