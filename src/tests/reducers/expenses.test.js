import expensesReducer from '../../reducers/expenses'
import expenses from '../fixtures/expenses'

test('should set default state', () => {
    const state = expensesReducer(undefined, {
        type: '@@INIT'
    })
    expect(state).toEqual([])
})

test('should remove expense by id', () => {
    const action = {
        type: 'REMOVE_EXPENSE',
        id: expenses[0].id
    }
    const state = expensesReducer(expenses, action)
    expect(state).toEqual([ expenses[1], expenses[2] ])
})

test('should not remove expense if id now found', () => {
    const action = {
        type: 'REMOVE_EXPENSE',
        id: '999'
    }
    const state = expensesReducer(expenses, action)
    expect(state).toEqual(expenses)
})

test('should add expense', () => {
    const expense = {
        description: 'Spotify Subscription',
        amount: '1000',
        id: '4'
    }
    const action = {
        type: 'ADD_EXPENSE',
        expense
    }
    const state = expensesReducer(expenses, action)
    expect(state).toEqual([ ...expenses, expense ])
})

test('should edit expense with given id', () => {
    const updates = {
        amount: 2000,
        description: 'Bubble Bath'
    }
    const action = {
        type: 'EDIT_EXPENSE',
        id: '1',
        updates 
    }
    const state = expensesReducer(expenses, action)
    expect(state).toEqual(
        expenses.map(expense => {
            if(expense.id === action.id){
                return {
                    ...expense,
                    ...updates
                }
            } else {
                return expense
            }
        })
    )
})

test('should not update expense with invalid id', () => {
    const updates = {
        description: 'test',
        amount: 2000
    }
    const action = {
        type: 'EDIT_EXPENSE',
        updates
    }
    const state = expensesReducer(expenses, action)
    expect(state).toEqual(expenses)
})