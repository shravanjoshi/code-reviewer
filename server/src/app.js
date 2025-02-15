const express = require('express');
const app = express();
const cors = require('cors');
const aiRouter = require('./routes/ai.routes');

app.use(cors());
app.use(express.json());

app.use('/ai', aiRouter);

module.exports = app;