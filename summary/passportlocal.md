# passport-local
* 선행되어야하는 것
    ```javascript
    //session의 형태 선언하는 미들웨어
    app.use(session({
        secret: 'keyboard cat',
        resave: false,
        saveUninitialized: false,
        cookie: { secure: false }
    }));

    app.use(passport.initialize());
    app.use(passport.session())

    app.use(bodyParser.json()) 
    app.use(bodyParser.urlencoded({extended: false})) 
    ```
    > app.use(passport.initialize()) 는 passport를 미들웨어로 사용하겠다는 선언에 의미이다.
    
    > app.use(passport.session())은 미들웨어보다 뒤에 위치해야하며, express-session을 사용하겠다는 의미이다.

    >bodyParser 관련 구문은 매우매우매우 중요하다. 요청의 본문을 지정한 형태로 파싱해주는 미들웨어이다. 그냥 req.send를 하게되면 undefined 처리가 되게되지만, 미들웨어를 등록함으로써, 보내고자하는 내용을 보낼 수 있다.
#

* **Strategy 란?**<br>
    ```말 그대로 전략,정책이라는 의미이고, 인증할 때 거쳐야하는 passport에서의 미들웨어로 사용된다. 이름을 붙여서 사용할 수 있다.```

* **passport.authenticate()**<br>
    ```인증을 진행하는 역할을 하며, 그 인증이라는 것은 Strategy에서 셋팅한 형태로 인증이 진행된다. Strategy전략대로 인증절차 진행후, 결과를 done()함수를 거쳐서 다시 authenticate함수로 돌아온다.```

* **passport.serializeUser((user, done)=>{})**<br>
    ```serializeUser은 logIn함수가 진행되었을 때, 세션에 정보를 저장하는 역할을 한다. 이 때 어떤 값을 저장할지는 사용자가 선택할 수 있다.```

* **passport.deserializeUser((username, done)=> {})**<br>
    ```deserializeUser은 세션에 저장되어있는 값을 기반으로해서 req.user 객체를 생성한 후 Client에 반환해준다.```

* **req.logIn(user,(err)=>{})**<br>
    ```로그인을 진행하는 함수이다. 이 함수가 진행되면 세션을 발행하는 함수인 serializeUser가 동작한다.```

* **req.logOut((err=>{}))**<br>
    ```말 그대로 logOut 기능을 구사한다. 세션의 값을 만료시킨다.```

#

## passport-local의 흐름도(내가 이해한대로)
* 로그인이나 가입을 진행하게되면, authenticate 함수가 실행되게한다.
<br><br>
* 이 때 passport 미들웨어로써 strategy를 객체생성하여 사용한다. 그럼 strategy에서 셋팅한대로 인증절차가 진행된다.
<br><br>
* 인증이 완료되고, 사용자의 정보가 무사히 넘어왔다면, logIn함수를 실행시킨다.
<br><br>
* 이때 serializeUser가 실행되면서 세션을 발행해준다. 
<br><br>
* 그리고 또한 req.user를 요청하면, deserializeUser에서 발행된 세션을 반환해준다. 
<br><br>
* logOut함수를 실행하게되면, 세션값을 만료시키면서, 로그아웃이 진행된다.

