var express = require("express"),
    ejs = require("ejs"),
    bodyParser = require("body-parser"),
    methodOverride = require("method-override"),
    db = require('./models'),
    app = express(); 

// Set the view engine to be "EJS"
app.set('view engine', 'ejs');

// Set up body parser
app.use(bodyParser.urlencoded({extended: true}));

// Set up method override to work with POST requests that have the parameter "_method=DELETE"
app.use(methodOverride('_method'));


// Let's add some routes here together:
app.get('/', function(req, res) {
	db.User.all().then(function(users){
		res.render('users.ejs', {users: users});	
	});
   //res.render('index.ejs', {title: "Hello"}); // We use res.render to display an EJS file instead of res.send() 
});

app.get('/users', function(req,res){

	db.User.all().then(function(users){
		res.render('users.ejs', {users: users});	
	});

});

app.get('/users/new', function(req,res) {

  res.render('new');
});

app.post('/users/new', function(req,res){

	var firstname = req.body.first_name,
		lastname = req.body.last_name, 
		age = req.body.age; 

	db.User.create({
		first_name: firstname,
		last_name: lastname,
		age: age
	}).then(function(taco){
		res.redirect('/users');
	})

	res.redirect('/users')

});

app.get('/users/:id', function(req,res){
	var userId = req.params.id; 
	db.User.findById(userId).then(function(taco){
		res.render('user.ejs', {user: taco, id: userId})
	});
});

app.put('/users/:id', function(req,res) {
  var mateId = req.params.id;
  var name = req.body.first_name;
  var age = req.body.age;
  db.Classmate.find(mateId)
              .then(function(mate){
                mate.updateAttributes({
                  first_name: first_name,
                  last_name: last_name,
                  age: age})
                .then(function(savedMate) {
                  res.redirect('/users/'+mateId);
                });
              });
});

app.delete('/users/:id', function(req,res){
	var userId = req.params.id; 
	db.User.findById(userId).then(function(taco){
		taco.destroy();
	}).then(function(taco){
		res.redirect('/users');
	});	
});







// Start the server on port 3000
app.listen(3000);