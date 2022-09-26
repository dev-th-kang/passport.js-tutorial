const passport = require("passport");
const LocalStrategy  = require("passport-local").Strategy;
passport.serializeUser((user, done)=> {
	console.log(`id : ${user.userid}, session 발행`);
    done(null, user.userid)
});

passport.deserializeUser((username, done)=> {
	console.log(`id : ${username}, session 획득`)
	done(null, username);
})  

passport.use('local-login',new LocalStrategy({
    usernameField:"userid",
    passwordField:"userpw",
    passReqToCallback:true
    },(req,userid,userpw,done)=>{
        db.query(`select * from userinfo where userid = "${userid}" and userpw = "${userpw}"`, (err,results)=>{
            console.log(results.length)
            if(err) return done(err);
            if(results.length){
                //succeed
                return done(null, {'userid' : userid, 'userpw':userpw})
            }else{
                return done(null, false);
            }
        })
    }
));