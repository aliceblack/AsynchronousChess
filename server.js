var express = require("express");
var bodyParser = require("body-parser");
var mongodb = require("mongodb");
var uuidv4 = require("uuid");

var ObjectID = mongodb.ObjectID;

var ITEMS_COLLECTION = "items";
var GAMES_COLLECTION = "items";

var app = express();
app.use(bodyParser.json());

var cors = require('cors');
app.use(cors());

// Create link to Angular build directory
var distDir = __dirname + "/dist/";
app.use(express.static(distDir));

// Create a database variable outside of the database connection callback to reuse the connection pool in your app.
var db;

var Chess = require("chess.js").Chess;


// Connect to the database before starting the application server.
mongodb.MongoClient.connect(process.env.MONGODB_URI || "mongodb://localhost:27017/test", function (err, client) {
  if (err) {
    console.log(err);
    process.exit(1);
  }

  // Save database object from the callback for reuse.
  db = client.db();
  console.log("Database connection ready");

  var server = app.listen(process.env.PORT || 8080, function () {
    var port = server.address().port;
    console.log("App now running on port", port);
  });
});


// Generic error handler used by all endpoints.
function handleError(res, reason, message, code) {
  console.log("ERROR: " + reason);
  res.status(code || 500).json({"error": message});
}

app.get("/api/item", function(req, res) {
    db.collection(ITEMS_COLLECTION).find({}).toArray(function(err, docs) {
      if (err) {
        handleError(res, err.message, "Failed to get items.");
      } else {
        res.status(200).json(docs);
      }
    });
});

app.post("/api/item", function(req, res) {
    var newItem = req.body;
    newItem.createDate = new Date();
    if (!req.body.name) {
      handleError(res, "Invalid user input", "Must provide a name.", 400);
    } else {
      db.collection(ITEMS_COLLECTION).insertOne(newItem, function(err, doc) {
        if (err) {
          handleError(res, err.message, "Failed to create new item.");
        } else {
          res.status(201).json(doc.ops[0]);
        }
      });
    }
});

app.get("/api/item/:id", function(req, res) {
    db.collection(ITEMS_COLLECTION).findOne({ _id: new ObjectID(req.params.id) }, function(err, doc) {
        if (err) {
          handleError(res, err.message, "Failed to get item");
        } else {
          res.status(200).json(doc);
        }
    });
});

app.put("/api/item/:id", function(req, res) {
    var updateDoc = req.body;
    delete updateDoc._id;
    db.collection(ITEMS_COLLECTION).updateOne({_id: new ObjectID(req.params.id)}, updateDoc, function(err, doc) {
      if (err) {
        handleError(res, err.message, "Failed to update item");
      } else {
        updateDoc._id = req.params.id;
        res.status(200).json(updateDoc);
      }
    });
});

app.delete("/api/item/:id", function(req, res) {
    db.collection(ITEMS_COLLECTION).deleteOne({_id: new ObjectID(req.params.id)}, function(err, result) {
        if (err) {
          handleError(res, err.message, "Failed to delete item");
        } else {
          res.status(200).json(req.params.id);
        }
    });
});

/* Chess */
function chessBoardCreate() {
  var chess = new Chess();
  return chess;
} 

function chessBoardLoad(fenString) {
  var chess = new Chess(fenString);
  return chess;
} 

function chessBoardToFen(chess) {
  let board = chess.fen();
  return board;
} 

function chessBoardToAscci(chess) {
  let board = chess.ascii();
  return board;
} 

function chessBoardMoves(chess) {
  let moves = chess.moves({ verbose: true });
  return moves;
} 

function chessBoardMove(chess, from, to) {
  //returning a move object if the move was legal, otherwise null
  let move = chess.move({ from: from, to: to });
  let fen = 'invalidMove';
  if(move!=null){
    fen = chess.fen();
  }
  return fen;
}

function chessBoardGameOver(chess) {
  //returns true if the game has ended via checkmate, stalemate, draw, threefold repetition, or insufficient material. Otherwise, returns false
  let gameOver = chess.gameOver;
  return gameOver;
}


function gameCreate(whiteName, blackName){
  let chess = chessBoardCreate();
  let fen = chessBoardToFen(chess);
  let id = gameIdCreate();
  let ascii = chess.ascii();
  return {id: id, fen: fen, white: whiteName, black: blackName, state:'running', ascii: ascii};
}

function gameIdCreate(){
  return uuidv4.v4();
}

function gameSave(game){
  db.collection(GAMES_COLLECTION).insertOne(game, function(err, doc) {
    if (err) {
      handleError(res, err.message, "Failed to save new game.");
    } else {
      return doc.ops[0];
    }
  });
}

function gameMoves(id){
  return new Promise((resolve, reject)=>{
    gameGet(id).then(game=>{
      let chess = chessBoardLoad(game.fen)
      let moves = chessBoardMoves(chess);
      resolve(moves);
    })
    .catch(error=>{
      reject(error)
    });
  });
}

function gameMove(id, from, to){
  return new Promise((resolve, reject)=>{
    gameGet(id).then(game=>{
      let chess = chessBoardLoad(game.fen)
      let fenMoveResult = chessBoardMove(chess, from, to);
      if(fenMoveResult!='invalidMove'){
        let status = chessBoardGameOver(fenMoveResult)
        let chessResult = chessBoardLoad(fenMoveResult);
        let ascii = chessResult.ascii();
        gameUpdate(id, fenMoveResult, status, ascii)
        .then(update=>{
          gameGet(id).then(gameUpdated=>{
            resolve(gameUpdated);
          });
        })
        .catch(error=>{
          reject(error)
        });
      }else{
        reject(fenMoveResult)
      }
    })
    .catch(error=>{
      reject(error)
    });
  });
}

function gameUpdate(id, fen, status, ascii){
  return new Promise((resolve, reject)=>{
    var newvalues = { $set: {fen: fen, status: status, ascii: ascii } };
    db.collection(GAMES_COLLECTION).updateOne({ id: id }, newvalues, function(err, res) {
      if (err) {
        reject(err.message);
      } else {
        resolve(res);
      }
    });
  });
}

function gameGet(id){
  return new Promise((resolve, reject)=>{
    db.collection(GAMES_COLLECTION).findOne({ id: id }, function(err, doc) {
      if (err) {
        reject(err.message);
      } else {
        resolve(doc);
      }
    });
  });
}

/* Create game */
app.put("/api/game", function(req, res) {
  if (!req.body.blackName) {
    handleError(res, "Invalid user input", "Must provide a blackName.", 400);
  } else if (!req.body.whiteName) {
    handleError(res, "Invalid user input", "Must provide a whiteName.", 400);
  } else {
    var blackName=req.body.blackName;
    var whiteName=req.body.whiteName;
    var newGame = gameCreate(whiteName, blackName)
    gameSave(newGame);
    res.status(201).json(newGame);
  }
});

/* Get game */
app.get("/api/game/:id", function(req, res) {
  gameGet(req.params.id).then(game=>{
    res.status(200).json(game);
  })
  .catch(error=>{
    handleError(res, error, "Failed to get game");
  });
});

/* Get game moves */
app.get("/api/game/:id/moves", function(req, res) {
  gameMoves(req.params.id).then(moves=>{
    res.status(200).json(moves);
  }).catch(error=>{
    handleError(res, error, "Failed to get game moves");
  });
});

/* Post game move */
app.post("/api/game/:id/move", function(req, res) {
  gameMove(req.params.id, req.body.from, req.body.to).then(gameUpdated=>{
    res.status(200).json(gameUpdated);
  }).catch(error=>{
    handleError(res, error, "Failed to move");
  });
});


