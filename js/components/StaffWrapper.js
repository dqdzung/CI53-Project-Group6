import StaffDetailForm from "./StaffDetailForm.js";

const $template = document.createElement("template");

$template.innerHTML = /*html*/ `
    <style>
        #staff {
            width: 200px;
            height: 75px;
            background-color: #3057a6;
            display: flex;
            align-items: center;
            justify-content: center;
            cursor: pointer;            
            border-radius: 10px;
            font-size: 24px;
        }

        staff-detail-form {
          display: none;
        }
    </style>
    <div id="staff">
        Ng Van A
    </div>    
`;

export default class StaffWrapper extends HTMLElement {
  constructor(data) {
    super();
    this.attachShadow({ mode: "open" });
    this.shadowRoot.appendChild($template.content.cloneNode(true));

    this.$staff = this.shadowRoot.getElementById("staff");
    this.$staffDetail = this.shadowRoot.querySelector("staff-detail-form");

    this.setAttribute("data", JSON.stringify(data));
  }

  static get observedAttributes() {
    return ["data"];
  }

  attributeChangedCallback(attrName, oldValue, newValue) {
    if (attrName == "data") {
      this.$staff.innerHTML = JSON.parse(newValue).name;
    }
  }

  connectedCallback() {
    this.onclick = (e) => {
      let $staffWrapper = e.target;
      let data = JSON.parse($staffWrapper.getAttribute("data"));      
      router.navigate("/staff-mngmnt/" + data.id);
    };
  }
}

window.customElements.define("staff-wrapper", StaffWrapper);
