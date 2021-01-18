const $template = document.createElement("template");

$template.innerHTML = /*html*/ `
  <style>
    #input-wrapper {
      display: flex;
      flex-direction: column;
    }
    #input-label { 
      margin-top: -5px;
    }
    #input-main {
      height: 30px;
      border-radius: 5px;
      font-size: 18px;
      border: 0;
      background-color:  #ebeaef;
    }
    #input-error {
      margin-top: 5px;
      color: red;
      font-size: 16px;
    }
  </style>
  <div id="input-wrapper">    
    <label id="input-label" for="#input-main"></label>
    <input id="input-main" type="text">
    <div id="input-error"></div>
  </div>
`;

export default class InputWrapper extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.shadowRoot.appendChild($template.content.cloneNode(true));

    this.$label = this.shadowRoot.getElementById("input-label");
    this.$main = this.shadowRoot.getElementById("input-main");
    this.$error = this.shadowRoot.getElementById("input-error");
  }

  static get observedAttributes() {
    return ["label", "type", "error", "value"];
  }

  attributeChangedCallback(attrName, oldValue, newValue) {
    switch (attrName) {
      case "label":
        this.$label.innerHTML = newValue;
        break;
      case "type":
        this.$main.type = newValue;
        break;
      case "error":
        this.$error.innerHTML = newValue;
        break;
      case "value":
        this.$main.value = newValue;
        break;
    }
  }

  value() {
    return this.$main.value;
  }

  error(message) {
    this.setAttribute("error", message);
  }

  static clearInput() {
    for (let argument of arguments) {
      argument.setAttribute("value", "");
    }
  }

  static validate($inputWrapper, condition, message) {
    let value = $inputWrapper.value();
    if (condition(value)) {
      $inputWrapper.error("");
      return true;
    } else {
      $inputWrapper.error(message);
      return false;
    }
  }
}

window.customElements.define("input-wrapper", InputWrapper);