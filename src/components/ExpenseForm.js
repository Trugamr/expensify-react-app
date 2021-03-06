import React from 'react'
import moment from 'moment'
import { SingleDatePicker } from 'react-dates'
// to show remove expense button on edit expense page inline with save expense
import { startRemoveExpense } from '../actions/expenses'
import { connect } from 'react-redux'
import { history } from '../routers/AppRouter'

const now= new moment()
// console.log(now.format('MMM Do, YYYY'))

export class ExpenseForm extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            description: props.expense ? props.expense.description : '',
            note: props.expense ? props.expense.note : '',
            amount: props.expense ? (props.expense.amount / 100) : '',
            createdAt: props.expense ? moment(props.expense.createdAt) : moment(),
            calendarFocused: false,
            error: ''
        }
    }
    onDescriptionChange = (e) => {
        // e.persist() used to persist event, event is not available in set state function
        // due to react event pooling or simplay use a variable to store value first then update state
        const description = e.target.value
        this.setState(() => ({ description }))
    }
    onNoteChange = (e) => {
        e.persist()
        this.setState(() => ({ note: e.target.value }))
    }
    onAmountChange = (e) => {
        const regex = /^[0-9]{1,}(\.[0-9]{0,2})?$/
        const amount = e.target.value
        if(!amount || regex.test(amount)) this.setState({ amount })   
        this.onDateChange()    
    }
    onDateChange = (createdAt) => {
        if(createdAt) this.setState(() => ({ createdAt }))
    }
    onFocusChange = ({ focused }) => {
        this.setState(() => ({ calendarFocused: focused }))
    }
    onSubmit = (e) => {
        e.preventDefault()
        if(!this.state.description || !this.state.amount) {
            this.setState({ error: 'Please enter description and amount.' })
        } else {
            this.setState({ error: '' })
            this.props.onSubmit({
                description: this.state.description,
                amount: parseFloat(this.state.amount) * 100,
                createdAt: this.state.createdAt.valueOf(),
                note: this.state.note
            })
        }
    }
    // just to show remove expense button here
    onRemoveExpense = (e) => {
        e.preventDefault()
        this.props.startRemoveExpense({ id: this.props.expense.id })
        history.push('/')
    }
    render() {
        return (
            <form className="form" onSubmit={ this.onSubmit }>
                {this.state.error && <p className="form__error">
                    {this.state.error}
                </p>}
                <input
                    className="input"
                    type="text"
                    placeholder="Description"
                    autoFocus
                    value={ this.state.description }
                    onChange={ this.onDescriptionChange }
                />
                <input
                    type="text"
                    className="input"
                    placeholder="Amount"
                    value={ this.state.amount }
                    onChange={ this.onAmountChange }
                />
                <SingleDatePicker
                    date={ this.state.createdAt }
                    onDateChange={ this.onDateChange }
                    focused={ this.state.calendarFocused }
                    onFocusChange={ this.onFocusChange }
                    numberOfMonths={1}
                    isOutsideRange={(day) => (false)}
                    displayFormat={'MMM Do, YYYY'}
                    customInputIcon={<i className="fas fa-calendar-day"> </i>}
                />
                <textarea
                    className="textarea"
                    placeholder="Add a note for your expense (optional)"
                    value={ this.state.note }
                    onChange={ this.onNoteChange}
                >
                </textarea>
                <div className="form__button-group">
                    { this.props.showRemove && 
                        <button className="form__button remove-button button red" onClick={this.onRemoveExpense}>
                            <i className="fas fa-trash"></i> &nbsp;Remove Expense
                        </button>
                    }
                    <button className="form__button save-button button green">
                        <i className="fas fa-save"></i> &nbsp;Save Expense
                    </button>
                </div>
            </form>
        )
    }
}


const mapDispatchToProps = (dispatch) => ({
    startRemoveExpense: (data) => dispatch(startRemoveExpense(data))
})


export default connect(undefined, mapDispatchToProps)(ExpenseForm)