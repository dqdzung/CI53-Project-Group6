import StaffDetailForm from "./components/StaffDetailForm.js";
import { getDataFromDocs } from "./utilities.js";

var root = null;
var useHash = true; // Defaults to: false
var hash = "#!"; // Defaults to: '#'
var router = new Navigo(root, useHash, hash);

let $app = document.getElementById("app");

router
  .on("/sign-up", function () {
    $app.innerHTML = "<sign-up-form></sign-up-form>";
  })
  .resolve();

router
  .on("/sign-in", function () {
    $app.innerHTML = "<sign-in-form></sign-in-form>";
  })
  .resolve();

router
  .on("/admin-page", function () {
    $app.innerHTML = "<admin-page></admin-page>";
  })
  .resolve();

router
  .on("/staff-mngmnt", function () {
    $app.innerHTML = "<staff-mngmnt></staff-mngmnt>";
  })
  .resolve();

router
  .on("/staff-mngmnt/:id", async function (param) {
    $app.innerHTML = "";   
    let result = await firebase.firestore().collection("staff").get();
    let data = getDataFromDocs(result.docs);
    
    for (let user of data) {
      if (user.id == param.id) {
        let $detailForm = new StaffDetailForm(user);
        $app.appendChild($detailForm);
      }
    }
    
  })
  .resolve();

window.router = router;
