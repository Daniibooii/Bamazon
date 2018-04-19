var mysql = require("mysql");
var inquirer = require("inquirer");
require("console.table");

var connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  // Your username
  user: "root",
  // Your password
  password: "OreoOreo29!",
  database: "bamazon"
});
connection.connect(function(err) {
  if (err) throw err;
  console.log("connected as id " + connection.threadId);
  loadProducts()
});
// Function to load the products table from the database and print results to the console
function loadProducts() {
  // Selects all of the data from the MySQL products table
  connection.query("SELECT * FROM products", function(err, res) {
    if (err) throw err;

    // Draw the table in the terminal using the response
    console.table(res);

    // Then prompt the customer for their choice of product, pass all the products to promptCustomerForItem
    runStart();
  });
}
function runStart(){
  connection.query("SELECT * from products", function(err,res){
    console.log(res);
    inquirer
      .prompt({
      name: "choice",
      type: "input",
      message: "What items would you like to purchase?"
  })
  .then(function(val) {
      var product = val.choice;
      console.log(product);
      if (product){
      promptUserQuantity(product);
      };
    })
  })
}
function promptUserQuantity(product){
  inquirer
    .prompt({
      name: "quantity",
      type: "input",
      message: "How many would you like? [Quit with Q]",
         validate: function(val) {
           return val > 0 || val.toLowerCase() === "q";
         }
    })
    .then(function(val) {
      // Check if the user wants to quit the program
      checkIfShouldExit(val.quantity);
      var quantity = parseInt(val.quantity);
    })
    .then(function(val){
      var amount = parseInt(val.quantity);
      var total = (amount,product)
      if (amount > product.stock_quantity){
        makePurchase(total);
      } else {
        console.log("\n Put in a valid number!");
        runStart();
      }
  })
}
function makePurchase(total){
  connection.query("UPDATE products SET stock_quantity = stock_quantity - ? WHERE item_id = ?",
    [amount, product.item_id],
    function(res,err){
    console.log("Successfully purchased " + amount + " quantity of " + product.product_name + " 's!");
    runStart();
  })
}
function checkInventory(choiceId, inventory) {
  for (var i = 0; i < inventory.length; i++) {
    if (inventory[i].item_id === choiceId) {
      return inventory[i];
    }
  }
  return null;
}
function checkIfShouldExit(choice) {
  if (choice.toLowerCase() === "q") {
    console.log("Goodbye!");
    process.exit(0);
  }
}
