import { startEditExpense, startRemoveExpense, startSetExpenses, setExpenses, startAddExpense, removeExpense, addExpense, editExpense } from '../../actions/expenses'
import thunk from 'redux-thunk'
import configureMockStore from 'redux-mock-store'
import database from '../../firebase/firebase'
import expenses from '../fixtures/expenses'

const uid ='testuid'
const defaultAuthState = { auth: { uid }}
const createMockStore = configureMockStore([thunk])

beforeEach((done) => {
    const expensesData = {}
    expenses.forEach(({ id, description, note, amount, createdAt }) => {
        expensesData[id] = { description, note, amount, createdAt }
    })
    database.ref(`users/${uid}/expenses`).set(expensesData).then(() => done())
})

test('should setup remove expense action object', () => {
    const action = removeExpense({ id: 'a12dc4e' })
    expect(action).toEqual({
        type: 'REMOVE_EXPENSE',
        id: 'a12dc4e'
    })
})

test('should remove expense from firebase', (done) => {
    const store = createMockStore(defaultAuthState);
    const id = expenses[2].id;
    store.dispatch(startRemoveExpense({ id }))
        .then(() => {
            const actions = store.getActions();
            expect(actions[0]).toEqual({
                type: 'REMOVE_EXPENSE',
                id
            })
            return database.ref(`users/${uid}/expenses/${id}`).once('value')
        })
        .then((snap) => {
            expect(snap.val()).toBeFalsy();
            done();
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

test('should edit expense from firebase', (done) => {
    const updates = {
        description: 'update title',
        amount: 200
    }
    const id = expenses[0].id
    const store = createMockStore(defaultAuthState)
    store.dispatch(startEditExpense(id, updates))
        .then(() => {
            const actions = store.getActions()
            expect(actions[0]).toEqual({
                type: 'EDIT_EXPENSE',
                id,
                updates
            })
            return database.ref(`users/${uid}/expenses/${id}`).once('value')
        })
        .then(snap => {
            expect(snap.val()).toEqual({
                note: expenses[0].note,
                description: expenses[0].description,
                amount: expenses[0].amount,
                createdAt: expenses[0].createdAt,
                ...updates
            })
            done();
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
    const store = createMockStore(defaultAuthState)
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
            return database.ref(`users/${uid}/expenses/${actions[0].expense.id}`)
                .once('value')
                
        })
        .then(snap => {
            expect(snap.val()).toEqual(expenseData)
            done()
        })
})

test('should add expense to database and store with default values', (done) => {
    const store = createMockStore(defaultAuthState)
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
            return database.ref(`users/${uid}/expenses/${actions[0].expense.id}`)
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
    const store = createMockStore(defaultAuthState)
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