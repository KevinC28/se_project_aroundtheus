class Card {
  constructor({ name, link }, cardSelector, handleImagePreview) {
    this._name = name;
    this._link = link;
    this._cardSelector = cardSelector;
    this._handleImagePreview = () =>
      handleImagePreview({ _link: this._link, _name: this._name });
  }

  _handleLikeButton = () => {
    this._likeButton.classList.toggle("card__like-button_active");
  };

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

  getView() {
    this._cardElement = document
      .querySelector(this._cardSelector)
      .content.querySelector(".card")
      .cloneNode(true);
    this._likeButton = this._cardElement.querySelector(".card__like-button");
    this._deleteButton = this._cardElement.querySelector(
      ".card__delete-button"
    );
    this._cardImage = this._cardElement.querySelector(".card__image");
    this._cardTitle = this._cardElement.querySelector(".card__title");

    this._cardImage.src = this._link;
    this._cardImage.alt = this._name;
    this._cardTitle.textContent = this._name;

    this.setEventListeners();
    return this._cardElement;
  }
}

export default Card;
