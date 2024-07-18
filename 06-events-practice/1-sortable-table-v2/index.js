import SortableTableV1 from "../../05-dom-document-loading/2-sortable-table-v1/index.js";

export default class SortableTable extends SortableTableV1 {
  constructor(
    headersConfig,
    { data = [], sorted = { id: "", order: "" } } = {}
  ) {
    super(headersConfig, data);
    this.data = data;
    this.sortField = sorted.id;
    this.sortOrder = sorted.order;
    this.isSortLocally = true;
    this.createEventListeners();
    this.sort();
  }

  sort() {
    if (this.isSortLocally) {
      this.sortOnClient();
    } else {
      this.sortOnServer();
    }
  }

  sortOnClient() {
    super.sort(this.sortField, this.sortOrder);
    this.createSortArrow();
  }

  removeSortArrow() {
    const arrowElement = this.element.querySelector(
      ".sortable-table__sort-arrow"
    );
    if (!arrowElement) return;
    arrowElement.remove();
  }

  createSortArrow() {
    this.removeSortArrow();
    const arrowElement = document.createElement("span");
    arrowElement.dataset.element = "arrow";
    arrowElement.classList.add("sortable-table__sort-arrow");
    arrowElement.innerHTML = `<span class="sort-arrow"></span>`;
    this.element
      .querySelector(`[data-id="${this.sortField}"]`)
      .append(arrowElement);
  }

  handleElementClick = (e) => {
    const element = e.target.closest(".sortable-table__cell");
    this.sortField = element.dataset.id;
    this.sortOrder = this.sortOrder === "asc" ? "desc" : "asc";
    element.dataset.order = this.sortOrder;
    this.sortOnClient();
  };

  createEventListeners() {
    this.element.addEventListener("pointerdown", this.handleElementClick);
  }

  destroyEventListeners() {
    this.element.removeEventListener("pointerdown", this.handleElementClick);
  }

  destroy() {
    super.destroy();
    this.destroyEventListeners();
  }
}
