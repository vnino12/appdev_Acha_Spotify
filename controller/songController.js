const multer = require('multer');
const path = require('path');
const prod = require('../models/songModel'); 

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/'); 
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname)); 
    }
});

const upload = multer({ storage: storage }).fields([
    { name: 'audio_file', maxCount: 1 },
    { name: 'artist_picture', maxCount: 1 }
]);

const songController = {
    index: (req, res) => {
        const searchTerm = req.query.search || '';
        prod.getAllSongs(searchTerm, (err, songs) => {
            if (err) {
                return res.status(500).send("Error retrieving songs");
            }
            res.render('index', { songs, searchTerm });
        });
    },

    save: (req, res) => {
        if (!req.files || !req.files['audio_file'] || !req.files['artist_picture']) {
            return res.status(400).send("Please upload both an audio file and an artist picture.");
        }

        const audioFile = req.files['audio_file'][0].path.replace(/\\/g, '/');
        const artistPicture = req.files['artist_picture'][0].path.replace(/\\/g, '/');
        const { title } = req.body;

        const songData = {
            title,
            artist_picture: artistPicture,
            audio_url: audioFile
        };

        prod.create(songData, (err) => {
            if (err) {
                return res.status(500).send("Error saving song");
            }
            res.redirect('/');
        });
    }, 

    delete: (req, res) => {
        const songId = req.params.id;
        prod.deleteSong(songId, (err) => {
            if (err) {
                return res.status(500).send("Error deleting song");
            }
            res.redirect('/');
        });
    }, 
};


songController.upload = upload;

module.exports = songController;
