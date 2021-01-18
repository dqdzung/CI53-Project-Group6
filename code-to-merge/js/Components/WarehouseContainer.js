const $template = document.createElement('template');
$template.innerHTML = /*html*/ `
    <style>
        #warehouse-container {
            padding: 12px;
            border-bottom: 1px solid #cccccc;
            align-items: center;
        }
        table {
            border-collapse: separate;
            border-spacing: 110px 0;
        }

        td {
            padding: 10px 0;
        }
    </style>
    <div id="warehouse-container">
    <table is="s-table-lite" fixed-column>
        <tbody is="s-tbody">
            <tr is="s-tr" multi>
                <td id='warehouse-name'>Warehouse 1</td>
                <td id='product'>Computer</td>
                <td id='staff'>Hung</td>
                <td><button id='delete'>Delete</button></td>
                <td><button id='update'>Update</button></td>
            </tr>
        </tbody>
    </table>
    </div>
`;

export default class WarehouseContainer extends HTMLElement {
    constructor(data) {
        super();
        this.attachShadow({mode: 'open'});
        this.shadowRoot.appendChild($template.content.cloneNode(true));
        this.$warehouseName = this.shadowRoot.getElementById('warehouse-name');
        this.$product = this.shadowRoot.getElementById('product');
        this.$staff = this.shadowRoot.getElementById('staff');
        this.$delete = this.shadowRoot.getElementById('delete');
        this.$update = this.shadowRoot.getElementById("update");
        this.$warehouseContainer = this.shadowRoot.getElementById("warehouse-container");


        this.setAttribute('data', JSON.stringify(data));
 
    }

    connectedCallback() {
        let data = this.getAttribute('data');
        // console.log(JSON.parse(data));
        this.$delete.onclick = async () => {
            const deleteWarehouse = confirm("Delete this warehouse");
            if(deleteWarehouse) {
                const warehouseData = JSON.parse(data);
                await firebase.firestore().collection('storage').doc(warehouseData.id).delete()  
            }
            else {
                location.reload();
            }
            location.reload();
        }
        this.$update.onclick = () => {
            this.$warehouseContainer.innerHTML = /*html*/`
                <div id="update-container">
                <input-wrapper label="Warehouse Name" type='text' error="" value=""></input-wrapper>
                <input-wrapper label="Product" type='text' error="" value=""></input-wrapper>
                <input-wrapper label="Staff" type='text' error="" value=""></input-wrapper>
                <button id="confirm">Ok</button>
                </div>
            `;

        this.$confirm .onsubmit = async (event) => {
            event.preventDefault(); 
            const $listWarehouse = this.$warehouseContainer.querySelector("input-wrapper");
            this.$warehouseName.innerHTML = $listWarehouse[0].value();
            this.$product.innerHTML = $listWarehouse[1].value();
            this.$staff.innerHTML = $listWarehouse[2].value();
            await firebase.firestore().collection("storage").doc(warehouseData.id).update();

        }
       }
    }

    static get observedAttributes() {
        return ['data'];
    }

    attributeChangedCallback(attrName, oldValue, newValue) {
        if (attrName == 'data') {
            let data = JSON.parse(newValue);
            console.log(newValue);
           this.$warehouseName.innerHTML = data.warehouseName;
           this.$product.innerHTML = data.product;
           this.$staff.innerHTML = data.staff;
        }
    }
}

window.customElements.define('warehouse-container', WarehouseContainer);