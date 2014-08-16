var mysql = require('mysql');
var mysql = require('mysql');
/* If the node mysql module is not found on your system, you may
 * need to do an "sudo npm install -g mysql". */

/* You'll need to fill the following out with your mysql username and password.
 * database: "chat" specifies that we're using the database called
 * "chat", which we created by running schema.sql.*/
var dbConnection = mysql.createConnection({
  user: "root",
  password: "",
  database: "chat"
});

dbConnection.connect();
/* Now you can make queries to the Mysql database using the
 * dbConnection.query() method.
 * See https://github.com/felixge/node-mysql for more details about
 * using this module.*/




exports.findAllMessages = function(cb){
};

exports.findUser = function(username, cb){

  var queryString = "SELECT UserName, UserID FROM users WHERE UserName = '" + username + "';";

  dbConnection.query( queryString, function(error, result){
    cb(error, result);
  } );
};

exports.saveUser = function(username, cb){

  var queryString = "INSERT INTO users SET UserName = '" + username + "';";

  dbConnection.query( queryString, function(error, result){
    if(error){throw error};
    cb();
  } );

};

exports.saveMessage = function(message, userid, roomname, cb){
  var queryString = "SELECT Roomname FROM rooms WHERE Roomname = '" + roomname + "';";

  // Check if room already exists
  dbConnection.query( queryString, function(error, result){
    if(!result.length){
      queryString = "INSERT INTO rooms SET Roomname = '" + roomname +"';";

      dbConnection.query( queryString, function(error, result){

      } );
    }

    // Add message to database
    queryString = "INSERT INTO messages (MessageText,UserID,Roomname) VALUES (" + dbConnection.escape(message) + "," + userid + ",'" + roomname + "');"
    dbConnection.query( queryString, function(error, result){
      console.log('Message Saved: error ', error, "result", result);
      cb();
    } );
  } );
};






