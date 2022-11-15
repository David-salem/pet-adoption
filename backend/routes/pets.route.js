const express = require('express');
const route = express.Router();
const { ErrPermissions } = require('../lib/ResponseHandler');
const { ObjectId } = require('mongodb');
const { pets } = require("../lib/mongo");
const multer = require('multer');
const upload = multer({ dest: "uploads/"});
const { uploadToCloudinary } = require("../lib/cloudinary");
const fs = require('fs');
const { validateDto } = require("../dto/validate");
const { addPetSchema, editPetSchema } = require("../dto/pets.schema")

//  GET 
route.get('/total-count', async (req, res, next) => {
    const { user } = req;

    if (!user.permissions.marketing) {
        return next(ErrPermissions());
    }

    const length = (await pets().find({}).toArray()).length;

    console.log('length', length);

    return res.ok(length);
})

//  GET filtered pets
route.get('/', async (req, res) => {
    const params = req.query;

    const typeParams = req.query.Type;
    const paramsLength = Object.keys(params).length;

    if(paramsLength === 1 && typeParams) {
        const resp = await pets().find({Type: typeParams}).toArray();
        return res.ok(resp); 
    } else{
        const splitHeight = (params.Height).split(","); 
        const splitWeight = (params.Weight).split(",");

        const resp = await pets().find({Type: typeParams,
             Name: { $regex: req.query.Name }, 
             AdoptionStatus: { $regex: req.query.AdoptionStatus },
             Height: { $gt: splitHeight[0], $lt: splitHeight[1]},
             Weight: { $gt: splitWeight[0], $lt: splitWeight[1]} 
            }).toArray();
        return res.ok(resp);
    }
})

//  GET all pets
route.get('/all', async (req, res) => {
    const resp = await pets().find({}).toArray();
    res.ok(resp);
})

//  GET /pets/:id
route.get('/:id', async (req, res) => {
    const { id } = req.params;
    const pet = await pets().findOne({ _id: ObjectId(id) });
    res.ok(pet);
})

// PUT profile pic
route.put("/ProfilePic/:id", upload.single("avatar"), async(req, res) => {
    const { id } = req.params;
    const result = await uploadToCloudinary(req.file.path);

    fs.unlinkSync(req.file.path);
    const fileUrl = result.secure_url;

    const pet = await pets().findOne({ _id: ObjectId(id) });
    pet.Avatar = fileUrl;
    const resp = await pets().updateOne({ _id: ObjectId(id) }, { $set: pet }, { upsert: true });

    res.ok(resp);
});

//  POST new pet
route.post('/addPet', upload.single("avatar"), async(req, res) => {
    const json = req.body;

    const result = await uploadToCloudinary(req.file.path);
    fs.unlinkSync(req.file.path);
    const fileUrl = result.secure_url;

    const newItem = {
        ...json,
        Avatar: fileUrl
    }

    const newPet = await pets().insertOne(newItem);

    res.ok({ ...newItem, _id: newPet.insertedId });
})

//   PUT update pet
route.put('/updatePet/:id', validateDto(editPetSchema), async (req, res) => {
    const { id } = req.params;
    const json = req.body;

    const resp = await pets().updateOne({ _id: ObjectId(id) }, { $set: json }, { upsert: true });

    res.ok(resp);
})

//  DELETE pet
route.delete('/:id', async (req, res) => {
    const { id } = req.params;
    const resp = await pets().deleteOne({ _id: ObjectId(id) });

    res.ok(resp);
})
 
module.exports = route;