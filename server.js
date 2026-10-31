require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const app = express();
const cookies = require('cookie-parser');
const authRoute = require('./routes/authRoute');
const courseRoute = require('./routes/courseRoute');
const facultyRoute = require('./routes/facultyRoute');
const studentRoute = require('./routes/studentRoute');

app.use(express.json())
app.use('/api', authRoute);
app.use('/api', courseRoute);
app.use('/api', facultyRoute);
app.use('/api', studentRoute);

app.use(cookies());

const dns = require('dns');
dns.setServers(['1.1.1.1', '8.8.8.8']);

mongoose.connect(process.env.DATABASE_URL);
const database = mongoose.connection;

database.on('error', () => {
    console.log("Error connecting");
})

database.once('connected', () => {
    console.log('Database connected');
})


const PORT = 3000;
app.listen(PORT, () => {
    console.log('Server started');
});