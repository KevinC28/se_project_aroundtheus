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
const addCardFormElement = addCardModal.querySelector('.modal__form');
const previewImageModal = document.querySelector('#preview-image');

// Buttons and other DOM nodes
const profileEditButton = document.querySelector('.profile__edit-button');
const profileModalCloseButton = profileEditModal.querySelector('.modal__close');
const addNewCardModalCloseButton = addCardModal.querySelector('.modal__close');
const profileTitle = document.querySelector('#profile-title');
const profileDescription = document.querySelector('#profile-description');
const addNewCardButton = document.querySelector('.profile__add-button');
const previewImage = previewImageModal.querySelector('.modal__image');
const previewImageTitle = previewImageModal.querySelector('.modal__image-name');
const previewImageCloseButton = previewImageModal.querySelector('.modal__close');


//Form data
const nameInput = profileFormElement.querySelector('.modal__input_type_name');
const jobInput = profileFormElement.querySelector('.modal__form_input_description');
const cardTitleInput = addCardFormElement.querySelector('.modal__form_title');
const cardUrlInput = addCardFormElement.querySelector('.modal__form_url');

function closeModal (modal) {
    modal.classList.remove('modal_opened');
}
function openModal (modal) {
    modal.classList.add("modal_opened");
}

function renderCard(cardData) {
    const cardElement = getCardElement(cardData);
    cardsWrap.prepend(cardElement);
}

const profileTitleInput = document.querySelector('#profile-title-input');
const profileDescriptionInput = document.querySelector('#profile-description-input'); 





// Functions

function getCardElement(cardData) {
    const cardElement = cardTemplate.cloneNode(true);
    const cardImageEl = cardElement.querySelector('.card__image');
    const cardTitleEl = cardElement.querySelector('.card__title');
    const likeButton = cardElement.querySelector('.card__like-button');
    const deleteButton = cardElement.querySelector('.card__delete-button');

    likeButton.addEventListener('click', () => {
        likeButton.classList.toggle('card__like-button_active');
    });
    deleteButton.addEventListener('click', () => {
        cardsWrap.removeChild(cardElement);
        cardElement.remove();
    });


    cardImageEl.addEventListener('click', () => {
        openModal(previewImageModal);
        previewImage.src = cardData.link;
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
}

function handleAddCardFormSubmit(e) {
    e.preventDefault();
    const name = cardTitleInput.value;
    const link = cardUrlInput.value;
    renderCard({name, link}, cardsWrap);
    closeModal(addCardModal);
}

// Form Listeners
profileFormElement.addEventListener('submit', handleProfileEditSubmit);
addCardFormElement.addEventListener('submit', handleAddCardFormSubmit);
profileEditButton.addEventListener('click', () => {
    profileTitleInput.value = profileTitle.textContent;
    profileDescriptionInput.value = profileDescription.textContent;
    profileEditModal.classList.add('modal_opened');
});


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
