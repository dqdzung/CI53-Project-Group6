import { getDataFromDoc, getDataFromDocs } from "../utilities.js";
import AddWarehouseForm from "./AddWarehouseForm.js";
import InputWrapper from "./InputWrapper.js";
import WarehouseContainer from "./WarehouseContainer.js";

const $template = document.createElement("template");
$template.innerHTML = /*html*/ `
    <style>
        #storage-list {
            display: flex;
            flex-direction: column;
            align-items: center;
        }
         #search-warehouse-form {
            display: flex;
            margin-bottom: 30px;
            align-items: center;
            justify-content: space-between;
        }

  
        button {
            border: 1px solid #1995ad;
            height: 30px;
            width: 100px;
            position: relative;
            top: 10px;
            border-radius: 5px;
            margin: 10px;
        }
        #search-warehouse-keyword {
            height: 20px;
            width: calc(100% - 100px - 15px);
        }
        table {
            border-collapse: separate;
            border-spacing: 75px 0;
        }

        th {
            padding: 10px;
            margin: 20px;
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
        profile-link {
          position: absolute;
          top: 30px;
          right: 30px;
        }
        h1 {
        display: flex;
        font-size: 64px;
        justify-content: center;
        }
        
    </style>
    <div id="storage-list">
    
    <span id="back-link">Back</span>
    <profile-link name="Admin"></profile-link>
    <h1>Storage</h1>        
            <div id="search-warehouse-form">
                <input-wrapper id="search-warehouse-keyword" label="" type="text" error=""></input-wrapper>                
                <button id="search-warehouse-btn">Search</button>
            </div>
        <div id="container">
            <table is="s-table-lite" fixed-column>
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Content</th>
                    <th>Staff</th>
                    <th></th>
                </tr>
            </thead>
            </table>
            <div id='warehouse-list'></div>            
        </div>
        <button id="add-warehouse-btn">Add A Storage</button>
        </div>
`;

export default class WarehouseList extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.shadowRoot.appendChild($template.content.cloneNode(true));
    this.$warehouseList = this.shadowRoot.getElementById("warehouse-list");
    this.$addWarehouse = this.shadowRoot.getElementById("add-warehouse-btn");
    this.$searchWarehouseForm = this.shadowRoot.getElementById(
      "search-warehouse-form"
    );
    this.$searchWarehouseKeyword = this.shadowRoot.getElementById(
      "search-warehouse-keyword"
    );
    this.$searchBtn = this.shadowRoot.getElementById("search-warehouse-btn");
    this.$container = this.shadowRoot.getElementById("container");
    this.$backLink = this.shadowRoot.getElementById("back-link");

    // this.setAttribute('data', JSON.stringify(data));
  }

  connectedCallback() {
    this.$searchBtn.onclick = async (event) => {
      let keyword = this.$searchWarehouseKeyword.value().toLowerCase();
      let result = await firebase.firestore().collection("storage").get();

      let results = getDataFromDocs(result.docs);
      let searchResults = [];
      for (let data of results) {
        if ((data.name.toLowerCase()).includes(keyword)) {
          searchResults.push(data);
        }
      }      
      this.renderData(searchResults);
    };

    this.$addWarehouse.onclick = () => {      
      this.$container.innerHTML = "";
      const $addStorageForm = new AddWarehouseForm();
      this.$container.appendChild($addStorageForm);
    };
    this.getData();

    this.$backLink.onclick = () => {
      router.navigate("/admin-page");
    };
  }

  static get observedAttributes() {
    return ["data"];
  }

  attributeChangedCallback(attrName, oldValue, newValue) {
    if (attrName == "data") {
      let warehousesData = JSON.parse(newValue);
        this.renderData(warehousesData);
    }
  }
  async getData() {
    let results = await firebase.firestore().collection("storage").get();   
    let data = getDataFromDocs(results.docs);
    this.setAttribute("data", JSON.stringify(data));
  }

  renderData(array) {
      array.sort(function (a, b) {
        if (a.name < b.name) {
          return -1;
        }
        if (a.name > b.name) {
          return 1;
        }
        return 0;
      })
    this.$warehouseList.innerHTML = "";
      for (let elem of array) {
        let $warehouseContainer = new WarehouseContainer(elem);
        this.$warehouseList.appendChild($warehouseContainer);
      }
  }
}

window.customElements.define("warehouse-list", WarehouseList);
