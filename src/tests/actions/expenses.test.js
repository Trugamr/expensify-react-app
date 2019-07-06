import { removeExpense, addExpense, editExpense } from '../../actions/expenses'

test('should setup remove expense action object', () => {
    const action= removeExpense({ id: 'a12dc4e' })
    expect(action).toEqual({
        type: 'REMOVE_EXPENSE',
        id: 'a12dc4e'
    })
})