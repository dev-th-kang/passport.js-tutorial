const route = require('express').Router();
const passport = require('passport');
const LocalStrategy  = require("passport-local").Strategy;
const db = require('../db');
route.post('/',(req,res,next)=>{
    passport.authenticate('local-login', (err, user, info)=> {
        console.log(user,"asd");
        req.logIn(user,(err)=>{
            if(err) res.send("err");
            else res.send("ok");
        })
	})(req, res, next);

});

passport.serializeUser((user, done)=> {
	console.log(`id : ${user.userid}, session 발행`);
    done(null, user.userid)
});

passport.deserializeUser((username, done)=> {
	console.log(`id : ${username}, session 획득`)
	done(null, username);
})  

passport.use('local-login',new LocalStrategy({
    usernameField:"userid",
    passwordField:"userpw",
    passReqToCallback:true
    },(req,userid,userpw,done)=>{
        db.query(`select * from userinfo where userid = "${userid}" and userpw = "${userpw}"`, (err,results)=>{
            console.log(results.length)
            if(err) return done(err);
            if(results.length){
                //succeed
                return done(null, {'userid' : userid, 'userpw':userpw})
            }else{
                return done(null, false);
            }
        })
    }
));


module.exports = route;
