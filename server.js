require('dotenv').config();
const express = require('express');
const app = express();
const mongoose = require('mongoose');

app.use(express.json());

app.get('/', (req, res) => {
    res.send('The API of "RTK Query With API"');
});

app.use('/user', require('./routes/user'));

const PORT = process.env.PORT || 9500;

mongoose
    .connect('mongodb://127.0.0.1:27017/rtk_query_with_api')
    .then(() => {
        app.listen(PORT, () => {
            console.log(`Listen on PORT ${PORT}`);
        });
    })
    .catch(console.error);
