const route = require('express').Router();
const passport = require('passport');
const db = require('../db');
var JwtStrategy = require('passport-jwt').Strategy,
    ExtractJwt = require('passport-jwt').ExtractJwt;
var opts = {}
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = "Random string";


route.get('/',passport.authenticate('jwt',{session:false}),(req,res)=>{
    res.send('login good!');
})
passport.use(new JwtStrategy(opts, function(jwt_payload, done) {
    console.log(jwt_payload)
    const username = jwt_payload.username;
    const userid = jwt_payload.userid;
    const sql = `select * from userinfo where userid = "${userid}"`;
    db.query(sql,(err,rows)=>{
        
        if(err){
            return done(null,false);
        }
        const userinfo = rows[0]
        if(userinfo){
            return done(null, userinfo)
        }else{
            return done(null, false);
        }

    })
}));
module.exports = route;