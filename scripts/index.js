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
const cardListEl = document.querySelector('.cards__list');
const profileEditModal = document.querySelector('#profile-edit-modal');
const profileEditForm = profileEditModal.querySelector('.modal__form');

// Buttons and other DOM nodes
const profileEditButton = document.querySelector('#profile-edit-button');
const profileTitle = document.querySelector('#profile-title');
const profileDescription = document.querySelector('#profile-description');
const profileCloseButton = profileEditModal.querySelector('.modal__close');

//Form data


// Elements




const profileTitleInput = document.querySelector('#profile-title-input');
const profileDescriptionInput = document.querySelector('#profile-description-input');





// Functions
function closePopup() {
    profileEditModal.classList.remove('modal_opened');
}

function getCardElement(cardData) {
    const cardElement = cardTemplate.cloneNode(true);
    const cardImageEl = cardElement.querySelector('.cards__list-image');
    const cardTitleEl = cardElement.querySelector('.cards__list-title');

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
    closePopup();
}

// Event Listeners
profileEditButton.addEventListener('click', () => {
    profileTitleInput.value = profileTitle.textContent;
    profileDescriptionInput.value = profileDescription.textContent;

    profileEditModal.classList.add('modal_opened');
});

profileCloseButton.addEventListener('click',closePopup);

profileEditForm.addEventListener('submit', handleProfileEditSubmit);

initialCards.forEach((cardData) => {
    const cardElement = getCardElement(cardData);
    cardListEl.prepend(cardElement);
});

//for loop that inserts a card
initialCards.forEach((cardData) => {
    cardsWrap.prepend(getCardElement(cardData));
})