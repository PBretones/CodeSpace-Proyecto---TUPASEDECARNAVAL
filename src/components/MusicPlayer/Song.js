import React from 'react';
export const Song = ({ currentSong }) => {
    return (<>
        { currentSong &&
            <div className="songContainer">
                <img src={currentSong.picture} alt="portada"></img>
                <h2>{currentSong.name}</h2>
                <h3>{currentSong.tipos}</h3>
            </div>}
    </>
    );
}
