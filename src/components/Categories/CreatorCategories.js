import { CategoriesElements } from '../../components/Categories/CategoriesElements';
import { Tupase } from '../Categories/Tupase';
import { SearchBox } from '../Categories/SearchBox';
import comparsa1 from '../../images/comparsa/la_eternidad.jpg';
import comparsa2 from '../../images/comparsa/oh_capitan.jpg';
import comparsa3 from '../../images/comparsa/chusma_selecta.jpg';
import comparsa4 from '../../images/comparsa/los_encaidenados.jpg';
import chirigota1 from '../../images/chirigota/lapa_negra.jpg';
import chirigota2 from '../../images/chirigota/los_enteraos.jpg';
import chirigota3 from '../../images/chirigota/los_impacientes.jpg';
import chirigota4 from '../../images/chirigota/estosiquees_unachirigota.jpeg'
import cuarteto1 from '../../images/cuarteto/el_more.jpg';
import cuarteto2 from '../../images/cuarteto/a_minuscula.jpg';
import cuarteto3 from '../../images/cuarteto/nos_retiramos.jpg';
import cuarteto4 from '../../images/cuarteto/la_mary.jpg';
import coro1 from '../../images/coro/creaciones_sa.jpg';
import coro2 from '../../images/coro/el_orfeon.jpg';
import coro3 from '../../images/coro/el_patio.jpg';
import coro4 from '../../images/coro/rockola.jpg';
import { Switch, Link, Router, useLocation } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import slugify from 'slugify';
import { CreatorAuthor } from './CreatorAuthor';





export const CreatorCategories = (title) => {



    const firstComparsa = [comparsa1, comparsa2, comparsa3, comparsa4];
    const firstChirigota = [chirigota1, chirigota2, chirigota3, chirigota4];
    const firstCuarteto = [cuarteto1, cuarteto2, cuarteto3, cuarteto4];
    const firstCoro = [coro1, coro2, coro3, coro4];
    const randomComparsa = firstComparsa[Math.floor(Math.random() * firstComparsa.length)];
    const randomChirigota = firstChirigota[Math.floor(Math.random() * firstChirigota.length)];
    const randomCuarteto = firstCuarteto[Math.floor(Math.random() * firstCuarteto.length)];
    const randomCoro = firstCoro[Math.floor(Math.random() * firstCoro.length)];

    const getPicture = (mod) => {
        switch (mod) {
            case "Comparsa":
                return randomComparsa;
            case "Chirigota":
                return randomChirigota;
            case "Coro":
                return randomCoro;
            case "Cuarteto":
                return randomCuarteto;
            default:
                return randomComparsa

        }
    }


    const [modalidad, setModalidad] = useState([]);
    const [error, setError] = useState("");

    useEffect(() => {
        getModalidad();
    }, [])


    // A MANO
    const requestOptions = {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Access-Control-Allow-Origin': '*',
            'Content-Type': 'applications/json',
            'Mode': 'no-cors'
        }
    };

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





    return (
        <>
            <div className="creator">
                <div className="creatorRow">
                    <div className="pase categories">¿POR DÓNDE EMPEZAMOS?</div>
                    <div className="categories">
                        {modalidad.map(m => (
                            <Link title={m.name} key={m._id} to={`/creator/${m._id}`} >
                                <CategoriesElements title={m.name} image={getPicture(m.name)} />
                            </Link>
                        ))}
                    </div>
                    <div className="pase categories right"><div>ELIGE MODALIDAD</div></div>
                </div>
            </div>
        </>
    );
}
