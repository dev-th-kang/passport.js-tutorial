const route = require('express').Router();
const passport = require('passport');
const LocalStrategy  = require("passport-local").Strategy;
const db = require('../../db');
route.post('/',(req,res,next)=>{
    passport.authenticate('local-join', (err, user, info)=> {
        req.logIn(user,(err)=>{
            if(!err) 
                res.send({'state':'join succeed'});
        })
	})(req, res, next);
});

passport.use('local-join' ,new LocalStrategy({
    usernameField:"userid",
    passwordField:"userpw",
    passReqToCallback:true
    },(req,userid,userpw,done)=>{
        const {username,nickname} = req.body;
        db.query(`select * from userinfo where userid = "${userid}"`,(err,rows)=>{
            //console.log(rows)
            if(!rows.length){
                db.query(`insert into userinfo values("${username}","${nickname}","${userid}","${userpw}")`,(err,result)=>{
                    return done(null,{
                        "username":username,
                        "userpw":userpw,
                        "userid":userid,
                        "userpw":userpw
                    })
                });
            }else{
                return done(null,false);
            }
        })
    }
));


module.exports = route;
