import './App.css';
import React from 'react';
import Header from './Components/Header/Header';
import Home from './Components/Home/Home';
import Footer from './Components/Footer/Footer';
import Favoritos from './Components/Favoritos/Favoritos';
import Peliculas from './Components/Peliculas/Peliculas';
import SeeAll from './Components/SeeAll/SeeAll';

import {Link, Route, Switch} from 'react-router-dom';


function App() {
  return (
    <React.Fragment>
    <Header/>
      <Switch>
        <Route path='/' exact component={ Home }/>
        <Route path='/favoritos' component={ Favoritos }/>
        <Route path='/peliculas' component={ Peliculas }/>
        <Route path='/ver-todos' component={ SeeAll }/>
      </Switch>
    <Footer/>
    </React.Fragment>
  );
}

export default App;
