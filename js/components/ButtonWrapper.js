const $template = document.createElement("template");

$template.innerHTML = /*html*/ `
    <style>
        #button-wrapper {
            display: inline-block;
            width: 250px;
            min-width: 100px;
            min-height: 100px;
            text-align: center;
            line-height: 100px;
            margin: 10px 50px;
            font-size: 36px;
            background-color: #3057A6;
            color: #EBEAEF;
            border-radius: 15px;
            cursor: pointer;
        }   
    </style>
    <div id="button-wrapper">  
    </div>
`;

export default class ButtonWrapper extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.shadowRoot.appendChild($template.content.cloneNode(true));

    this.$buttonWrapper = this.shadowRoot.getElementById("button-wrapper");
  }

  connectedCallback() {
    this.$buttonWrapper.onclick = () => {
      console.log("clicked");
        if (this.$buttonWrapper.innerHTML == "Sign Up") {
          router.navigate("/sign-up");
        } else {router.navigate("/sign-in")};
    }
  }

  static get observedAttributes() {
    return ["label"];
  }

  attributeChangedCallback(attrName, oldValue, newValue) {
    if (attrName == "label") {
      this.$buttonWrapper.innerHTML = newValue;
    }
  }
}

window.customElements.define("button-wrapper", ButtonWrapper);
