module.exports = (params) => {
    const { admin, functions } = params;

    // Take the text parameter passed to this HTTP endpoint and insert it into the
    // Realtime Database under the path /messages/:pushId/original
    return functions
        .https
        .onRequest((req, res) => {

            const topic = 'all';
            const { msg } = req.body;

            const payload = {
                topic: topic,
                notification: {
                    title: 'Alert Me House',
                    body: msg
                }
            };

            admin
                .messaging()
                .send(payload)
                .then((response) => res.send('Sent by Push!'))
                .catch((error) => res.send(`Error Notification ${error}`))
                ;
        })
        ;
}