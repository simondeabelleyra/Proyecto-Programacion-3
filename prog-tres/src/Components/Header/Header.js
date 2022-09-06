import React from 'react';
import './header.css';

import {Link, Route, Switch} from 'react-router-dom';

function Header(props){

    return(
        <nav className='navbar'>
            <div className='logo-home'>
                <img className='logo' src='../../images/logo.png'></img>
                <Link to='/'>Home</Link>
            </div>
            <div className="list-header">
                <Link to='/favoritos'>Favoritos</Link>
                <Link to='/peliculas'>Películas</Link>
                <Link to='/ver-todos'>Ver todos</Link>
            </div>
        </nav>
    )
}

export default Header