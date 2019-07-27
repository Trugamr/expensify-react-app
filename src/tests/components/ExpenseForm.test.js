import React from 'react'
import { shallow } from 'enzyme'
import expenses from '../fixtures/expenses'
import ExpenseForm from '../../components/ExpenseForm'

test('should render expense form correctly', () => {
    const wrapper = shallow(< ExpenseForm />)
    expect(wrapper).toMatchSnapshot()
})

test('should render expense from with expense', () => {
    const wrapper = shallow(< ExpenseForm expense={expenses[0]}/>)
    expect(wrapper).toMatchSnapshot()
})