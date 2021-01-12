const $template = document.createElement("template");
$template.innerHTML = /*html*/ `
    <div>

    </div>

`

export default class StaffDetailForm extends HTMLElement {
    constructor() {
        super();

        this.attachShadow({mode: "open"});
        this.shadowRoot.appendChild($template.content(true));


    }
}