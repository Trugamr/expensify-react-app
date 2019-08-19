import React from 'react'
import { connect } from 'react-redux'
import ExpenseForm from '../components/ExpenseForm'
import { startRemoveExpense, startEditExpense, editExpense, removeExpense } from '../actions/expenses'

export class EditExpensePage extends React.Component {
    onSubmit = (expense) => {
        console.log(expense)
        this.props.startEditExpense(this.props.expense.id, expense)
        this.props.history.push('/')
    }
    onClick = () => {
            this.props.startRemoveExpense({ id: this.props.expense.id })
            this.props.history.push('/')
    }
    render() {
        return (
            <div>
                <ExpenseForm 
                    expense={this.props.expense}
                    onSubmit={this.onSubmit}
                />
                <button onClick={this.onClick}>Remove</button>
            </div>
        )
    }
}

// (state, props)
const mapStateToProps = ({ expenses }, { match }) => {    
    return {
        expense: expenses.find(expense => expense.id === match.params.id)
    }
}

const mapDispatchToProps = (dispatch, props) => ({
    startEditExpense: (id, expense) => dispatch(startEditExpense(id, expense)),
    startRemoveExpense: (data) => dispatch(startRemoveExpense(data))
})

export default connect(mapStateToProps, mapDispatchToProps)(EditExpensePage)