import { getCurrentUser } from "../utilities.js";

const $template = document.createElement("template");

$template.innerHTML = /*html*/ `
    <style>
        #profile-container {
            font-size: 36px;
        }

        #sign-out-link {
            font-size: 28px;
            cursor: pointer;
        }

    </style>
    <div id="profile-container">
        <span id="profile-name"></span><span id="sign-out-link"><b><u>Sign Out!</u></b></span>
    <div>
`;

export default class ProfileLink extends HTMLElement {
  constructor() {
    super();

    this.attachShadow({ mode: "open" });
    this.shadowRoot.appendChild($template.content.cloneNode(true));

    this.$profileContainer = this.shadowRoot.getElementById("profile-container");
    this.$profileName = this.shadowRoot.getElementById("profile-name");
    this.$signOutLink = this.shadowRoot.getElementById("sign-out-link");
  }

  static get observedAttributes() {
    return ["name"];
  }

  attributeChangedCallback(attrName, oldValue, newValue) {
    if (attrName == "name") {
      this.$profileName.innerText = `${getCurrentUser().name}, `;
    }
  }

  connectedCallback() {
    this.$signOutLink.onclick = () => {
      if (confirm("Signing out?")) {
        localStorage.clear();
        router.navigate("/");
      }
    };
  }
}

window.customElements.define("profile-link", ProfileLink);
