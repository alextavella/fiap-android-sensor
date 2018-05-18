//
// Device Service
//

const axios = require('axios')
const config = require('../config')

const get = (id) => {
    return new Promise((resolve, reject) => {
        const url = `${config.baseUrl}/device`
        axios
            .get(url)
            .then((response) => {
                const selected = _.find(result.data, { id: id })
                resolve(selected)
            })
            .catch((err) => reject(err))
    })
}

const edit = (device) => {
    return new Promise((resolve, reject) => {
        const url = `${config.baseUrl}/device`
        axios
            .post(url, device)
            .then((response) => {
                resolve(response.data)
            })
            .catch((err) => reject(err))
    })
}

module.exports = { get, edit }
