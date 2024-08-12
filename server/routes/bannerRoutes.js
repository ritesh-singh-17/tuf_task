const express = require('express');
const multer = require('multer');
const { getBanner, updateBanner } = require('../controllers/bannerController');

const router = express.Router();

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname);
    }
});
const upload = multer({ storage: storage });

router.get('/', getBanner);
router.post('/updateBanner', upload.single('bannerImage'), updateBanner);


module.exports = router;
