import React, { Component } from "react";
import "./Operation.css"
import { Snackbar } from "@mui/material"



class Operation extends Component {

    constructor() {
        super()
        this.state = {
            newTransaction: {
                amount: 0,
                category: "",
                vendor: ""
            }
        }
    }

    handleInputFields = (event) => {
        let eventName = event.target.name
        let eventValue = event.target.value
        let newTransactionClone = Object.assign({}, this.state.newTransaction)
        if (this.validateValue(eventName, eventValue)) {
            newTransactionClone[eventName] = eventValue
            this.setState({ newTransaction: newTransactionClone })
        } else {
            event.currentTarget.value = newTransactionClone[eventName]
        }
    }

    validateValue = (eventName, eventValue) => {
        if (eventName === "amount" && !isNaN(Number(eventValue))) {
            return true
        }
        if (eventName === "category") {
            return true
        }
        if (eventName === "vendor") {
            return true
        }
        return false
    }

    withdrawClicked = async () => {
        let newTransactionClone = Object.assign({}, this.state.newTransaction)
        newTransactionClone.amount = (newTransactionClone.amount) * -1
        await this.setState({ newTransaction: newTransactionClone })
        this.postTransactionToDB()
    }

    depositClicked = () => {
        this.postTransactionToDB()
    }

    postTransactionToDB = () => {
        this.props.postTransactionToDB(this.state.newTransaction)
    }

    render() {

        return (
            <div className="operationContainer">
                <div className="inputField">
                    <label>Amount</label>
                    <input type="text" name="amount" placeholder="Amout $" value={this.state.amount} onChange={this.handleInputFields} />
                </div>
                <div className="inputField">
                    <label>Category</label>
                    <input type="text" name="category" placeholder="Category" value={this.state.category} onChange={this.handleInputFields} />
                </div>
                <div className="inputField">
                    <label>Vendor</label>
                    <input type="text" name="vendor" placeholder="Vendor" value={this.state.vendor} onChange={this.handleInputFields} />
                </div>
                <button className="withdrawButton" onClick={this.withdrawClicked}>Withdraw</button>
                <button className="depositButton" onClick={this.depositClicked}>Deposit</button>

                <Snackbar>
                    message="Note archived"
                </Snackbar>
            </div>
        )
    }
}

export default Operation