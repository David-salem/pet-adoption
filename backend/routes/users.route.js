const express = require('express');
const router = express.Router();
const { ErrUserNotFound, ErrConflict, ErrConfictPassword } = require("../lib/ResponseHandler");


const DB = require('../db');
const users = new DB('users');

// Routes
router.get('/', (req, res) => {
    console.log('req.query', req.query);

    res.send(users.get());
});

// POST routes
router.post('/register', (req, res, next) => {
    const { Email } = req.body;

    const user = users.getUserByEmail(Email);

    if (user) {
        return next(ErrConflict());
    }

    const newUser = users.add(req.body);
    res.create(newUser);
})

router.post('/login', (req, res, next) => {
    const { Email, Password } = req.body;

    const user = users.getUserByEmail(Email);

    if (!user) {
        return next(ErrUserNotFound());
    }

    if (user.Password !== Password) {
        return next(ErrConfictPassword());
    }

    console.log("user " + user)
    res.send("everything is fine");
});


//By ID
router
    .route("/:id")
    .get((req, res) => {
        console.log('params', req.params);

        res.send(users.getById(req.params.id));
    })
    .delete((req, res) => {
        const resp = users.deleteById(req.params.id);

        res.send(`Deleted: ${resp}`);
    })
    .put((req, res) => {
        const resp = users.updateItem(req.params.id, req.body);
        
        res.send(`res: ${resp}`);
    })
    // .patch((req, res) => {
    //     // const { id } = req.params.id;
    //     // const user = users.updateSingleItem(req.params.id, req.body)
    //     console.log('params', req.params);

    //     res.send(users.updateSingleItem(req.params.id, req.params.id));
    // })

module.exports = router;