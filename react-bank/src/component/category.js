import React, { Component } from "react";
import "./category.css"


class Category extends Component {

    pickClass(transactionsByCategory, category) {
        let requiredClass = "outcome categoryContainer"
        if (transactionsByCategory[category] >= 0) {
            requiredClass = "income categoryContainer"
        }
        return requiredClass
    }

    render() {

        let transactionsByCategory = this.props.transactionsByCategory
        let category = this.props.category
        let requiredClass = this.pickClass(transactionsByCategory, category)

        return (
            <div className={requiredClass}>
                <div>category : {category}</div>
                <div>amount : {transactionsByCategory[category]}</div>
            </div>
        )

    }

}

export default Category