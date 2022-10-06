const route = require('express').Router()
const auth = require('../config/auth')
const jwt = require('jsonwebtoken')
const passport = require('passport')
require('../middleware/jwt-auth')
//가입은 안만들꺼

//login
route.post('/login',(req,res)=>{
    const {userid,userpw} = req.body;
    auth.userConfirm(userid,userpw)
        .then((results)=>{
            const payload = {
                "username" : results.username,
                "nickname" : results.nickname,
                "userid" : results.userid
            }
            const accessToken = jwt.sign(payload,'secret',{expiresIn:'10m'})
            res.status(200).send({"token":"Bearer "+accessToken})
        })
        .catch(()=>{
            res.status(401).send({"msg":"id pw not valid"})
        })
})


route.post('/user', (req,res,next)=>{
    passport.authenticate('jwt', {session:false},(err,user)=>{
        if(user != false){
            res.send(user)
        }else{
            res.send(user)
        }
    })(req,res,next)
})

route.post('/board', passport.authenticate('jwt', {session:false}), (req,res,next)=>{
    
})
module.exports = route;