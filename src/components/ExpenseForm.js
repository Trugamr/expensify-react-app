import React from 'react'
import moment from 'moment'
import { SingleDatePicker } from 'react-dates'

const now= new moment()
// console.log(now.format('MMM Do, YYYY'))

class ExpenseForm extends React.Component {
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
            this.setState({ error: 'Please enter description and amount' })
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
    render() {
        return (
            <div>
                <p>{this.state.error && this.state.error}</p>
                <form onSubmit={ this.onSubmit }>
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
                        displayFormat={'MMM Do'}
                        customInputIcon={<i className="fas fa-calendar-day"> </i>}
                    />
                    <textarea
                        className="textarea"
                        placeholder="Add a note for your expense (optional)"
                        value={ this.state.note }
                        onChange={ this.onNoteChange}
                    >
                    </textarea>
                    <button>Add Expense</button>
                </form>
            </div>
        )
    }
}

export default ExpenseForm