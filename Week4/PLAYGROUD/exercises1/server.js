require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const routes = require('./routes');

const PORT = 1000;

const mongoString = process.env.DATABASE_URL;
const app = express();

app.use(express.json());
app.use('/api', routes);

mongoose.connect(mongoString, { useNewUrlParser: true, useUnifiedTopology: true });

const database = mongoose.connection;

database.on('error', (err) => console.log(err));

database.on('connected', () => {
    console.log('Database connected');
});


app.listen(PORT, () => {
    console.log(`Server started at localhost:${PORT}`);
});