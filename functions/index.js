const functions = require('firebase-functions')
const express = require('express')
const cors = require('cors')

const app = express()

app.use(cors({ origin: true }))

// Create and Deploy Your First Cloud Functions
// https://firebase.google.com/docs/functions/write-firebase-functions

app.use('/twitter/', require('./twitter'))

exports.api = functions.https.onRequest(app)
