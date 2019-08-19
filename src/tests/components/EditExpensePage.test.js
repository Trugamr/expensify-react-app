import React from 'react'
import { shallow } from 'enzyme'
import { EditExpensePage } from '../../components/EditExpensePage'
import expenses from '../fixtures/expenses'


let wrapper, history, startRemoveExpense, startEditExpense
beforeEach(() => {
    startRemoveExpense = jest.fn()
    startEditExpense = jest.fn()
    history = { push: jest.fn() }
    wrapper = shallow(
        < EditExpensePage
            startEditExpense={startEditExpense}
            startRemoveExpense={startRemoveExpense}
            history={history}
            expense={expenses[0]}
        />
    )
})

test('should render edit expense page correctly', () => {
    expect(wrapper).toMatchSnapshot()
})

test('should handle startEditExpense', () => {
    wrapper.find('ExpenseForm').prop('onSubmit')(expenses[0])
    expect(history.push).toHaveBeenLastCalledWith('/')
    expect(startEditExpense).toHaveBeenLastCalledWith(expenses[0].id, expenses[0])    
})

test('should hande startRemoveExpense', () => {
    wrapper.find('button').simulate('click')
    expect(history.push).toHaveBeenLastCalledWith('/')
    expect(startRemoveExpense).toHaveBeenLastCalledWith({ id: expenses[0].id })
})