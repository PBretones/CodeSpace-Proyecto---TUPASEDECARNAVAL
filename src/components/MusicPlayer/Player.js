import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlayCircle, faAngleLeft, faAngleRight, faPauseCircle } from '@fortawesome/free-solid-svg-icons';


export const Player = ({
    audioRef, currentSong, isPlaying, setIsPlaying,
    setSongInfo, songInfo, songs, setCurrentSong, setSongs }) => {


    // Format Time

    const getTime = (time) => {
        return (
            Math.floor(time / 60) + ":" + ("0" + Math.floor(time % 60)).slice(-2)
        )
    }

    //Event Handlers
    const activeLibraryHandler = (nextOrPrevious) => {
        const newSongs = songs.map((song) => {
            if (song._id === nextOrPrevious._id) {

                return {
                    ...song,
                    active: true,
                }
            } else {
                return {
                    ...song,
                    active: false
                };
            }

        });

        setSongs(newSongs);
    }

    const playSongHandler = () => {
        audioRef.current.play();
        if (isPlaying) {
            audioRef.current.pause();
            setIsPlaying(!isPlaying);

        } else {
            audioRef.current.play();
            setIsPlaying(!isPlaying);
        }
    }


    const dragHandler = (e) => {
        audioRef.current.currentTime = e.target.value;
        setSongInfo({ ...songInfo, currentTime: e.target.value });
    }


    const skipTrackHandler = async (flow) => {

        let currentIndex = songs.findIndex((song) => song._id === currentSong._id);
        if (flow === 'skip-forward') {
            await setCurrentSong(songs[(currentIndex + 1) % songs.length]);
            activeLibraryHandler(songs[(currentIndex + 1) % songs.length]); // We avoid using useEffect putting it here
        }
        if (flow === 'skip-back') {
            if ((currentIndex - 1) % songs.length === -1) {
                await setCurrentSong(songs[songs.length - 1]);
                activeLibraryHandler(songs[songs.length - 1]); // We avoid using useEffect putting it here
                if (isPlaying) { audioRef.current.play() }
                return;
            }
            await setCurrentSong(songs[(currentIndex - 1) % songs.length]);
            activeLibraryHandler(songs[(currentIndex - 1) % songs.length]); // We avoid using useEffect putting it here
        }
        if (isPlaying) { audioRef.current.play() }
    };

    const trackAnimation = {
        transform: `translateX(${songInfo.animationPercentage}%)`
    }

    return (
        <>
            <div className="player">

                <div className="timeControl">
                    <p>{getTime(songInfo.currentTime)}</p>

                    <div className="track">
                        <div className="customDrag">
                            <input onChange={dragHandler} min={0} max={songInfo.duration} value={songInfo.currentTime} type="range" />
                        </div>
                        <div style={trackAnimation} className="animateTrack"></div>

                    </div>
                    <p>{songInfo.duration ? getTime(songInfo.duration) : "0:00"}</p>
                </div>

                <div className="playControl">
                    <FontAwesomeIcon onClick={() => skipTrackHandler('skip-back')} className="button skip-back" size="2x" icon={faAngleLeft} />
                    <FontAwesomeIcon onClick={playSongHandler} className="play button" size="3x" icon={isPlaying ? faPauseCircle : faPlayCircle} />
                    <FontAwesomeIcon onClick={() => skipTrackHandler('skip-forward')} className="button skip-forward" size="2x" icon={faAngleRight} />
                </div>
            </div >
        </>
    );
}

/* */