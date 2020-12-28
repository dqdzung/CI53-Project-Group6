var root = null;
var useHash = true; // Defaults to: false
var hash = "#!"; // Defaults to: '#'
var router = new Navigo(root, useHash, hash);

router
  .on("/sign-up", function () {
    document.getElementById("app").innerHTML = "<sign-up-form></sign-up-form>";
  })
  .resolve();

router
  .on("/sign-in", function () {
    document.getElementById("app").innerHTML = "<sign-in-form></sign-in-form>";
  })
  .resolve();

router
  .on("/admin-page", function () {
    document.getElementById("app").innerHTML = "<admin-page></admin-page>";
  })
  .resolve();

window.router = router;
