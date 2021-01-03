const $template = document.createElement("template");

$template.innerHTML = /*html*/ `
    <style>
        #container {
            width: 200px;
            height: 75px;
            background-color: #3057a6;
            display: flex;
            align-items: center;
            justify-content: center;
            cursor: pointer;            
            border-radius: 10px;
        }
    </style>
    <div id="container">
        Ng Van A
    </div>
`;

export default class StaffContainer extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.shadowRoot.appendChild($template.content.cloneNode(true));

    this.$container = this.shadowRoot.getElementById("container");
  }

  static get observedAttributes() {
    return ["name"];
  }

  attributeChangedCallback(attrName, oldValue, newValue) {
    if (attrName == "name") {
      this.$container.innerHTML = newValue;
    }
  }
}

window.customElements.define("staff-container", StaffContainer);
