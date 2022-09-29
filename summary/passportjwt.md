# passport-jwt

```일단 바보처럼 메커니즘에 대해서 잘못 이해하고있었다. 가입에서부터 jwt 를 발급해서 어떻게 해줘야하는 줄 알았다. 하지만, 그게 아니라 로그인의 방식만 jwt를 사용한 형태로 바뀐것이였다.```

* 일반적인 Access Token(haven't refresh Token)
  * 먼저 회원가입은 일반적으로 진행해준다.
  * 다만 비밀번호를 bcrypt 암호화형태를 이용해서 저장해준다.
  * 로그인 진행을 하게되면, 일단 아이디와 비밀번호가 일치한 값이 있는지 찾아준 후, 있다면, token을 발행한다. 만료 시간은 30m
  * 그리고 사용자 인증페이지에 들어갈때는 
    ```javascript
    passport.authenticate('jwt',{session:false})
    ```
    라는 함수를 실행해서
    ```javascript
    passport.use(new JwtStrategy(opts, function(jwt_payload, done){}))
    ```
    이라는 미들웨어를 실행시켜준다. client에서 저장한 token값에 대조되는 아이디가 있다면, 그 아이디의 정보를 return 해준다.

      * 단점: Access 토큰은 만료기간이 길어지면, 탈취로 인해서 보안성 문제가 생길 수 있음 