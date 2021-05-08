import React, { useState, useRef, useEffect } from 'react';
import { Song } from './Song';
import { Player } from './Player';
import { Library } from './Library';
import { Nav } from './Nav';
import { addAudio, deleteAudio, getAudios, isAuth } from '../../helpers';
import { Data } from '../../data';


export const MusicPlayer = () => {
    const { token } = isAuth();
    const myAudio = () => {
        if (typeof window !== "undefined") {
            if (localStorage.getItem("audios")) {
                return JSON.parse(localStorage.getItem("audios"))
            }
        }
        return []
    }
    // we use Ref
    const audioRef = useRef(null);
    // States
    // State of song being played
    const [songs, setSongs] = useState(myAudio());
    const [currentSong, setCurrentSong] = useState(songs[0]); // 1 to 0
    const [isPlaying, setIsPlaying] = useState(false);


    //State of song time & duration
    const [songInfo, setSongInfo] = useState({
        currentTime: 0,
        duration: 0,
        animationPercentage: 0,
    });
    const [libraryStatus, setLibraryStatus] = useState(false);



    const timeUpdateHandler = (e) => {
        const current = e.target.currentTime;
        const duration = e.target.duration;
        // Calculate Percentage
        const roundedCurrent = Math.round(current);
        const roundedDuration = Math.round(duration);
        const animation = Math.round((roundedCurrent / roundedDuration) * 100);

        setSongInfo({ ...songInfo, currentTime: current, duration, animationPercentage: animation })
    };

    const songEndHandler = async () => {
        let currentIndex = songs.findIndex((song) => song._id === currentSong._id);
        await setCurrentSong(songs[(currentIndex + 1) % songs.length])
        if (isPlaying) { audioRef.current.play() }
    }
    console.log(currentSong.mp3);
    return (
        <div className="tester">
            <Nav libraryStatus={libraryStatus} setLibraryStatus={setLibraryStatus} />
            <Song currentSong={currentSong} />
            <Player setSongs={setSongs} setCurrentSong={setCurrentSong} songs={songs} currentSong={currentSong} setSongInfo={setSongInfo} songInfo={songInfo} audioRef={audioRef} setIsPlaying={setIsPlaying} isPlaying={isPlaying} currentSong={currentSong} ></Player>
            <Library currentSong={currentSong} libraryStatus={libraryStatus} setLibraryStatus={setLibraryStatus} setSongs={setSongs} isPlaying={isPlaying} audioRef={audioRef} songs={songs} setCurrentSong={setCurrentSong} />
            {currentSong && <audio onEnded={songEndHandler} onLoadedMetadata={timeUpdateHandler} onTimeUpdate={timeUpdateHandler} ref={audioRef} src={currentSong.mp3}></audio>}
        </div>
    );
}