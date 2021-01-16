import { getCurrentUser, saveCurrentUser } from "../utilities.js";
import InputWrapper from "./InputWrapper.js";

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
        #button-container {
            display: flex;
            justify-content: center;
        }
        #save-btn {
          display: none;
        }

    </style>
    <span id="back-link">Back</span>
    <profile-link></profile-link>
    <h1>Info</h1>
    <div>              
        <div id="content">  
        </div>
        <div id="button-container">
        <button id="edit-btn">Edit</button>
        <button id="save-btn">Save</button>         
        </div>       
    </div>
`;

export default class UserProfile extends HTMLElement {
  constructor(data) {
    super();

    this.attachShadow({ mode: "open" });
    this.shadowRoot.appendChild($template.content.cloneNode(true));

    this.$content = this.shadowRoot.getElementById("content");
    this.$backLink = this.shadowRoot.getElementById("back-link");
    this.$editBtn = this.shadowRoot.getElementById("edit-btn");
    this.$saveBtn = this.shadowRoot.getElementById("save-btn");

    this.setAttribute("data", JSON.stringify(data));
  }

  static get observedAttributes() {
    return ["data"];
  }

  attributeChangedCallback(attrName, oldValue, newValue) {
    if (attrName == "data") {
      let data = JSON.parse(newValue);
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
                </table>
                `;
    }
  }

  connectedCallback() {
    this.$backLink.onclick = () => {
      router.navigate("/user-page");
    };

    this.$editBtn.onclick = () => {
      const data = getCurrentUser();
      this.$content.innerHTML = /*html*/ `
      <input-wrapper label="Name" type="text" error="" value="${data.name}"></input-wrapper>
      <input-wrapper label="Age" type="text" error="" value="${data.age}"></input-wrapper>
      <input-wrapper label="Address" type="text" error="" value="${data.address}"></input-wrapper>
      `;
      this.$editBtn.style.display = "none";
      this.$saveBtn.style.display = "block";
      this.$saveBtn.onclick = async () => {
        const $inputWrapperList = this.$content.querySelectorAll(
          "input-wrapper"
        );
        data.name = $inputWrapperList[0].value();
        data.age = $inputWrapperList[1].value();
        data.address = $inputWrapperList[2].value();
        await firebase
          .firestore()
          .collection("users")
          .doc(data.id)
          .set(data)
          .then(function () {
            console.log("Document successfully written!");
          });
        saveCurrentUser(data);
        location.reload();
      };
    };
  }
}

window.customElements.define("user-profile", UserProfile);
