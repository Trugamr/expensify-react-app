import React from 'react'
import { connect } from 'react-redux'
import ExpenseForm from '../components/ExpenseForm'
import { editExpense, removeExpense } from '../actions/expenses'

const EditExpensePage = (props) => {
    return (
        <div>
            <ExpenseForm 
                expense={props.expense}
                onSubmit={(expense) => {
                    console.log(expense)
                    props.dispatch(editExpense(props.expense.id, expense))
                    props.history.push('/')
                }}
            />
            <button onClick={() => {
                props.dispatch(removeExpense({ id: props.expense.id }))
                props.history.push('/')
            }}>Remove</button>
        </div>
    )
}

// (state, props)
const mapStateToProps = ({ expenses }, { match }) => {    
    return {
        expense: expenses.find(expense => expense.id === match.params.id)
    }
}

export default connect(mapStateToProps)(EditExpensePage)