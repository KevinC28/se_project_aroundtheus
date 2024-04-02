export default class Popup {
    constructor({ popupSelector }) {
        this._popupElement = document.querySelector(popupSelector);
        this._closeButton = this._popupElement.querySelector(".modal__close");
        this.close = this.close.bind(this);
        this._handleEscUp = this._handleEscUp.bind(this);
        this._handleOverlayClick = this._handleOverlayClick.bind(this);
    }

    open() {
        this._popupElement.classList.add("modal_opened");
        document.addEventListener("keyup", this._handleEscUp);
        this._closeButton.addEventListener("click", this.close);
        this._popupElement.addEventListener("mousedown", this._handleOverlayClick);
    }

    _isEscEvent = (e, action) => {
        if (e.key === 'Escape') {
          action();
        }
      }
    
    _handleEscUp = (e) => {
        e.preventDefault();
        this._isEscEvent(e, this.close);
    }

    _handleOverlayClick(e) {
        if (e.target === this._popupElement) {
            this.close();
        }
    }
    
    close() {
        this._popupElement.classList.remove("modal_opened");
        document.removeEventListener("keyup", this._handleEscUp);
        this._closeButton.removeEventListener("click", this.close);
        this._popupElement.removeEventListener("mousedown", this._handleOverlayClick);
    }
}