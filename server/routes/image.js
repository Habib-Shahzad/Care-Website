const router = require('express').Router();
const Image = require('../schema').image;

const path = require('path');
const multer = require('multer');
const fs = require('fs');


const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.resolve('../client/public/allImages'));
    },
    filename: (req, file, cb) => {
        const ext = path.extname(file.originalname);
        cb(null, file.fieldname + '-' + Date.now() + ext);
    }
});
const upload = multer({ storage: storage });

const admin_auth = require("./middleware/admin_auth");

router.get('/table-data', async (req, res) => {
    const images = await Image.find({});
    res.json({ data: images });
});



router.post('/delete', admin_auth, async (req, res) => {
    const deleteable_images = await Image.find({ _id: { $in: req.body.data } });

    await Image.deleteMany({ _id: { $in: req.body.data } });
    deleteable_images.forEach((imageObj) => {
        fs.unlinkSync(path.resolve('../client/public/allImages') + '/' + imageObj.image.fileName);
    });
    const images = await Image.find({});
    res.json({ success: true, data: images });
});

router.post('/add', upload.single('image'), async (req, res) => {

    const data = JSON.parse(req.body.data);

    const image = {
        fileName: req.file.filename,
        filePath: '/allImages/' + req.file.filename
    };

    const newImage = new Image({ name: data.name, image: image });

    await newImage.save();
    res.json({ data: null });
});

module.exports = router;