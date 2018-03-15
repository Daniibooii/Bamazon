var mysql = require("mysql");

var connection = mysql.createConnection({
  host: "localhost",
  port: 3306,

  // Your username
  user: "root",

  // Your password
  password: "OreoOreo29!",
  database: "play_listDB"
});

connection.connect(function(err) {
  if (err) throw err;
  console.log("connected as id " + connection.threadId);
  createSong();
});

function createSong() {
  console.log("Inserting a new song...\n");
  var query = connection.query(
    "INSERT INTO songs SET ?",
    {
      title: "cannot think of songs today",
      artist: "dunno",
      genre: "sumit good"
    },
    function(err, res) {
      console.log(res.affectedRows + " song inserted!\n");
      // Call updateProduct AFTER the INSERT completes
      // logs the actual query being run // why not mysql?
      console.log(query.sql);
      updateSong();
    }
  );
}

function updateSong() {
  console.log("Updating all [something]...\n");
  var query = connection.query(
    "UPDATE songs SET ? WHERE ?",
    [
      {
        genre: "Hair Metal"
      },
      {
        genre: "Rock"
      }
    ],
    function(err, res) {
      console.log(res.affectedRows + " products updated!\n");
      // Call deleteProduct AFTER the UPDATE completes
      deleteSong();
    }
  );

  // logs the actual query being run
  console.log(query.sql);
}

function deleteSong() {
  console.log("Deleting all Grimey...\n");
  connection.query(
    "DELETE FROM songs WHERE ?",
    {
      artist: "Grimes"
    },
    function(err, res) {
      console.log(res.affectedRows + " artist deleted!\n");
      // Call readProducts AFTER the DELETE completes
      afterConnection();
    }
  );
}

function afterConnection() {
  connection.query("SELECT * FROM songs", function(err, res) {
    if (err) throw err;
    console.log(res);
    connection.end();
  });
}




--
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




function runSearch() {
  inquirer
    .prompt({
      name: "action",
      type: "rawlist",
      message: "What would you like to do?",
      choices: [
        "Find songs by artist",
        "Find all artists who appear more than once",
        "Find data within a specific range",
        "Search for a specific song",
        "Find artists with a top song and top album in the same year"
      ]
    })
    .then(function(answer) {
      switch (answer.action) {
      case "Find songs by artist":
        artistSearch();
        break;

      case "Find all artists who appear more than once":
        multiSearch();
        break;

      case "Find data within a specific range":
        rangeSearch();
        break;

      case "Search for a specific song":
        songSearch();
        break;

      case "Find artists with a top song and top album in the same year":
        songAndAlbumSearch();
        break;
      }
    });
}

function artistSearch() {
  inquirer
    .prompt({
      name: "artist",
      type: "input",
      message: "What artist would you like to search for?"
    })
    .then(function(answer) {
      var query = "SELECT position, song, year FROM top5000 WHERE ?";
      connection.query(query, { artist: answer.artist }, function(err, res) {
        for (var i = 0; i < res.length; i++) {
          console.log("Position: " + res[i].position + " || Song: " + res[i].song + " || Year: " + res[i].year);
        }
        runSearch();
      });
    });
}

function multiSearch() {
  var query = "SELECT artist FROM top5000 GROUP BY artist HAVING count(*) > 1";
  connection.query(query, function(err, res) {
    for (var i = 0; i < res.length; i++) {
      console.log(res[i].artist);
    }
    runSearch();
  });
}

function rangeSearch() {
  inquirer
    .prompt([
      {
        name: "start",
        type: "input",
        message: "Enter starting position: ",
        validate: function(value) {
          if (isNaN(value) === false) {
            return true;
          }
          return false;
        }
      },
      {
        name: "end",
        type: "input",
        message: "Enter ending position: ",
        validate: function(value) {
          if (isNaN(value) === false) {
            return true;
          }
          return false;
        }
      }
    ])
    .then(function(answer) {
      var query = "SELECT position,song,artist,year FROM top5000 WHERE position BETWEEN ? AND ?";
      connection.query(query, [answer.start, answer.end], function(err, res) {
        for (var i = 0; i < res.length; i++) {
          console.log(
            "Position: " +
              res[i].position +
              " || Song: " +
              res[i].song +
              " || Artist: " +
              res[i].artist +
              " || Year: " +
              res[i].year
          );
        }
        runSearch();
      });
    });
}

function songSearch() {
  inquirer
    .prompt({
      name: "song",
      type: "input",
      message: "What song would you like to look for?"
    })
    .then(function(answer) {
      console.log(answer.song);
      connection.query("SELECT * FROM top5000 WHERE ?", { song: answer.song }, function(err, res) {
        console.log(
          "Position: " +
            res[0].position +
            " || Song: " +
            res[0].song +
            " || Artist: " +
            res[0].artist +
            " || Year: " +
            res[0].year
        );
        runSearch();
      });
    });
}

function songAndAlbumSearch() {
  inquirer
    .prompt({
      name: "artist",
      type: "input",
      message: "What artist would you like to search for?"
    })
    .then(function(answer) {
      var query = "SELECT top_albums.year, top_albums.album, top_albums.position, top5000.song, top5000.artist ";
      query += "FROM top_albums INNER JOIN top5000 ON (top_albums.artist = top5000.artist AND top_albums.year ";
      query += "= top5000.year) WHERE (top_albums.artist = ? AND top5000.artist = ?) ORDER BY top_albums.year ";

      connection.query(query, [answer.artist, answer.artist], function(err, res) {
        console.log(res.length + " matches found!");
        for (var i = 0; i < res.length; i++) {
          console.log(
            "Album Position: " +
              res[i].position +
              " || Artist: " +
              res[i].artist +
              " || Song: " +
              res[i].song +
              " || Album: " +
              res[i].album +
              " || Year: " +
              res[i].year
          );
        }

        runSearch();
      });
    });
}
