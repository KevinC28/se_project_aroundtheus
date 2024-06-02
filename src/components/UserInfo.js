export default class UserInfo {
  constructor({ nameSelector, aboutSelector, avatarSelector }) {
    this._nameSelector = nameSelector;
    this._aboutSelector = aboutSelector;
    this._name = document.querySelector(this._nameSelector);
    this._about = document.querySelector(this._aboutSelector);
    this._avatarSelector = avatarSelector;
    this._avatar = document.querySelector(avatarSelector);
  }

  getUserInfo() {
    return {
      name: this._name.textContent,
      about: this._about.textContent,
    };
  }

  setUserInfo({ name, about }) {
     if (this._name) this._name.textContent = name;
     if (this._about) this._about.textContent = about;
  }

  setUserAvatar(avatar) {
      if (this._avatar && avatar) {
        this._avatar.src = avatar;
    }
  }
}
