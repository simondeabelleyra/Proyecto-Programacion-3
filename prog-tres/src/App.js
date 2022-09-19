import './App.css';
import React from 'react';
import Header from './Components/Header/Header';
import Home from './Screen/Home/Home';
import Footer from './Components/Footer/Footer';
import Favoritos from './Screen/Favoritos/Favoritos';
import Estrenos from './Screen/Estrenos/Estrenos';
import SeeAll from './Screen/SeeAll/SeeAll';
import Detalle from './Screen/Detail/Detail';
import NotFound from './Screen/NotFound/NotFound';

import {Route, Switch} from 'react-router-dom';


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
