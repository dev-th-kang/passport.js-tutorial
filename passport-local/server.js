const express = require('express');
const passport = require('passport');
const bodyParser = require("body-parser")
const session = require('express-session');
const flash = require('connect-flash');
const login = require('./routes/login');
const join = require('./routes/join')
const user = require('./routes/user');
const cors = require('cors');
const db = require('./db');
const app = express();
const PORT = 3000;

db.connect((err)=>{
    if(!err) console.log("DB connect..!")
})
app.use(cors())
app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false }
}));

app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

passport.serializeUser((user, done)=> {
	console.log(`id : ${user.userid}, session 발행`);
    done(null, user.userid)
});

passport.deserializeUser((username, done)=> {
	console.log(`id : ${username}, session 획득`)
	done(null, username);
})  
//하는 일??
app.use(bodyParser.json()) 
app.use(bodyParser.urlencoded({extended: false})) 
app.use('/login',login);
app.use('/join',join);
app.use('/user',user);

app.listen(PORT,()=>{
    console.log("http://localhost:3000/ (running...)");
})