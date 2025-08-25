const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const resultsRoutes = require('./routes/results.routes');

const app = express();

app.use(express.json({ limit: '1mb' }));
app.use(morgan('dev'));

const allowedOrigin = process.env.CORS_ORIGIN || '*';
app.use(cors({ origin: allowedOrigin, credentials: true }));

app.get('/health', (req, res) => res.json({ ok: true, service: 'db-mini-backend' }));

app.use('/api', resultsRoutes);

// Global error handler
app.use((err, req, res, next) => {
    console.error(err);
    const status = err.status || 500;
    res.status(status).json({ message: err.message || 'Internal Server Error' });
});

module.exports = app;