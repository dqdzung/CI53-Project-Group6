import InputWrapper from "./InputWrapper.js";

const $template = document.createElement('template');
$template.innerHTML =  /*html*/`
    <form id="add-warehouse-form">
        <input-wrapper id="warehouse-name" Label="Storage name" type="text" error="" value=""></input-wrapper>
        <input-wrapper id="product" Label="Content" type="text" error="" value=""></input-wrapper>        
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
        

    }

    connectedCallback() {
        this.$form.onsubmit = async (event) => {
            event.preventDefault();  
                let warehouseName = this.$warehouseName.value();
                let product = this.$product.value();
                

                let isPassed =
                InputWrapper.validate(this.$warehouseName, (value) => value != '', "Insert a name for the storage") &
                InputWrapper.validate(this.$product, (value) => value != '', "Insert storage's content");
                

                
            let confirmation = confirm("Are you sure you want to create this storage?")
                if(confirmation){
                    if(isPassed) {
                        let result = await firebase
                        .firestore()
                        .collection('storage')
                        .add({
                            name: warehouseName,
                            content: product,                            
                        });
                        location.reload();
                    }
                    else {

                    }
                }
            }
            this.$product.onkeyup = (e) => {
                if (e.key == "Enter") {
                    console.log(e.key);
                    this.$form.onsubmit(e);
                }
            }
        }
    };

window.customElements.define('add-warehouse-form', AddWarehouseForm);