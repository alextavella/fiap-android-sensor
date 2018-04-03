module.exports = () => {

    const request = require('request');
    const five = require('johnny-five');
    const board = new five.Board({ port: 'COM3' });

    const config = {
        baseUrl: 'https://us-central1-fiapmob-50e3b.cloudfunctions.net'
    };

    const sendMessage = (message) => {
        console.log(message);

        const url = `${config.baseUrl}/message?text=${message}`;
        request
            .post(url)
            .on('response', (response) => {
                console.log(response.statusCode)
                console.log(response.headers['content-type'])
            });
    };

    const sendNotification = (body) => {
        const url = `${config.baseUrl}/notificaton`;
        request
            .post(url)
            .form(body);
    };

    const changeStatus = (value) => {
        const url = `${config.baseUrl}/device`;
        const body = { id: '03', status: value };
        request
            .post(url)
            .form(body)
            .on('response', (response) => {
                console.log(response.statusCode);
                sendNotification(body);
            });
    };

    let lastChanged;
    const changeMotion = (params) => {
        const { timestamp, detectedMotion, isCalibrated } = params;
        if (lastChanged != detectedMotion) {
            changeStatus(detectedMotion);
        }
        lastChanged = detectedMotion;
    };

    board.on("ready", () => {
        console.log('Ready');

        let motion = new five.Motion({
            pin: 7
        });

        // motion.on("calibrated", () => sendMessage('calibrated'));
        // motion.on("change", () => sendMessage('change'));

        motion.on("data", (value) => changeMotion(value));

        // "motionstart" events are fired when the "calibrated"
        // proximal area is disrupted, generally by some form of movement
        // motion.on("motionstart", () => sendMessage('motionstart'));

        // "motionend" events are fired following a "motionstart" event
        // when no movement has occurred in X ms
        // motion.on("motionend", () => sendMessage('motionend'));
    });
}