import React, { useState } from "react";
import SidebarElements from './SidebarElements';
import { BrowserRouter, NavLink, Route, withRouter } from 'react-router-dom';
import { isAuth } from '../../helpers';
import { useHistory, useLocation } from 'react-router-dom';


export const Sidebar = () => {
    const [sidebarStatus, setSidebarStatus] = useState(false);
    const [isLogged, setIsLogged] = useState();
    const against = !sidebarStatus;
    const { user, token } = isAuth();
    const history = useHistory();
    const jwt = JSON.parse(localStorage.getItem("jwt"));

    const logOut = () => {

        localStorage.removeItem("jwt");
        history.push("/");
        setIsLogged({});
        console.log(localStorage.getItem("audios"));
        localStorage.removeItem("audios");
    }
    const Location = useLocation().pathname.split("/")[2];

    const logIn = () => {
        if (Location === "login") {
            setIsLogged({});
        }
    }


    return (
        <>  <div className={`sideButton  ${sidebarStatus ? 'active-rope-in' : ''} ${against ? 'active-rope-out' : ''} `} onClick={() => setSidebarStatus(!sidebarStatus)}>

        </div>
            <SidebarElements onChange={logIn} setSidebarStatus={setSidebarStatus} sidebarStatus={sidebarStatus} >
                <div className="sideLogo"><NavLink to="/" className="text"><span className="paseSide">TUPASE</span><span className="carnavalSide">DECARNAVAL</span></NavLink></div>
                <div className="sideText">
                    <NavLink to="/news" className="text">Noticias</NavLink>
                    <NavLink to="/creator" className="text">Creador</NavLink>
                    {!token && <NavLink to="/user" className="text">Iniciar Sesión</NavLink>}
                    {token && <NavLink to={`/user/${user._id}`} className="text">Usuario</NavLink>}
                    <NavLink to="/player" className="text">Reproductor</NavLink>
                    {token && <NavLink onClick={logOut} to="/" className="text">Cerrar Sesión</NavLink>}
                </div>
            </SidebarElements>

        </>
    );
}



<nav className="">


</nav>



