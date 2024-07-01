export default class NotificationMessage {
  timeoutId;
  static currentShownElement;

  constructor(message = "", options = {}) {
    this.message = message;
    this.duration = options.duration;
    this.type = options.type;
    this.element = this.createElement(this.createTemplate());
  }

  createElement(template) {
    const element = document.createElement("div");
    element.innerHTML = template;
    element.firstElementChild.classList.add(this.type);
    return element.firstElementChild;
  }

  createTemplate() {
    return `
    <div class="notification" style="--value:${this.duration / 1000}s">
      <div class="timer"></div>
      <div class="inner-wrapper">
        <div class="notification-header">${this.type}</div>
        <div class="notification-body">
          ${this.message}
        </div>
      </div>
    </div>`;
  }

  show(element) {
    if (NotificationMessage.currentShownElement) {
      NotificationMessage.currentShownElement.remove();
    }
    NotificationMessage.currentShownElement = this;
    const targetElement = element || document.body;
    targetElement.append(this.element);
    this.timeOutId = setTimeout(() => this.destroy(), this.duration);
  }

  remove() {
    this.element.remove();
  }

  destroy() {
    this.remove();
    clearTimeout(this.timeOutId);
  }
}
