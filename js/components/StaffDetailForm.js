import { getDataFromDocs, getDataFromDoc } from "../utilities.js";
import StorageWrapper from "./StorageWrapper.js";

const $template = document.createElement("template");
$template.innerHTML = /*html*/ `
    <style>
        td{
            padding: 20px 0px 0px 40px;
            font-size: 24px;          
        }

        profile-link {
            position: absolute;
            top: 30px;
            right: 30px;
        }

        button {
            background-color: #3057A6;
            color: #EBEAEF;
            border-radius: 10px;
            width: 150px;
            min-width: 100px;
            min-height: 50px;
            text-align: center;
            
            font-size: 24px;
            outline: 0;
            align-self: center;
            margin: 30px 10px ;
        }

        
        h1 {
        display: flex;
        font-size: 64px;
        justify-content: center;
        }
        
        #content {
            margin: 50px 0px;
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

        #modal {
            display: none;
            width: 100%;
            height: 100%;
            position: fixed;
            z-index: 1;
            top: 0;
            left: 0;
            background-color: rgb(0,0,0);
            background-color: rgba(0,0,0,0.4); 
            padding-top: 150px;
        }

        #storage-list {
            background-color: #fefefe;
            margin: auto;
            padding: 20px;
            border: 1px solid #888;
            width: 50%;
            height: 50%;
            overflow: auto;
        }

        #close {
        color: #aaaaaa;        
        font-size: 28px;
        font-weight: bold;
        position: absolute;
             
        }

        #close:hover,
        #close:focus {
        color: #000;
        text-decoration: none;
        cursor: pointer;
        }

        #storage-container {
            display: flex;
            flex-wrap: wrap;      
            justify-content: center; 
            padding: 5px;
        }

        storage-wrapper {
            margin: 10px;
        }

        #show{
            height: 5px;
            width: 100px;
            margin: 0px;
            font-size: 20px;
        }

        #button-container {
            display: flex;
            justify-content: center;
        }

    </style>
    <span id="back-link">Back</span>
    <profile-link name="Admin"></profile-link>
    <h1>Info</h1>
    <div id="staff-detail-form">              
        <div id="content">  
        </div>
        <div id="button-container">
        <button id="delete-btn">Delete</button>
        <button id="assign-btn">Assign</button>
        </div>
        <div id="modal">
            <div id="storage-list">    
                <span id="close">&times;</span>
                <div id="storage-container"></div>
            </div>
        </div>        
    </div>
`;

export default class StaffDetailForm extends HTMLElement {
  constructor(data) {
    super();

    this.attachShadow({ mode: "open" });
    this.shadowRoot.appendChild($template.content.cloneNode(true));

    this.$content = this.shadowRoot.getElementById("content");
    this.$deleteBtn = this.shadowRoot.getElementById("delete-btn");
    this.$backLink = this.shadowRoot.getElementById("back-link");
    this.$assignBtn = this.shadowRoot.getElementById("assign-btn");
    this.$modal = this.shadowRoot.getElementById("modal");
    this.$storageList = this.shadowRoot.getElementById("storage-list");
    this.$close = this.shadowRoot.getElementById("close");
    this.$storageContainer = this.shadowRoot.getElementById(
      "storage-container"
    );

    this.setAttribute("data", JSON.stringify(data));
  }

  static get observedAttributes() {
    return ["data"];
  }

  connectedCallback() {
    this.$deleteBtn.onclick = async () => {
      const deleteConfirmation = confirm("Delete this staff?");
      if (deleteConfirmation) {
        const data = JSON.parse(this.getAttribute("data"));

        await firebase
          .firestore()
          .collection("users")
          .doc(data.id)
          .delete()
          .then(function () {
            console.log("Staff successfully deleted!");
          })
          .catch(function (error) {
            console.error("Error: ", error);
          });

        router.navigate("/staff-mngmnt");
      }
    };

    this.$backLink.onclick = () => {
      router.navigate("/staff-mngmnt");
    };

    this.$assignBtn.onclick = async () => {
      this.$storageContainer.innerHTML = "";
      this.$modal.style.display = "block";
      let response = await firebase.firestore().collection("storage").get();
      let data = getDataFromDocs(response.docs);
      for (let storage of data) {
        if (!storage.staff) {
          let $storage = new StorageWrapper(storage);
          this.$storageContainer.appendChild($storage);
        }
      }
    };

    this.$close.onclick = () => {
      this.$modal.style.display = "none";
    };
  }

  async attributeChangedCallback(attrName, oldValue, newValue) {
    if (attrName == "data") {
      let data = JSON.parse(newValue);
      let manageStorage = data.manageStorage;
      let storageList = await this.getStorageList(manageStorage);
      let arr = [];
      if (storageList.length > 0) {
        for (let storage of storageList) {
          arr.push(storage.name);
        }
      } else arr = "Unassigned";
      this.$content.innerHTML = /*html*/ `
                <table style="width: 100%">
                    <tr>
                        <td>Name:</td>
                        <td>${data.name}</td>
                    </tr>
                    <tr>
                        <td>Age:</td>
                        <td>${data.age}</td>
                    </tr>
                    <tr>
                        <td>Address:</td>
                        <td>${data.address}</td>
                    </tr>
                    <tr>
                        <td>Storage:</td>
                        <td>${arr}</td>
                    </tr>
                </table>
                `;
    }
  }

  async getStorageList(array) {
    const results = [];
    for (let elem of array) {
      let response = await firebase
        .firestore()
        .collection("storage")
        .doc(elem)
        .get();
      results.push(response.data());
    }
    return results;
  }
}

window.customElements.define("staff-detail-form", StaffDetailForm);
