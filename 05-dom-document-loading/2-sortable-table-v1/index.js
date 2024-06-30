export default class SortableTable {
  element;
  subElements = {};

  constructor(headerConfig = [], data = []) {
    this.headerConfig = headerConfig;
    this.data = data;
    this.subElements.header = this.createHeaderElement();
    this.subElements.body = this.createBodyElement();
    this.element = this.createTableElement();
  }

  createHeaderTemplate({ id, sortable, title }) {
    return `
      <div class="sortable-table__cell" data-id="${id}" data-sortable=${sortable}>
        <span>${title}</span>
      </div>`;
  }

  createHeaderElement() {
    const div = document.createElement("div");
    div.dataset.element = "header";
    div.classList.add(`sortable-table__header`, `sortable-table__row`);
    div.innerHTML = this.headerConfig
      .map((header) => {
        return this.createHeaderTemplate(header);
      })
      .join("");
    return div;
  }

  createCellTemplate(data) {
    return `<div class="sortable-table__cell">${data}</div>`;
  }

  createRowTemplate(product) {
    return `
    <a href="/products/${product.id}" class="sortable-table__row">
      ${this.headerConfig
        .map((header) => {
          if (Object.keys(header).includes("template")) {
            return header.template(product);
          } else {
            return this.createCellTemplate(product[header.id]);
          }
        })
        .join("")}
    </a>
    `;
  }

  createBodyElement() {
    const div = document.createElement("div");
    div.dataset.element = "body";
    div.classList.add(`sortable-table__body`);
    div.innerHTML = this.data
      .map((product) => {
        return this.createRowTemplate(product);
      })
      .join("");
    return div;
  }

  createTableTemplate() {
    const div = document.createElement("div");
    div.classList.add("sortable-table");
    Object.keys(this.subElements).map((key) => {
      const subElement = this.subElements[key];
      subElement.dataset.element = key;
      subElement.classList.add(`sortable-table__${key}`);
      div.appendChild(subElement);
    });
    return div;
  }

  createTableElement() {
    const div = document.createElement("div");
    div.dataset.element = "productsContainer";
    div.classList.add("products-list__container");
    div.appendChild(this.createTableTemplate());
    return div;
  }

  sort(field, sortOrder) {
    let copyArr = [...this.data];

    copyArr.sort((a, b) => {
      let comparison = a[field]
        .toString()
        .localeCompare(b[field].toString(), ["ru", "en"], {
          sensitivity: "case",
          caseFirst: "upper",
          numeric: true,
        });

      return sortOrder === "asc" ? comparison : -comparison;
    });

    this.data = copyArr;
    this.update();
  }

  update() {
    const body = this.element.querySelector(".sortable-table__body");
    this.subElements.body = this.createBodyElement();
    body.replaceWith(this.subElements.body);
  }

  remove() {
    this.element.remove();
  }

  destroy() {
    this.remove();
  }
}
