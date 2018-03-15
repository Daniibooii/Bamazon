var mysql = require("mysql");
var inquirer = require("inquirer");
var connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  // Your username
  user: "root",
  // Your password
  password: "",
  database: "play_listDB"
});
connection.connect(function(err) {
  if (err) throw err;
  console.log("connected as id " + connection.threadId);
  runStart();
});
function runStart(){
  connection.query("SELECT * from products", function(err,res){
    console.log(res);
    inquirer
      .prompt({
      name: "choice",
      type: "input",
      message: "What items would you like to purchase?"
  })
  .then(function(answer) {
      var product = answer.choice;
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
      message: "How many items would you like to purchase?"
    })
    .then(function(answer){
      var amount = parsenInt(answer.quantity);
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
  }
)
