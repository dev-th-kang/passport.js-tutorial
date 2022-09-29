const route = require('express').Router();
const bcrypt = require('bcrypt')
const db = require('../db');
const salt = 12;
route.post('/',(req,res,next)=>{
    const {username,nickname,userid,userpw} = req.body;
    let sql = `select * from userinfo where userid = "${userid}"`;
    db.query(sql,(err, rows)=>{
        if(!rows.length){
            // You can create User 
            const hash = bcrypt.hashSync(userpw, salt);
            sql = `insert into userinfo values("${username}","${nickname}","${userid}","${hash}")`;
            db.query(sql,(err,results)=>{
                console.log(results);
                if(results.affectedRows){
                    console.log("succeed");
                    res.status(200).send({
                        "userid":userid,
                        "userpw":hash,
                        "msg":"creating id succeed!"
                    })
                }else{
                    res.send({"msg":"creating id Fail.."});
                }
            })

        }else{
            console.log("ID already exists");
            res.send({"msg":"creating id Fail.."});
        }
    })
    
});

module.exports = route;
