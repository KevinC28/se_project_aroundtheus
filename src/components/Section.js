class Section {
    constructor({ items, renderer }, containerSelector) {
        this._renderedItems = items;
        this._renderer = renderer;
        this._container = document.querySelector(containerSelector);
    }

    clear() {
        this._container.innerHTML = '';
    }

    renderItems() {
        console.log(this._container);
        
        this.clear();
        this._renderedItems.forEach(this._renderer)
    }

    addItem(element) {
        this._container.prepend(element);
    }
}

export default Section;