require('dotenv').config();
const app = require('./app.js');
const mongoose = require('mongoose');

// Credencials for MongoDB
const dbUser = process.env.DB_USER;
const dbPassword = process.env.DB_PASS;

mongoose
    .connect(`mongodb+srv://${dbUser}:${dbPassword}@cluster0.pcnpvny.mongodb.net/?retryWrites=true&w=majority`)
    .then(() => {
        app.listen(3000);
        console.log('Server is running');
    }).catch(err => {
        console.log(err);
    });
