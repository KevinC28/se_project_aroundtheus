export default class Popup {
    constructor({ popupSelector}) {
        this._popupElement = document.querySelector(popupSelector);
        this._handleEscclose = this._handleEscape.bind(this);
    }

    open() {
        this._popupElement.classList.add('modal_opened');
        document.addEventListener('keydown', this._handleEscclose);
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

    setEventListeners() {
        this._popupElement.addEventListener("mousedown", (evt) => {
            if (evt.target.classList.contains("modal") ||
            evt.target.classList.contains("modal__close-button")) {
                this.close();
                }
            });
        }
    }