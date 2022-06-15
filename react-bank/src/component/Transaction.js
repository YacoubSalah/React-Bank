import React, { Component } from "react";
import './Transaction.css'

class Transaction extends Component {

    deleteTransactionFromDB = () => {
        this.props.deleteTransactionFromDB(this.props.Transaction._id)
    }

    pickClass = (transaction) => {
        return transaction.amount > 0  ? "income transactionContainer" : "outcome transactionContainer"
    }

    render() {

        let transaction = this.props.Transaction
        let requiredClass = this.pickClass(transaction)

        return (

            <div className={requiredClass}>
                <div>Amount: {transaction.amount} $</div>
                <div>Catagory: {transaction.category}</div>
                <div>Vendor: {transaction.vendor}</div>
                <button onClick={this.deleteTransactionFromDB}>Delete</button>
            </div>

        )
    }
}

export default Transaction