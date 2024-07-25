export default class DoubleSlider {
  element;

  constructor({ min = 0, max = 100, formatValue = (v) => v, selected } = {}) {
    this.min = min;
    this.max = max;
    this.range = this.max - this.min;
    this.formatValue = formatValue;
    this.selected = Boolean(selected)
      ? selected
      : { from: this.min, to: this.max };
    this.element = this.createSliderElement();
    this.createEventListeners();
  }

  createSliderElement() {
    const div = document.createElement("div");
    div.classList.add("range-slider");
    div.append(this.createBoundTemplate("from"));
    div.append(this.createSliderInner());
    div.append(this.createBoundTemplate("to"));
    return div;
  }

  createBoundTemplate(value) {
    const span = document.createElement("span");
    span.dataset.element = value;
    span.textContent = `${this.formatValue(this.selected[value])}`;
    return span;
  }

  createSliderInner() {
    this.sliderContainer = document.createElement("div");
    this.sliderContainer.classList.add("range-slider__inner");
    this.progress = this.createProgress();
    this.leftThumb = this.createThumbTemplate("left");
    this.rightThumb = this.createThumbTemplate("right");
    return this.sliderContainer;
  }

  calculateStyleLeft() {
    return ((this.selected.from - this.min) / this.range) * 100 + "%";
  }

  calculateStyleRight() {
    return ((this.max - this.selected.to) / this.range) * 100 + "%";
  }

  createProgress() {
    const span = document.createElement("span");
    span.classList.add("range-slider__progress");
    span.style.left = this.calculateStyleLeft();
    span.style.right = this.calculateStyleRight();
    this.sliderContainer.append(span);
    return span;
  }

  createThumbTemplate(type) {
    const span = document.createElement("span");
    span.classList.add(`range-slider__thumb-${type}`);
    if (type === "left") {
      span.style.left = this.calculateStyleLeft();
    } else {
      span.style.right = this.calculateStyleRight();
    }
    this.sliderContainer.append(span);
    return span;
  }

  createEventListeners() {
    this.leftThumb.addEventListener("pointerdown", () =>
      this.handleMouseDown("left")
    );

    this.rightThumb.addEventListener("pointerdown", () =>
      this.handleMouseDown("right")
    );

    this.leftThumb.addEventListener("dragstart", () => {
      return false;
    });
    this.rightThumb.addEventListener("dragstart", () => {
      return false;
    });
  }

  handleMouseDown = (type) => {
    this.thumbActive = type;
    this.sliderWidth = this.sliderContainer.getBoundingClientRect().width;
    this.sliderShiftLeft = this.sliderContainer.offsetLeft;

    document.addEventListener("pointermove", this.handleMouseMove);
    document.addEventListener("pointerup", this.handleMouseUp);
  };

  handleMouseMove = (e) => {
    const newValue =
      Math.round(
        ((e.clientX - this.sliderShiftLeft) / this.sliderWidth) * this.range
      ) + this.min;

    if (this.thumbActive === "left") {
      this.selected.from = Math.max(
        this.min,
        Math.min(newValue, this.selected.to)
      );

      this.leftThumb.style.left = this.calculateStyleLeft();
      this.progress.style.left = this.calculateStyleLeft();
      this.element.querySelector('span[data-element="from"]').textContent =
        this.formatValue(this.selected.from);
    } else {
      this.selected.to = Math.max(
        this.selected.from,
        Math.min(this.max, newValue)
      );
      this.rightThumb.style.right = this.calculateStyleRight();
      this.progress.style.right = this.calculateStyleRight();
      this.element.querySelector('span[data-element="to"]').textContent =
        this.formatValue(this.selected.to);
    }
  };

  handleMouseUp = () => {
    this.dispatchSelectedRange();
    document.removeEventListener("pointermove", this.handleMouseMove);
    document.removeEventListener("pointerup", this.handleMouseUp);
  };

  dispatchSelectedRange() {
    this.element.dispatchEvent(
      new CustomEvent("range-select", {
        detail: this.selected,
      })
    );
  }

  destroy() {
    this.leftThumb.removeEventListener("pointerdown", () =>
      this.handleMouseDown("left")
    );

    this.rightThumb.removeEventListener("pointerdown", () =>
      this.handleMouseDown("right")
    );
    this.element.remove();
  }
}
