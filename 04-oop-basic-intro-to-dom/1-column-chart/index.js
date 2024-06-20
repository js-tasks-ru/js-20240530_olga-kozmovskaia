export default class ColumnChart {
  constructor({
    data = [],
    label = "",
    value = 0,
    link = "",
    chartHeight = 50,
    formatHeading = (data) => `${data}`,
  }) {
    this.data = data;
    this.label = label;
    this.value = value;
    this.link = link;
    this.chartHeight = chartHeight;
    this.formatHeading = formatHeading;
    this.element = this.createElement(this.createTemplate());
  }

  createElement(template) {
    const element = document.createElement("div");
    element.innerHTML = template;
    return element;
  }

  createTemplate() {
    return `
      <h2>${this.label}</h2>
      <div class="dashboard__charts">
        <div id="${this.label}" class="dashboard__chart_${this.label}">
          <div class="column-chart ${
            this.data.length == 0 && "column-chart_loading"
          }" style="--chart-height: ${this.chartHeight}">
            <div class="column-chart__title">
              Total ${this.label}
              <a class="column-chart__link" href="${this.link}">View all</a>
            </div>
            <div class="column-chart__container">
              <div data-element="header" class="column-chart__header">
                ${
                  this.formatHeading
                    ? this.formatHeading(this.value)
                    : this.value
                }
              </div>
              <div data-element="body" class="column-chart__chart">
                ${this.data.length > 0 && this.createColumn(this.data)}
              </div>
            </div>
          </div>
        </div>
      </div>`;
  }

  createColumn(data) {
    const columnProps = this.getColumnProps(data);

    return columnProps
      .map((item) => {
        return `<div style="--value: ${item.value}" data-tooltip=${item.percent}></div>`;
      })
      .join("");
  }

  getColumnProps(data) {
    const maxValue = Math.max(...data);
    const scale = 50 / maxValue;

    return data.map((item) => {
      return {
        percent: ((item / maxValue) * 100).toFixed(0) + "%",
        value: String(Math.floor(item * scale)),
      };
    });
  }

  update(data) {
    this.data = data || [];
    const chart = document.querySelector(`.column-chart__chart`);
    chart.innerHTML = this.createColumn(this.data);
  }

  remove() {
    this.element.remove();
  }

  destroy() {
    this.remove();
  }

  // return {element: ..., getColumnProps(), update(), remove(), }
}
