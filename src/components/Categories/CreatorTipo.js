import { CategoriesElements } from './CategoriesElements';
import { SearchBox } from './SearchBox';
import { Sidebar } from '../Sidebar/Sidebar';
import { Tupase } from './Tupase';


import { Switch, Link, Router, useLocation } from 'react-router-dom';
import React, { useState, useEffect } from 'react';



export const CreatorTipo = ({ }) => {
    const [tipo, setTipo] = useState([]);
    const [author, setAuthor] = useState([]);
    const [error, setError] = useState("");

    useEffect(() => {
        getAuthor();
        getTipo();
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


    const getAuthor = () => {
        return fetch("http://localhost:3002/api/author/show", {
            method: "GET",
        })
            .then((response) => {
                return response.json();
            })
            .then((data) => {
                if (data.error) {
                    setError(data.error);
                } else {
                    setAuthor(data);
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

    const tipoLocation = useLocation().pathname.split("/")[3];



    return (
        <>
            <div className="creator">
                <div className="creatorRow">
                    <div className="topHeader">
                        {author.filter(author => author._id === tipoLocation).map(author => (
                            <Tupase key={author._id} children={(author.name).replace(/\s+/g, '').toUpperCase()} crumb={tipoLocation} />))}
                    </div>
                    <div className="authores">
                        {tipo.filter(tipo => tipo.author === tipoLocation).map(tipo => (
                            <Link key={tipo._id} to={`/creator/${tipo.modalidad}/${tipo.author}/${tipo._id}`} >
                                <div className="authorCard" key={tipo._id}>
                                    <p>{tipo.name}</p>
                                    <img src={tipo.picture} alt="" />
                                </div>
                            </ Link>
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
}
