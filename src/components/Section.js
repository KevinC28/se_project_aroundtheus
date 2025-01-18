class Section {
    constructor({ items, renderer }, containerSelector) {
        this._renderedItems = items;
        this._renderer = renderer;
        this._container = document.querySelector(containerSelector);
    }

<<<<<<< HEAD
    clear() {
        this._container.innerHTML = '';
    }

    renderItems() {
        console.log(this._container);
        
        this.clear();
        this._renderedItems.forEach(this._renderer)
=======
    renderItems(items) {
        items.forEach((item) => this._renderer(item));
        // this._renderedItems.forEach(this._renderer)
>>>>>>> fbd6a4dbcd572411004eaad789201922aea762d1
    }

    addItem(element) {
        this._container.prepend(element);
    }
}

export default Section;