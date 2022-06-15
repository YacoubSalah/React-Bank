const express = require("express")
const api = require("./server/route/api")
const mongoose = require("mongoose")

const app = express()

app.use(express.json())
app.use(express.urlencoded())

//this part is copy paste
app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*')
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS')
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With')

    next()
})
//this part is copy paste

app.use('/', api)

const port = 3020
app.listen(port, () => console.log(`App is listeninig on port : ${port}`))

 mongoose.connect("mongodb+srv://TransactionUser:TransactionUser@cluster0.uiyjv.mongodb.net/Transaction?retryWrites=true&w=majority")
    .then(() => console.log(`Atlas DB is connected`))
    .catch(()=> console.log("Error connecting to Atlas"))