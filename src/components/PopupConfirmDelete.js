import Popup from "./Popup";

export default class PopupConfirmDelete extends Popup {
    constructor(popupSelector) {
        super( popupSelector );
        this._deleteCard = this._popupElement;
        this._formElement = this._deleteCard.querySelector(".modal__form");
    }
    setSubmitAction(submitAction) {
        this._submitAction = submitAction;
    }
    setEventListeners() {
        this._formElement.addEventListener("submit", (evt) => {
            evt.preventDefault();
            if (this._submitAction) {
                this._submitAction();
            }
        });
        super.setEventListeners();
    }
}