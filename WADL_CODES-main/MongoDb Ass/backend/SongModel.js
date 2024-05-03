const mongoose = require('mongoose');

// Define schema
const songSchema = new mongoose.Schema({
    Songname: {
        type: String,
        required: true,
        unique: true,
    },
    Film: {
        type: String,
        required: true,

    },
    Music_director: {
        type: String,
        required: true,
    },
    Singer: {
        type: String,
        required: true,
    },
    Actor: {
        type: String,
    },
    Actress: {
        type: String,
    }
});

// Create model
const Song = mongoose.model('Song', songSchema);

module.exports = Song;
