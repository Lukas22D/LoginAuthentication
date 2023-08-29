const express = require('express');
const controllers = require('./Controllers/AuthConstrollers.js');
const middleware = require('./middleware.js')
const app = express();

// Config Express to receive JSON
app.use(express.json());


// Register User
app.post('/auth/register', controllers.RegisterController);


// Login User
app.post('/auth/login', controllers.LoginController);

//Private Route
app.get('/user/:id', middleware, controllers.privateRoute);

module.exports = app;
