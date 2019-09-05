import React from 'react'
import { connect } from 'react-redux'
import ExpenseForm from '../components/ExpenseForm'
import { startRemoveExpense, startEditExpense } from '../actions/expenses'

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
                <div className="page-header">
                    <div className="content-container">
                        <h1 className="page-header__title">Edit Expense</h1>
                    </div>
                </div>
                <div className="content-container">
                    <ExpenseForm
                        expense={this.props.expense}
                        onSubmit={this.onSubmit}
                        // showing remove button on expense from
                        showRemove={true}
                    />
                    <button style={{display: 'none'}} className="remove-button button red" onClick={this.onClick}><i className="fas fa-trash"></i> &nbsp;Remove Expense</button>
                </div>
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