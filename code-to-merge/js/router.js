var root = null;
var useHash = true; // Defaults to: false
var hash = '#!'; // Defaults to: '#'
var router = new Navigo(root, useHash, hash);

let $app = document.getElementById("app");

router.on('/warehouse-list', function() {
    $app.innerHTML = '<warehouse-list></warehouse-list>';
    console.log("Bạn đang ở trang list kho");
}).resolve();

router.on('/add-warehouse-form', function() {
    $app.innerHTML = '<add-warehouse-form></add-warehouse-form>';
    console.log("Bạn đang ở trang thêm kho");
}).resolve();

window.router = router;
