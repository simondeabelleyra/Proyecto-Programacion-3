import './App.css';
import React from 'react';
import Header from './Components/Header/Header';
import Home from './Components/Home/Home';
import Footer from './Components/Footer/Footer';
import Favoritos from './Components/Favoritos/Favoritos';
import Estrenos from './Components/Estrenos/Estrenos';
import SeeAll from './Components/SeeAll/SeeAll';
import Detalle from './Components/Detail/Detail';
import NotFound from './Components/NotFound/NotFound';

import {Link, Route, Switch} from 'react-router-dom';


function App() {
  return (
    <React.Fragment>
    <Header/>

      <Switch>
        <Route path='/' exact component={ Home }/>
        <Route path='/favoritos' component={ Favoritos }/>
        <Route path='/estrenos' component={ Estrenos }/>
        <Route path='/populares' component={ SeeAll }/>
        <Route path='/detallePelicula/id/:id' component={ Detalle }/>
        <Route path='' component={ NotFound }/>
      </Switch>
    <Footer/>
    </React.Fragment>
  );
}

export default App;
