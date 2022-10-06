const express= require('express')
const app = express()
const db = require('./config/db')
const bodyParser = require('body-parser')
const route = require('./routes/index')

const PORT = 3000

db.connect(()=>console.log("DB 연결 중.. !"))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:false}))
//middleware 로 route 잡기
app.use('/',route)

app.listen(PORT,()=>console.log(`${PORT}번 포트에서 대기중 ...`))