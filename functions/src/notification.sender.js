module.exports = (params) => {
    const { admin, functions } = params;

    const gcm = require("node-gcm");

    // Take the text parameter passed to this HTTP endpoint and insert it into the
    // Realtime Database under the path /messages/:pushId/original
    return functions
        .https
        .onRequest((req, res) => {

            const token = 'AAAAPuOQPxk:APA91bGV2nw7FgOYJBikYdB316_Im5tT_eHXUT2p8SV7lNu6DBIcdOvM8fUBjWx4D-GMYjooFtGZeJwzL3drVilERLTwSwagvDswYyNU-8kuNKTDbmzHO-4gyboTWPQ9pAs0kCesvIcl';
            const sender = new gcm.Sender(token);

            const { msg } = req.body;

            const message = new gcm.Message({
                notification: {
                    title: "Alert Me House",
                    body: msg
                },
            });

            const recipients = { to: "/topics/all" };

            sender.sendNoRetry(message, recipients, (err, response) => {
                if (err) {
                    return res.send(`Error Notification: ${err}`);
                }
                return res.send('Sent by Notification!');
            });
        })
        ;
}