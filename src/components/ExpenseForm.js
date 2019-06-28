import React from 'react'

class ExpenseForm extends React.Component {
    state = {
        description: '',
        note: '',
        amount: 0
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
        const regex = /^[0-9]*(\.[0-9]{0,2})?$/
        const amount = e.target.value
        if(regex.test(amount)) this.setState({ amount })        
    }
    render() {
        return (
            <div>
                <form>
                    <input
                        type="text"
                        placeholder="description"
                        autoFocus
                        value={ this.state.description }
                        onChange={ this.onDescriptionChange }
                    />
                    <input
                        type="text"
                        placeholder="Amount"
                        value={ this.state.amount }
                        onChange={ this.onAmountChange }
                    />
                    <textarea
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