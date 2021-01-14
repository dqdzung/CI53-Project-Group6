const $template = document.createElement("template");
$template.innerHTML = /*html*/ `
    <style>
        td{
            padding: 25px 0px 0px 40px;
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
            line-height: 50px;
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

    </style>
    <profile-link name="Admin"></profile-link>
    <h1>Info</h1>
    <div id="staff-detail-from">              
        <div id="content">  
        </div>
        <button>Delete</button>
        <button>Assign</button>
    </div>
`

export default class StaffDetailForm extends HTMLElement {
    constructor(data) {
        super();

        this.attachShadow({mode: "open"});
        this.shadowRoot.appendChild($template.content.cloneNode(true));

        this.$content = this.shadowRoot.getElementById("content");
        
        this.setAttribute("data", JSON.stringify(data)); 
    }

    static get observedAttributes() {
        return ["data"];
    }

    attributeChangedCallback(attrName, oldValue, newValue) {
        if (attrName == "data") {
            let data = JSON.parse(newValue); 
            console.log(data.manageStorage);           
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
                        <td>(placeholder)</td>
                    </tr>
                </table>
                `
        }
    }

}

window.customElements.define("staff-detail-form", StaffDetailForm);
