var express = require("express"),
    ejs = require("ejs"),
    bodyParser = require("body-parser"),
    methodOverride = require("method-override");



var app = express();



// Set the view engine to be "EJS"
app.set('view engine', 'ejs');

// Set up body parser
app.use(bodyParser.urlencoded({extended: true}));

// Set up method override to work with POST requests that have the parameter "_method=DELETE"
app.use(methodOverride('_method'))




// Let's add some routes here together:
app.get('/', function(req, res) {
   res.render('index.ejs', {title: "Hello"}); // We use res.render to display an EJS file instead of res.send() 
});


// Start the server on port 3000
app.listen(3000);