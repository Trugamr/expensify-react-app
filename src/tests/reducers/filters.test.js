import filtersReducer from '../../reducers/filters'
import moment from 'moment'

test('should set up default reducer values', () => {
    const state = filtersReducer(undefined, {
        type: '@@INIT'
    });
    expect(state).toEqual({
        text: '',
        sortBy: 'date',
        startDate: moment().startOf('month'),
        endDate: moment().endOf('month')
    })
})

test('should set sortBy to amount', () => {
    const state = filtersReducer(undefined, {
        type: 'SORT_BY_AMOUNT'
    })
    expect(state.sortBy).toBe('amount')
})

test('should set sortBy to date', () => {
    const defaultState = {
        text: '',
        sortBy: 'amount',
        startDate: moment().startOf('month'),
        endDate: moment().endOf('month')
    }
    const action = { sortBy: 'date' }
    const state = filtersReducer({}, {
        type: 'SORT_BY_DATE'
    })
    expect(state.sortBy).toBe('date')
})

test('should set text filter', () => {
    const state = filtersReducer(undefined, {
        type: 'SET_TEXT_FILTER',
        text: 'test'
    })
    expect(state.text).toBe('test')
})

test('should set start date', () => {
    const state = filtersReducer(undefined, {
        type: 'SET_START_DATE',
        startDate: moment(2000)
    })
    expect(state.startDate).toEqual(moment(2000))
})

test('should set end date', () => {
    const state = filtersReducer(undefined, {
        type: 'SET_END_DATE',
        endDate: moment(3000)
    })
    expect(state.endDate).toEqual(moment(3000))
})