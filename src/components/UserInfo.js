export default class UserInfo {
  constructor({ nameSelector, aboutSelector, avatarSelector }) {
    this._nameSelector = nameSelector;
    this._aboutSelector = aboutSelector;
    this._avatarSelector = avatarSelector;
  }

  getUserInfo() {
    this._name = document.querySelector(this._nameSelector);
    this._about = document.querySelector(this._aboutSelector);
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
    this._avatar = document.querySelector(this._avatarSelector);
      if (this._avatar && avatar) {
        this._avatar.src = avatar;
    }
  }
}
