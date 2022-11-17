const express = require('express');
const route = express.Router();
const { ErrPermissions, ErrPetNotAvailable } = require('../lib/ResponseHandler');
const { ObjectId } = require('mongodb');
const { pets, users } = require("../lib/mongo");
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

route.post('/:id/adopt', async (req, res) => {
    const userObject = req.user;

    const user = await users().findOne({ _id: ObjectId(userObject._id) })

    const { id } = req.params
    
    const item = await pets().findOne({ _id: ObjectId(id) })
    const  {AdoptionStatus}  = item;
    const { PetsOwn } = user;
    
    if (AdoptionStatus === "Available" || "Fostered"){
        item.AdoptionStatus = "Adopted";

        if(PetsOwn === undefined) {
            const updateUser = {
                ...userObject, 
                PetsOwn: [item]
            };
            console.log(updateUser)
            const respPet = await pets().updateOne({ _id: ObjectId(id) }, { $set: item }, { upsert: true });

            const respUser = await users().updateOne({ _id: ObjectId(user._id) }, { $set: updateUser }, { upsert: true });

            return res.ok(respUser, respPet);
        }

        user.PetsOwn = [...user.PetsOwn, item]
        
         const respPet = await pets().updateOne({ _id: ObjectId(id) }, { $set: item }, { upsert: true });

        const respUser = await users().updateOne({ _id: ObjectId(user._id) }, { $set: user }, { upsert: true });

        return res.ok(respUser, respPet);
    }
    else {
        return res.not(ErrPetNotAvailable())
    }
});

route.post('/:id/foster', async (req, res, next) => {
    const userObject = req.user;

    const user = await users().findOne({ _id: ObjectId(userObject._id) })

    const { id } = req.params
    
    const item = await pets().findOne({ _id: ObjectId(id) })
    const  {AdoptionStatus}  = item;
    const { PetsOwn } = user;

    if (AdoptionStatus === "Available"){
        item.AdoptionStatus = "Fostered";

        if(PetsOwn === undefined) {
            const updateUser = {
                ...userObject, 
                PetsOwn: [item]
            };

            const respPet = await pets().updateOne({ _id: ObjectId(id) }, { $set: item }, { upsert: true });

            const respUser = await users().updateOne({ _id: ObjectId(user._id) }, { $set: updateUser }, { upsert: true });

            return res.ok(respUser, respPet);
        }

        user.PetsOwn = [...user.PetsOwn, item]
        
         const respPet = await pets().updateOne({ _id: ObjectId(id) }, { $set: item }, { upsert: true });

        const respUser = await users().updateOne({ _id: ObjectId(user._id) }, { $set: user }, { upsert: true });

        return res.ok(respUser, respPet);
    }
    else {
        return next(ErrPetNotAvailable())
    }
})

route.post('/:id/save', async (req, res) => {
    const userObject = req.user;

    const user = await users().findOne({ _id: ObjectId(userObject._id) })

    const { id } = req.params
    
    const item = await pets().findOne({ _id: ObjectId(id) })
    const { SavePets } = user;

    if(!item) return next(ErrPetNotAvailable())

    if(SavePets === undefined) {
        const updateUser = {
            ...userObject, 
            SavePets: [item]
        };

        const resp = await users().updateOne({ _id: ObjectId(user._id) }, { $set: updateUser }, { upsert: true });

        return res.ok(resp);
    }

    user.SavePets = [...user.SavePets, item]

    const resp = await users().updateOne({ _id: ObjectId(user._id) }, { $set: user }, { upsert: true });

    return res.ok(resp);
});

route.post('/:id/return', async (req, res) => {
    const { id } = req.params
    const userObject = req.user;

    const user = await users().findOne({ _id: ObjectId(userObject._id) })

    const item = await pets().findOne({ _id: ObjectId(id) })

    if (user.PetsOwn.length === 1) {
        user.PetsOwn = []
        item.AdoptionStatus = "Available";
    }
    
    const pos = (user.PetsOwn).map(e => e.Name).indexOf(item.Name);
    await (user.PetsOwn).splice(pos, 1)

    item.AdoptionStatus = "Available";
    const respPet = await pets().updateOne({ _id: ObjectId(id) }, { $set: item }, { upsert: true });
    const resp = await users().updateOne({ _id: ObjectId(user._id) }, { $set: user }, { upsert: true });

    res.ok(resp, respPet)
})


route.post('/:id/unsave', async (req, res) => {
    const { id } = req.params
    const userObject = req.user;

    const user = await users().findOne({ _id: ObjectId(userObject._id) })

    const item = await pets().findOne({ _id: ObjectId(id) })

    if (user.SavePets.length === 1) {
        user.SavePets = []
    }
    const pos = (user.SavePets).map(e => e.Name).indexOf(item.Name);
    await (user.SavePets).splice(pos, 1)

    const resp = await users().updateOne({ _id: ObjectId(user._id) }, { $set: user }, { upsert: true });

    res.ok(resp)
})
 
module.exports = route;