export default function handler(req, res) {
    if (req.method === 'GET') {
        const VERIFY_TOKEN = "diannurwahid1@gmail.com"; // ganti dengan token kamu

        const mode = req.query['hub.mode'];
        const token = req.query['hub.verify_token'];
        const challenge = req.query['hub.challenge'];

        if (mode && token && mode === 'subscribe' && token === VERIFY_TOKEN) {
            console.log('WEBHOOK_VERIFIED');
            res.status(200).send(challenge);
        } else {
            res.sendStatus(403);
        }
    } else if (req.method === 'POST') {
        console.log('📥 POST Webhook:', req.body);

        // Lakukan sesuatu dengan webhook Instagram di sini
        res.status(200).send('EVENT_RECEIVED');
    } else {
        res.setHeader('Allow', ['GET', 'POST']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}
