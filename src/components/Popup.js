export default class Popup {
    constructor({ popupSelector}) {
        this._popupElement = document.querySelector(popupSelector);
        this._handleEscclose = this._handleEscape.bind(this);
    }

    open() {
<<<<<<< HEAD
        this._popupElement.classList.add("modal_opened");
        document.addEventListener("keyup", this._handleEscUp);
        // this._closeButton.addEventListener("click", this.close);
        this._popupElement.addEventListener("mousedown", this._handleOverlayClick);
=======
        this._popupElement.classList.add('modal_opened');
        document.addEventListener('keydown', this._handleEscclose);
>>>>>>> fbd6a4dbcd572411004eaad789201922aea762d1
    }

    close() {
        this._popupElement.classList.remove('modal_opened');
        document.removeEventListener('keydown', this._handleEscclose);
    }

    _handleEscape(evt) {
        if (evt.key === 'Escape') {
            this.close();
        }
    }
<<<<<<< HEAD
    
    close() {
        this._popupElement.classList.remove("modal_opened");
        document.removeEventListener("keyup", this._handleEscUp);
        // this._closeButton.removeEventListener("click", this.close);
        this._popupElement.removeEventListener("mousedown", this._handleOverlayClick);
    }
}
=======

    setEventListeners() {
        this._popupElement.addEventListener("mousedown", (evt) => {
            if (evt.target.classList.contains("modal") ||
            evt.target.classList.contains("modal__close-button")) {
                this.close();
                }
            });
        }
    }
>>>>>>> fbd6a4dbcd572411004eaad789201922aea762d1
