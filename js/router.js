import StaffDetailForm from "./components/StaffDetailForm.js";
import UserProfile from "./components/UserProfile.js";
import UserPage from "./screens/UserPage.js";
import {
  getCurrentUser,
  getDataFromDocs,
  getDataFromDoc,
} from "./utilities.js";

var root = null;
var useHash = true; // Defaults to: false
var hash = "#!"; // Defaults to: '#'
var router = new Navigo(root, useHash, hash);

let $app = document.getElementById("app");

router
  .on("/", function () {
    $app.innerHTML = /*html*/ `
  <h1>Storage Management</h1>
  <div id="btn-container">
    <a href="#!/sign-up"><button>Sign Up</button></a>
    <a href="#!/sign-in"><button>Sign In</button></a>
  </div>
  <div id="about">About</div>
`;
  })
  .resolve();

router
  .on("/sign-up", function () {
    $app.innerHTML = "<sign-up-form></sign-up-form>";
  })
  .resolve();

router
  .on("/sign-in", function () {
    const currentUser = getCurrentUser();
    if (currentUser) {
      alert(`Already signed in as ${currentUser.name}, redirecting...`);
      if (currentUser.name == "admin") {
        router.navigate("/admin-page");
      } else router.navigate("/user-page");
    } else $app.innerHTML = "<sign-in-form></sign-in-form>";
  })
  .resolve();

router
  .on("/admin-page", function () {
    const currentUser = getCurrentUser();
    if (currentUser && currentUser.name == "admin") {
      $app.innerHTML = "<admin-page></admin-page>";
    } else router.navigate("/sign-in");
  })
  .resolve();

router
  .on("/user-page", function () {
    $app.innerHTML = "";
    const currentUser = getCurrentUser();
    if (currentUser) {
      const $userPage = new UserPage(currentUser);
      $app.appendChild($userPage);
    }
  })
  .resolve();

router
  .on("/staff-mngmnt", function () {
    const currentUser = getCurrentUser();
    if (currentUser && currentUser.name == "admin") {
      $app.innerHTML = "<staff-mngmnt></staff-mngmnt>";
    } else router.navigate("/sign-in");
  })
  .resolve();

router
  .on("/staff-mngmnt/:id", async function (param) {
    const currentUser = getCurrentUser();
    if (currentUser && currentUser.name == "admin") {
      $app.innerHTML = "";
      let result = await firebase.firestore().collection("users").get();
      let data = getDataFromDocs(result.docs);
      let userExist = false;
      for (let user of data) {
        if (user.id == param.id) {
          userExist = true;
          let $detailForm = new StaffDetailForm(user);
          $app.appendChild($detailForm);
        }
      }
      if (!userExist) {
        router.navigate("/staff-mngmnt");
      }
    } else router.navigate("/sign-in");
  })
  .resolve();

router
  .on("/profile/:id", async function (param) {
    const currentUser = getCurrentUser();
    if (currentUser) {
      $app.innerHTML = "";
      let result = await firebase
        .firestore()
        .collection("users")
        .doc(param.id)
        .get();
      const user = result.data();
      const $userProfile = new UserProfile(user);
      $app.appendChild($userProfile);
    }
  })
  .resolve();

const $about = document.getElementById("about");
$about.onclick = () => {
  alert(`A CI53 Project by Group 6:
    - ĐQD
    - HĐ`);
};

window.router = router;
