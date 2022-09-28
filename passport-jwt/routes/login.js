const route = require('express').Router();
const bcrypt = require('bcrypt')
const db = require('../db')
const passport = require('passport');
const jwt = require('jsonwebtoken');


route.post('/',(req,res)=>{
    console.log("a");
    const {userid,userpw} = req.body;
    let query = `select * from userinfo where userid = "${userid}"`;
    db.query(query, (err,rows)=>{
        bcrypt.compare(userpw,rows[0].userpw,(err,same)=>{
            if(same){
                
                console.log("password same!");
                const payload = {
                    "username":rows[0].username,
                    "userid":userid
                }
                const token = jwt.sign(payload, "Random string", {expiresIn : "1d"});
                res.status(200).send({
                    "token":"Bearer " + token,
                    "msg":"login succeed"
                })
            }else{
                console.log("password not same..");
            }
        })
    });
});



module.exports = route;