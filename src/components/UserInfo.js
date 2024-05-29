export default class UserInfo {
  constructor({ nameSelector, jobSelector, avatarSelector }) {
    this._name = document.querySelector(nameSelector);
    this._description = document.querySelector(jobSelector);
    this._avatar = document.querySelector(avatarSelector);
  }

  getUserInfo() {
    return {
      name: this._name.textContent,
      job: this._description.textContent,
    };
  }

  setUserInfo({ name, job }) {
    this._name.textContent = name;
    this._description.textContent= job;
  }

  setUserAvatar(avatar) {
    this._avatar.src = avatar;
  }
}
