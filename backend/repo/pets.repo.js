const { ObjectId } = require('mongodb');
const { pets } = require("../lib/mongo");

module.exports.getPets = async () => {
    return await pets().find({}).toArray();
}

module.exports.getPet = async (id) => {
    return await pets().findOne({ _id: ObjectId(id) });
}

module.exports.addPet = async (pet) => {
    const newPet = await pets().insertOne(pet);
    return newPet.insertedId;
}

module.exports.updatePet = async (id, pet) => {
    return await pets().updateOne({ _id: ObjectId(id) }, { $set: pet }, { upsert: true });
}

module.exports.deletePet = async (id) => {
    return await pets().deleteOne({ _id: ObjectId(id) });
}