const axios = require('axios');

// Bot URL (http) + port 2003, tanpa path tambahan
const BOT_URL = 'http://nazzwannn.ommdhangantenk.my.id:2003';

module.exports = async (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    if (req.method === 'OPTIONS') {
        return res.status(200).end();
    }

    if (req.method !== 'POST') {
        return res.status(405).json({ status: 'error', message: 'Method not allowed' });
    }

    const { target, text } = req.body;
    const domain = req.headers.origin || req.headers.referer || 'unknown';

    if (!target || !text) {
        return res.status(400).json({ status: 'error', message: 'Nomor dan text wajib diisi' });
    }

    try {
        const response = await axios.post(BOT_URL, {
            target,
            text,
            domain
        }, {
            timeout: 30000,
            headers: { 'Content-Type': 'application/json' }
        });

        return res.status(200).json(response.data);
    } catch (error) {
        console.error('[API] Error:', error.message);
        if (error.response) {
            return res.status(error.response.status).json(error.response.data);
        }
        return res.status(500).json({
            status: 'error',
            message: 'Gagal terhubung ke bot: ' + error.message
        });
    }
};