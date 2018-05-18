//
// Message Service
//

const axios = require('axios')
const config = require('../config')

const send = (message) => {
    console.log(`Send message ${message}`)

    const url = `${config.baseUrl}/message?text=${message}`
    return axios
        .post(url)
        .then((response) => {
            console.log(response.statusCode)
            console.log(response.headers['content-type'])
            return response
        })
}

module.exports = { send }