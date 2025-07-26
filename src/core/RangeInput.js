class RangeInput {
    constructor(labelText, { min, max, step, value }) {
        this.max = max;
        this.min = min;
        this.step = step;
        this.labelText = labelText;

        this.element = document.createElement("div");
        this.element.classList.add("controls");

        this.rangeInput = document.createElement("input");
        this.rangeInput.setAttribute("type", "range");

        this.rangeInput.setAttribute("min", min);
        this.rangeInput.setAttribute("max", max);
        this.rangeInput.setAttribute("step", step);
        this.rangeInput.setAttribute("value", value);
        this.rangeInput.setAttribute("tabindex", -1);

        this.spanElement = document.createElement("span");
        this.spanElement.classList.add("controls-indicator");
        this.spanElement.textContent = `${value}`;

        this.pElement = document.createElement("p");
        this.pElement.textContent = `${labelText}: `;
        this.pElement.classList.add("controls-label");
        this.pElement.appendChild(this.spanElement);

        this.divElement = document.createElement("div");
        this.divElement.classList.add("input-container");
        this.divElement.appendChild(this.rangeInput);

        this.element.appendChild(this.pElement);
        this.element.appendChild(this.divElement);
    }

    insertTo(parent) {
        parent.appendChild(this.element);
    }

    getValue() {
        return this.rangeInput.value;
    }

    setValue(value) {
        this.rangeInput.value = value;
    }

    getInvertedValue() {
        return this.max - this.getValue();
    }

    setText(text) {
        this.labelText = text;
        this.spanElement.textContent = `${text}`;
    }

    disable() {
        this.element.classList.add("disabled");
    }

    enable() {
        this.element.classList.remove("disabled");
    }
}