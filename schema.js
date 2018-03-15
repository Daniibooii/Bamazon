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
