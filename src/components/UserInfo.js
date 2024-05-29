export default class UserInfo {
  constructor({ nameSelector, jobSelector, avatarSelector }) {
    this._nameSelector = nameSelector;
    this._descriptionSelector = jobSelector;
    this._avatarSelector = avatarSelector;
    // this._avatar = document.querySelector(avatarSelector);
  }

  getUserInfo() {
    this._name = document.querySelector(nameSelector);
    this._job = document.querySelector(jobSelector);
    return {
      name: this._name.textContent,
      job: this._description.textContent,
    };
  }

  setUserInfo({ name, job }) {
    this._name = document.querySelector(this._nameSelector);
    this._description = document.querySelector(this._descriptionSelector);
     if (this._name) this._name.textContent = name;
     if (this._description) this._description.textContent = job;
  }

  setUserAvatar(avatar) {
    this._avatar = document.querySelector(this._avatarSelector);
      if (this._avatar) this._avatar.src = avatar;
  }
}
