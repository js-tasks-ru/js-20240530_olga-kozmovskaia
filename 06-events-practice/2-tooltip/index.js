class Tooltip {
  element;

  constructor() {
    if (Tooltip._instance) {
      return Tooltip._instance;
    }
    Tooltip._instance = this;
  }

  initialize() {
    this.createEventListeners();
  }

  render(message) {
    this.element = document.createElement("div");
    this.element.classList.add("tooltip");
    this.element.style.display = "block";
    this.element.innerHTML = `${message}`;
    document.body.append(this.element);
  }

  handleOver = (e) => {
    const target = e.target.closest(`[data-tooltip]`);
    if (target) this.render(target.dataset.tooltip);
  };

  handleMove = (e) => {
    const target = e.target.closest(`[data-tooltip]`);
    if (target) {
      const left = e.pageX;
      const top = e.pageY;
      this.element.style.left = left + 10 + "px";
      this.element.style.top = top + 10 + "px";
    }
  };

  handleOut = (e) => {
    const target = e.target.closest(`[data-tooltip]`);
    if (target) {
      this.element.remove();
      this.element = null;
    }
  };

  createEventListeners() {
    document.addEventListener("pointerover", this.handleOver);
    document.addEventListener("pointermove", this.handleMove);
    document.addEventListener("pointerout", this.handleOut);
  }

  destroyEventListeners() {
    document.removeEventListener("pointerover", this.handleOver);
    document.removeEventListener("pointermove", this.handleMove);
    document.removeEventListener("pointerout", this.handleOut);
  }

  destroy() {
    this.destroyEventListeners();
  }
}

export default Tooltip;
