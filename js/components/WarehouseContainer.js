import { getDataFromDoc, getDataFromDocs } from "../utilities.js";

const $template = document.createElement("template");
$template.innerHTML = /*html*/ `
    <style>
        #warehouse-container {
            display: flex;
            padding: 12px;
            border-bottom: 1px solid #cccccc;
            align-items: center;
            justify-content: space-between;
        }
        table {
            border-collapse: separate;
            border-spacing: 75px 0;
        }

        td {
            margin: 20px;
        }

        #save {
            display: none;
        }

    </style>
    <div id="warehouse-container">
    <table is="s-table-lite" fixed-column>
        <tbody is="s-tbody">
            <tr is="s-tr" multi>
                <td id='warehouse-name'></td>
                <td id='product'></td>
                <td id='staff'></td>
                <td><button id='delete'>Delete</button></td>
                <td><button id='update'>Update</button></td>
                <td><button id='save'>Save</button></td>
            </tr>
        </tbody>
    </table>
    </div>
`;

export default class WarehouseContainer extends HTMLElement {
  constructor(data) {
    super();
    this.attachShadow({ mode: "open" });
    this.shadowRoot.appendChild($template.content.cloneNode(true));
    this.$warehouseName = this.shadowRoot.getElementById("warehouse-name");
    this.$product = this.shadowRoot.getElementById("product");
    this.$staff = this.shadowRoot.getElementById("staff");
    this.$delete = this.shadowRoot.getElementById("delete");
    this.$update = this.shadowRoot.getElementById("update");
    this.$warehouseContainer = this.shadowRoot.getElementById(
      "warehouse-container"
    );
    this.$save = this.shadowRoot.getElementById("save");

    this.setAttribute("data", JSON.stringify(data));
  }

  connectedCallback() {
    let data = this.getAttribute("data");
    // console.log(JSON.parse(data));
    this.$delete.onclick = async () => {
      const deleteWarehouse = confirm("Delete this storage?");
      if (deleteWarehouse) {
        const warehouseData = JSON.parse(data);
        await firebase
          .firestore()
          .collection("storage")
          .doc(warehouseData.id)
          .delete();
      } else {
        location.reload();
      }
      location.reload();
    };
    this.$update.onclick = async () => {
      this.$delete.style.display = "none";
      this.$update.style.display = "none";
      this.$save.style.display = "block";
      let name = this.$warehouseName.innerHTML;
      let content = this.$product.innerHTML;
      let staff = this.$staff.innerHTML;
      this.$warehouseName.innerHTML = /*html*/ ` <input type="text" value="${name}"/>`;
      this.$product.innerHTML = /*html*/ ` <input type="text" value="${content}">`;

      let results = await firebase.firestore().collection("users").get();
      let data = getDataFromDocs(results.docs);
      let staffData = data.filter((elem) => elem.name != "admin");
    };

    this.$save.onclick = async () => {
      if (confirm("Do you want to save changes?")) {
        const $inputs = this.shadowRoot.querySelectorAll("input");
        this.$warehouseName.innerHTML = $inputs[0].value;
        this.$product.innerHTML = $inputs[1].value;
        //   this.$staff.innerHTML = this.$staff.firstChild.value;
        const data = JSON.parse(this.getAttribute("data"));
        firebase
          .firestore()
          .collection("storage")
          .doc(data.id)
          .update({ name: $inputs[0].value, content: $inputs[1].value });
        this.$save.style.display = "none";
        this.$delete.style.display = "block";
        this.$update.style.display = "block";
      }
    };
  }

  static get observedAttributes() {
    return ["data"];
  }

  async attributeChangedCallback(attrName, oldValue, newValue) {
    if (attrName == "data") {
      let data = JSON.parse(newValue);
      // console.log(newValue);
      this.$warehouseName.innerHTML = data.name;
      this.$product.innerHTML = data.content;
      if (!data.staff) {
        this.$staff.innerHTML = "unassigned";
      } else {
        let staffData = await firebase
          .firestore()
          .collection("users")
          .doc(data.staff)
          .get();
        let staff = getDataFromDoc(staffData);
        this.$staff.innerHTML = staff.name;
      }
    }
  }
}

window.customElements.define("warehouse-container", WarehouseContainer);
