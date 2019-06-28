import React from 'react'
import { conect } from 'react-redux'
import { connect } from 'react-redux'
import { setTextFilter, sortByAmount, sortByDate } from '../actions/filters'

const ExpenseListFilter = ({ filters, dispatch }) => (
    <div>
        <input type="text" value={filters.text} onChange={(e) => {
            dispatch(setTextFilter(e.target.value))
        }} />
        <select value={filters.sortBy} onChange={(e) => {
            if(e.target.value === 'date') {
                dispatch(sortByDate())
            } else if(e.target.value === 'amount') {
                dispatch(sortByAmount())
            }
        }}>
            <option value="date">Date</option>
            <option value="amount">Amount</option>
        </select>
    </div>
)

const mapStateToProps = (state) => {
    return {
        filters: state.filters
    }
}

export default connect(mapStateToProps)(ExpenseListFilter)