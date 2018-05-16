const _ = require('lodash');

const devices = {
    data: [
        {
            id: '01',
            name: 'Motion Sensor Main Door',
            notificated: false,
            status: true
        },
        {
            id: '02',
            name: 'Motion Sensor Bedroom',
            notificated: false,
            status: true
        },
        {
            id: '03',
            name: 'Motion Sensor Kitchen',
            notificated: false,
            status: true
        },
        {
            id: '04',
            name: 'Motion Sensor Garden',
            notificated: false,
            status: true
        }
    ]
};

const list = () => devices;

const get = (id) => _.find(devices.data, { id: id });

const edit = (params) => {
    const { id, name, status, notificated } = params;
    let edited = null;
    for (let i = 0; i < devices.data.length; i++) {
        let device = devices.data[i];
        if (device.id === id) {
            device.status = (status || status == 'true');
            device.notificated = notificated;
            edited = device;
        }
    }
    return edited;
};

module.exports = {
    data: devices,
    list: list,
    get: get,
    edit: edit
};
