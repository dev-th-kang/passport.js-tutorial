const router = require('express').Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const passport = require('passport');
const db = require('../db');

router.post('/', (req,res)=>{
    const {userid,userpw} = req.body;
    console.log(userpw);
    let sql = `select * from userinfo where userid = "${userid}"`;
    db.query(sql,(err,rows)=>{
        const db_userinfo = rows[0];
        bcrypt.compare(userpw,db_userinfo.userpw,(err,same)=>{
            if(same){
                // 비밀번호가 암호화된 것과 같을떄
                //TODO: token 생성 진행
                const payload = {
                    "username":rows[0].username,
                    "userid":userid
                }
                const accessToken = jwt.sign(payload,"secret",{expiresIn:'30s'});
                const refreshToken = jwt.sign(payload,"secret",{expiresIn:'30m'});
                sql = `replace INTO tokenSave(userid,refreshToken) values("${userid}","${"bearer "+refreshToken}")`
                db.query(sql)
                res.status(200).send({
                    "token":"bearer " + accessToken,
                    "msg":"get Token"
                })

            }else{
                res.send({
                    "msg":"id not valid"
                })
            }
        })
    })
})
module.exports = router;