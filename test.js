"use strict";
exports.__esModule = true;
var placeholders_1 = require("./lib/placeholders");
function countCategory() {
    var myObj = {};
    placeholders_1.products.forEach(function (product) {
        if (myObj[product.category]) {
            myObj[product.category]++;
        }
        else {
            myObj[product.category] = 1;
        }
    });
    console.log(myObj);
}
countCategory();

{
    men: 120,
    women: 119,
    kids: 120,
    sports: 120,
    digitals: 120,
    furniture: 120
  }
