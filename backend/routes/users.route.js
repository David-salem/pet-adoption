const express = require('express');
const router = express.Router();
const { getUser, getUsers, updateUser } = require("../repo/users.repo");
const { uploadToCloudinary } = require("../lib/cloudinary");
const multer = require('multer');
const upload = multer({ dest: "uploads/"});
const fs = require('fs');
const { postRegister, postLogin, changePassword, updateUserInfo } = require("../controllers/users.controller");
const { validateDto } = require("../dto/validate");
const { userRegistrationSchema, userLoginSchema, userChangeData, changePasswordSchema } = require("../dto/users.schema")

// Routes
router.get('/', async(req, res) => {
    const resp = await getUsers();
    res.ok(resp);
});

router.get('/me', (req, res) => {
    res.ok(req.user)
});

router.get("/permissions", (req, res) => {
    const { user } = req;
    res.ok(user.Permissions);
})

// routes
router.post('/register', validateDto(userRegistrationSchema), postRegister);

router.post('/login', validateDto(userLoginSchema), postLogin);

router.put("/changePassword/:id", validateDto(changePasswordSchema),  changePassword);

router.put('/updateUser/:id', validateDto(userChangeData), updateUserInfo);

router.put("/ProfilePic/:id", upload.single("avatar"), async(req, res) => {
    const { id } = req.params;
    const result = await uploadToCloudinary(req.file.path);

    fs.unlinkSync(req.file.path);
    const fileUrl = result.secure_url;

    let currentUser = await getUser(id);
    currentUser.avatar = fileUrl;
    const resp = await updateUser(id,currentUser);

    res.ok(resp);
});

module.exports = router; 