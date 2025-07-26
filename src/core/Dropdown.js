class Dropdown {
    static zIndex = 0;

    constructor(dropdownItemList, description, type = "list") {
        Dropdown.zIndex++;

        this.items = new Map();

        this.dataName = `data-${description}`;
        this.dropdownItemList = dropdownItemList;
        this.currentItemSelected = null;

        this.element = document.createElement("div");
        this.element.classList.add("dropdown");
        this.element.id = `${description.toLowerCase()}-dropdown`;

        this.pElement = document.createElement("p");
        this.pElement.textContent = `${description.charAt(0).toUpperCase()}${description.slice(1).toLocaleLowerCase()}`;

        this.detailsElement = document.createElement("details");
        this.detailsElement.id = `${description.toLowerCase()}-details`;

        this.summaryElement = document.createElement("summary");
        this.summaryElement.id = `${description.toLowerCase()}-indicator`;
        this.summaryElement.classList.add("dropdown-toggle");
        this.summaryElement.setAttribute("tabindex", -1);

        this.ulElement = document.createElement("ul");
        this.ulElement.id = `${description.toLowerCase()}-dropdown-menu`;

        if (type === "list") {
            this.ulElement.classList.add("dropdown-menu");
            this.#createItemList();

        } else {
            this.ulElement.classList.add("dropdown-menu2");
            this.#createButtonItemList();
        }

        this.element.appendChild(this.pElement);
        this.element.appendChild(this.detailsElement);
        this.detailsElement.appendChild(this.summaryElement);
        this.detailsElement.appendChild(this.ulElement);

    }

    #createButtonItemList() {
        Object.keys(this.dropdownItemList).forEach((key) => {
            const liElement = document.createElement("li");
            liElement.classList.add("dropdown-button-item");
            liElement.setAttribute(this.dataName, key);
            const color = BASE_COLORS[key];
            liElement.style.backgroundColor = `rgba(${color.r},${color.g},${color.b},${color.a})`;
            this.ulElement.appendChild(liElement);
        });
    }

    setSummaryBg(bg) {
        this.summaryElement.style.backgroundColor = `rgba(${bg.r},${bg.g},${bg.b},${1})`;
    }

    #createItemList() {
        Object.keys(this.dropdownItemList).forEach((key) => {
            const liElement = document.createElement("li");
            liElement.classList.add("dropdown-item");
            liElement.setAttribute(this.dataName, key);
            liElement.textContent = `${key.charAt(0).toUpperCase()}${key.slice(1).toLocaleLowerCase()}`;
            this.ulElement.appendChild(liElement);
            this.items.set(key, liElement);
        });
    }

    close() {
        this.detailsElement.removeAttribute("open");
    }

    disable() {
        this.element.classList.add("disabled");
    }

    enable() {
        this.element.classList.remove("disabled");
    }

    contains(element) {
        this.ulElement.style.zIndex = Dropdown.zIndex;
        return !this.summaryElement.contains(element);
    }

    #resetItemVisibility() {
        for (const item of this.items.values()) {
            item.classList.remove("hidden-element");
        }
    }

    handleItemSelected(text) {
        const uppercaseText = text.toUpperCase();
        this.#resetItemVisibility();
        const found = this.items.get(uppercaseText);
        found.classList.add("hidden-element");
        this.#setSummaryText(text);
    }

    #setSummaryText(text) {
        this.summaryElement.textContent = `${text.charAt(0).toUpperCase()}${text.slice(1).toLowerCase()}`;
    }

    insertTo(parent) {
        parent.appendChild(this.element);
    }
}