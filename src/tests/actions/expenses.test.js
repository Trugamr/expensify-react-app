import { removeExpense, addExpense, editExpense } from '../../actions/expenses'

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
        expense: {
            id: expect.any(String),
            ...expenseData
        }
    })
})

test('should setup add expense action object with default values', () => {
    const defaultValues = {
        description: '',
        note: '',
        amount: 0,
        createdAt: 0 
    }
    const action = addExpense()
    expect(action).toEqual({
        type: 'ADD_EXPENSE',
        expense: {
            id: expect.any(String),
            ...defaultValues
        }
    })
})