export class Popup {
    constructor({ popupSelector }) {
        this._popupElement = document.querySelector(popupSelector);
        // this._handleEscClose = this._handleEscClose.bind(this);
    }

    open() {
        this._popupElement.classList.add("modal_opened");
        document.addEventListener("keyup", this._handleEscUp);
    }

    close() {
        this._popupElement.classList.remove("modal_opened");
        document.removeEventListener("keyup", this._handleEscUp);
    }

    _handleEscUp = (e) => {
        e.preventDefault();
        this._isEscEvent(e, this.close);
    }

    setEventListeners() {
        this._popupElement.querySelector(".modal__close").addEventListener("click", this.close);
        this._popupElement.addEventListener("mousedown", (e) => {
            if (e.target === this._popupElement) {
                this.close();
            }
        });
    }
}