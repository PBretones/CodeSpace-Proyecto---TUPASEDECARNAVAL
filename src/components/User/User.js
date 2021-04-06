import { Button, withStyles } from '@material-ui/core';
import React, { useState, useEffect } from 'react';
import { UserLogin } from '../User/UserLogin';
import { UserRegister } from '../User/UserRegister';



export const UserUnknown = () => {
    const [register, setRegister] = useState(false);
    const [login, setLogin] = useState(false);
    const [start, setStart] = useState(true);

    const registerHandler = () => {
        setRegister(true)
        setLogin(false)
        setStart(false)
    }

    const loginHandler = () => {
        setLogin(true)
        setRegister(false)
        setStart(false)
    }


    return (
        <>
            <div className="user">
                <div className="userLogin">
                    <div className="loginDetails">
                        <span className="loginTitle">Bienvenido,
                            carnavalero</span>
                    </div>
                    {start && <div className="loginSubtitle"><span>Únete a la mayor comunidad sobre el Carnaval de Cádiz y disfruta de tus pases personalizados.
                        ¡Crea tu cuenta y descubre todo lo que puedes hacer!</span></div>}
                    {login ? <UserLogin registerHandler={registerHandler} /> : ""}
                    {register ? <UserRegister loginHandler={loginHandler} /> : ""}

                    {start && <div className="loginButtons">
                        <Button onClick={registerHandler} variant="containedSecondary" color="secondary">Registrarse</Button>
                        <Button onClick={loginHandler} variant="containedSecondary" color="secondary">Iniciar sesión</Button>
                    </div>}
                </div>
            </div>


        </>
    );
}
