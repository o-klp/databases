var mysql = require('mysql');
var Sequelize = require('sequelize');
/* If the node mysql module is not found on your system, you may
 * need to do an "sudo npm install -g mysql". */

/* You'll need to fill the following out with your mysql username and password.
 * database: "chat" specifies that we're using the database called
 * "chat", which we created by running schema.sql.*/

var sequelize = new Sequelize('chat', 'root', '');

var Users = sequelize.define('users', {
  UserID: {type: Sequelize.INTEGER, allowNull: false, primaryKey: true, autoIncrement: true},
  UserName: {type: Sequelize.STRING, allowNull: false, unique: true}
});

var Messages = sequelize.define('messages', {
  MessageID: {type: Sequelize.INTEGER, allowNull: false, primaryKey: true, autoIncrement: true},
  UserID: {type: Sequelize.INTEGER, allowNull: false, foreignKey: true},
  Roomname: {type: Sequelize.STRING, allowNull: false, foreignKey: true},
  MessageText: {type: Sequelize.STRING, allowNull: false}
});

var Rooms = sequelize.define('rooms', {
  Roomname: {type: Sequelize.STRING, allowNull: false, primaryKey: true, unique: true}
});

Users.sync().success(function(){
  Rooms.sync().success(function(){
    Messages.sync().success(function(){

      exports.findAllMessages = function(cb){
        Messages.findAll().success(function(messages){
          cb(messages);
        });
      };

      exports.findUser = function(username, cb){
        Users.findAll({where: {UserName: username}}).success(function(user){
          cb(null, user);
        })
      };

      exports.saveUser = function(username, cb){
        var newUser = Users.build({UserName: username});
        newUser.save().success(function() {
          cb();
        });

      };

      exports.saveMessage = function(message, userid, roomname, cb){
        var newMessage = Messages.build({UserID: userid, Roomname: roomname, MessageText: message});
        var roomExists = false;
        Rooms.findAll({where: {Roomname: roomname}}).success(function(){
          roomExists = true;
        });
        if(!roomExists){
          var newRoom = Rooms.build({Roomname: roomname});
          newRoom.save().success(function(){
            console.log("room " + roomname + " created");
          });
        }
        newMessage.save().success(function(){
          cb();
        });
      };

    })
  })
})



// var dbConnection = mysql.createConnection({
//   user: "root",
//   password: "",
//   database: "chat"
// });

// dbConnection.connect();
// /* Now you can make queries to the Mysql database using the
//  * dbConnection.query() method.
//  * See https://github.com/felixge/node-mysql for more details about
//  * using this module.*/




// exports.findAllMessages = function(cb){
//   var queryString = "SELECT * FROM messages;";

//   dbConnection.query( queryString, function(error, result){
//     cb(error, result);
//   } );

// };

// exports.findUser = function(username, cb){

//   var queryString = "SELECT UserName, UserID FROM users WHERE UserName = '" + username + "';";

//   dbConnection.query( queryString, function(error, result){
//     cb(error, result);
//   } );
// };

// exports.saveUser = function(username, cb){

//   var queryString = "INSERT INTO users SET UserName = '" + username + "';";

//   dbConnection.query( queryString, function(error, result){
//     if(error){throw error};
//     cb();
//   } );

// };

// exports.saveMessage = function(message, userid, roomname, cb){
//   var queryString = "SELECT Roomname FROM rooms WHERE Roomname = '" + roomname + "';";

//   // Check if room already exists
//   dbConnection.query( queryString, function(error, result){
//     if(!result.length){
//       queryString = "INSERT INTO rooms SET Roomname = '" + roomname +"';";

//       dbConnection.query( queryString, function(error, result){

//       } );
//     }

//     // Add message to database
//     queryString = "INSERT INTO messages SET UserID=" + userid + ",Roomname=" + dbConnection.escape(roomname) + ",MessageText=" + dbConnection.escape(message) + ";";

//     dbConnection.query( queryString, function(error, result){
//       cb();
//     } );
//   } );
// };




