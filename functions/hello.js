exports.handler = async function (event, context) {
    return {
        statusCode: 200,
        body: JSON.stringify({
            name: 'HELLO',
            age:99,
            email: 'aa@aa.com',
        })
    }
}