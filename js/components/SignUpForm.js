import InputWrapper from "./InputWrapper.js";
import { validateEmail, validatePassword } from "../utilities.js";

const $template = document.createElement("template");

$template.innerHTML = /*html*/ `
    <form id="sign-up-form">
        <h2>Sign Up</h2>
        <input-wrapper id="email" label="Email" type="email" error="" value=""></input-wrapper>
        <input-wrapper id="name" label="Name" type="text" error="" value=""></input-wrapper>
        <input-wrapper id="password" label="Password" type="password" error="" value=""></input-wrapper>
        <input-wrapper id="password-confirmation" label="Password Confirmation" type="password" error="" value=""></input-wrapper>
        <button>Sign Up</button>
        <div>Have an account?<b><a href="#!/sign-in">Sign In</a></b></div>
    </form>
`;

export default class SignUpForm extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.shadowRoot.appendChild($template.content.cloneNode(true));

    this.$form = this.shadowRoot.getElementById("sign-up-form");
    this.$email = this.shadowRoot.getElementById("email");
    this.$name = this.shadowRoot.getElementById("name");
    this.$password = this.shadowRoot.getElementById("password");
    this.$passwordConfirmation = this.shadowRoot.getElementById("password-confirmation");
  }

  connectedCallback() {
    this.$form.onsubmit = async (event) => {
      event.preventDefault();
      let email = this.$email.value();
      let name = this.$name.value();
      let password = this.$password.value();
      let passwordConfirmation = this.$passwordConfirmation.value();
      let isPassed =
        (InputWrapper.validate(this.$email, (value) => value != "", "Please enter a valid email!") &&
          InputWrapper.validate(this.$email, (value) => validateEmail(value), "Invalid email!")) &
        InputWrapper.validate(this.$name, (value) => value != "", "Please enter a name!") &
        (InputWrapper.validate(this.$password, (value) => value != "", "Please enter a password!") &&
          InputWrapper.validate(
            this.$password,
            (value) => validatePassword(value),
            "Must have at least 8 characters, one letter and one number!"
          )) &
        (InputWrapper.validate(this.$passwordConfirmation, (value) => value != "", "Re-enter your password!") &&
          InputWrapper.validate(this.$passwordConfirmation, (value) => value == password, "Password doesn't match!"));

      if (isPassed) {
        let result = await firebase.firestore().collection("users").where("email", "==", email).get();

        if (result.empty) {
          firebase
            .firestore()
            .collection("users")
            .add({
              name: name,
              email: email,
              password: CryptoJS.MD5(password).toString(),
            });
          alert("Sign Up Completed!");
          console.log("Registered!");
          InputWrapper.clearInput(this.$email, this.$name, this.$password, this.$passwordConfirmation);
        } else {
          alert("Email already been used!");
          console.log("Failed!");
        }
      }
    };
  }
}

window.customElements.define("sign-up-form", SignUpForm);
