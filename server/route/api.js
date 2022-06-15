let express = require("express")
let api = express.Router()
let transactionModel = require("../model/transaction")

api.get("/transactions", function (req, res) {
    transactionModel.find({})
        .then((data) => (data.length) ? res.status(200).send(data) : res.status(400).send("Database is empty"))
        .catch(() => res.status(500).send("Database error"))
    //if mongoose is not connected get will will not do anything, there is not timeout
})

api.post("/transaction", function (req, res) {
    let newTransaction = new transactionModel(req.body)
    newTransaction.save()
        .then((data) => res.send(`data was saved: ${data}`))
        .catch(() => res.status(500).send("Database Error"))
})

api.delete("/transaction/:id", function (req, res) {
    let id = req.params.id
    transactionModel.findByIdAndDelete(id)
        .then((data) => data ? res.send(`data was deleted: ${data}`) : res.status(400).send(`ID was not found`))
        .catch(() => res.status(500).send("Database Error"))
})

module.exports = api