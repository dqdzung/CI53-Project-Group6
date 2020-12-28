const $template = document.createElement("template");

$template.innerHTML = /*html*/ `
    <style>
        h1 {
        display: flex;
        font-size: 64px;
        justify-content: center;
        align-items: flex-end;
        }

        #btn-container {
        display: flex;
        justify-content: center;
        flex-wrap: wrap;
        }

        #btn-container button {
        width: 250px;
        min-width: 100px;
        min-height: 100px;
        text-align: center;
        line-height: 100px;
        margin: 10px 50px;
        font-size: 36px;
        background-color: #3057a6;
        border-radius: 15px;
        outline: none;
        cursor: pointer;
        }

        #profile {
            position: absolute;
            top: 30px;
            right: 30px;
            font-size: 36px;
        }
        
        #sign-out {
            font-size: 28px;
            cursor: pointer;
        }
    </style>
    <div id="admin">
        <div id="profile">
        Admin, <span id="sign-out"><b><u>Sign Out!</u></b></span>
        </div>
        <div>
            <h1>Management</h1>
            <div id="btn-container">
                <a href="#!/staff-mngmnt"><button>Staff</button></a>
                <a href="#!/storage-mngmnt"><button>Storage Unit</button></a>
        </div>
    </div>
`;

export default class AdminPage extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.shadowRoot.appendChild($template.content.cloneNode(true));

    this.$btnContainer = this.shadowRoot.getElementById("btn-container");
    this.$signOutLink = this.shadowRoot.getElementById("sign-out");
  }

  connectedCallback() {
      this.$signOutLink.onclick = () => {
          localStorage.clear();
          router.navigate("/sign-in");
      }
  }
}

window.customElements.define("admin-page", AdminPage);
