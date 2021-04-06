import { SearchBox } from './SearchBox';
import { Tupase } from './Tupase';
import { Button } from '@material-ui/core';
import { Audio } from './Audio';
import { isAuth, postPase } from '../../helpers';
import { Switch, Link, Router, useLocation, useHistory } from 'react-router-dom';
import React, { useState, useEffect, useContext } from 'react';

export const CreatorAudio = () => {
    const [tipo, setTipo] = useState([]);
    const [audio, setAudio] = useState([]);
    const [error, setError] = useState("");

    const [userPases, setUserPases] = useState({});
    const history = useHistory();
    const { user, token } = isAuth();

    useEffect(() => {
        getAudio();
        getTipo();
        getPases();
    }, [])

    const getAudio = () => {
        return fetch("http://localhost:3002/api/audio/show", {
            method: "GET",
        })
            .then((response) => {
                return response.json();
            })
            .then((data) => {
                if (data.error) {
                    setError(data.error);
                } else {
                    setAudio(data);
                }
            })
            .catch((error) => {
                console.log(error);
            });
    };

    const getTipo = () => {
        return fetch(`http://localhost:3002/api/tipo/show`, {
            method: "GET",
        })
            .then((response) => {
                return response.json();
            })
            .then((data) => {
                if (data.error) {
                    setError(data.error);
                } else {
                    setTipo(data);
                }
            })
            .catch((error) => {
                console.log(error);
            });
    };

    const getPases = () => {
        return fetch("http://localhost:3002/api/userpases/show", {
            method: "GET",
        })
            .then((response) => {
                return response.json();
            })
            .then((data) => {
                if (data.error) {
                    setError(data.error);
                } else {
                    setUserPases(data);
                }
            })
            .catch((error) => {
                console.log(error);
            });
    };

    const tipoLocation = useLocation().pathname.split("/")[4];
    const tipoOne = tipo.find(tipo => tipo._id === tipoLocation);

    const customPase = [];
    const postAudios = () => {
        const lastArray = [];
        const chosenTipo = tipo.find(tipo => tipo._id === tipoLocation);
        const tipos = chosenTipo.name;
        const picture = chosenTipo.picture;
        const year = chosenTipo.year;

        customPase.forEach(element => {
            const thirdObject = { ...element, picture, tipos, year }
            lastArray.push(thirdObject);
        });

        history.push("/player")
        return localStorage.setItem("audios", JSON.stringify(lastArray));
    };

    console.log(tipoOne);

    const postCustomPase = () => {
        const lastArray = [];
        const chosenTipo = tipo.find(tipo => tipo._id === tipoLocation);
        const tipos = chosenTipo.name;
        const picture = chosenTipo.picture;
        const year = chosenTipo.year;
        const userId = isAuth().user._id;
        const pasesTotal = userPases.filter(element => element.user === userId);


        if (pasesTotal.length < 6) {

            customPase.forEach(element => {
                const thirdObject = { ...element, picture, tipos, year }
                lastArray.push(thirdObject);
            });
            const postData = { tipo: tipoOne.name, year: tipoOne.year, audios: customPase, picture: tipoOne.picture };

            console.log(postData);
            postPase(userId, postData, token)
                .then((response) => console.log(response))
                .catch((error) => console.log(error));
            history.push("/player")

            return localStorage.setItem("audios", JSON.stringify(lastArray))
        }
        else {
            alert("ERROR")
        };
    }

    return (
        <>
            <div className="creator">
                <div className="topHeader">
                    {tipo.filter(tipo => tipo._id === tipoLocation).map(audio => (
                        <Tupase key={audio._id} children={(audio.name).replace(/\s+/g, '').toUpperCase()} crumb={tipoLocation} />))}
                </div>
                <div className="audios">
                    <div className="audioCard" >
                        {audio.filter(audio => audio.tipo === tipoLocation).map(audio => (
                            <Audio customPase={customPase} key={audio._id} audio={audio} />
                        ))}
                    </div>
                    <Button onClick={token ? () => postCustomPase() : () => postAudios()} variant="contained" color="primary">START</Button>

                </div>

            </div>
        </>
    );
}
