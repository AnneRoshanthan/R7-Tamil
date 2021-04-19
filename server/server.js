require('dotenv').config()
const express =require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const fileUpload = require('express-fileupload')
const cookieParser = require('cookie-parser')
const db = require('./db')
const { reg } = require('./controllers/userCtrl')
const app =express()


app.use(express.json())
app.use(cookieParser())
app.use(cors())
app.use(fileUpload({useTempFiles:true}))


//routing
// app.post('/',(req,res)=>{
//     res.json('DB routed Sucessfull')
// })
app.use('/user',require('./routes/userRouter'))
app.use('/api',require('./routes/categoryRouter'))
app.use('/api',require('./routes/upload'))
app.use('/api',require('./routes/productRouter'))
app.use('/api',require('./routes/paymentRouter'))

app.use(express.static(__dirname + '/public'));


//mongo db connection
const PORT = process.env.PORT || 5000

app.listen(PORT, () => {
    console.log('R7-Tamil Server live on '+PORT)
})
