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
const Manufacturer = require('./models/manufacturer');
const Material = require('./models/material');
const Type = require('./models/type');
const Destiny = require('./models/destiny');
const Product = require('./models/product');

// -------- MIDDLEWARES --------

const auth = require('./middleware/auth');
const admin = require('./middleware/admin');

// --------- PRODUCTS ----------

app.post('/api/product/article', auth, admin, (request,response) => {
    const product = new Product(request.body);
    product.save((err, doc) => {
        if(err) {
            return response.json({success: false, err});
        }
        response.status(200).json({
            success: true,
            article: doc
        });
    });
});

// api/product/articles_by_id?id=xxxxxx&searchType=single
// api/product/articles_by_id?id=xxxxxx,xxxxxx,xxxxxx&searchType=array
app.get('/api/product/articles_by_id', (request, response) => {
    let searchType = request.query.searchType;
    let items = request.query.id;
    if(searchType === "array") {
        let ids = request.query.id.split(',');
        items = [];
        items = ids.map((item) => {
            return mongoose.Types.ObjectId(item);
        });
    };
    Product
    .find({'_id': {$in:items}})
    .populate('manufacturer')
    .populate('destiny')
    .populate('material')
    .populate('type')
    .exec((err, docs) => {
        return response.status(200).send(docs);
    });
});

// /api/product/articles/?sortBy=sold&order=desc&limit=4
app.get('/api/product/articles', (request,response) => {
    let order = request.query.order ? request.query.order : 'asc';
    let sortBy = request.query.sortBy ? request.query.sortBy : "_id";
    let limit = request.query.limit ? parseInt(request.query.limit) : 100;
    Product
    .find()
    .populate('manufacturer')
    .populate('destiny')
    .populate('material')
    .populate('type')
    .sort([[sortBy, order]])
    .limit(limit)
    .exec((err, articles) => {
        if(err) {
            return response.status(400).send(err);
        }
        response.send(articles);
    });
});

// ---------- DESTINYS ---------

app.post('/api/product/destiny', auth, admin, (request,response) => {
    const destiny = new Destiny(request.body);
    destiny.save((err, doc) => {
        if(err) {
            return response.json({success: false, err});
        }
        response.status(200).json({
            success: true,
            destiny: doc
        });
    });
});

app.get('/api/product/destinys', (request, response) => {
    Destiny.find({}, (err, destiny) => {
        if(err) {
            return response.status(400).send(err);
        }
        response.status(200).send(destiny);
    });
});

// ----------- TYPES -----------

app.post('/api/product/type', auth, admin, (request,response) => {
    const type = new Type(request.body);
    type.save((err, doc) => {
        if(err) {
            return response.json({success: false, err});
        }
        response.status(200).json({
            success: true,
            type: doc
        });
    });
});

app.get('/api/product/types', (request, response) => {
    Type.find({}, (err, type) => {
        if(err) {
            return response.status(400).send(err);
        }
        response.status(200).send(type);
    });
});

// --------- MATERIALS ---------

app.post('/api/product/material', auth, admin, (request,response) => {
    const material = new Material(request.body);
    material.save((err, doc) => {
        if(err) {
            return response.json({success: false, err});
        }
        response.status(200).json({
            success: true,
            material: doc
        });
    });
});

app.get('/api/product/materials', (request, response) => {
    Material.find({}, (err, material) => {
        if(err) {
            return response.status(400).send(err);
        }
        response.status(200).send(material);
    });
});

// ------- MANUFACTURERS -------

app.post('/api/product/manufacturer', auth, admin, (request, response) => {
    const manufacturer = new Manufacturer(request.body);
    manufacturer.save((err, doc) => {
        if(err) {
            return response.json({success: false, err});
        }
        response.status(200).json({
            success: true,
            manufacturer: doc
        });
    });
});

app.get('/api/product/manufacturers', (request, response) => {
    Manufacturer.find({}, (err, manufacturers) => {
        if(err) {
            return response.status(400).send(err);
        }
        response.status(200).send(manufacturers)
    });
});

// ----------- USERS -----------

app.get('/api/users/auth', auth, (request, response) => {
    response.status(200).json({
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
            return response.json({
                success: false,
                err
            });
        }
        response.status(200).json({
            success: true
        });
    });
});

app.post('/api/users/login', (request, response) => {
    User.findOne({'email': request.body.email}, (err, user) => {
        if(!user) {
            return response.json({
                loginSuccess: false,
                message: 'Błąd logowania, podany e-mail nie istnieje'
        });
        }
        user.comparePassword(request.body.password, (err, isMatch) => {
            if(!isMatch) {
                return response.json({
                    loginSuccess: false,
                    message: 'Błędne hasło'
            });
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

app.get('/api/user/logout', auth, (request, response) => {
    User.findOneAndUpdate(
        {_id: request.user.id},
        {token: ''},
        (err, doc) => {
            if(err) {
                return response.json({
                    success: false, err
                });
            }
            return response.status(200).send({
                success: true
            });
        }
    );
});


// -----------------------------

const port = process.env.PORT || 8081;

app.listen(port, () => {
    console.log(`Server Running at localhost:${port} address`);
});
