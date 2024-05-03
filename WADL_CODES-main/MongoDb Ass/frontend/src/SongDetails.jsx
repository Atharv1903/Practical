import React, { useEffect, useState } from 'react'
import axios from "axios";
import { Table } from 'react-bootstrap';


export default function SongDetails() {
    const [song, setSong] = useState('');
    const [film, setFilm] = useState('');
    const [music_director, setMusicDirector] = useState('');
    const [singer, setSinger] = useState('');
    const [data, setData] = useState([]);
    const [totalCount, setTotalCount] = useState(0);
    const [mdSongs, setMDSongs] = useState([]);
    const [filtered, setFiltered] = useState([]);
    const [actor, setActor] = useState('');
    const [actress, setActress] = useState('');


    useEffect(() => {
        handleFetch();
    }, [])

    const handleSong = (e) => {
        setSong(e.target.value);
    }
    const handleFilm = (e) => {
        setFilm(e.target.value);
    }

    const handleMusicDirector = (e) => {
        setMusicDirector(e.target.value);
    }
    const handleSinger = (e) => {
        setSinger(e.target.value);
    }
    const handleActor = (e) => {
        setActor(e.target.value);
    }
    const handleActress = (e) => {
        setActress(e.target.value);
    }

    const handleAdd = async () => {
        try {
            console.log(song, film, music_director, singer);
            const response = await axios.post(`http://localhost:3000/insert-songs/${song}/${film}/${music_director}/${singer}`)
            console.log(response.status)
            console.log(response.data.message);
            if (response.status === 201) {
                alert(response.data.message);
            }
            else if (response.data.message === "Song already exists!") {
                alert(response.data.message);
            }
        }
        catch (error) {

            console.log("Error: ", error);
        }
    }

    const handleFetch = async () => {
        try {
            const response = await axios.get("http://localhost:3000/fetch_data");
            const { totalCount, allSongs } = response.data;
            setTotalCount(totalCount);
            setData(allSongs);
        }
        catch (error) {
            console.log("An error occured: ", error);
        }

    }

    const handleFetchSongs = async () => {
        try {
            const response = await axios.get(`http://localhost:3000/fetch_songs/${music_director}`);
            const { songsByMusicDirector } = response.data;
            setMDSongs(songsByMusicDirector);
            if (response.status === 201) {
                alert("Songs fetched successfully!")
            }
        }
        catch (error) {
            console.log("An error occured: ", error);
        }
    }

    const handleDirectorAndSinger = async () => {
        try {
            const response = await axios.get(`http://localhost:3000/fetch_director_singer/${music_director}/${singer}`)
            const { filteredSongs } = response.data;
            setFiltered(filteredSongs);

            if (response.status === 201) {
                alert("Filtered Songs fetched successfully!")
            }

        }
        catch (error) {
            console.log("An error occured: ", error);
        }
    }

    const handleDelete = async (Songname) => {
        try {
            const response = await axios.delete(`http://localhost:3000/delete_song/${Songname}`)
            if (response.status === 200) {
                alert("Successfully deleted the song!");
                handleFetch();
            }
        }
        catch (error) {
            console.log("An error occured: ", error);
        }
    }

    const handleActorActress = async () => {
        try {
            const response = await axios.put(`http://localhost:3000/add_actor_actress/${song}/${actor}/${actress}`);
            if (response.status === 200) {
                alert("Actor Actress added successfully!")
            }
            else {
                alert("Failed to add!")
            }

        }
        catch (error) {
            console.log("An error occured: ", error);
        }
    }


    return (
        <div style={{ marginLeft: '35%' }}>
            <h1>Enter song details</h1>
            <div>
                <input
                    type='text'
                    placeholder='Enter Song Name'
                    value={song}
                    onChange={handleSong}
                />
            </div>
            <div>
                <input
                    type='text'
                    placeholder='Enter Film Name'
                    value={film}
                    onChange={handleFilm}
                />
            </div>
            <div>
                <input
                    type='text'
                    placeholder='Enter Music Director'
                    value={music_director}
                    onChange={handleMusicDirector}
                />
            </div>
            <div>
                <input
                    type='text'
                    placeholder='Enter Singer Name'
                    value={singer}
                    onChange={handleSinger}
                />
            </div>
            <button onClick={handleAdd}>Submit</button>

            <h1>Song Details</h1>
            <h2>Total Count: {totalCount}</h2>
            <div className="container">
                <Table style={{ border: "1px solid black" }}>
                    <thead>
                        <tr>
                            <th>Serial No</th>
                            <th>Song Name</th>
                            <th>Film Name</th>
                            <th>Music Director</th>
                            <th>Singer Name</th>
                            <th>Remove</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((item, index) => (
                            <tr key={index}>
                                <td style={{ textAlign: "center" }}>{index + 1}</td>
                                <td style={{ textAlign: "center" }}>{item.Songname}</td>
                                <td style={{ textAlign: "center" }}>{item.Film}</td>
                                <td style={{ textAlign: "center" }}>{item.Music_director}</td>
                                <td style={{ textAlign: "center" }}>{item.Singer}</td>
                                <td
                                    onClick={() => { handleDelete(item.Songname) }}
                                    style={{ cursor: 'pointer' }}
                                ><span

                                    style={{
                                        display: 'inline-block',
                                        width: '50px',
                                        height: '40px',
                                        backgroundColor: 'red',
                                        color: 'white',
                                        lineHeight: '40px', // Vertically center the X
                                    }}>Delete</span></td>

                            </tr>

                        )
                        )}

                    </tbody>
                </Table>
            </div>
            <h1>Enter Music Director and get songs</h1>
            <div className="music-director" >
                <label style={{ display: 'block' }}>Enter the name of the director</label>
                <input
                    style={{ display: 'block' }}
                    type="text"
                    placeholder='Enter the name of the music director'
                    value={music_director}
                    onChange={handleMusicDirector}
                />
                <button onClick={handleFetchSongs}>Submit</button>
            </div>
            <h4>The music director is: {music_director}</h4>
            <div className="table-songs">
                <Table style={{ border: '1px solid black', marginTop: '20px' }}>
                    <thead>
                        <tr>
                            <th>Serial Number</th>
                            <th>Song Name</th>
                        </tr>
                    </thead>
                    <tbody>
                        {mdSongs.map((item, index) => (
                            <tr key={index}>
                                <td>{index + 1}</td>
                                <td>{item.Songname}</td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </div>
            <h1>Enter Music Director and Singer Name</h1>
            <div className="directorAndSinger">
                <label style={{ display: 'block' }}>Enter music director's name</label>
                <input
                    type="text"
                    placeholder="Enter music director's name"
                    value={music_director}
                    onChange={handleMusicDirector}
                    style={{ display: "block" }} />
                <label style={{ display: 'block', marginTop: '10px' }}>Enter singer's name</label>
                <input
                    type="text"
                    placeholder="Enter singer's name"
                    value={singer}
                    onChange={handleSinger}
                    style={{ display: "block" }} />
                <button onClick={handleDirectorAndSinger}>Submit</button>
            </div>
            <div className="container-ms">
                <Table style={{ border: '1px solid black' }}>
                    <thead>
                        <tr>
                            <th>Serial Number</th>
                            <th>Filtered Songs</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filtered.map((item, index) => (
                            <tr key={index}>
                                <td>{index + 1}</td>
                                <td>{item.Songname}</td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </div>


            <h1>Enter Song, Actor & Actress Name</h1>
            <div className="actor&actress">
                <label style={{ display: 'block' }}>Enter song's name</label>
                <input
                    type="text"
                    placeholder="Enter song's name"
                    value={song}
                    onChange={handleSong}
                    style={{ display: "block" }} />
                <label style={{ display: 'block', marginTop: '10px' }}>Enter actor's name</label>
                <input
                    type="text"
                    placeholder="Enter actor's name"
                    value={actor}
                    onChange={handleActor}
                    style={{ display: "block" }} />
                <label style={{ display: 'block', marginTop: '10px' }}>Enter actress's name</label>
                <input
                    type="text"
                    placeholder="Enter actress's name"
                    value={actress}
                    onChange={handleActress}
                    style={{ display: "block" }} />
                <button onClick={handleActorActress}>Submit</button>
            </div>
            <div className="container-aa">
                <Table style={{ border: "1px solid black" }}>
                    <thead>
                        <tr>
                            <th>Serial No</th>
                            <th>Song Name</th>
                            <th>Film Name</th>
                            <th>Music Director</th>
                            <th>Singer Name</th>
                            <th>Actor</th>
                            <th>Actress</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((item, index) => (
                            <tr key={index}>
                                <td style={{ textAlign: "center" }}>{index + 1}</td>
                                <td style={{ textAlign: "center" }}>{item.Songname}</td>
                                <td style={{ textAlign: "center" }}>{item.Film}</td>
                                <td style={{ textAlign: "center" }}>{item.Music_director}</td>
                                <td style={{ textAlign: "center" }}>{item.Singer}</td>
                                <td style={{ textAlign: "center" }}>{item.Actor}</td>
                                <td style={{ textAlign: "center" }}>{item.Actress}</td>
                            </tr>
                        )
                        )}

                    </tbody>
                </Table>
            </div>



        </div>
    )
}
