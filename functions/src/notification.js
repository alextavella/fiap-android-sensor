module.exports = (params) => {
    const { admin, functions } = params;

    // Take the text parameter passed to this HTTP endpoint and insert it into the
    // Realtime Database under the path /messages/:pushId/original
    return functions
        .https
        .onRequest((req, res) => {

            // The topic name can be optionally prefixed with "/topics/".
            const topic = "alert";

            // See the "Defining the message payload" section below for details
            // on how to define a message payload.
            const { id, status } = req.body;
            const payload = {
                data: {
                    id: id,
                    status: `${status}`
                }
            };

            // Send a message to devices subscribed to the provided topic.
            admin
                .messaging()
                .sendToTopic(topic, payload)
                .then((response) => {
                    // See the MessagingTopicResponse reference documentation for the
                    // contents of response.
                    console.log("Successfully sent message:", response);
                    return res.send(`Sent Notification ${topic} | ${JSON.stringify(payload)}`);
                })
                .catch((error) => {
                    console.log("Error sending message:", error);
                    return res.send(`Sent Notification ${JSON.stringify(error)}`);
                })
                ;
        })
        ;
}