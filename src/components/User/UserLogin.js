import { Button } from '@material-ui/core';
import React, { useState } from 'react';
import { authentication, myLogin, isAuth } from '../../helpers';
import { useHistory } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const UserLogin = ({ registerHandler }) => {


    const notify = (error) => toast(error);

    const [loginOK, setLoginOK] = useState({
        email: "",
        password: "",
        error: ""
    });

    const history = useHistory();

    const handleInputs = (name) => event => {
        setLoginOK({ ...loginOK, error: false, [name]: event.target.value })
    }

    const loginSubmit = (event) => {
        event.preventDefault();

        myLogin(loginOK)
            .then(data => {
                if (data.error) {
                    setLoginOK({ ...loginOK, error: data.error })
                    console.log(data.error);
                    notify(data.error);

                }
                else {
                    authentication(data, () => {
                        setLoginOK({ ...loginOK })
                    })
                    if (!loginOK.error) {
                        history.push("/creator")
                    }
                }
            })
    }




    return (
        <>

            <form className="loginFirst">
                <div className="loginInputs">
                    <div className="everyInput">
                        <label htmlFor="email">Email</label>
                        <input value={loginOK.email} onChange={handleInputs("email")} id="mail" type="email" name="email" placeholder="Su Email" />
                    </div>
                    <div className="everyInput">
                        <label htmlFor="password">Password</label>
                        <input value={loginOK.password} onChange={handleInputs("password")} id="password" htmlFor="password" type="password" name="password" placeholder="Su Password" />
                    </div>
                </div>
                <div classname="loginNext">
                    <Button variant="contained" onClick={loginSubmit} color="primary">Iniciar Sesión</Button>
                    <ToastContainer />
                </div>
            </form>
            <p>¿No tienes cuenta? <span onClick={registerHandler}>Regístrate</span></p>
        </>

    );
}
