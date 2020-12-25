import InputWrapper from "./InputWrapper.js";
import { getDataFromDoc, validateEmail, validatePassword, saveCurrentUser, getCurrentUser } from "../utilities.js";


const $template = document.createElement("template");

$template.innerHTML = /*html*/ `
    <form id="sign-in-form">
        <h2>Sign In</h2>
        <input-wrapper id="email" label="Email" type="email" error="" value=""></input-wrapper>
        <input-wrapper id="password" label="Password" type="password" error="" value=""></input-wrapper>
        <button>Sign In</button>
        <div>Don't have an account?<b><a href="#!/sign-up">Sign Up</a></b></div>
    </form>
`;

export default class SignInForm extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.shadowRoot.appendChild($template.content.cloneNode(true));

    this.$form = this.shadowRoot.getElementById("sign-in-form");
    this.$email = this.shadowRoot.getElementById("email");
    this.$password = this.shadowRoot.getElementById("password");
  }

  connectedCallback() {
    this.$form.onsubmit = async (event) => {
      event.preventDefault();
      let email = this.$email.value();
      let password = this.$password.value();

      let isPassed =
        (InputWrapper.validate(this.$email, (value) => value != "", "Enter a valid email") &&
          InputWrapper.validate(this.$email, (value) => validateEmail(value), "Invalid email!")) &
        (InputWrapper.validate(this.$password, (value) => value != "", "Enter a valid password") &&
          InputWrapper.validate(this.$password, (value) => validatePassword(value), "Invalid password!"));

      if (isPassed) {
        let result = await firebase
          .firestore()
          .collection("users")
          .where("email", "==", email)
          .where("password", "==", CryptoJS.MD5(password).toString())
          .get();

        if (result.empty) {
          alert("Incorrect email or password!");
        } else {
          alert("Signing In!");
          saveCurrentUser(getDataFromDoc(result.docs[0]));
          console.log("Logged In", getCurrentUser());
        //   router.navigate("/main");
        }
        InputWrapper.clearInput(this.$email, this.$password);
      }
    };
  }
}

window.customElements.define("sign-in-form", SignInForm);
