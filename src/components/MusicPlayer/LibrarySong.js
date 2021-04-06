import React from 'react';


export const LibrarySong = ({ song, songs, setCurrentSong, CurrentSong, audioRef, isPlaying, id, setSongs }) => {

    const songSelectHandler = async () => {
        await setCurrentSong(song);


        const newSongs = songs.map((song) => {

            if (song._id === id) {

                return {
                    ...song,
                    active: true,
                }
            } else {
                return {
                    ...song,
                    active: false
                }
            }

        });
        setSongs(newSongs);

        // is it playing?
        if (isPlaying) { audioRef.current.play() };

    }

    return (
        <div onClick={songSelectHandler} className={`librarySong ${song.active ? 'selected' : ""}`} >
            <div className="songDescription">
                <div className="songImage">
                    <img src={song.picture} alt="portada"></img></div>
                <div className="songInfo">
                    <h3>{song.name}</h3>
                </div>
            </div>
        </div>
    );
}
