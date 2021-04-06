import { CategoriesElements } from './CategoriesElements';
import comparsa from '../../images/comparsa/la_eternidad.jpg';
import chirigota from '../../images/chirigota/los_cadizfornia.jpg';
import cuarteto from '../../images/cuarteto/el_more.jpg';
import coro from '../../images/coro/creaciones_sa.jpg';
import React, { useState, useEffect } from 'react';

import { Button } from '@material-ui/core';
import { BrowserRouter, Link, Route, Switch, useHistory } from 'react-router-dom';


export const Categories = () => {
    const [modalidad, setModalidad] = useState([]);
    const [error, setError] = useState("");
    const history = useHistory("")



    const getPicture = (mod) => {
        switch (mod) {
            case "Comparsa":
                return comparsa;
            case "Chirigota":
                return chirigota;
            case "Coro":
                return coro;
            case "Cuarteto":
                return cuarteto;
            default:
                return comparsa

        }
    }

    const getModalidad = () => {
        return fetch("http://localhost:3002/api/modalidad/show", {
            method: "GET",
        })
            .then((response) => {
                return response.json();
            })
            .then((data) => {
                if (data.error) {
                    setError(data.error);
                } else {
                    setModalidad(data);
                }
            })
            .catch((error) => {
                console.log(error);
            });
    };
    const toCreator = () => {
        history.push("/creator");
    }
    useEffect(() => {
        getModalidad();
    }, [])


    return (
        <>
            <div className="dashboard">
                <div className="homepageText">
                    <div className="title"><span className="pase">TUPASE</span><span className="carnaval">DECARNAVAL</span></div>
                    <div className="subtitle"><span className="subtext">Crea tu propio pase de carnaval de tu agrupación favorita: elige los audios que más te han gustado. Únelos, guardalos y...escuchalos online!</span><Button className="moreButton" variant="contained" size="large" color="primary" onClick={toCreator} disableElevation> Saber Más </Button></div>
                </div>
                <div className="filtersPosition">
                    <div className="cardsRow">
                        {modalidad.map(m => (
                            <Link key={m._id} to={`/creator/${m._id}`} >
                                <div title={m.name} image={getPicture(m.name)}>

                                    <img src={getPicture(m.name)} alt={m.name} />
                                    <p>{m.name}</p>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>

            </div>
        </>
    );
}
