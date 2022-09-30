const router = require('express').Router();
const bcrypt = require('bcrypt')
const db = require('../db');
const salt = 13;

router.post('/',(req,res)=>{
    const {username,nickname,userid,userpw} = req.body;
    let sql = `select * from userinfo where userid = "${userid}"`;
    db.query(sql,(err, rows)=>{
        if(!rows.length){
            //사용자가 없을 때
            const hash = bcrypt.hashSync(userpw,salt);
            sql = `insert into userinfo values("${username}","${nickname}","${userid}","${hash}")`;
            db.query(sql,(err, results)=>{
                if(results.affectedRows){
                    res.status(200).send({
                        "userid":userid,
                        "userpw":hash,
                        "msg":"join succeed"
                    })
                }else{
                    res.send({"msg": "join fail"})
                }
            })
        }else{
            //사용자가 이미 있을 때
            res.send({"msg": "ID already exists"})
        }
    })
});
module.exports = router;