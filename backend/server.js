const express = require('express');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 4000;
const { ValidRes, ErrNotAuth, ErrNotAuthed, CreatedRes, ErrUserNotFound } = require('./lib/ResponseHandler');

// Middlewares
app.use(express.json());

// Allowing port access
app.use(cors({
    origin: ['http://localhost:3000','http://localhost:5000'],
    credentials: true
}))

// Responses
app.use((req, res, next) => {

    res.create = (data) => {
        const resp = CreatedRes(data);
        res.block(resp);
    };

    res.block = (resp) => {
        res.status(resp.status).send(resp.payload);
    };

    next();
})


// Router layer
// app.use('/pets', require('./routes/pets.route'));
app.use('/users', require('./routes/users.route'));

//error layer
app.use((err, req, res, next) => {
    console.log('err ->>> ', err);
    res.block(err);
})

//Port
app.listen(PORT, (err) => {
    if (err) console.log("Error openning server: " + err);
    console.log(`🚀  Server listening on port: ${PORT}...`);
});