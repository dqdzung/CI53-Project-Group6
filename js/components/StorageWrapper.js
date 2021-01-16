import { getDataFromDoc } from "../utilities.js";

const $template = document.createElement("template");

$template.innerHTML = /*html*/ `
    <style>
        #storage {
            width: 150px;
            height: 50px;
            background-color: #3057a6;
            display: flex;
            align-items: center;
            justify-content: center;
            cursor: pointer;            
            border-radius: 10px;
            font-size: 20px;
            padding: 10px;            
        }
    </style>
    <div id="storage">
        Storage 1
    </div>    
`;

export default class StorageWrapper extends HTMLElement {
  constructor(data) {
    super();
    this.attachShadow({ mode: "open" });
    this.shadowRoot.appendChild($template.content.cloneNode(true));

    this.$storage = this.shadowRoot.getElementById("storage");

    this.setAttribute("data", JSON.stringify(data));
  }

  static get observedAttributes() {
    return ["data"];
  }

  attributeChangedCallback(attrName, oldValue, newValue) {
    if (attrName == "data") {
      this.$storage.innerHTML = JSON.parse(newValue).name;
    }
  }

  connectedCallback() {
    this.onclick = async (e) => {
      let $storageWrapper = e.target;
      let data = JSON.parse($storageWrapper.getAttribute("data"));
      let staffId = window.location.hash.substr(-20, 20);
      let staff = await firebase
        .firestore()
        .collection("users")
        .doc(staffId)
        .get();
        
      let storageArr = staff.data().manageStorage;

      let confirmation = confirm(`Assign storage?
        - Name: ${data.name} 
        - Content: ${data.content}`);
      if (confirmation) {
        storageArr.push(data.id);
        await firebase.firestore().collection("storage").doc(data.id).update({
          staff: staffId,
        });
        await firebase.firestore().collection("users").doc(staffId).update("manageStorage", storageArr);
        location.reload();    
      }
    };
  }
}

window.customElements.define("storage-wrapper", StorageWrapper);
