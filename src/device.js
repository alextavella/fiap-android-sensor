module.exports = (params) => {

    const _ = require('lodash');
    const sensors = require('./sensors');
    const { functions } = params;

    return functions
        .https
        .onRequest((req, res) => {
            const method = req.method.toUpperCase();
            switch (method) {
                case 'POST':
                    return res.json(sensors.edit(req.body));
                case 'GET':
                default:
                    return res.json(sensors.list());
            }
        });
}