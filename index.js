const express = require('express');
const mongoose = require('mongoose');
var bodyParser = require('body-parser');
var app = express()

app.use(bodyParser.json());
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));


mongoose.connect('mongodb://0.0.0.0:27017/loginDB', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

var db = mongoose.connection;

db.on('error', () => {
    console.log("Error in Connecting to Database..");
});
db.once('open', () => {
    console.log("Connected to Database..");
})

app.post("/sign_up", (req, res) => {
    var name = req.body.name;
    var email = req.body.email;
    var phno = req.body.phno;
    var password = req.body.password;
    var data = {
        "name": name,
        "email": email,
        "phno": phno,
        "password": password
    }
    console.log(data);
    db.collection('users').insertOne(data, (err, collection) => {
        if (err) {
            throw err;
        }
        console.log("Record Inserted Successfully");
    });
 
    // my code
    return res.redirect('signup_success.html');

});




app.get("/", function (req, res) {
    res.sendFile(__dirname + "/index.html");

});

app.get("/Login" , function(req,res){
    res.sendFile(__dirname+ "/Login.html");
})


app.listen(3000, function () {
    console.log('Server is Up')
});


