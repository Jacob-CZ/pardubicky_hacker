export default function precompileCode(lang: string, funcName:string, testCases: string, secret: string) {
    return`
    const tests = ${testCases}
    const results = []
    tests.forEach((test) => {
        result = ${funcName}(test)
        results.push(result)
        console.log(result)
    })

    function ${funcName}(input){
        return input
    }    

    console.log(secret)
    console.log(results)
    `
}
