// file: server.js
const express = require('express');
const bodyParser = require('body-parser');
const app = express();

const VERIFY_TOKEN = "diannurwahid1@gmail.com"; // Sama seperti yang kamu tulis di developer page

app.use(bodyParser.json());

// Endpoint verifikasi (GET)
app.get('/webhook', (req, res) => {
    const mode = req.query['hub.mode'];
    const token = req.query['hub.verify_token'];
    const challenge = req.query['hub.challenge'];

    if (mode === 'subscribe' && token === VERIFY_TOKEN) {
        console.log('✅ Webhook verified!');
        res.status(200).send(challenge);
    } else {
        res.sendStatus(403);
    }
});

// Endpoint penerima event (POST)
app.post('/webhook', (req, res) => {
    console.log('📩 Webhook event received:');
    console.dir(req.body, { depth: null });
    res.sendStatus(200);
});

app.listen(3000, () => {
    console.log('🚀 Webhook server running on port 3000');
});
