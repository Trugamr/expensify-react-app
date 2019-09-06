import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import numeral from '../utils/numeral-locales';
import selectExpenses from '../selectors/expenses'
import selectExpensesTotal from '../selectors/expenses-total'

numeral.locale('in')

export const ExpensesSummary = ({ expensesCount, expensesTotal, expensesHidden }) => {
    const fomattedExpensestotal = numeral(expensesTotal/100).format('$0,0.00') 
    const expenseWord = expensesCount == 1 ? 'expense' : 'expenses'
    return (
        <div className="page-header">
            <div className="content-container">
                <div className="page_header__flex">
                    <div className="page_header_left">
                        <h1 className="page-header__title">
                            Viewing <span>{expensesCount}</span> {expenseWord} totalling <span>{fomattedExpensestotal}</span>
                        </h1>
                        { !expensesHidden ? (
                            <p className="page-header__sub-title">showing all expenses</p>
                        ) : (
                            <p className="page-header__sub-title">
                                filtering out <span>{expensesHidden}</span> expenses
                            </p>
                        )}
                    </div>
                    
                    <div className="page-header__action"><Link to="/create" className="button yellow">
                        <i className="fas fa-plus"></i> &nbsp;Add Expense
                    </Link></div>
                </div>
            </div>
        </div>
    )
}

const mapStateToProp = ({ expenses, filters }) => {
    const viewableExpenses = selectExpenses(expenses, filters)
    const hiddenExpenses = expenses.length - viewableExpenses.length;
    return {
        expensesCount: viewableExpenses.length,
        expensesHidden:hiddenExpenses,
        expensesTotal: selectExpensesTotal(viewableExpenses)
    }   
}

export default connect(mapStateToProp)(ExpensesSummary)