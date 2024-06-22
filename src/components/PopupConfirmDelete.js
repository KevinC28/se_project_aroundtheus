import Popup from "./Popup";

class PopupConfirmDelete extends Popup {

    setSubmitAction(action) {
        this.submitCallback = action;
    }

    setEventListeners() {
        super.setEventListeners();
        this._popupForm.addEventListener("submit", (event) => {
            event.preventDefault();
            this.submitCallback();
        });
    }
}

export default PopupConfirmDelete;