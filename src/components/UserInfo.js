export default class UserInfo {
  constructor({ nameSelector, jobSelector }) {
    this._name = document.querySelector('#profile-title');
    this._description = document.querySelector('#profile-description');
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
}
