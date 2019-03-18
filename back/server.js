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

// -------- MIDDLEWARES --------

const auth = require('./middleware/auth');

// ----------- USERS -----------

app.get('/api/users/auth', auth, (request, response) => {
    response.status(200).json({
        // user: request.user
        isAdmin: request.user.role === 0 ? false : true,
        isAuth: true,
        email: request.user.email,
        phone: request.user.phone,
        name: request.user.name,
        lastName: request.user.lastName,
        street: request.user.street,
        houseNumber: request.user.houseNumber,
        postCode: request.user.postCode,
        city: request.user.city,
        country: request.user.country,
        cart: request.user.cart,
        history: request.user.history,
        role: request.user.role
    });
});

app.post('/api/users/register', (request, response) => {
    const user = new User(request.body);
    user.save((err, doc) => {
        if(err) {
            return response.json({success: false, err});
        }
        response.status(200).json({
            success: true
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
