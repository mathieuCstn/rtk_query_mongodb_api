require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');

app.use(express.json());
app.use(cors());

app.get('/', (req, res) => {
    res.send('The API of "RTK Query With API"');
});

app.use('/user', require('./routes/user'));
app.use('/blog', require('./routes/blog'));

const PORT = process.env.PORT || 9500;

mongoose
    .connect(process.env.MONGODB_DSN)
    .then(() => {
        console.log('Mongodb database connection is established');
        app.listen(PORT, () => {
            console.log(`Listen on PORT ${PORT}`);
        });
    })
    .catch(console.error);
