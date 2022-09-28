const express = require('express');
const passport = require('passport');
const bodyParser = require("body-parser")
const flash = require('connect-flash');
const login = require('./routes/login');
const join = require('./routes/join')
const users = require('./routes/users');
const cors = require('cors');
const db = require('./db');
const app = express();
const PORT = 3000;



db.connect((err)=>{
    if(!err) console.log("DB connect..!")
})
app.use(passport.initialize());
app.use(flash());

app.use(bodyParser.json()) 
app.use(bodyParser.urlencoded({extended: false})) 
app.use('/login',login);
app.use('/join',join);
app.use('/users',users);

app.listen(PORT,()=>{
    console.log("http://localhost:3000/ (running...)");
})