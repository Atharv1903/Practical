const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv")
const Song = require('./SongModel.js');
const cors = require('cors'); // Import the cors middleware


dotenv.config();
const app = express();

// Use cors middleware
app.use(cors());

mongoose.connect("mongodb://127.0.0.1:27017/music").then(() => {
    console.log("Connected to MongoDB!");
}).catch((error) => {
    console.log("Error in connecting to MongoDB:", error);
})

app.use(express.json());
app.listen(3000, () => {
    console.log("Server running on port 3000!")
});


app.post('/insert-songs/:song/:film/:music_director/:singer', async (req, res) => {
    try {
        // Extract songs array from request body
        const { song, film, music_director, singer } = req.params;

        const songs = { Songname: song, Film: film, Music_director: music_director, Singer: singer };

        // Insert song documents into the database
        await Song.create(songs);

        res.status(201).json({ message: 'Song inserted successfully.' });

    }
    catch (error) {
        if (error.code == 11000) {

            res.status(409).json({ message: "Song already exists!" })
        }
        else {
            console.log("An error occured: ", error);
            res.status(500).json({ error: 'Internal server error' });
        }

    }
})

app.get('/fetch_data', async (req, res) => {
    try {
        // Get total count of documents
        const totalCount = await Song.countDocuments();

        // List all documents
        const allSongs = await Song.find();


        res.json({ totalCount, allSongs });

    }
    catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
})

app.get('/fetch_songs/:music_director', async (req, res) => {
    try {
        const { music_director } = req.params;
        // Query database for songs by the specified music director
        const songsByMusicDirector = await Song.find({ Music_director: music_director });


        res.json({ songsByMusicDirector });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
})

app.get('/fetch_director_singer/:music_director/:singer', async (req, res) => {
    try {
        const { music_director, singer } = req.params;
        const filteredSongs = await Song.find({ Music_director: music_director, Singer: singer });

        res.json({ filteredSongs });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
})

app.delete('/delete_song/:Songname', async (req, res) => {
    try {
        const { Songname } = req.params;

        // Find the song by ID and delete it
        const deletedSong = await Song.findOneAndDelete({ Songname });


        if (!deletedSong) {
            return res.status(404).json({ message: 'Song not found' });
        }

        res.json({ message: 'Song deleted successfully' });

    }
    catch (error) {
        console.log("An error occured: ", error);
    }
})

app.put('/add_actor_actress/:song/:actor/:actress', async (req, res) => {
    try {
        const { song, actor, actress } = req.params;

        // Find the document by Songname and update it by adding Actor and Actress names
        const updatedSong = await Song.findOneAndUpdate(
            { Songname: song },
            { $set: { Actor: actor, Actress: actress } },
            { new: true } // Return the updated document
        );
        console.log("hii")

        if (!updatedSong) {
            return res.status(404).json({ message: 'Song not found' });
        }

        res.status(200).json({ message: 'Song updated successfully', updatedSong });

    }
    catch (error) {
        console.log("An error occured: ", error);
    }
})