module.exports = (params) => {
    const { functions } = params;

    let devices = {
        data: [
            {
                id: '01',
                name: 'Motion Sensor Main Door',
                status: true
            },
            {
                id: '02',
                name: 'Motion Sensor Bedroom',
                status: true
            },
            {
                id: '03',
                name: 'Motion Sensor Kitchen',
                status: true
            },
            {
                id: '04',
                name: 'Motion Sensor Garden',
                status: true
            }
        ]
    };

    const list = () => devices;

    const get = (index) => devices.data[index];

    const edit = (params) => {
        const { id, status } = params;
        let edited = null;
        for (let i = 0; i < devices.data.length; i++) {
            let dev = get(i);
            if (dev.id === id) {
                dev.status = status;
                edited = dev;
            }
        }
        return edited;
    };

    return functions
        .https
        .onRequest((req, res) => {
            const method = req.method.toUpperCase();
            switch (method) {
                case 'POST':
                    return res.json(edit(req.body));
                case 'GET':
                default:
                    return res.json(list());
            }
        });
}