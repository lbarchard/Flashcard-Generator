var express    = require('express');  
var app        = express();     
var bodyParser = require('body-parser');

// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var port = process.env.PORT || 8080;        // set our port
var clozeCards = [];
var basicCards = [];

// ROUTES FOR OUR API
// =============================================================================
var router = express.Router();              // get an instance of the express Router


router.use(function(req, res, next) {
    // do logging
    console.log(req.originalUrl);
    next(); // make sure we go to the next routes and don't stop here
});


// test route to make sure everything is working (accessed at GET http://localhost:8080/api)
router.get('/clozecard', function(req, res) {
    //get a random card
    card = Math.floor(Math.random()*clozeCards.length);

    res.json({
        fullText: clozeCards[card].fullText,
        cloze: clozeCards[card].cloze,
        partialText: clozeCards[card].partialText
    });
});

router.get('/basiccard', function(req, res) {
    //get a random card
    card = Math.floor(Math.random()*basicCards.length);

    res.json({
        front: basicCards[card].front,
        back: basicCards[card].back,
    });
});

router.route('/clozecards')
    // create a clozecard (accessed at POST http://localhost:8080/api/clozecards)
    .post(function(req, res) {
        var clozeCard = {};
        ClozeCard.call(clozeCard, req.body.fullText, req.body.cloze);
        clozeCards.push(clozeCard);       

        res.json({ 
            message: 'Cloze card created!',
            fullText: clozeCards[clozeCards.length-1].fullText,
            cloze: clozeCards[clozeCards.length-1].cloze,
            partialText: clozeCards[clozeCards.length-1].partialText
        });
    });

router.route('/basiccards')
    // create a clozecard (accessed at POST http://localhost:8080/api/clozecards)
    .post(function(req, res) {
        var basicCard = {};
        BasicCard.call(basicCard, req.body.front, req.body.back);
        basicCards.push(basicCard);       

        res.json({ 
            message: 'Basic card created!',
            front: basicCards[basicCards.length-1].front,
            back: basicCards[basicCards.length-1].back,
        });
    });
        
// REGISTER THE ROUTES -------------------------------
// all of routes will be prefixed with /api
app.use('/api', router);

// START THE SERVER
// =============================================================================
app.listen(port);
console.log('Magic happens on port ' + port);

function BasicCard(front, back) {
    this.front = front;
    this.back = back;
}

function ClozeCard(fullText, cloze) {
    this.fullText = fullText;
    this.cloze = cloze;
    if (fullText.search(cloze) === -1) {
        this.partialText = "Oops"
    }
    else {
        this.partialText = fullText.replace(cloze, "...");
    }

}



//put BasicCard
//put ClozeCard
//delete BasicCard
//delete ClozeCard
//post BasicCard
//post ClozeCard
//get BasicCard
//get ClozeCard


// console.log(firstCard.partialText);