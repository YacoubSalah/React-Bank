import React, { Component } from "react";
import Category from "./category";

class Breakdown extends Component {

    filterByCategory(transactions) {
        let transactionsByCategory = {}
        transactions.forEach(t => {
            if (transactionsByCategory[t.category]) {
                transactionsByCategory[t.category] += t.amount
            } else {
                transactionsByCategory[t.category] = t.amount
            }
        })
        return transactionsByCategory
    }

    render() {

        let transactions = this.props.state.transactions
        let transactionsByCategory = this.filterByCategory(transactions)
        let categories = Object.keys(transactionsByCategory)
        let toRender = categories.length ?
            categories.map(category => <Category category={category} transactionsByCategory={transactionsByCategory} key={category} />) :
            <div>No Transactions</div>

        return <div> {toRender} </div>

    }
}

export default Breakdown