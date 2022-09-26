const route = require('express').Router();

route.get('/',(req,res,next)=>{
    if(req.user){
        console.log(`"${req.user}" login .. `)
        res.send({'state':'login succeed'});
    }else
        res.send({'state':'login fail'});
})

module.exports = route;