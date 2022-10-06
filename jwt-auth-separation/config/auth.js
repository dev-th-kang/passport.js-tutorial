const db = require('./db')

module.exports = {
    userConfirm:(userid, userpw)=>new Promise((resolve,reject)=>{
        const sql = `select * from userinfo where userid = "${userid}" and userpw="${userpw}"`
        db.query(sql,(err,results)=>{
            if(err) reject(false);
            if(results.length){
                resolve(results[0])
            }else{
                reject(false);
            }
        })
    }),
    useridConfirm:(userid)=>new Promise((resolve,reject)=>{
        const sql = `select * from userinfo where userid = "${userid}"`
        db.query(sql,(err,results)=>{
            if(err) reject(false);
            if(results.length){
                resolve(results[0])
            }else{
                reject(false);
            }
        })
    })
}