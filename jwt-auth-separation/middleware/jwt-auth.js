const JwtStrategy = require('passport-jwt').Strategy,
    ExtractJwt = require('passport-jwt').ExtractJwt;
const passport = require('passport')
const auth = require('../config/auth')
const opts = {}
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = 'secret';


passport.use(new JwtStrategy(opts, function(jwt_payload, done) {
    const username = jwt_payload.username;
    const userid = jwt_payload.userid;
    auth.useridConfirm(userid)
    .then((result)=>{
        //console.log("as")
        return done(null, 
            {"username":result.username,
            "nickname":result.nickname,
            "userid":result.userid})
    })
    .catch(()=>{
        return done(null, false)
    })
}));