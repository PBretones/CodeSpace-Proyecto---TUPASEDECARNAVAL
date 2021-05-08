import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { isAuth, deletePase } from '../../helpers';
import { useLocation, useHistory } from 'react-router-dom';

export const PlaylistTrack = ({ pases, refresh, setRefresh }) => {
    const [loadPase, setLoadPase] = useState("");
    const [trackToggle, setTrackToggle] = useState(false);
    const localNow = JSON.parse(localStorage.getItem("audios"));
    const { user, token } = isAuth();
    const history = useHistory();


    const checkStatus = () => {

        if (localStorage.getItem("audios") && localStorage.getItem("audios") != [""]) {
            const checked = localNow.find(element => element.tipos === pases.tipo);


            if (checked === undefined) {
                const inputValue = false;
                console.log(inputValue);
                return inputValue;
            } else {
                const inputValue = true;

                console.log(inputValue);
                return inputValue;
            }
        }
    }
    useEffect(() => {
        setLoadPase(checkStatus())
    }, [])


    const ReaddTrack = (pases) => {

        if (localStorage.getItem("audios")) {
            const lastArray = JSON.parse(localStorage.getItem("audios"));
            const paseToArray = pases.audios;
            const tipos = pases.tipo;
            const picture = pases.picture;

            paseToArray.forEach(element => {
                const thirdObject = { ...element, picture, tipos }
                lastArray.push(thirdObject);
            });

            localStorage.setItem("audios", JSON.stringify(lastArray));
            return lastArray;
        }
        else {
            const lastArray = [];
            let firstArray = pases.audios;
            const tipos = pases.tipo;
            const picture = pases.picture;

            firstArray.forEach(element => {
                const thirdObject = { ...element, picture, tipos }
                lastArray.push(thirdObject);

            });
            localStorage.setItem("audios", JSON.stringify(lastArray))
            return lastArray;
        }

    };
    const RedeleteTrack = (tipoId) => {
        const Local = JSON.parse(localStorage.getItem("audios"));
        const newLocal = Local.filter(elem => elem.tipos != tipoId);

        return localStorage.setItem("audios", JSON.stringify(newLocal));
    }

    const togglePase = () => {
        if (loadPase === true) {
            RedeleteTrack(pases.tipo);
            setLoadPase(false)
        }
        else {
            ReaddTrack(pases);
            setLoadPase(true)
        }

    }
    const userId = isAuth().user._id;
    const deleteOnePase = (paseId) => {
        deletePase(paseId)
            .then((response) => console.log(response))
            .catch((error) => console.log(error));
        setRefresh(!refresh);
    }

    return (
        <div className="customContainer">
            <div className="customPase">

                <div className="imgBox">
                    <div className="card">
                        <div className="front"><img src={pases.picture} alt={pases.tipo} className="center" /></div>
                        <div className="back"><FontAwesomeIcon icon={faTimes} size="3x" className="deleteButton" onClick={() => deleteOnePase(pases._id)} /></div>
                    </div>
                </div>
                <div className="infoBox">
                    <h4>{pases.tipo}
                        <div>{pases.year}</div>
                    </h4>
                    <div className="infoToggle" id={pases._id}  >
                        <input type="checkbox" name="" defaultChecked={checkStatus()} onChange={togglePase} />
                    </div>
                </div>
            </div>
        </div>)
}