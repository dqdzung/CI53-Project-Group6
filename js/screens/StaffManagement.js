import ProfileLink from "../components/ProfileLink.js";

const $template = document.createElement("template");

$template.innerHTML = /*html*/ `
    <style>
        #main-container {
            display: flex;
            flex-wrap: wrap;
        }

        staff-container {
            margin: 15px;
        }
    </style>
    <div>
        <div id="header">
            <span>Back</span>
            <profile-link name="Admin"></profile-link>
        </div>
        <div id="search-container">
            <input-wrapper></input-wrapper>
            <button id="search-btn">Search</button>
        </div>
         <div id="main-container">
            <staff-container name="John"></staff-container>
            <staff-container name="Joe"></staff-container>
            <staff-container name="Zoe"></staff-container>
            <staff-container name="Jo"></staff-container>
            <staff-container name="Jon"></staff-container>
            <staff-container name="Ron"></staff-container>
            <staff-container name="John"></staff-container>
            <staff-container name="Joe"></staff-container>
            <staff-container name="Zoe"></staff-container>
            <staff-container name="Jo"></staff-container>
            <staff-container name="Jon"></staff-container>
            <staff-container name="Ron"></staff-container>

        </div>
        <div id="footer">
            <button id="add-btn">Add</button>
        </div>
    </div>
`;

export default class StaffManagement extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({mode: "open"});
        this.shadowRoot.appendChild($template.content.cloneNode(true));

    }
}

window.customElements.define("staff-mngmnt", StaffManagement);
