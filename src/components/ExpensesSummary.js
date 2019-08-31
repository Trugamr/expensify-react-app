import React from 'react'
import { connect } from 'react-redux'
import numeral from '../utils/numeral-locales';
import selectExpenses from '../selectors/expenses'
import selectExpensesTotal from '../selectors/expenses-total'

numeral.locale('in')

export const ExpensesSummary = ({ expensesCount, expensesTotal }) => {
    const fomattedExpensestotal = numeral(expensesTotal/100).format('$0,0.00') 
    const expenseWord = expensesCount == 1 ? 'expense' : 'expenses'
    return (
        <div>
            <h1>Viewing {expensesCount} {expenseWord} totalling {fomattedExpensestotal}</h1>
        </div>
    )
}

const mapStateToProp = ({ expenses, filters }) => {
    const viewableEpenses = selectExpenses(expenses, filters)
    return {
        expensesCount: viewableEpenses.length,
        expensesTotal: selectExpensesTotal(viewableEpenses)
    }   
}

export default connect(mapStateToProp)(ExpensesSummary)