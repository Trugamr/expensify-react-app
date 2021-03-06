import React from 'react'
import { shallow } from 'enzyme'
import { ExpenseListFilters } from '../../components/ExpenseListFilters'
import { filters, altFilters } from '../fixtures/filters'
import moment from 'moment'

let setTextFilter, sortByDate, sortByAmount, setStartDate, setEndDate, wrapper;
beforeEach(() => {
    setTextFilter = jest.fn()
    sortByDate = jest.fn()
    sortByAmount = jest.fn()
    setStartDate = jest.fn()
    setEndDate = jest.fn()
    wrapper = shallow(
        < ExpenseListFilters 
            filters = {filters}
            setTextFilter = {setTextFilter}
            sortByDate = { sortByDate }
            sortByAmount = { sortByAmount }
            setStartDate = { setStartDate }
            setEndDate = { setEndDate }
        />
    )
})

test('should render expense list filters correctly', () => {
    expect(wrapper).toMatchSnapshot()
})

test('should render expense list filters with alt filters correctly', () => {
    wrapper.setProps({
        filters: altFilters
    })
    expect(wrapper).toMatchSnapshot()
})

test('should hande text change', () => {
    wrapper.find('input').simulate('change', {target: { value: "test text"}})
    expect(setTextFilter).toHaveBeenLastCalledWith('test text')
})

test('should sort by date', () => {
    wrapper.find('select').simulate('change', {target: { value: 'date'}})
    expect(sortByDate).toHaveBeenCalled()
})

test('should sort by amount', () => {
    wrapper.find('select').simulate('change', {target: { value: 'amount'}})
    expect(sortByAmount).toHaveBeenCalled()
})

test('should handle dates changes', () => {
    const startDate = moment(0).add('4', 'years')
    const endDate = moment(0).add('8', 'years')
    wrapper.find('DateRangePicker').prop('onDatesChange')({ startDate, endDate })
    expect(setStartDate).toHaveBeenLastCalledWith(startDate)
    expect(setEndDate).toHaveBeenLastCalledWith(endDate)
})

test('should handle date focus change', () => {
    const calenderFocused = 'endDate';
    wrapper.find('DateRangePicker').prop('onFocusChange')(calenderFocused)
    expect(wrapper.state('calendarFocused')).toEqual(calenderFocused)
})