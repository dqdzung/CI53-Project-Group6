const $template = document.createElement("template");

$template.innerHTML = /*html*/ `
    <style>
        h1 {
        display: flex;
        font-size: 64px;
        justify-content: center;
        }

        profile-link {
            position: absolute;
            top: 30px;
            right: 30px;
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
        
        margin: 10px 50px;
        font-size: 36px;
        background-color: #3057a6;
        border-radius: 15px;
        outline: none;
        cursor: pointer;
        color: #ebeaef;
        }      

    </style>    
    <profile-link name="Admin"></profile-link>    
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
  }
}

window.customElements.define("admin-page", AdminPage);
