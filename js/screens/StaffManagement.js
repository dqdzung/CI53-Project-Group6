import ProfileLink from "../components/ProfileLink.js";
import StaffWrapper from "../components/StaffWrapper.js";
import StaffDetailForm from "../components/StaffDetailForm.js";
import InputWrapper from "../components/InputWrapper.js";
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
          background-color: #3057a6;
          color: #ebeaef;
          outline: none;
        }

        staff-wrapper {
          height: 80px;          
          margin: 10px;
                    
        }

        h1 {
        display: flex;
        font-size: 64px;
        justify-content: center;
        }
        #back-link{
          font-size: 28px;
          position: absolute;
          top: 30px;
          left: 30px;
        }
        
        #back-link:hover {
          cursor: pointer;
          font-weight: bold;          
        }
    </style>

    <span id="back-link">Back</span>
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
    this.$searchBtn = this.shadowRoot.getElementById("search-btn");
    this.$inputWrapper = this.shadowRoot.querySelector("input-wrapper");
    this.$backLink = this.shadowRoot.getElementById("back-link");
  }

  async connectedCallback() {
    let staffData = await this.getStaffData();
    this.renderStaff(staffData);

    this.$searchBtn.onclick = () => {
      const searchValue = this.$inputWrapper.value().toLowerCase();
      const results = [];
      for (let staff of staffData) {
        if (staff.name.toLowerCase().includes(searchValue)) {
          results.push(staff);
        }
      }
      this.renderStaff(results);
      InputWrapper.clearInput(this.$inputWrapper);
    };

    this.$inputWrapper.onkeyup = (e) => {
      if (e.key == "Enter") {
        this.$searchBtn.click();
      }
    };

    this.$backLink.onclick = () => {
      router.navigate("/admin-page");
    };
  }

  renderStaff(data) {
    this.$staffContainer.innerHTML = "";
    for (let staff of data) {
      if (staff.name != "admin") {
        let $staff = new StaffWrapper(staff);
        this.$staffContainer.appendChild($staff);
      }
    }
  }

  async getStaffData() {
    let results = await firebase.firestore().collection("users").get();
    return getDataFromDocs(results.docs);
  }
}

window.customElements.define("staff-mngmnt", StaffManagement);
