const express = require('express');
const cors = require('cors');
const app = express();
const { jwtVerify } = require('./lib/JWT');
const PORT = 4000;
const DB = require('./db');
const { ValidRes, ErrNotAuthed, CreatedRes, ErrUserNotFound } = require('./lib/ResponseHandler');

// Middlewares
app.use(express.json());

// Allowing port access
app.use(cors({
    origin: ['http://localhost:3000','http://localhost:5000'],
    credentials: true
}));

// Responses
app.use((req, res, next) => {

    res.ok = (data) => {
        const resp = ValidRes(data);

        res.block(resp);
    };

    res.create = (data) => {
        const resp = CreatedRes(data);
        res.block(resp);
    };

    res.block = (resp) => {
        res.status(resp.status).send(resp.payload);
    };

    next();
});

//auth middleware
app.use((req, res, next) => {
    const authorized = ['/users/login', '/users/register'];

    if (authorized.includes(req.url)) {
        return next();
    }

    const { authorization } = req.headers;

    try {
        const decoded = jwtVerify(authorization);

        const users = new DB('users');

        const user = users.getById(decoded.id);

        if (!user) {
            return next(ErrUserNotFound());
        }

        delete user.Password;

        req.user = user;

        return next();
    } catch (error) {
        next(ErrNotAuthed());
    }
})

// Router layer
// app.use('/pets', require('./routes/pets.route'));
app.use('/users', require('./routes/users.route'));

//error layer
app.use((err, req, res, next) => {
    console.log('err ->>> ', err);
    res.block(err);
});

//Port
app.listen(PORT, (err) => {
    if (err) console.log("Error openning server: " + err);
    console.log(`🚀  Server listening on port: ${PORT}...`);
});