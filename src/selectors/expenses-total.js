export default (expenses) => {
    return expenses
            .map(expense => expense.amount)
            .reduce((acc, item) => acc += item, 0)
}