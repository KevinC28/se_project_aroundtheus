export default class Card {
  constructor(
    { name, link, _id, isLiked }, 
    cardSelector, 
    handleImagePreview,
    handleCardDelete,
    handleLikeCard
    ) {
    this._name = name;
    this._link = link;
    this.id = _id;
    this.isLiked = isLiked;
    this._cardSelector = cardSelector;
    this._handleImagePreview = handleImagePreview;
    this._handleCardDelete = handleCardDelete;
    this._handleLikeCard = handleLikeCard;
  }

  _getTemplate() {
    return document.querySelector(this._cardSelector)
    .content.querySelector(".card")
    .cloneNode(true);

  }

  setEventListeners() {
    this._likeButton.addEventListener("click", this._handleLikeButton);
    this._deleteButton.addEventListener("click", this._handleDeleteCard); // Fix: Use _handleDeleteCard instead of _handleDeleteButton
    this._cardImage.addEventListener("click", () => {
      this._handleImagePreview();
    });
  }

  _handleDeleteCard = (e) => {
    this._cardElement.remove();
    this._cardElement = null;
  };

  updateLike(isLiked) {
    if (isLiked) {
      this._likeButton.classList.add("card__like-button_active");
    } else {
      this._likeButton.classList.remove("card__like-button_active");
    }
    this.isLiked = isLiked;
  }

  getView() {
    this._cardElement = this._getTemplate();
    this._cardElement.querySelector(".card__title").textContent = this._name;
    this._likeButton = this._cardElement.querySelector(".card__like-button");
    if (this.isLiked) {
      this._likeButton.toggle(".card__like-button_active");
    }
    this._deleteButton = this._cardElement.querySelector(".card__delete-button");
    this._cardImage = this._cardElement.querySelector(".card__image");
    this._cardImage.src = this._link;
    this._cardImage.alt = this._name;

    this.setEventListeners();

    return this._cardElement;
  }
}