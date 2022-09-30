const express = require('express');
const login = require('./routes/login');
const join = require('./routes/join');
const users = require('./routes/users');
const passport = require('passport');
const bodyParser = require('body-parser');
const flash = require('connect-flash');
const db = require('./db');
const app = express();
const PORT = 3000;
const HOST = 'localhost';

db.connect(()=>console.log(`db conn .. !`));

// middleware
app.use(passport.initialize());
app.use(flash());

app.use(bodyParser.json()) 
app.use(bodyParser.urlencoded({extended: false})) 
app.use('/login',login);
app.use('/users',users);
app.use('/join',join);


app.listen(PORT,HOST,()=>console.log(`http://${HOST}:${PORT} server running .. !`));