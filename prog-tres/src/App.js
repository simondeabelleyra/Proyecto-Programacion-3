import './App.css';
import React from 'react';
import Header from './Components/Header/Header';
import Home from './Components/Home/Home';
import Footer from './Components/Footer/Footer';

import {Route, Switch} from 'react-router-dom';


function App() {
  return (
    <React.Fragment>
    <Header/>
      <Switch>
        <Route path='/' exact component={ Home }/>
      </Switch>
    <Footer/>
    </React.Fragment>
  );
}

export default App;
