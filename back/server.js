const express = require('express');
const app = express();

const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
require('dotenv').config();

mongoose.Promise = global.Promise;
mongoose.connect(process.env.DATABASE);

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(cookieParser());


// ----------- MODELS ----------

const User = require('./models/user');

// ----------- USERS -----------

app.post('/api/users/register', (request, response) => {
    const user = new User(request.body);
    user.save((err, doc) => {
        if(err) {
            return response.json({success: false, err});
        }
        response.status(200).json({
            success: true,
            userdata: doc
        });
    });
});

app.post('/api/users/login', (request, response) => {
    User.findOne({'email': request.body.email}, (err, user) => {
        if(!user) {
            return response.json({loginSuccess: false, message: 'Błąd logowania, podany e-mail nie istnieje'});
        }
        user.comparePassword(request.body.password, (err, isMatch) => {
            if(!isMatch) {
                return response.json({loginSuccess: false, message: 'Błędne hasło'});
            }
            user.generateToken((err, user) => {
                if(err) {
                    return response.status(400).send(err);
                }
                response.cookie('w_auth', user.token).status(200).json({
                    loginSuccess: true
                });
            });
        });
    });
});


// -----------------------------

const port = process.env.PORT || 8081;

app.listen(port, () => {
    console.log(`Server Running at localhost:${port} address`);
});
