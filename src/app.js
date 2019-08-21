import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import AppRouter from './routers/AppRouter'
import configureStore from  './store/configureStore'
import { startSetExpenses } from './actions/expenses'
import getVisibleExpenses from './selectors/expenses'
import 'normalize.css/normalize.css'
import './styles/styles.scss'
import 'react-dates/lib/css/_datepicker.css'
import { firebase } from './firebase/firebase'
// import './firebase/firebase'

const store = configureStore()

// store.dispatch(addExpense({
//     description: 'Water bill',
//     amount: 2000,
//     createdAt: 200
// }))

// store.dispatch(addExpense({
//     description: 'Gas bill',
//     amount: 1200,
//     createdAt: 3000
// }))

// store.dispatch(addExpense({
//     description: 'Rent',
//     amount: 1000,
//     createdAt: 1000
// }))

let state = store.getState()
console.log(getVisibleExpenses(state.expenses, state.filters))

const jsx = (
    <Provider store={store}>
        <AppRouter />
    </Provider>
)

ReactDOM.render(<p>Loading...</p> , document.querySelector('#app'))

store.dispatch(startSetExpenses()).then(() => {
    ReactDOM.render(jsx , document.querySelector('#app'))
})

firebase.auth().onAuthStateChanged((user) => {
    if(user) {
        console.log('log in')
    } else {
        console.log('log out')
    }
})