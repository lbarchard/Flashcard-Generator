var express    = require('express');  
var app        = express();     
var bodyParser = require('body-parser');
var mysql      = require("mysql");

var flashCardDB = mysql.createConnection({
  host: "localhost",
  port: 3306,

  // Your username
  user: "root",

  // Your password
  password: "PASSWORD HERE",
  database: "Flash_Card"
});

flashCardDB.connect(function(err) {
  if (err) throw err;
  console.log("connected as id " + flashCardDB.threadId);
});


// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var port = process.env.PORT || 8080;        // set our port
var clozeCards = [];  //array to store any created cloze cards
var basicCards = [];  //array to store any created basic cards
var card = 0 //the card to pull out of the cards table

// ROUTES FOR OUR API
// =============================================================================
var router = express.Router();              // get an instance of the express Router


router.use(function(req, res, next) {
    // do logging
    console.log(req.originalUrl);
    console.log(req.body);
    next(); // make sure we go to the next routes and don't stop here
});


router.get('/clozecard', function(req, res) {
    flashCardDB.query("SELECT * FROM cloze_flash_cards", function(dbErr, dbRes) {
        if (dbErr) throw dbErr;
        //get a random cloze card
        card = Math.floor(Math.random()*dbRes.length);
        res.json({
            fullText: dbRes[card].full_text,
            cloze: dbRes[card].cloze,
            partialText: dbRes[card].partial_text
        });
    });
});

router.get('/basiccard', function(req, res) {
    flashCardDB.query("SELECT * FROM basic_flash_cards", function(dbErr, dbRes) {
        if (dbErr) throw dbErr;
        //get a random basic card
        card = Math.floor(Math.random()*dbRes.length);
        res.json({
            front: dbRes[card].front,
            back: dbRes[card].back,
        });
    });
});

router.route('/clozecards')
    // create a clozecard (accessed at POST http://localhost:8080/api/clozecards)
    .post(function(req, res) {
        var clozeCard = {};
        ClozeCard.call(clozeCard, req.body.fullText, req.body.cloze);
        if (clozeCard.valid === true) {
            delete clozeCard.valid;
            flashCardDB.query(
            "INSERT INTO cloze_flash_cards set ?",clozeCard,function (err, res) {
                if (err) {
                    throw err;
                }
            }
            );
            res.json({ 
                message: 'Cloze card created!'
            });
        }
        else {
            res.json({
                message: 'Cloze card was not valid, not created!'
            })
        }
        clozeCard = {};
    });

router.route('/basiccards')
    // create a basic card (accessed at POST http://localhost:8080/api/basiccards)
    .post(function(req, res) {
        var basicCard = {};
        BasicCard.call(basicCard, req.body.front, req.body.back);

        flashCardDB.query(
            "INSERT INTO basic_flash_cards set ?",basicCard,function (err, res) {
                if (err) {
                    throw err;
                }
            }
        );
        res.json({ 
            message: 'Basic card created!'
        });
        basicCard = {};
    });
        
// REGISTER THE ROUTES -------------------------------
// all of routes will be prefixed with /api
app.use('/api', router);

// START THE SERVER
// =============================================================================
app.listen(port);
console.log('Magic happens on port ' + port);




//My contructors!!!!
// ==============================
function BasicCard(front, back) {
    this.front = front;
    this.back = back;
}

function ClozeCard(fullText, cloze) {
    this.full_text = fullText;
    this.cloze = cloze;
    if (fullText.search(cloze) === -1) {
        this.partial_text = "Oops"
        this.valid = false
    }
    else {
        this.partial_text = fullText.replace(cloze, "...");
        this.valid = true
    }

}