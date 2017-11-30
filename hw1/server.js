// require express
var express = require("express");
// path module -- try to figure out where and why we use this
var path = require("path");
// create the express app
var app = express();
var bodyParser = require('body-parser');
// use it!
var session = require('express-session');
app.use(bodyParser.urlencoded({ extended: true }));
// static content
app.use(express.static(path.join(__dirname, "./static")));
app.use(session({secret: 'codingdojorocks'})); 
// setting up ejs and our views folder
app.set('views', path.join(__dirname, './views'));
app.set('view engine', 'ejs');
// root route to render the index.ejs view
app.get('/', function(req, res) {
    if(!req.session.hasOwnProperty('count')){
        req.session.count = 0;
    }
    req.session.count += 1;
 res.render("index", {count: req.session.count});
})

app.get('/plus', function(req, res) {
    req.session.count += 2;
 res.redirect("/");
})

app.get('/reset', function(req, res) {
    req.session.count = 0;
 res.redirect("/");
})


app.listen(8000, function() {
 console.log("listening on port 8000");
});