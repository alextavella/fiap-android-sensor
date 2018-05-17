module.exports = () => {

    const axios = require('axios');
    const request = require('request');
    const five = require('johnny-five');
    const _ = require('lodash');

    const SENSOR_ID = '03';
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
        console.log(`Enviando notificação: ${body.msg}`);

        const url = `${config.baseUrl}/notificaton`;
        request
            .post(url)
            .form(body);
    };

    const getDevice = (sensor) => {
        return new Promise((resolve, reject) => {
            const url = `${config.baseUrl}/device`;
            axios
                .get(url)
                .then((response) => {
                    const result = response.data;
                    // console.log('get', result.data);
                    const device = _.find(result.data, { id: sensor });
                    resolve(device);
                })
                .catch((err) => {
                    // console.log(err);
                    reject(err);
                });
        });
    };


    const editDevice = (device) => {
        return new Promise((resolve, reject) => {
            const url = `${config.baseUrl}/device`;
            axios
                .post(url, device)
                .then((response) => {
                    const result = response.data;
                    // console.log('edited', result);
                    resolve(result);
                })
                .catch((err) => {
                    // console.log(err);
                    reject(err);
                });
        });
    };

    const changeMotion = async (params) => {
        const { sensor } = params;

        const device = await getDevice(sensor);
        // console.log('device', device);

        if (device && !device.notificated) {

            changeStatus(device);

            device.notificated = true;

            editDevice(device);

            return true;
        }

        return false;
    };

    const changeStatus = (device) => {
        console.log('Sensor habilitado?', device.status);

        if (device && device.status) {
            sendNotification({ msg: `Sensor ${device.id} foi disparado!` });
        }
    };

    let unique = false;
    board.on("ready", () => {
        console.log('------ Ready ------');

        let proximity = new five.Proximity({
            controller: "HCSR04",
            pin: 7
        });

        proximity.on("data", function () {
            const value = Math.floor(this.cm) < 5;

            if (!unique) {

                // console.log("Proximity: ");
                // console.log("  cm  : ", this.cm);
                // console.log("  in  : ", this.in);
                console.log('Detectou presença?   : ', value);
                console.log("-----------------");

                if (value)
                    unique = changeMotion({ sensor: SENSOR_ID });
            }
        });

        // proximity.on("change", function () {
        //     console.log("The obstruction has moved.");
        // });
    });
}