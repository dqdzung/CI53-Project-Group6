import ProfileLink from "../components/ProfileLink.js";
import StaffContainer from "../components/StaffContainer.js";
import { getDataFromDocs, getDataFromDoc } from "../utilities.js";

const $template = document.createElement("template");

$template.innerHTML = /*html*/ `
    <style>
        #staff-container {
            display: flex;
            flex-wrap: wrap;
        }

        staff-container {
            margin: 10px;
        }
    </style>
    <div>
        <div id="header">
            <span>Back</span>
            <profile-link name="Admin"></profile-link>
        </div>
        <div id="main">
            <div id="search-container">
                <input-wrapper></input-wrapper>
                <button id="search-btn">Search</button>
            </div>
            <div id="staff-container">
            </div>
        </div>        
        <div id="footer">
            
        </div>
    </div>
`;

export default class StaffManagement extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.shadowRoot.appendChild($template.content.cloneNode(true));

    this.$staffContainer = this.shadowRoot.getElementById("staff-container");
    this.$addStaffBtn = this.shadowRoot.getElementById("add-staff-btn");

  }

  connectedCallback() {
    window.onload = async () => {
      let staffData = await this.getStaffData();
      this.renderStaff(staffData);
    };

    // this.$addStaffBtn.onclick = () => {
    //     console.log("Clicked");
    // }
  }

  renderStaff(data) {
    for (let staff of data) {
      let $staff = new StaffContainer(staff);
      this.$staffContainer.appendChild($staff);
    }
  }

  async getStaffData() {
    let results = await firebase.firestore().collection("staff").get();
    return getDataFromDocs(results.docs);
  }
}

window.customElements.define("staff-mngmnt", StaffManagement);
