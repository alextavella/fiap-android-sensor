//
// Notification Service
//

const axios = require('axios')
const config = require('../config')

const send = (message) => {
    console.log(`Enviando notificação: ${message}`)

    const url = `${config.baseUrl}/notificaton`
    return axios
        .post(url, message)
}

module.exports = { send }