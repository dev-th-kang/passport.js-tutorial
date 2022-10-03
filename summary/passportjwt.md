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

* Refresh Token (Access Token의 단점을 극복하기 위해서 만들어진 개념)
1. User가 Login 을 시도한다.
  * AccessToken과 RefreshToken 을 발행한다.
  * RefreshToken은 서버에 저장하고 AccessToken만 클라이언트에게 넘긴다.
2. User가 Protected한 Page에 접근을 하려고한다.
  * JWT 인증절차 진행
    * refresh Token과 Access Token이 모두 만료됬을 때
      * 로그인 다시 시도해달라고 클라이언트에 요청
    * Access Token만 만료됬을 때
      * refresh Token을 조회후, 만료되지않으면, AccessToken 을 새롭게 재발행한다.
    * 이상한 Token 값일 때
      * 로그인 다시 시도해달라고 클라이언트에 요청
    * Token-Type이 다를 때
      * 로그인 다시 시도해달라고 클라이언트에 요청

``` refreshToken은 expireIn 이 길어야하고, AccessToken은 expireIn이 짧아야한다.```