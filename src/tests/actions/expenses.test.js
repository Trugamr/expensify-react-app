import { startSetExpenses, setExpenses, startAddExpense, removeExpense, addExpense, editExpense } from '../../actions/expenses'
import thunk from 'redux-thunk'
import configureMockStore from 'redux-mock-store'
import database from '../../firebase/firebase'
import expenses from '../fixtures/expenses'

const createMockStore = configureMockStore([thunk])

beforeEach((done) => {
    const expensesData = {}
    expenses.forEach(({ id, description, note, amount, createdAt }) => {
        expensesData[id] = { description, note, amount, createdAt }
    })
    database.ref('expenses').set(expensesData).then(() => done())
})

test('should setup remove expense action object', () => {
    const action = removeExpense({ id: 'a12dc4e' })
    expect(action).toEqual({
        type: 'REMOVE_EXPENSE',
        id: 'a12dc4e'
    })
})

test('should setup edit expense action object', () => {
    const action = editExpense('aba2131s', {
        description: 'Gas Bill',
        note: 'July 2019 bill'
    })
    expect(action).toEqual({
        id: 'aba2131s', 
        type: 'EDIT_EXPENSE',
        updates: {
            description: 'Gas Bill',
            note: 'July 2019 bill'
        }
    })
})

test('should setup add expense action object with provided values', () => {
    const expenseData = {
        description: 'Bill',
        amount: 102000,
        createdAt: 10000,
        note: 'This is test expense'
    }
    const action = addExpense(expenseData)
    expect(action).toEqual({
        type: 'ADD_EXPENSE',
        expense: expenseData
    })
})

test('should add expense to database and store', (done) => {
    const store = createMockStore()
    const expenseData = {
        description: 'Rent',
        amount: 3000,
        note: 'This is better',
        createdAt: 10000
    }
    store.dispatch(startAddExpense(expenseData))
        .then(() => {
            const actions = store.getActions()
            expect(actions[0]).toEqual({
                type: 'ADD_EXPENSE',
                expense: {
                    id: expect.any(String),
                    ...expenseData
                }
            })
            return database.ref(`expenses/${actions[0].expense.id}`)
                .once('value')
                
        })
        .then(snap => {
            expect(snap.val()).toEqual(expenseData)
            done()
        })
})

test('should add expense to database and store with default values', (done) => {
    const store = createMockStore()
    const expenseData = {
        description: '',
        amount: 0,
        note: '',
        createdAt: 0
    }
    store.dispatch(startAddExpense())
        .then(() => {
            const actions = store.getActions()
            expect(actions[0]).toEqual({
                type: 'ADD_EXPENSE',
                expense: {
                    id: expect.any(String),
                    ...expenseData
                }
            })
            return database.ref(`expenses/${actions[0].expense.id}`)
                .once('value')
                
        })
        .then(snap => {
            expect(snap.val()).toEqual(expenseData)
            done()
        })
})

test('should setup set expense action object with data', () => {
    const action = setExpenses(expenses)
    expect(action).toEqual({
        type: 'SET_EXPENSES',
        expenses
    })
})

test('should fetch the expenses from firebase', (done) => {
    const store = createMockStore({})
    store.dispatch(startSetExpenses())
        .then(() => {
            const actions = store.getActions()
            expect(actions[0]).toEqual({
                type: 'SET_EXPENSES',
                expenses
            })
            done();
        })
})