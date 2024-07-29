import SortableTableV1 from "../../05-dom-document-loading/2-sortable-table-v1/index.js";

export default class SortableTable extends SortableTableV1 {
  constructor(
    headersConfig,
    { data = [], sorted: { id = "title", order = "asc" } } = {}
  ) {
    super(headersConfig, data);
    this.data = data;
    this.sortField = id;
    this.sortOrder = order;
    this.isSortLocally = true;
    this.createEventListeners();
    this.sortFunction();
  }

  sortFunction() {
    if (this.isSortLocally) {
      this.sortOnClient();
    } else {
      this.sortOnServer();
    }
  }

  sortOnClient() {
    this.sort(this.sortField, this.sortOrder);
    const arrow = this.createSortArrow();
    this.headerSorted = this.element.querySelector(
      `[data-id="${this.sortField}"]`
    );
    this.headerSorted.append(arrow);
  }

  createSortArrow() {
    let arrowElement = this.element.querySelector(
      ".sortable-table__sort-arrow"
    );

    if (!arrowElement) {
      arrowElement = document.createElement("span");
      arrowElement.dataset.element = "arrow";
      arrowElement.classList.add("sortable-table__sort-arrow");
      arrowElement.innerHTML = `<span class="sort-arrow"></span>`;
    }
    return arrowElement;
  }

  handleElementClick = (e) => {
    const element = e.target.closest(".sortable-table__cell");
    this.sortField = element.dataset.id;
    this.sortOrder = this.sortOrder === "asc" ? "desc" : "asc";
    element.dataset.order = this.sortOrder;
    this.sortFunction();
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
