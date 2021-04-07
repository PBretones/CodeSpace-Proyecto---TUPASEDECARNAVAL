import { addAudio, RedeleteAudio, getAudios } from '../../helpers';
import React, { useState } from 'react';


export const Audio = ({ audio, customPase }) => {

    const [checkAudio, setCheckAudio] = useState(true);

    const ReaddAudio = (audio) => {

        if (typeof window !== "undefined") {

            customPase.push({
                ...audio

            })

            customPase = Array.from(new Set(customPase.map((p) => p._id))).map((id) => {
                return customPase.find((p) => p._id === id);
            });


        }
    };


    const RedeleteAudio = (audiosId) => {

        customPase.map((audio, index) => {
            if (audio._id === audiosId) {
                customPase.splice(index, 1);
            }
        });

        return customPase;
    }




    const editArray = () => {
        if (checkAudio === false) {
            RedeleteAudio(audio._id);
            setCheckAudio(true);
        }
        else {
            ReaddAudio(audio);
            setCheckAudio(false);
        }
    }

    return (
        <div className="custom-checkbox" onChange={editArray}>
            <label className="custom-checkbox">
                <input value={audio.mp3} type="hidden" name={audio.name} value="False" />
                <input key={audio._id} className="custom-checkbox-input" name={audio.name} value="True" type="checkbox" />
                <h3 className="custom-checkbox-text">{audio.name}</h3>
            </label>
        </div>
    )

}






