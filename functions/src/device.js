module.exports = (params) => {
    const { functions } = params;

    const _ = require('lodash');
    const sensors = require('./sensors');

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