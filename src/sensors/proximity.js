module.exports = (five, params) => {

    const _ = require('lodash')

    const device = require('../services/device')
    const message = require('../services/message')
    const notification = require('../services/notification')

    const { id, once } = params;
    const limit = 5

    let unique = false

    //
    // Services
    //
    const sendMessage = (message) => message.send(message)
    const sendNotification = (message) => notification.send(message)
    const getDevice = (id) => device.get(id)
    const editDevice = (device) => device.edit(device)

    //
    // Controller
    //
    const changeMotion = async (params) => {
        const { sensor } = params

        const device = await getDevice(sensor)
        // console.log('device', device)

        if (device && !device.notificated && device.status) {

            console.log('Sensor habilitado?', device.status)
            sendNotification(`Sensor ${device.id} foi disparado!`)

            device.notificated = true
            editDevice(device)

            return true
        }

        return false
    }

    //
    // Sensor
    //
    const proximity = new five.Proximity({
        controller: "HCSR04",
        pin: 7
    })

    proximity.on("data", () => {
        const value = Math.floor(this.cm) < limit

        if (!unique && once) {

            // console.log("Proximity: ")
            // console.log("  cm  : ", this.cm)
            // console.log("  in  : ", this.in)
            console.log('Detectou presença?   : ', value)
            console.log("-----------------")

            if (value)
                unique = changeMotion({ sensor: id })
        }
    })

    // proximity.on("change", function () {
    //     console.log("The obstruction has moved.")
    // })
}