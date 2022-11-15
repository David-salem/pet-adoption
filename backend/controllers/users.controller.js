const { ErrUserNotFound, ErrConflict, ErrConfictPassword } = require("../lib/ResponseHandler");
const { getUserByEmail, getUserToken } = require("../services/users.service");
const bcrypt = require("bcrypt");
const { getUser, addUser } = require("../repo/users.repo");
const { users } = require("../lib/mongo");
const { ObjectId } = require('mongodb');

module.exports.postRegister = async(req, res, next) => {
    const { Email } = req.body;

    const user = await getUserByEmail(Email);

    if (user) {
        return next(ErrConflict());
    }

    const salt = await bcrypt.genSalt(10);
    req.body.Password = await bcrypt.hash(req.body.Password, salt);
 
    const newUser = await addUser(req.body);

    res.create(newUser);
};

module.exports.postLogin = async(req, res, next) => {
    const { Email, Password } = req.body;

    const user = await getUserByEmail(Email);

    if (!user) {
        return next(ErrUserNotFound());
    }

    const validPassword = await bcrypt.compare(Password, user.Password);

    if (!validPassword) {
        return next(ErrConfictPassword());
    }

    const accessToken = getUserToken(user)

    res.ok({ accessToken, user })
};

module.exports.changePassword = async(req, res, next) => {
    const { id } = req.params;
    const { Password, newPassword } = req.body;
    let currentUser = await getUser(id);
    
    const validPassword = await bcrypt.compare(Password, currentUser.Password);
    const validNewPassword = await bcrypt.compare(newPassword, currentUser.Password);
    
    if (!validPassword) {
        return next(ErrConfictPassword());
    };
    
    if (validNewPassword) {
        return next(ErrSamePassword());
    };

    currentUser.Password = newPassword;

    const salt = await bcrypt.genSalt(10);
    currentUser.Password = await bcrypt.hash(currentUser.Password, salt);

    const resp = await users().updateOne({ _id: ObjectId(id) }, { $set: currentUser }, { upsert: true });

    res.ok(resp);
};

module.exports.updateUserInfo =  async(req, res) => {
    const { id } = req.params;
    const json = req.body;

    const resp = await users().updateOne({ _id: ObjectId(id) }, { $set: json }, { upsert: true });

    res.ok(resp);
};