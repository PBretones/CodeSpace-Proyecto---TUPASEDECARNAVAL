import { Home } from './pages/home';
import { _404 } from './404';
import './styles/styles.scss';
import { News } from './pages/news';
import { createMuiTheme, withStyles, makeStyles, ThemeProvider } from '@material-ui/core/styles';

import { BrowserRouter, NavLink, Route, Switch, useHistory } from 'react-router-dom';
import React, { useState, useEffect } from 'react';

import { Creator } from './pages/creator';
import { User } from './pages/user';
import { UserDashboard } from './components/User/UserDashboard';
import { Player } from './pages/player';
import { Sidebar } from './components/Sidebar/Sidebar';

import { isAuth } from './helpers';
import AuthContext from './auth-context.js'


import { CreatorAuthor } from './components/Categories/CreatorAuthor';
import { CreatorTipo } from './components/Categories/CreatorTipo';
import { CreatorAudio } from './components/Categories/CreatorAudio';

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#a276ff',
    },
    secondary: {
      main: '#a276ff',
      contrastText: ''
    },

  }

});






function App() {


  const [tipo, setTipo] = useState([]);
  const [author, setAuthor] = useState([])
  const [error, setError] = useState("");

  useEffect(() => {
    getTipo();
    getAuthor();
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

  const getTipo = () => {
    return fetch("http://localhost:3002/api/tipo/show", {
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


  return (
    <>
      <ThemeProvider theme={theme} >

        <BrowserRouter >
          <Sidebar />
          <Switch>
            <Route path="/" exact component={Home} />
            <Route path="/news" exact component={News} />
            <Route path="/creator" exact component={Creator} />
            <Route path="/user" exact component={User} />
            <Route path="/user/:userId" exact component={UserDashboard} />
            <Route path="/player" exact component={Player} />


            <Route path="/creator/:id" exact component={CreatorAuthor} />
            <Route path="/creator/:id/:authorId" exact component={CreatorTipo} />
            <Route path="/creator/:id/:authorId/:tipoId" exact component={CreatorAudio} />
            <Route path="/404" exact component={_404} />
          </Switch>
        </BrowserRouter>
      </ThemeProvider>
    </>
  );
}

export default App;

