import { Button } from '@material-ui/core';
import React, { useState, useEffect } from 'react';
import { authentication, mySignUp } from '../../helpers';
import { useHistory } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


export const UserRegister = ({ loginHandler }) => {

    const notify = (error) => toast(error);

    const [signUpOK, setSignUpOK] = useState({
        username: "",
        email: "",
        password: "",
        error: ""
    });
    const history = useHistory();

    const handleInputs = (name) => event => {
        setSignUpOK({ ...signUpOK, error: false, [name]: event.target.value })
    }

    const signUpSubmit = (event) => {
        event.preventDefault();

        mySignUp(signUpOK)
            .then(data => {
                if (data.error) {
                    setSignUpOK({ ...signUpOK, error: data.error })
                    notify(data.error);
                }
                else {

                    setSignUpOK({
                        username: "",
                        email: "",
                        password: "",
                        error: ""
                    })

                    authentication(data, () => {
                        setSignUpOK({ ...signUpOK })
                        history.push("/")

                    })



                }
            })


    }


    return (
        <>
            {/* <div className="loginFirst">
                <form className="loginForm">
                    <label htmlFor="username">Apodo</label>
                    <input value={signUpOK.username} onChange={handleInputs("username")} id="username" type="text" name="username" placeholder="Su Apodo" />
                    <label htmlFor="email">Email</label>
                    <input value={signUpOK.email} onChange={handleInputs("email")} id="mail" type="email" name="email" placeholder="Su Email" />
                    <label htmlFor="password">Password</label>
                    <input value={signUpOK.password} onChange={handleInputs("password")} id="password" htmlFor="password" type="password" name="password" placeholder="Su Password" />
                    <div>
                        <Button variant="contained" onClick={signUpSubmit} color="primary">Registrarse</Button>
                        <ToastContainer />
                    </div>
                </form>
            </div> */}


            <form className="loginFirst">
                <div className="loginInputs">
                    <div className="everyInput">
                        <label htmlFor="username">Apodo</label>
                        <input value={signUpOK.username} onChange={handleInputs("username")} id="username" type="text" name="username" placeholder="Su Apodo" />
                    </div>
                    <div className="everyInput">
                        <label htmlFor="email">Email</label>
                        <input value={signUpOK.email} onChange={handleInputs("email")} id="mail" type="email" name="email" placeholder="Su Email" />
                    </div>
                    <div className="everyInput">
                        <label htmlFor="password">Password</label>
                        <input value={signUpOK.password} onChange={handleInputs("password")} id="password" htmlFor="password" type="password" name="password" placeholder="Su Password" />
                    </div>
                </div>
                <div classname="loginNext">
                    <Button variant="contained" onClick={signUpSubmit} color="primary">Registrarse</Button>
                    <div><ToastContainer /></div>
                </div>
            </form>
            <p>¿Ya eres usuario? <span onClick={loginHandler}>Inicia sesión</span></p>


        </>
    );
}