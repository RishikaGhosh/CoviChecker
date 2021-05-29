const express = require("express");
const ejs = require("ejs");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

mongoose.connect('mongodb+srv://sghosh:rick@1234@cluster0.4syv0.mongodb.net/mernstack?retryWrites=true&w=majority', {useNewUrlParser: true, useUnifiedTopology: true});

const MedSchema = new mongoose.Schema({
    title : String,
    content : String
});

const Med = mongoose.model('Medicine', MedSchema);

let MedPosts = [];



const medicineName = "Paracitamol";
const time = "10:10";

const app = express();
app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

app.use(express.static( __dirname + '/HTML/covicheck-main' ));

        // <-!    intro page     ->
app.get("/", function(req, res){
    res.sendFile(__dirname + "/HTML/covicheck-main/index.html");
  });
        // <-!     auth part     ->
app.get("/login", function(req, res)
{
    res.sendFile(__dirname + "/HTML/covicheck-main/login.html");
});

app.get("/signup", function(req, res)
{
    res.sendFile(__dirname + "/HTML/covicheck-main/signup.html");
});

        // <-!     main page     ->
app.get("/welcome" ,function(req ,res){
    res.sendFile(__dirname + "/HTML/covicheck-main/welcome.html");
});

app.get("/parameter" ,function(req ,res){
    res.sendFile(__dirname + "/HTML/covicheck-main/parameters.html");
});

app.post("/parameter", function(req, res){
    const param= {
      date:req.body.date,
      time:req.body.time,
      pulse: req.body.pulse,
      oxygen: req.body.O2,
      temp:req.body.temp,
      pressure:req.body.pressure
    };

    console.log(param.date,param.time,param.pulse,param.oxygen,param.temp,param.pressure);
    res.redirect("/home");
});



app.get("/home" ,function(req ,res){

    Med.find(function(err,Posts){
        if(err){
            console.log(err);
        }
        else
        {
            MedPosts = Posts;
            console.log(MedPosts);
            res.render("home",{
                MedPosts: MedPosts
                });
        };
    });

    
});

app.get("/compose" ,function(req ,res){
    res.render("compose");
});

app.post("/compose", function(req, res){
    const post = new Med({
      title: req.body.medicineName,
      content: req.body.time
    });
    console.log(post.title,post.content);
    post.save().then(() => console.log("waaaooowww"));
    res.redirect("/home");
});

app.listen(3000, function() {
    console.log("Server started on port 3000");
  });