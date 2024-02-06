
const express = require('express');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const { log } = require('console');


const app = express();
dotenv.config();

const port = 2000;
const username = process.env.MONGODB_USERNAME;
const password = process.env.MONGODB_PASSWORD;

mongoose.connect('mongodb+srv://sunnyvardhan02:sunny1234@cluster0.tah0jna.mongodb.net/registrationFormDB' ,{
     
});

//registration schema
const registrationSchema = new mongoose.Schema({
        name : String,
        email : String,
        password : String
});


// model of registration Schema
const Registration = mongoose.model("Registration",registrationSchema);

app.use(bodyParser.urlencoded ({ extended: true }));
app.use(bodyParser.json());


app.get('/', (req, res) => {
    res.sendFile(__dirname + "/html/index.html")
  });
  
  app.post("/Register", async (req, res)=> {
           try{ 
               const {name, email, password} = req.body;
             
              const existingUser = await Registration.findOne({email : email});
             //check for existing user
              if(!existingUser){
                   
               const registrationData = new Registration({
                name,
                email,
                password

           });
           await registrationData.save();
           res.redirect("/success");
        }
           else{
            console.log("User Already Exist");
            res.redirect("/error");
           }


           }
              catch(error){
                   console.log(error);
                    res.redirect("error");
              }
});

app.get("/success", (req, res)=>{
    res.sendFile(__dirname +"/html/success.html") ;
})
app.get("/error", (req, res)=>{
    res.sendFile(__dirname +"/html/error.html") ;
})


app.listen(port, ()=>{
      console.log('server is running on port 2000');
});


console.log("Listening on port 2000")