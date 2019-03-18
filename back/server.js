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


// -----------------------------

const port = process.env.PORT || 8081;

app.listen(port, () => {
    console.log(`Server Running at localhost:${port} address`);
});
