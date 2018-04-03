module.exports = (params) => {
    const { functions } = params;

    // Create and Deploy Your First Cloud Functions
    // https://firebase.google.com/docs/functions/write-firebase-functions
    return functions
        .https
        .onRequest((req, res) => {
            const method = req.method.toUpperCase();
            res.send(`Hello from Firebase! ${method}`);
        });
}