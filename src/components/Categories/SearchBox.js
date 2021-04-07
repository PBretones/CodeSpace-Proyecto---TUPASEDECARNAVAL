import React, { useState, useEffect } from "react";
import { useTable, useFilters, useGlobalFilter, useAsyncDebounce } from 'react-table';
import { BrowserRouter, Link, Route, Switch } from 'react-router-dom';


export const SearchBox = () => {

    const [data, setData] = useState([]);
    const [query, setQuery] = useState("");
    const [error, setError] = useState();
    const getData = () => {
        return fetch("http://localhost:3002/tpdc", {
            method: "GET",
        })
            .then((response) => {
                return response.json();
            })
            .then((data) => {
                if (data.error) {
                    setError(data.error);
                } else {
                    setData(data);
                }
            })
            .catch((error) => {
                console.log(error);
            });
    };
    useEffect(() => {
        getData()
    }, [])

    return (
        <div>

            <form method="get" action="">
                <div className="tb">
                    <div className="searchBox"><input type="text" placeholder="Search" required></input></div>
                </div>
            </form>
        </div>
    );
}
