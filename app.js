const express = require("express");
const ejs = require("ejs");
const bodyParser = require("body-parser");


const app = express();
app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

app.use(express.static( __dirname + '/HTML/covicheck-main' ));


app.get("/", function(req, res){
    res.sendFile(__dirname + "/HTML/covicheck-main/index.html");
  });

app.get("/login", function(req, res)
{
    res.sendFile(__dirname + "/HTML/covicheck-main/login.html");
});

app.get("/signup", function(req, res)
{
    res.sendFile(__dirname + "/HTML/covicheck-main/signup.html");
});


//app.get("/auth", function(req, res){
//    res.sendFile(__dirname + "/HTML/index.html");
//});

app.get("/home" ,function(req ,res){
    res.render("home");
});

app.get("/compose" ,function(req ,res){
    res.render("compose");
});

app.post("/compose", function(req, res){
    const post = {
      title: req.body.medicineName,
      content: req.body.time
    };

    console.log(post.title,post.content);
    res.redirect("/");
});

app.listen(3000, function() {
    console.log("Server started on port 3000");
  });