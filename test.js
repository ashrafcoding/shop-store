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

// {
//     men: 120,
//     women: 119,
//     kids: 120,
//     sports: 120,
//     digitals: 120,
//     furniture: 120
//   }


//   CREATE TABLE orders (
//     order_id SERIAL PRIMARY KEY,
//     user_id INT,
//     total_amount DECIMAL(10,2),
//     status VARCHAR(20), -- e.g., 'pending', 'processing', 'shipped', 'delivered', 'canceled'
//     created_at TIMESTAMP DEFAULT NOW(),
//     FOREIGN KEY (user_id) REFERENCES users(user_id)
// );

// CREATE TABLE order_items (
//     order_item_id SERIAL PRIMARY KEY,
//     order_id INT,
//     product_id INT,
//     quantity INT,
//     price DECIMAL(10,2), -- Price at the time of order
//     FOREIGN KEY (order_id) REFERENCES orders(order_id),
//     FOREIGN KEY (product_id) REFERENCES products(product_id)
// );



// bg-gradient-to-t from-gray-900/50 to-gray-900/25
'user_2p52eQTTDn3PYxRh5THrpssJHoa'