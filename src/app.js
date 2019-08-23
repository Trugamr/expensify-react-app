import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import AppRouter, { history } from './routers/AppRouter'
import configureStore from  './store/configureStore'
import { startSetExpenses } from './actions/expenses'
import getVisibleExpenses from './selectors/expenses'
import 'normalize.css/normalize.css'
import './styles/styles.scss'
import 'react-dates/lib/css/_datepicker.css'
import { firebase } from './firebase/firebase'
// import './firebase/firebase'

const store = configureStore()

let state = store.getState()
console.log(getVisibleExpenses(state.expenses, state.filters))

const jsx = (
    <Provider store={store}>
        <AppRouter />
    </Provider>
)

let hasRendered = false;

const renderApp = () => {
    if(!hasRendered) {
        ReactDOM.render(jsx , document.querySelector('#app'))
        hasRendered = true;
    }
}

ReactDOM.render(<p>Loading...</p> , document.querySelector('#app'))

firebase.auth().onAuthStateChanged((user) => {
    if(user) {
        store.dispatch(startSetExpenses()).then(() => {
            renderApp();
            if(history.location.pathname == '/') {
                history.push('/dashboard');
            }
        })
        console.log('log in')
    } else {
        renderApp();
        history.push('/');
    }
})