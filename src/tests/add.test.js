const add = (...items) => {
    let sum = 0;
    items.forEach(item => sum += item)
    return sum
}

test('should add numbers', () => {
    const result = add(3, 4, 5)
    expect(result).toBe(12)
})

const generateGreeting = (name) => `Hello ${name}!`

test('should return greeting', () => {
    expect(generateGreeting('Jane')).toBe('Hello Jane!')
})