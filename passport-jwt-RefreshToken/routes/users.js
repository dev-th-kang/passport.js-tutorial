const passport = require('passport');
const db = require('../db')
const router = require('express').Router()
const jwt =require('jsonwebtoken')
const JwtStrategy = require('passport-jwt').Strategy,
    ExtractJwt = require('passport-jwt').ExtractJwt;
const opts = {}
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = 'secret';
function verifyToken(token) {
    try {
        return jwt.verify(token, "secret");
    } catch (error) {
        return error.message;
    }
}

router.get('/',(req,res,next)=>{
    passport.authenticate('jwt',{session:false},(err, user)=>{
        const accessToken = req.headers['authorization'];
        console.log(accessToken);
        if(accessToken == null){
            res.status(401).send({
                errMsg : "1로그인 필요합니다."
            })
            return;
        }
        //bearer + Token
        const [tokenType, tokenValue] = accessToken.split(' ');
        if(tokenType !== "bearer"){
            res.status(401).send({
                errMsg : "2로그인 필요합니다."
            });
            return;
        }

        try{
            const myToken = verifyToken(tokenValue);
            if(myToken == "jwt expired"){
                const userinfo = jwt.decode(tokenValue,"secret");
                const userid = userinfo.userid;
                let refreshToken;
                const sql = `select * from tokenSave where userid = "${userid}"`;
                db.query(sql,(err, rows)=>{
                    myRefreshToken = verifyToken(rows[0].refreshToken);
                    if(myRefreshToken == "jwt expired"){
                        res.send({
                            errMsg : "3로그인 필요합니다."
                        })
                    }else{
                        const myNewToken = jwt.sign({userid:userinfo.userid,username:userinfo.username},"secret",{expiresIn:'30s'});
                        res.status(200).send({
                            "token":"bearer " + myNewToken,
                            "msg":"get New Token"
                        })
                    }
                })
            }else{
                
                const userid = jwt.verify(tokenValue,"secret");
                const sql = `select * from tokenSave where userid = "${userid}"`;
                console.log("a")
                db.query(sql,(err, rows)=>{
                    res.status(200).send({
                        "msg":"login Good"
                    })
                })
            }
        }catch(err){
            console.log(err);
            res.send({
                errMsg : "222로그인 필요합니다."
            })
        }


    })(req,res,next)
})
passport.use(new JwtStrategy(opts, function(jwt_payload, done) {
    const sql = `select * from userinfo where userid = "${jwt_payload.userid}"`
    db.query(sql,(err,rows)=>{
        if(err) done(null,false);
        if(rows[0]){
            return done(null,rows[0]);
        }else{
            return done(null,false);
        }
    })
    // User.findOne({id: jwt_payload.sub}, function(err, user) {
    //     if (err) {
    //         return done(err, false);
    //     }
    //     if (user) {
    //         return done(null, user);
    //     } else {
    //         return done(null, false);
    //         // or you could create a new account
    //     }
    // });
}));

module.exports = router;
