const { ObjectId } = require('mongodb');
const { users } = require("../lib/mongo");

module.exports.getUsers = async () => {
    return await users().find({}).toArray();
}

module.exports.getUser = async (id) => {
    return await users().findOne({ _id: ObjectId(id) });
}

module.exports.addUser = async (user) => {
    const newUser = await users().insertOne(user);
    return newUser.insertedId;
}

module.exports.updateUser = async (id, user) => {
    return await users().updateOne({ _id: ObjectId(id) }, { $set: user }, { upsert: true });
}

module.exports.deleteUser = async (id) => {
    return await users().deleteOne({ _id: ObjectId(id) });
}