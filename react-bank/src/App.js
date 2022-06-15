import React, { Component } from "react";
import { BrowserRouter as Router, Link, Route, Routes } from "react-router-dom";
import Transactions from "./component/Transactions";
import Operation from "./component/Operation";
import Breakdown from "./component/Breakdown";
import axios from "axios"

import './App.css'

const serverLink = "http://localhost:3020"
const axiosTimeout = 15 * 1000


class App extends Component {
  constructor() {
    super()
    this.state = {
      transactions: [],
      balance: 0
    }
  }

  componentDidMount = () => {
    this.getTransactionsFromServer()
  }

  getTransactionsFromServer = async () => {
    let link = serverLink + "/transactions"
    let newTransactions = []
    await axios.get(link)
      .then((data) => newTransactions = data.data)
      .catch((err) => console.log(err.response.data || "Server error"))
    this.setState({ transactions: newTransactions }, this.calculateBalance)
  }

  calculateBalance = () => {
    let transactions = this.state.transactions
    let newBalance = 0
    transactions.forEach(transaction => newBalance += transaction.amount)
    this.setState({ balance: newBalance })
  }

  postTransactionToDB = async (newTransaction) => {
    let link = serverLink + "/transaction"
    axios.post(link, newTransaction)
      .then(() => this.getTransactionsFromServer())
      .catch((err) => console.log(err.response.data || "Server error"))
  }

  deleteTransactionFromDB = async (transactionID) => {
    let link = serverLink + "/transaction/" + transactionID
    axios.delete(link, { timeout: axiosTimeout })
      .then(() => this.getTransactionsFromServer())
      .catch((err) => console.log(err.response.data || "Server error"))
  }

  render() {
    return (
      <Router>
        <div className="navigationMenu">
          <Link className="Link" to="/Transactions">Transactions</Link>
          <Link className="Link" to="/">Operations</Link>
          <Link className="Link" to="/Breakdown">Breakdown</Link>
          <div className="budget">Budget: {this.state.balance}</div>
        </div>

        <Routes>
          <Route exact path="/Transactions" element={<Transactions state={this.state} deleteTransactionFromDB={this.deleteTransactionFromDB} />} />
          <Route exact path="/" element={<Operation postTransactionToDB={this.postTransactionToDB} />} />
          <Route exact path="/Breakdown" element={<Breakdown state={this.state} />} />
        </Routes>
      </Router>
    )
  }
}

export default App;