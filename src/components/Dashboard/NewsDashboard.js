import '../../styles/styles.scss';
import { Button, Card, Paper, Typography, CardContent, CardActions } from '@material-ui/core';
import React, { useEffect, useState } from "react";
import { Pagination } from '@material-ui/lab';
import { makeStyles } from "@material-ui/core/styles";


export const NewsDashboard = () => {

    const [news, setNews] = useState([]);
    const [error, setError] = useState("");
    const [body, setBody] = useState(1800);
    const [init, setInit] = useState(0);
    const handleBody = (value) => {

        if (init === 0 && body === 1800) {
            value = 3600;
            setInit(body);
            setBody(value);
        } else {
            value = 1800;
            setInit(0);
            setBody(value)
        }
    }


    const [page, setPage] = useState(1);
    const handleChange = (event, value) => {
        setPage(value);
    };



    useEffect(() => {
        getNews();
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


    const getNews = () => {
        return fetch("http://localhost:3002/api/news/show", {
            method: "GET",
        })
            .then((response) => {
                return response.json();
            })
            .then((data) => {
                if (data.error) {
                    setError(data.error);
                } else {
                    setNews(data);
                }
            })
            .catch((error) => {
                console.log(error);
            });
    };
    const useStyles = makeStyles(() => ({
        ul: {
            "& .MuiPaginationItem-root": {
                color: "white",

            }
        }
    }));

    const classes = useStyles();



    return (
        <>
            <div className="news">

                <Pagination className="pagination" page={page}
                    onClick={() => {
                        setInit(0);
                        setBody(1800);
                    }}
                    onChange={handleChange} count={5} color="primary" variant="outlined" shape="rounded" classes={{ ul: classes.ul }} />
            </div>
            <div className="newsDashboard">

                <div className="newsInfo">
                    {news.filter(news => news.id === page).map(news => (
                        <>
                            <div className="newsText">
                                <div className="newsTitle">{news.title}</div>
                                <div className="newsSubtitle">{news.subtitle}</div>
                                <div id="myBody" className="newsBody">{news.body.substring(init, body)}{init === 0 ? "..." : null}</div>

                                {news.body.length < 500 ? null : <Button onClick={handleBody} className="newsButton">{init <= 0 ? "NEXT" : "BACK"}</Button>}

                            </div>

                            <div className="newsBorder">
                                <div className="newsPic"><img src={news.picture} alt={news.title} /></div>
                            </div>
                        </>
                    ))}

                </div>
            </div>
        </>
    )

}

