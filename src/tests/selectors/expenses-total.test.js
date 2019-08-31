import selectExpensesTotal from '../../selectors/expenses-total'
import expenses from '../fixtures/expenses'

test('should return 0 for no expenses', () => {
    const result = selectExpensesTotal([])
    expect(result).toBe(0)
})

test('should return total for one expense', () => {
    const result = selectExpensesTotal([expenses[0]])
    expect(result).toBe(120)
})

test('should return total for all expenses', () => {
    const result = selectExpensesTotal(expenses)
    expect(result).toBe(74120)
})