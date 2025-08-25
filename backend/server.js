require('dotenv').config();
const express = require('express');
const app = require('./src/app');
const { connectDB } = require('./src/config/db');
const path = require('path');

const PORT = process.env.PORT || 8080;

(async () => {
  try {
    await connectDB();

    app.use(express.static(path.join(__dirname, '../frontend/dist')));
    app.get('*', (req, res) => {
      res.sendFile(path.join(__dirname, '../frontend/dist/index.html'));
    });

    app.listen(PORT, () => console.log(`API server listening on :${PORT}`));
  } catch (err) {
    console.error('Failed to start server:', err);
    process.exit(1);
  }
})();