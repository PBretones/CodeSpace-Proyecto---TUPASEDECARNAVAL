
import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowAltCircleUp, faTheaterMasks } from '@fortawesome/free-solid-svg-icons';
import { isAuth, getUser, getPases } from '../../helpers';
import { useLocation, useHistory } from 'react-router-dom';
import { PlaylistTrack } from './PlaylistTrack';
import { Button } from '@material-ui/core';


export const UserDashboard = ({ match }) => {
    const { user, token } = isAuth();
    const [error, setError] = useState("");
    const [userPases, setUserPases] = useState({});
    const history = useHistory();



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


    const [userData, setUserData] = useState({
        username: "",
        email: "",
        avatar: "",
        error: false
    });


    const [profile, setProfile] = useState(false);
    const [list, setList] = useState(false);

    const showUserInfo = (userId) => {
        getUser(userId, token)
            .then((data => {
                if (data.error) {
                    setUserData({ ...userData, error: true })
                } else {
                    setUserData({
                        ...userData,
                        username: data.username,
                        email: data.email,
                        avatar: data.avatar
                    })
                }
            }))
    }

    useEffect(() => {
        showUserInfo(match.params.userId)
        getPases()
    }, [])

    const profileHandler = () => {
        if (profile != true) {
            setProfile(true)
            setList(false)
        } else {
            setProfile(false)

        }
    }
    const listHandler = () => {
        if (list != true) {
            setList(true)
            setProfile(false)
        } else {
            setList(false)
        }

    }
    const userLocation = useLocation().pathname.split("/")[2];
    const emptyList = () => {

        const isEmpty = userPases.filter(elem => elem.user === userLocation);
        return isEmpty.length;
    }
    const startCreation = () => {
        history.push('/creator');
    }

    return (
        <>
            <div className="falla">
                <div className="user">
                    <div className="userDashboard">
                        <div className="userProfile">
                            {profile != true && <div onClick={profileHandler} className={`userBack ${profile && 'openProfile'}`}>
                                <p><span className="paseSide">TU</span><span className="carnavalSide">PERFIL</span></p>
                            </div>}
                            {profile && <div className={`userBack ${profile && 'openProfile'}`}>
                                <p onClick={profileHandler}><span className="paseSide">TU</span><span className="carnavalSide">PERFIL</span></p>

                                <div>Apodo:{user.username}</div>
                                <div>Email:{user.email}</div>
                                <div>Avatar:{user.avatar}</div>
                                <FontAwesomeIcon onClick={profileHandler} icon={faArrowAltCircleUp} className="closeButton" /></div>}
                        </div>

                        <div className="userProfile">
                            {list != true && <div onClick={listHandler} className={`userBack ${list && 'openProfile'}`}>
                                <p><span className="paseSide">TU</span><span className="carnavalSide">LISTA</span></p>
                            </div>}
                            {list && <div className={`userBack ${list && 'openProfile'}`}>
                                <p onClick={listHandler}><span className="paseSide">TU</span><span className="carnavalSide">LISTA</span></p>
                                {emptyList() > 0 ? <div className="customPaseFilter">{userPases.filter(pases => pases.user === userLocation).map(pases =>
                                    <PlaylistTrack pases={pases} />
                                )}</div> : <>
                                    <div className="customPaseEmpty"><FontAwesomeIcon size="3x" icon={faTheaterMasks} /><div>Aún no tienes ningún pase de Carnaval.</div>
                                        <div><Button onClick={startCreation} variant="contained" size="large" color="primary">CREAR</Button></div>
                                    </div>

                                </>
                                }

                                <FontAwesomeIcon onClick={listHandler} icon={faArrowAltCircleUp} className="closeButton" />
                            </div>
                            }
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
