let mongoose = require("mongoose")
let schema = mongoose.Schema

let transactionSchema = new schema({
    amount: { type: Number, default: 0 },
    category: { type: String, default: "unkown category" },
    vendor: { type: String, default: "unknown Vendor" }
})

let transactionModel = mongoose.model("transaction", transactionSchema)

module.exports = transactionModel