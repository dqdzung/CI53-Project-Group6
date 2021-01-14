import ProfileLink from "../components/ProfileLink.js";
import StaffWrapper from "../components/StaffWrapper.js";
import StaffDetailForm from "../components/StaffDetailForm.js"
import { getDataFromDocs, getDataFromDoc } from "../utilities.js";

const $template = document.createElement("template");

$template.innerHTML = /*html*/ `
    <style>
        profile-link {
          position: absolute;
          top: 30px;
          right: 30px;
        }

        #staff-container {
          display: flex;
          flex-wrap: wrap;
          justify-content: center;          
          min-height: 200px;
        }

        #search-container {      
          display: flex;
          align-items: center;
          justify-content: center;  
        }

        #search-btn {
          height: 30px;
          border-radius: 5px;
          margin-left: 10px;
        }

        staff-wrapper {
          display: flex;
          align-items: center;
          height: 80px;          
          margin: 10px;          
        }

        h1 {
        display: flex;
        font-size: 64px;
        justify-content: center;
        }
    </style>

    <profile-link name="Admin"></profile-link>
    <h1>Staff</h1>
    <div id="content">
      <div id="search-container">
        <input-wrapper></input-wrapper>
        <button id="search-btn">Search</button>
      </div>         
      <div id="staff-container">
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

  async connectedCallback() {    
      let staffData = await this.getStaffData();
      this.renderStaff(staffData);     
    ;
  }

  renderStaff(data) {
    for (let staff of data) {
      let $staff = new StaffWrapper(staff);
      this.$staffContainer.appendChild($staff);
    }
  }

  async getStaffData() {
    let results = await firebase.firestore().collection("staff").get();
    return getDataFromDocs(results.docs);
  }
}

window.customElements.define("staff-mngmnt", StaffManagement);
