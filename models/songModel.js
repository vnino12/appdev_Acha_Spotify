const db = require('../config/db');

const prod = {
    create: (data, callback) => {
        const query = `
            INSERT INTO acha_appdev (title, artist_picture, audio_url)
            VALUES (?, ?, ?)
        `;
        db.query(query, [data.title, data.artist_picture, data.audio_url], callback);
    },

    getAllSongs: (searchTerm, callback) => {
        const query = "SELECT * FROM acha_appdev WHERE title LIKE ?";
        db.query(query, [`%${searchTerm}%`], callback);
    },

   
};

module.exports = prod;
