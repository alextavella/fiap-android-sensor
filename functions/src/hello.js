module.exports = (params) => {
    const { functions } = params;

    // Create and Deploy Your First Cloud Functions
    // https://firebase.google.com/docs/functions/write-firebase-functions
    return functions
        .https
        .onRequest((req, res) => {
            const method = req.method.toUpperCase();
            const { msg } = req.body || 'Firebase';
            res.send(`Hello from ${msg}! 
                method: ${method} 
                body:${JSON.stringify(req.body)} 
                params:${JSON.stringify(req.params)} 
                query:${JSON.stringify(req.query)}`);
        });
}