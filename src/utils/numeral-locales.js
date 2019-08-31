import numeral from 'numeral'

numeral.register('locale', 'in', {
    delimiters: {
        thousands: ',',
        decimal: '.'
    },
    currency: {
        symbol: '₹'
    }
})

export default numeral