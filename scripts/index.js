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


const cardTemplate = document.querySelector('#card-template').content.firstElementChild;

// Wrappers
const cardsWrap = document.querySelector('.cards__list');
const profileEditModal = document.querySelector('#profile-edit-modal');
const addCardModal = document.querySelector('#add-card-modal');
const profileFormElement = profileEditModal.querySelector('.modal__form');

// Buttons and other DOM nodes
const profileEditButton = document.querySelector('.profile__edit-button');
const profileModalCloseButton = profileEditModal.querySelector('.modal__close');
const addNewCardModalCloseButton = addCardModal.querySelector('.modal__close');
const profileTitle = document.querySelector('#profile-title');
const profileDescription = document.querySelector('#profile-description');
const addNewCardButton = document.querySelector('.profile__add-button');

//Form data
// const nameInput = profileFormElement.querySelector('.modal__input_type_name');
// const jobInput = profileFormElement.querySelector('.modal__form-input_description');


function closeModal (modal) {
    modal.classList.remove('modal_opened');
}

// function openModal () {
//     nameInput.value = profileTitle.textContent;
//     jobInput.value = profileDescription.textContent;

//     profileEditModal.classList.add("modal_is-opened");
// }

function openModal (modal) {
    modal.classList.add("modal_opened");
}






const profileTitleInput = document.querySelector('#profile-title-input');
const profileDescriptionInput = document.querySelector('#profile-description-input');





// Functions

function getCardElement(cardData) {
    const cardElement = cardTemplate.cloneNode(true);
    const cardImageEl = cardElement.querySelector('.card__image');
    const cardTitleEl = cardElement.querySelector('.card__title');

    cardTitleEl.textContent = cardData.name;
    cardImageEl.setAttribute('src', cardData.link);
    cardImageEl.setAttribute('alt', cardData.name);
    
    return cardElement;
}

// Event Handlers
function handleProfileEditSubmit(e) {
    e.preventDefault();
    profileTitle.textContent = profileTitleInput.value;
    profileDescription.textContent = profileDescriptionInput.value;
    closeModal();
}

// Event Listeners
profileEditButton.addEventListener('click', () => {
    profileTitleInput.value = profileTitle.textContent;
    profileDescriptionInput.value = profileDescription.textContent;

    profileEditModal.classList.add('modal_opened');
});

profileFormElement.addEventListener('submit', handleProfileEditSubmit);
profileEditButton.addEventListener('click', () => {
    nameInput.value = profileTitle.textContent;
    jobInput.value = profileDescription.textContent;
    openModal(profileEditModal);
});
profileModalCloseButton.addEventListener('click', () => closeModal(profileEditModal));
//add new card
addNewCardButton.addEventListener('click', () => openModal(addCardModal));
addNewCardModalCloseButton.addEventListener('click', () => closeModal(addCardModal));

//for loop that inserts a card
initialCards.forEach((cardData) => {
    cardsWrap.prepend(getCardElement(cardData));
});



// initialCards.forEach((cardData) => {
//     const cardElement = getCardElement(cardData);
//     cardListEl.prepend(cardElement);
// });