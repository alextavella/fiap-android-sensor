module.exports = (params) => {
    const { admin, functions } = params;

    // Take the text parameter passed to this HTTP endpoint and insert it into the
    // Realtime Database under the path /messages/:pushId/original
    return functions
        .https
        .onRequest((req, res) => {
            // Grab the text parameter.
            const original = req.query.text;
            const payload = { original: original };
            // Push the new message into the Realtime Database using the Firebase Admin SDK.
            return admin
                .database()
                .ref('/messages')
                .push(payload)
                .then((snapshot) => {
                    return res.send(`Sent Message ${original}`);
                    // Redirect with 303 SEE OTHER to the URL of the pushed object in the Firebase console.
                    // return res.redirect(303, snapshot.ref);
                });
        });
}