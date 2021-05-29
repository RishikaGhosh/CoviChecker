const express = require("express");
const PORT= process.env.port || 3000;
const ejs = require("ejs");
const bodyParser = require("body-parser");
require('./db/conn');

const Register= require("./models/registers");
const Meds= require("./models/medlogScehma");


const app = express();
app.set('view engine', 'ejs');

app.use(express.json());
app.use(express.urlencoded({extended: false}));

app.use(express.static("public"));

app.use(express.static( __dirname + '/HTML/covicheck-main' ));

//Home Page
app.get("/", function(req, res){
    res.sendFile(__dirname + "/HTML/covicheck-main/index.html");
  });


//Login Page
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


//Signup Page
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

//Home
app.get("/home" ,function(req ,res){
    res.render("home");
});


//COMPOSE PAGE 
app.get("/compose" ,function(req ,res){
    res.render("compose");
});

app.post("/compose", async function(req, res){
    const post = new Meds({
      title: req.body.medicineName,
      content: req.body.time
    })
    console.log(post.title,post.content);
    const medicines= await post.save();
    //post.save().then(() => console.log("waaaooowww"));

    res.redirect("/home");
});



app.listen(PORT, function() {
    console.log("Server started on port 3000");
  });