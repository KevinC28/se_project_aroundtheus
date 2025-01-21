export default class UserInfo {
  constructor({ nameSelector, aboutSelector, avatarSelector }) {
    this._nameSelector = document.querySelector(nameSelector);
    this._aboutSelector = document.querySelector(aboutSelector);
    this._avatarSelector = document.querySelector(avatarSelector);
  }

  getUserInfo() {
    return {
      title: this._nameSelector.textContent,
      about: this._aboutSelector.textContent,
    };
  }

  setUserInfo(userInfo) { // Updated to accept userInfo parameter
    this._nameSelector.textContent = userInfo.name;
    this._aboutSelector.textContent = userInfo.about;
  }

  updateAvatarImage(image) {
    if (image.avatar) {
      this._avatarSelector.src = image.avatar;
    }
  }
}
