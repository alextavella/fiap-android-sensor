// The Cloud Functions for Firebase SDK to create Cloud Functions and setup triggers.
const functions = require('firebase-functions');

// The Firebase Admin SDK to access the Firebase Realtime Database.
const admin = require('firebase-admin');
admin.initializeApp(functions.config().firebase);

// Services
const config = { admin, functions };

//https://us-central1-fiapmob-50e3b.cloudfunctions.net/hello
exports.hello = require('./src/hello')(config);

//https://us-central1-fiapmob-50e3b.cloudfunctions.net/message
exports.message = require('./src/message')(config);

//https://us-central1-fiapmob-50e3b.cloudfunctions.net/notification
// exports.notification = require('./src/notification')(config);

//https://us-central1-fiapmob-50e3b.cloudfunctions.net/device
exports.device = require('./src/device')(config);
