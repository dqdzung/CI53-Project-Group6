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
  constructor(data) {
    super();
    this.attachShadow({ mode: "open" });
    this.shadowRoot.appendChild($template.content.cloneNode(true));

    this.$container = this.shadowRoot.getElementById("container");
    
    this.setAttribute("data", JSON.stringify(data));
    
  }

  static get observedAttributes() {
    return ["data"];
  }

  attributeChangedCallback(attrName, oldValue, newValue) {
    if (attrName == "data") {      
      this.$container.innerHTML = JSON.parse(newValue).name;
    }
  }
}

window.customElements.define("staff-container", StaffContainer);
