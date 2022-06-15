import React, { Component } from "react";
import Transaction from "./Transaction";

class Transactions extends Component {

    render() {

        let transactions = this.props.state.transactions
        let toRender = transactions.length ?
            transactions.map(t => <Transaction Transaction={t} key={t._id} deleteTransactionFromDB={this.props.deleteTransactionFromDB} />) :
            <div>No transactions</div>

        return <div> {toRender}</div>

    }
}

export default Transactions