const express = require('express');
const bcrypt = require("bcrypt");
const router = express.Router();
const { ErrUserNotFound, ErrConflict, ErrConfictPassword } = require("../lib/ResponseHandler");

const DB = require('../db');
const users = new DB('users');

// Routes
router.get('/', (req, res) => {
    res.send(users.get());
});

router.get('/me', (req, res) => {
    res.ok(req.user)
});

router.get("/permissions", (req, res) => {
    const { user } = req;

    res.ok(user.Permissions);
})

// POST routes
router.post('/register', async(req, res, next) => {
    const { Email } = req.body;

    const user = users.getUserByEmail(Email);

    if (user) {
        return next(ErrConflict());
    }

    const salt = await bcrypt.genSalt(10);
    req.body.Password = await bcrypt.hash(req.body.Password, salt);

    const newUser = users.add(req.body);
    res.create(newUser);
})

router.post('/login', async(req, res, next) => {
    const { Email, Password } = req.body;

    const user = users.getUserByEmail(Email);

    if (!user) {
        return next(ErrUserNotFound());
    }

    const validPassword = await bcrypt.compare(Password, user.Password);

    if (!validPassword) {
        return next(ErrConfictPassword());
    }

    const accessToken = users.getUserToken(user)

    res.ok({ accessToken, user })
});

//By ID
router
    .route("/:id")
    .get((req, res) => {
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

module.exports = router;