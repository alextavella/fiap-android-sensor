module.exports = () => {

    const request = require('request');
    const five = require('johnny-five');
    const _ = require('lodash');
    const sensors = require('./sensors');

    const board = new five.Board();

    const config = {
        baseUrl: 'https://us-central1-fiapmob-50e3b.cloudfunctions.net'
    };

    const sendMessage = (message) => {
        console.log(`Send message ${message}`);

        const url = `${config.baseUrl}/message?text=${message}`;
        request
            .post(url)
            .on('response', (response) => {
                console.log(response.statusCode)
                console.log(response.headers['content-type'])
            });
    };

    const sendNotification = (body) => {
        console.log(`Send notification ${body.msg}`);

        const url = `${config.baseUrl}/notificaton`;
        request
            .post(url)
            .form(body);
    };

    const getDevice = (sensor) => {
        // console.log('sensors.data', sensors.data);
        return _.find(sensors.data, { id: sensor });
    };

    const changeMotion = (params) => {
        const { sensor, value } = params;
        const device = sensors.get(sensor);

        if (device && !device.notificated) {

            changeStatus(device);

            device.notificated = true;
            sensors.edit(device);
        }

        // addHistory(sensor, value);
    };

    const changeStatus = (device) => {
        if (device && device.status) {
            console.log('device.status', device.status);
            sendNotification({ msg: `Sensor ${device.id} foi disparado!` });
        }

        // const url = `${config.baseUrl}/device`;
        // const body = { id: sensor, status: value };

        // console.log(url, body);
        // request
        //     .post(url)
        //     .form(body)
        //     .on('response', (response) => {
        //         console.log(response.statusCode);
        //         sendNotification(body);
        //     });
    };

    let history = [];
    const getHistory = (sensor) => _.find(history, { sensor: sensor });
    const addHistory = (sensor, value) => {
        _.remove(history, { sensor: sensor });
        history.push({ sensor: sensor, value: value });
        // console.log(`history: ${JSON.stringify(history)}`);
    };

    board.on("ready", () => {
        console.log('------ Ready ------');

        let proximity = new five.Proximity({
            controller: "HCSR04",
            pin: 7
        });

        proximity.on("data", function () {
            const value = Math.floor(this.cm) > 10;

            // console.log("Proximity: ");
            // console.log("  cm  : ", this.cm);
            // console.log("  in  : ", this.in);
            // console.log('  e   : ', value);
            // console.log("-----------------");

            changeMotion({ sensor: '03', value: value });
        });

        // proximity.on("change", function () {
        //     console.log("The obstruction has moved.");
        // });

    });
}