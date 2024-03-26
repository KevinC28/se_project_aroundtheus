export default class UserInfo {
    constructor({ nameSelector, jobSelector }) {
        this._name = document.querySelector(nameSelector);
        this._description = document.querySelector(jobSelector);
    }

    getUserInfo() {
        return {
            name: this._name.textContent,
            job: this._description.textContent,
        };
    }

    setUserInfo({ name, job }) {
        this._name.textContent = name;
        this._description.textContent = job;
    }
}