import InputWrapper from "./InputWrapper.js";

const $template = document.createElement('template');
$template.innerHTML =  /*html*/`
    <form id="add-warehouse-form">
        <input-wrapper id="warehouse-name" Label="Name Warehouse" type="text" error="" value=""></input-wrapper>
        <input-wrapper id="product" Label="Product" type="text" error="" value=""></input-wrapper>
        <input-wrapper id="staff" Label="Staff" type="text" error="" value=""></input-wrapper>
        <button id="add-warehouse-btn">OK</button>
    </form>
`;

export default class AddWarehouseForm extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({mode: 'open'});
        this.shadowRoot.appendChild($template.content.cloneNode(true));
        this.$addWarehouse = this.shadowRoot.getElementById("add-warehouse-btn");
        this.$form = this.shadowRoot.getElementById("add-warehouse-form");
        this.$warehouseName = this.shadowRoot.getElementById("warehouse-name");
        this.$product = this.shadowRoot.getElementById("product");
        this.$staff = this.shadowRoot.getElementById("staff");

    }

    connectedCallback() {
        this.$form.onsubmit = async (event) => {
            event.preventDefault();  
                let warehouseName = this.$warehouseName.value();
                let product = this.$product.value();
                let staff = this.$staff.value();

                let isPassed =
                InputWrapper.validate(this.$warehouseName, (value) => value != '', "Nhập vào tên kho") &
                InputWrapper.validate(this.$product, (value) => value != '', "Nhập vào tên sản phẩm") &
                InputWrapper.validate(this.$staff, (value) => value != '', "Nhập vào tên người quản lý");

                console.log(isPassed);
            let x = confirm("You have saved on confirmation?")
                if(x == true){
                    if(isPassed) {
                        let result = await firebase
                        .firestore()
                        .collection('storage')
                        .add({
                            warehouseName: warehouseName,
                            product: product,
                            staff: staff
                        });
                        router.navigate('/warehouse-list');
                    }
                    else {

                    }
                }
            }
        }
    };

window.customElements.define('add-warehouse-form', AddWarehouseForm);