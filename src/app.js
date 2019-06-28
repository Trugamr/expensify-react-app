import React from 'react'
import ReactDOM from 'react-dom'
import { Provider, connect } from 'react-redux'
import AppRouter from './routers/AppRouter'
import configureStore from  './store/configureStore'
import { addExpense, editExpense, removeExpense } from './actions/expenses'
import { setEndDate, setStartDate, setTextFilter, sortByAmount, sortByDate } from './actions/filters'
import getVisibleExpenses from './selectors/expenses'
import 'normalize.css/normalize.css'
import './styles/styles.scss'

const store = configureStore()

store.dispatch(addExpense({
    description: 'Water bill',
    amount: 2000,
    createdAt: 200
}))

store.dispatch(addExpense({
    description: 'Gas bill',
    amount: 1200,
    createdAt: 3000
}))

store.dispatch(addExpense({
    description: 'Rent',
    amount: 1000,
    createdAt: 1000
}))

let state = store.getState()
console.log(getVisibleExpenses(state.expenses, state.filters))

const jsx = (
    <Provider store={store}>
        <AppRouter />
    </Provider>
)

ReactDOM.render(jsx , document.querySelector('#app'))