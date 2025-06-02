// proxy.js
const express = require('express');
const fetch = require('node-fetch');
const app = express();
app.use(express.json());

const APPS_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbz5u5GNKbUdzUhSsG6ZWLA6J48KyphMYoAZDBMf6RnB4wr1povorYfMAl538qByqax2/exec';

app.post('/proxy', async (req, res) => {
  try {
    const response = await fetch(APPS_SCRIPT_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(req.body)
    });
    const data = await response.json();
    res.json(data);
  } catch (error) {
    res.status(500).json({ success: false, message: 'Proxy error', error: error.message });
  }
});

app.listen(3000, () => {
  console.log('Proxy server running on http://localhost:3000');
});