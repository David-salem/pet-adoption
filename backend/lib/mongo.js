const { MongoClient } = require('mongodb');
const uri = "mongodb+srv://david:hellomosh@petproject.03av4zv.mongodb.net/?retryWrites=true&w=majority";

let itc = {};

MongoClient.connect(uri, { useUnifiedTopology: true }).then((client, err) => {
    if (err) {
        console.log('Unable to connect to MongoDB', err);
        return;
    }

    console.log('Mongo DB is connected');

    itc = client.db('itc');
});

module.exports = { 
    pets : () => {
        return itc.collection('pets');
    },
    users : () => {
        return itc.collection('users');
    }
 }; 