const express = require('express');
const router = express.Router();
const songController = require('../controller/songController');

router.get('/', songController.index);


router.post('/save', songController.upload, songController.save);



module.exports = router;
