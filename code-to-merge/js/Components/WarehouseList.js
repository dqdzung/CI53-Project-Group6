import { getDataFromDoc , getDataFromDocs } from "../utils.js";
import InputWrapper from "./InputWrapper.js";
import WarehouseContainer from "./WarehouseContainer.js";

const $template = document.createElement('template');
$template.innerHTML = /*html*/ `
    <style>
         #search-warehouse-form {
            padding: 15px;
            display: flex;
            justify-content: space-between;
            align-items: center;
            border-bottom: 1px solid #cccccc;
        }
        #search-warehouse-btn {
            border: 1px solid #1995ad;
            height: 30px;
            width: 100px;
            border-radius: 5px;
        }
        #search-warehouse-keyword {
            height: 20px;
            width: calc(100% - 100px - 15px);
        }
        table {
            border-collapse: separate;
            border-spacing: 102px 0;
        }

        th {
            padding: 10px 0;
        }      
        
    </style>
        <div>
            <button id="add-warehouse-btn">Thêm kho</button>
        </div>
        <div>
            <form id="search-warehouse-form">
                <input-wrapper id="search-warehouse-keyword" label="" type="text" error=""></input-wrapper>
                <button id="search-warehouse-btn">Tìm kiếm</button>
            </form>
        </div>

        <table is="s-table-lite" fixed-column>
        <thead>
            <tr>
                <th>Warehouse Name</th>
                <th>Product</th>
                <th>Staff</th>
                <th></th>
            </tr>
        </thead>
        </table>
    <div id='warehouse-list'></div>
`;

export default class WarehouseList extends HTMLElement {
    constructor(data) {
        super();
        this.attachShadow({mode: 'open'});
        this.shadowRoot.appendChild($template.content.cloneNode(true)); 
        this.$warehouseList = this.shadowRoot.getElementById('warehouse-list')
        this.$addWarehouse = this.shadowRoot.getElementById("add-warehouse-btn");
        this.$searchWarehouseForm = this.shadowRoot.getElementById("search-warehouse-form");
        this.$searchWarehouseKeyword = this.shadowRoot.getElementById("search-warehouse-keyword");  

        this.setAttribute('data', JSON.stringify(data));
    }

    connectedCallback() {
        this.$searchWarehouseForm.onsubmit = async (event) => {
            event.preventDefault();

            let keyword = this.$searchWarehouseKeyword.value();

            let isPassed = InputWrapper.validate(this.$searchWarehouseKeyword, (value) => value != '', "Nhập vào tên người quản lý");

            if(isPassed) {
                let result = await firebase
                .firestore()
                .collection('storage')
                .where('staff', '==', keyword)
                .get();

                let data = getDataFromDocs(result.docs);
                this.setAttribute('data', JSON.stringify(data))
            }   
        }
        this.$addWarehouse.onclick = () => {
            router.navigate('/add-warehouse-form');
        }
        this.getData()

    }

    static get observedAttributes() {
        return ['datas'];
    }

    attributeChangedCallback(attrName, oldValue, newValue) {
        if(attrName == 'datas') {
            let warehousesData= JSON.parse(newValue);
                       
            for(let warehouseData of warehousesData) {
                // console.log(warehouseData)
                let $warehouseContainer = new WarehouseContainer(
                    warehouseData
                    );
                this.$warehouseList.appendChild($warehouseContainer);
            }
        }
    }
        async getData() {
            let results = await firebase.firestore().collection("storage").get();
            let datas = getDataFromDocs(results.docs);
            this.setAttribute('datas', JSON.stringify(datas))
        }
        


    
}

window.customElements.define('warehouse-list', WarehouseList);