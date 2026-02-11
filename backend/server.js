require('dotenv').config()
const express = require('express')
const cors = require('cors')
const connectDb = require('./db')
const authRoutes = require('./routes/authRoutes')
const productRoutes = require('./routes/productRoutes')
const checkAuth = require('./middleware/auth')

const app = express()

connectDb()

app.use(cors())
app.use(express.json())
app.use("/uploads",express.static("uploads"))
app.use('/auth',authRoutes)
app.use('/products',checkAuth ,productRoutes)


app.listen(process.env.PORT,()=>{
    console.log('server listening at port number',process.env.PORT)
})