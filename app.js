const express = require("express");
const PORT= process.env.PORT;
const ejs = require("ejs");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
require('./db/conn');



mongoose.connect('mongodb+srv://sghosh:rick@1234@cluster0.4syv0.mongodb.net/mernstack?retryWrites=true&w=majority', {useNewUrlParser: true, useUnifiedTopology: true});


const Register= require("./models/registers");
const MedSchema = new mongoose.Schema({
    title : String,
    content : String
});

const ParaSchema = new mongoose.Schema({
    date:String,
    time:String,
    pulse:Number,
    oxygen:Number,
    temp:Number,
    pressure:Number
});
    // MongoDB models
const Med = mongoose.model('Medicine', MedSchema);
const Para = mongoose.model('Parameters', ParaSchema);


let MedPosts = [];
let Parameters = [];



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

app.post("/login", async function(req, res)
{
    try{
        const email= req.body.email;
        const password  = req.body.password;
        const useremail= await Register.findOne({email:email});
        if(useremail.password=== password){
            res.status(201).sendFile(__dirname + "/HTML/covicheck-main/welcome.html");
        }
        else
        {
            res.send("Passwords do not match. Try again");
        }

    }
    catch(err){
        res.status(400).send("Invalid Email");
    }
});


app.get("/signup", function(req, res)
{
    res.sendFile(__dirname + "/HTML/covicheck-main/signup.html");
});

app.post("/signup", async function(req, res)
{
    try{
        const password= req.body.password;
        const cpassword=req.body.cpassword;
        if(password===cpassword){
            const User= new Register({
                name: req.body.name,
                email: req.body.email,
                password: req.body.password,
                cpassword: req.body.cpassword
            })
        const registered= await User.save();
        res.status(201).sendFile(__dirname + "/HTML/covicheck-main/index.html");
        }
        else{
            res.send("Passwords do not match");
        }
    

    }
    catch(err){
        res.status(400).send(err);
    }
});

        // <-!     main page     ->
app.get("/welcome" ,function(req ,res){
    res.sendFile(__dirname + "/HTML/covicheck-main/welcome.html");
});

app.get("/resource",function(req ,res){
    res.sendFile(__dirname + "/HTML/covicheck-main/resources.html");
});

app.get("/parameter" ,function(req ,res){
    res.sendFile(__dirname + "/HTML/covicheck-main/parameters.html");
});


app.get("/logs",function(req ,res){

    Para.find(function(err,logs){
        if(err){
            console.log(err);
        }
        else
        {
            console.log(logs);
            res.render("paralogs",{
                logs : logs
                });
        };
    });
});





app.post("/parameter", function(req, res){
    const param= new Para({
      date: req.body.date,
      time: req.body.time,
      pulse: req.body.pulse,
      oxygen: req.body.O2,
      temp: req.body.temp,
      pressure: req.body.pressure
    });
    param.save().then(() => console.log("Parameters added successfully"));
    res.redirect("/logs");
});


app.get("/home" ,function(req ,res){

    Med.find(function(err,Posts){
        if(err){
            console.log(err);
        }
        else
        {
            MedPosts = Posts;
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
    post.save().then(() => console.log("Medicines added successfully"));
    res.redirect("/home");
});

app.listen(PORT, function() {
    console.log("Server started on port 3000");
  });