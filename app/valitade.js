const inputs = [
    '1234567890',
    '1234567890a',
    '1234567890A',
    '1234567890aA',
]
const results = []
inputs.forEach(input => {
    const result = validate(input)
    results.push({ input, result })
})
function validate(input) {
    console.log(input)
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{10,}$/
    return regex.test(input)
}

console.log('08709e4e-95af-486d-ac4b-3c27fa42965f')
console.log(results)

